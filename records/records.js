var CREDITS = document.querySelector("#credits");
var DAYS_LEFT = document.querySelector("#days_left");
var BLOCK_LOGIN = document.querySelector("#login-block");

const BLOCKS = {
  
  enter_code: "block_enter_code",
  code_result: "block_code_result",
};

const playerBlock = document.getElementById("player");
const modalOverlay = document.getElementById("modalOverlay");
const modals = {
  codeModal: document.getElementById("codeModal"),
  synchronizeModal: document.getElementById("synchronizeModal"),
  nicknameModal: document.getElementById("nicknameModal"),
};
let activeModal = null;

const recordsContainer = document.getElementById("records");
const recordTemplateElement = recordsContainer
  ? recordsContainer.querySelector(".records__active")
  : null;
const recordTemplateHTML = recordTemplateElement
  ? recordTemplateElement.outerHTML
  : "";
if (recordsContainer && recordTemplateElement) {
  recordsContainer.innerHTML = "";
  recordsContainer.style.display = "none";
}

const recordsCountLabel = document.getElementById("records_count");
const recordsListLoaderEl = document.getElementById("records_list_loader");
const recordsListEmptyEl = document.getElementById("records_list_empty");
const loadingTimecodesBlock = document.getElementById("loading_timecods");
const recordPlaceholder = document.getElementById("record_detail_placeholder");
const recordError = document.getElementById("record_detail_error");
const recordDetailBlock = document.getElementById("record_detail_content");
const detailTitle = document.getElementById("record_detail_title");
const noteBlock = document.getElementById("record_note_block");
const noteTitle = document.getElementById("record_note_title");
const noteDescription = document.getElementById("record_note_description");
const noteAuthor = document.getElementById("record_note_author");
const timecodesContainer = document.getElementById(
  "record_timecodes_container"
);
const timecodesEmpty = document.getElementById("record_timecodes_empty");
const recordDownloadBtn = document.getElementById("download_record_btn");
const recordErrorInlineEl = document.getElementById("record_error_msg");
const syncModalDownloadBtn = document.getElementById("download");
const syncModalSyncBtn = document.getElementById("synchronize");
const recordTimeDurationEl = document.getElementById("record_time_duration");
const recordVideoPreviewEl = document.getElementById("record_video_preview");
const videoPreviewEl = document.getElementById("video_preview");
let lastDownloadLink = "";

let joinInProgress = false;
let activeCard = null;
let currentCaptureId = null;
let pendingRecordRequestId = null;

updateRecordsCount(0);
resetRecordDetailView();

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    const isAuthenticated =
      typeof checkAuth === "function" ? !!checkAuth() : false;

    setupAuthState(isAuthenticated);
    setupAuthButtons(isAuthenticated);
    setupModalSystem();
    setupCodeForms();
    setupSyncControls();
    setupNicknameModal();

    resetCodeDownloadState();
    resetRecordDetailView();
    updateRecordTimeDuration();
    setupVideoPreviewAnimation(recordVideoPreviewEl, [
      "/assets/img/block1.png",
      "/assets/img/block2.png",
      "/assets/img/block3.png",
    ]);
    setupVideoPreviewAnimation(videoPreviewEl, [
      "/assets/img/block1.png",
      "/assets/img/block2.png",
      "/assets/img/block3.png",
    ]);
    fetchCaptures();

    const startJoinBtn = document.getElementById("start_join_metting");
    if (startJoinBtn) {
      startJoinBtn.addEventListener("click", function () {
        showBlockById("enter_code");
        resetCodeDownloadState();
      });
    }

    const inlineBackBtn = document.querySelector(
      "#block_code_result #code_back_btn"
    );
    if (inlineBackBtn)
      inlineBackBtn.addEventListener("click", handleBackToEnterCode);

    if (recordDownloadBtn)
      recordDownloadBtn.addEventListener("click", handleDownloadRecordBtn);
  });
}

function showBlockById(key) {
  Object.entries(BLOCKS).forEach(([blockKey, blockId]) => {
    const el = document.getElementById(blockId);
    if (!el) return;
    el.style.display = blockKey === key ? "flex" : "none";
  });
}

function setupAuthState(isAuthenticated) {
  if (BLOCK_LOGIN) hideElement(BLOCK_LOGIN);
  if (playerBlock) showElement(playerBlock);

  if (!isAuthenticated) {
    if (CREDITS) CREDITS.textContent = "-";
    if (DAYS_LEFT) DAYS_LEFT.textContent = "-";
    showBlockById("enter_code");
  } else {
    hideAllInlineBlocks();
  }
}

function setupAuthButtons(isAuthenticated) {
  const authButtons = document.querySelectorAll(".authButton");
  authButtons.forEach((button) => {
    const target = button.getAttribute("data-modal-target") || "codeModal";

    button.addEventListener("click", function (event) {
      event.preventDefault();
      const allowModal = isAuthenticated || button.id === "player_main_button";
      const allowModal1 = isAuthenticated || button.id === "player_main_button_1";
      if (allowModal || allowModal1) {
        openModal(target);
        return;
      }

      triggerAuthButtonShake(button);
    });

    if (!isAuthenticated && button.tagName === "A") {
      button.setAttribute("href", "#");
    }
  });
}

function setupModalSystem() {
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function () {
      // Не закрываем модалку никнейма при клике на overlay
      if (activeModal && activeModal.id === "nicknameModal") {
        return;
      }
      closeAllModals();
    });
  }

  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", function () {
      const target = button.getAttribute("data-modal-close");
      if (target) {
        closeModal(target);
      } else {
        closeAllModals();
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      // Не закрываем модалку никнейма по Escape
      if (activeModal && activeModal.id === "nicknameModal") {
        return;
      }
      closeAllModals();
    }
  });
}

function setupSyncControls() {
  if (syncModalDownloadBtn) {
    syncModalDownloadBtn.addEventListener("click", function () {
      handleSyncDownloadClick(syncModalDownloadBtn, syncModalSyncBtn);
    });
  }

  if (syncModalSyncBtn) {
    syncModalSyncBtn.addEventListener("click", handleSyncAction);
  }
}

function setupNicknameModal() {
  const nicknameModal = modals.nicknameModal;
  const nicknameInput = document.getElementById("nicknameInput");
  const nicknameJoinBtn = document.getElementById("nicknameJoinBtn");
  const usernameMain = document.getElementById("username_main");

  // Проверяем, есть ли сохраненный никнейм
  const savedNickname = localStorage.getItem("userNickname");
  if (savedNickname && usernameMain) {
    usernameMain.textContent = savedNickname;
  } else if (nicknameModal) {
    // Показываем модалку, если никнейм не установлен
    openModal("nicknameModal");
  }

  // Обработчик кнопки Join
  if (nicknameJoinBtn && nicknameInput) {
    nicknameJoinBtn.addEventListener("click", function () {
      const nickname = (nicknameInput.value || "").trim();
      if (!nickname) {
        nicknameInput.style.borderColor = "#FF4D4F";
        setTimeout(() => {
          nicknameInput.style.borderColor = "#D9D9D9";
        }, 2000);
        return;
      }

      // Сохраняем никнейм
      localStorage.setItem("userNickname", nickname);

      // Обновляем отображение
      if (usernameMain) {
        usernameMain.textContent = nickname;
      }

      // Закрываем модалку
      closeModal("nicknameModal");
    });

    // Обработчик Enter в инпуте
    nicknameInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        nicknameJoinBtn.click();
      }
    });
  }
}

function setupCodeForms() {
  const containers = [];
  const inlineContainer = document.getElementById("block_enter_code");
  if (inlineContainer) containers.push(inlineContainer);
  if (modals.codeModal) containers.push(modals.codeModal);

  containers.forEach((container) => {
    const trigger = container.querySelector("#button_block");
    const input = container.querySelector('input[id="meetingInput"]');
    if (!trigger || !input) return;

    const submitHandler = function (event) {
      event.preventDefault();
      handleCodeSubmit(container, input, trigger);
    };

    trigger.addEventListener("click", submitHandler);
    const submitButton = trigger.querySelector('button[type="button"]');
    if (submitButton) submitButton.addEventListener("click", submitHandler);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") submitHandler(event);
    });
  });
}

function openModal(modalId) {
  const modal = modals[modalId];
  if (!modal) return;

  closeAllModals();
  activeModal = modal;
  setElementVisible(modalOverlay, true, "block");
  setElementVisible(modal, true, "flex");

  // Для модалки никнейма фокусируемся на nicknameInput
  if (modalId === "nicknameModal") {
    const nicknameInput = modal.querySelector("#nicknameInput");
    if (nicknameInput) {
      setTimeout(() => nicknameInput.focus(), 100);
    }
    return;
  }

  // Для других модалок
  const trigger = modal.querySelector("#button_block");
  clearCodeError(modal, trigger);
  const input = modal.querySelector('input[id="meetingInput"]');
  if (input) {
    input.focus();
    input.select();
  }
}

function closeModal(modalId) {
  const modal = modals[modalId];
  if (!modal) return;
  setElementVisible(modal, false);
  if (activeModal === modal) {
    activeModal = null;
    setElementVisible(modalOverlay, false);
  }
  const trigger = modal.querySelector("#button_block");
  clearCodeError(modal, trigger);
  const input = modal.querySelector('input[id="meetingInput"]');
  if (input) input.value = "";
}

function closeAllModals() {
  activeModal = null;
  setElementVisible(modalOverlay, false);
  Object.keys(modals).forEach((key) => {
    const modal = modals[key];
    if (!modal) return;
    setElementVisible(modal, false);
    const trigger = modal.querySelector("#button_block");
    clearCodeError(modal, trigger);
    const input = modal.querySelector('input[id="meetingInput"]');
    if (input) input.value = "";
  });
}

function hideAllInlineBlocks() {
  Object.values(BLOCKS).forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.style.display = "none";
  });
}

function updateRecordsCount(count) {
  if (!recordsCountLabel) return;
  const safeCount = Number.isFinite(count) ? count : 0;
  const noun = safeCount === 1 ? "capture" : "captures";
  recordsCountLabel.textContent = `${safeCount} ${noun}`;
}

function buildAuthHeaders() {
  const headers = {};
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  return headers;
}

function setElementVisible(el, visible, display) {
  if (!el) return;
  el.style.display = visible ? display || "" : "none";
}

function showTimecodesLoading(show) {
  setElementVisible(loadingTimecodesBlock, show, "flex");
}

function showTimecodesError(message) {
  if (recordError) {
    recordError.textContent = message;
    setElementVisible(recordError, true);
  }
  setElementVisible(recordDetailBlock, false);
  setElementVisible(recordPlaceholder, false);
}

function clearTimecodes() {
  if (timecodesContainer) timecodesContainer.innerHTML = "";
  setElementVisible(timecodesContainer, false);
  setElementVisible(timecodesEmpty, false);
}

function setRecordPlaceholderVisible(visible) {
  setElementVisible(recordPlaceholder, visible, "flex");
}

function showElement(el) {
  if (!el) return;
  el.style.display = "";
  el.classList.remove("hidden");
}

function hideElement(el) {
  if (!el) return;
  el.style.display = "none";
  el.classList.add("hidden");
}

function triggerAuthButtonShake(button) {
  if (!button) return;
  if (typeof button.animate === "function") {
    button.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(4px)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 400, easing: "ease" }
    );
    return;
  }

  button.classList.remove("authButton--shake");
  // Force reflow so consecutive clicks restart the animation
  void button.offsetWidth;
  button.classList.add("authButton--shake");
  button.addEventListener(
    "animationend",
    function handler() {
      button.classList.remove("authButton--shake");
      button.removeEventListener("animationend", handler);
    },
    { once: true }
  );
}

function populateTimecodesDetail(capture, detail) {
  const note = detail && detail.note_data ? detail.note_data : {};
  const timecodes = Array.isArray(detail?.timecodes) ? detail.timecodes : [];

  if (detailTitle) {
    detailTitle.textContent =
      (note.title && note.title.trim()) ||
      capture.name ||
      capture.title ||
      capture.room_name ||
      capture.meeting_name ||
      capture.created_at ||
      "Capture";
  }

  if (noteTitle) noteTitle.textContent = note.title || "";
  if (noteDescription) noteDescription.textContent = note.description || "";
  if (noteAuthor) noteAuthor.textContent = note.name || "";
  setElementVisible(
    noteBlock,
    !!(
      (note.title && note.title.trim()) ||
      (note.description && note.description.trim()) ||
      (note.name && note.name.trim())
    ),
    "flex"
  );

  clearTimecodes();
  if (timecodes.length && timecodesContainer) {
    timecodes.forEach((tc, index) => {
      const item = createTimecodeElement(tc, index + 1);
      timecodesContainer.appendChild(item);
    });
    setElementVisible(timecodesContainer, true, "flex");
  } else if (timecodesEmpty) {
    timecodesEmpty.textContent = "No timecodes yet.";
    setElementVisible(timecodesEmpty, true);
  }

  setElementVisible(recordPlaceholder, false);
  setElementVisible(recordError, false);
  setElementVisible(recordDetailBlock, true, "flex");
}

function createTimecodeElement(timecode, order) {
  const card = document.createElement("div");
  card.className =
    "flex flex-col gap-[12px] w-full max-w-[410px] self-start rounded-xl !bg-[#D9D9D9]/20 p-3";

  const header = document.createElement("div");
  header.className = "flex gap-2.5";
  header.innerHTML = `
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10.5" cy="10.5" r="9.5" stroke="black" stroke-width="2"></circle>
      <circle cx="10.5" cy="10.5" r="4" fill="black" stroke="black"></circle>
    </svg>
    <div class="flex bg-[#FFF700]/20 rounded-[6px] px-1.5">
      <span class="text-black font-semibold">${
        timecode?.timecode || `Timecode #${order}`
      }</span>
    </div>
  `;

  const body = document.createElement("span");
  body.className = "font-medium text-[12px] !text-[#828282]";
  body.textContent = timecode?.description || "";

  card.appendChild(header);
  card.appendChild(body);

  if (timecode && timecode.highlighted) {
    card.classList.add("timecode-item--highlighted");
  }

  return card;
}

function resetRecordDetailView() {
  if (detailTitle) detailTitle.textContent = "";
  if (noteTitle) noteTitle.textContent = "";
  if (noteDescription) noteDescription.textContent = "";
  if (noteAuthor) noteAuthor.textContent = "";
  clearTimecodes();
  setElementVisible(noteBlock, false);
  setElementVisible(recordDetailBlock, false);
  setElementVisible(recordPlaceholder, true, "flex");
  showTimecodesLoading(false);
}

async function fetchCaptures() {
  if (recordsContainer) recordsContainer.style.display = "none";
  updateRecordsCount(0);
  activeCard = null;
  currentCaptureId = null;
  pendingRecordRequestId = null;
  resetRecordDetailView();
  showRecordsLoader(true);
  setRecordsEmptyState(false);

  try {
    const res = await fetch(`${backendDomain}/HearUp/captures/`, {
      method: "GET",
      headers: buildAuthHeaders(),
    });
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }

    if (!res.ok || !data || data.error) throw new Error();

    const list = Array.isArray(data.captures)
      ? data.captures
      : Array.isArray(data.results)
      ? data.results
      : Array.isArray(data.records)
      ? data.records
      : Array.isArray(data)
      ? data
      : [];

    const total =
      typeof data.captures_count === "number"
        ? data.captures_count
        : list.length;
    updateRecordsCount(total);
    renderCaptures(list);
  } catch (err) {
    updateRecordsCount(0);
    renderCaptures([]);
  } finally {
    showRecordsLoader(false);
  }
}

function renderCaptures(list) {
  if (!recordsContainer) return;

  if (!list || !list.length) {
    recordsContainer.innerHTML = "";
    recordsContainer.style.display = "none";
    setRecordsEmptyState(true);
    resetRecordDetailView();
    return;
  }

  setRecordsEmptyState(false);
  recordsContainer.innerHTML = "";
  recordsContainer.style.display = "flex";

  let firstSelectable = null;

  list.forEach((capture) => {
    const card = buildCaptureCard(capture);
    if (!card) return;
    recordsContainer.appendChild(card);

    const captureId = getCaptureId(capture);
    if (!firstSelectable && captureId != null) {
      firstSelectable = { capture, element: card };
    }
  });

  if (firstSelectable) {
    selectCapture(firstSelectable.capture, firstSelectable.element, {
      force: true,
    });
  } else {
    resetRecordDetailView();
  }
}

function buildCaptureCard(capture) {
  let card = null;
  if (recordTemplateHTML) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = recordTemplateHTML.trim();
    card = wrapper.firstElementChild;
    if (card) {
      card.classList.remove("records__active");
      card.classList.add("border-b", "!border-[#D6D6D6]");
    }
  }
  if (!card) {
    card = document.createElement("div");
    card.className =
      "flex flex-col w-full gap-[9px] rounded-[10px] py-2.5 px-2.5 border-b !border-[#D6D6D6]";
    card.innerHTML = `
      <div class="flex w-full justify-between items-center">
        <div class="flex gap-2 items-center">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.5" cy="10.5" r="9.5" stroke="#353535" stroke-width="2"></circle>
            <circle cx="10.5" cy="10.5" r="4" fill="#353535" stroke="#353535"></circle>
          </svg>
          <span class="records__card-title font-semibold text-[#353535]"></span>
        </div>
      </div>
      <span class="records__card-description text-[12px] text-[#828282] font-medium"></span>
      <div class="flex !mt-[11px] justify-end">
        <span class="records__card-date text-[#242425] text-[13px] font-semibold"></span>
      </div>
    `;
  }

  const titleEl = card.querySelector(".records__card-title");
  const descriptionEl = card.querySelector(".records__card-description");
  const dateEl = card.querySelector(".records__card-date");

  if (titleEl)
    titleEl.textContent =
      capture.name ||
      capture.title ||
      capture.room_name ||
      capture.meeting_name ||
      `Capture #${getCaptureId(capture) || ""}`;
  if (descriptionEl)
    descriptionEl.textContent = capture.description || "No description";
  if (dateEl)
    dateEl.textContent =
      capture.created_at || capture.created || capture.updated_at || "";

  card.dataset.captureId = getCaptureId(capture) || "";
  card.addEventListener("click", () => selectCapture(capture, card));
  return card;
}

function selectCapture(capture, card, options) {
  const captureId = getCaptureId(capture);
  if (!captureId) return;

  if (!options || !options.force) {
    if (activeCard) {
      activeCard.classList.remove("records__active");
      activeCard.classList.add("border-b", "!border-[#D6D6D6]");
    }
  }

  activeCard = card;
  if (activeCard) {
    activeCard.classList.add("records__active");
    activeCard.classList.remove("border-b", "!border-[#D6D6D6]");
  }

  currentCaptureId = captureId;
  loadCaptureTimecodes(capture);
}

function getCaptureId(capture) {
  if (!capture) return null;
  return (
    capture.id ?? capture.record_id ?? capture.uuid ?? capture.code ?? null
  );
}

async function loadCaptureTimecodes(capture) {
  const captureId = getCaptureId(capture);
  if (!captureId) {
    showTimecodesError("Error: unable to load timecodes");
    return;
  }

  pendingRecordRequestId = captureId;
  setElementVisible(recordDetailBlock, false);
  showTimecodesLoading(true);
  clearTimecodes();
  setRecordPlaceholderVisible(false);

  try {
    const data = await fetchCaptureTimecodes(captureId);
    if (pendingRecordRequestId !== captureId) return;
    populateTimecodesDetail(capture, data);
  } catch (error) {
    if (pendingRecordRequestId !== captureId) return;
    showTimecodesError(
      error && error.message ? error.message : "Error: unable to load timecodes"
    );
  } finally {
    if (pendingRecordRequestId === captureId) {
      pendingRecordRequestId = null;
      showTimecodesLoading(false);
    }
  }
}

async function fetchCaptureTimecodes(captureId) {
  const res = await fetch(
    `${backendDomain}/HearUp/timecodes/${encodeURIComponent(captureId)}/`,
    {
      method: "GET",
      headers: buildAuthHeaders(),
    }
  );

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    data = null;
  }

  if (!res.ok || !data) {
    throw new Error("Error: unable to load timecodes");
  }

  if (data.error && data.error !== false && data.error !== "false") {
    const message =
      typeof data.error === "string"
        ? data.error
        : "Error: unable to load timecodes";
    throw new Error(message);
  }

  return data;
}

function resetCodeDownloadState() {
  const inlineTrigger = document.querySelector(
    "#block_enter_code #button_block"
  );
  const modalTrigger = modals.codeModal
    ? modals.codeModal.querySelector("#button_block")
    : null;

  clearCodeError(document.getElementById("block_enter_code"), inlineTrigger);
  clearCodeError(modals.codeModal, modalTrigger);

  configureSyncButtons("");

  if (recordDownloadBtn) {
    recordDownloadBtn.setAttribute("data-link", "");
    recordDownloadBtn.style.display = "none";
  }
  const codeMessage = document.getElementById("code_result_message");
  if (codeMessage) {
    codeMessage.textContent = "Use the button below to download your file.";
  }
}

function configureSyncButtons(link) {
  lastDownloadLink = link || "";
  updateSyncButtonState(syncModalDownloadBtn, syncModalSyncBtn, link);
}

function updateSyncButtonState(downloadBtn, syncBtn, link) {
  if (!downloadBtn || !syncBtn) return;
  if (link) {
    downloadBtn.dataset.downloadLink = link;
    syncBtn.dataset.downloadLink = link;
    showElement(downloadBtn);
    hideElement(syncBtn);
  } else {
    downloadBtn.dataset.downloadLink = "";
    syncBtn.dataset.downloadLink = "";
    hideElement(downloadBtn);
    hideElement(syncBtn);
  }
}

async function requestDownloadLink(code) {
  // Используем никнейм из localStorage (установленный через модалку)
  const username = localStorage.getItem("userNickname") || "";

  // Формируем URL с параметром username
  const url = new URL(
    `${backendDomain}/HearUp/download/guest/${encodeURIComponent(code)}/`
  );
  if (username) {
    url.searchParams.set("username", username);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "User-Agent": navigator.userAgent || "",
    },
  });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    data = null;
  }

  if (
    !res.ok ||
    !data ||
    (data.error && data.error !== false && data.error !== "false") ||
    !data.link
  ) {
    const message =
      data && typeof data.error === "string"
        ? data.error
        : "Error: unable to download";
    throw new Error(message);
  }

  return data.link;
}

function showCodeError(container, trigger, message) {
  if (trigger) {
    trigger.classList.add("error_field");
    setTimeout(() => trigger.classList.remove("error_field"), 2000);
  }

  if (!container) return;

  const inlineError = container.querySelector("#record_error_msg");
  if (inlineError) inlineError.textContent = message;

  const modalError = container.querySelector("#codeModalErrorMessage");
  if (modalError) {
    modalError.textContent = message;
  } else if (container === modals.codeModal) {
    const info = document.createElement("span");
    info.id = "codeModalErrorMessage";
    info.className = "text-[12px] font-semibold text-[#FF4D4F] mt-2";
    info.textContent = message;
    container.appendChild(info);
  }
}

function clearCodeError(container, trigger) {
  if (trigger) trigger.classList.remove("error_field");
  if (!container) return;
  const inlineError = container.querySelector("#record_error_msg");
  if (inlineError) inlineError.textContent = "";
  const modalError = container.querySelector("#codeModalErrorMessage");
  if (modalError) modalError.textContent = "";
}

async function handleCodeSubmit(container, input, trigger) {
  if (joinInProgress) return;
  const code = (input.value || "").trim();
  if (!code) {
    showCodeError(container, trigger, "Enter the code");
    return;
  }

  joinInProgress = true;
  try {
    const link = await requestDownloadLink(code);
    clearCodeError(container, trigger);
    configureSyncButtons(link);

    if (recordDownloadBtn) {
      recordDownloadBtn.setAttribute("data-link", link);
      recordDownloadBtn.style.display = "";
    }

    if (container === modals.codeModal) {
      closeModal("codeModal");
      openModal("synchronizeModal");
    } else {
      showBlockById("code_result");
    }

    input.value = "";
  } catch (error) {
    showCodeError(
      container,
      trigger,
      error && error.message ? error.message : "Error: unable to download"
    );
  } finally {
    joinInProgress = false;
  }
}

function joinMeeting() {
  const container = document.getElementById("block_enter_code");
  if (!container) return;
  const trigger = container.querySelector("#button_block");
  const input = container.querySelector('input[id="meetingInput"]');
  if (!input || !trigger) return;
  handleCodeSubmit(container, input, trigger);
}

function handleSyncDownloadClick(downloadBtn, syncBtn) {
  if (!downloadBtn || !syncBtn) return;
  const link = downloadBtn.dataset.downloadLink || lastDownloadLink;
  if (link) window.open(link, "_blank");
  hideElement(downloadBtn);
  showElement(syncBtn);
}

function handleSyncAction(event) {
  if (event && event.preventDefault) event.preventDefault();
  console.warn("Synchronize action is not implemented yet.");
}

function handleBackToEnterCode() {
  showBlockById("enter_code");
  resetCodeDownloadState();
}

function handleDownloadRecordBtn() {
  const link = recordDownloadBtn && recordDownloadBtn.getAttribute("data-link");
  if (link) window.open(link, "_blank");
}

function showRecordsLoader(show) {
  setElementVisible(recordsListLoaderEl, show, "flex");
  //if (recordsListEl && show) recordsListEl.style.display = "none";
}

function setRecordsEmptyState(isEmpty) {
  setElementVisible(recordsListEmptyEl, isEmpty, "block");
}

function preventMultipleCallsOn(target, handler) {
  let locked = false;
  return function (event) {
    if (locked) {
      if (event && event.preventDefault) event.preventDefault();
      return;
    }
    locked = true;
    try {
      handler(event);
    } finally {
      setTimeout(() => {
        locked = false;
      }, 400);
    }
  };
}

function generateRandomDuration() {
  // Генерируем случайное время от 2 до 4 часов (в секундах)
  const minSeconds = 2 * 60 * 60; // 2 часа
  const maxSeconds = 4 * 60 * 60; // 4 часа
  const randomSeconds = Math.floor(
    Math.random() * (maxSeconds - minSeconds + 1) + minSeconds
  );

  // Преобразуем секунды в формат H:MM:SS
  const hours = Math.floor(randomSeconds / 3600);
  const minutes = Math.floor((randomSeconds % 3600) / 60);
  const seconds = randomSeconds % 60;

  // Форматируем с ведущими нулями
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
}

function updateRecordTimeDuration() {
  if (!recordTimeDurationEl) return;
  const duration = generateRandomDuration();
  recordTimeDurationEl.textContent = `00:00/${duration}`;
}

function setupVideoPreviewAnimation(imageElement, images) {
  if (!imageElement || !images || images.length === 0) return;

  // Сохраняем оригинальные классы и стили
  const originalClasses = imageElement.className;
  const computedStyle = window.getComputedStyle(imageElement);

  // Создаем обертку для crossfade эффекта
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = computedStyle.display || "inline-block";
  
  // Копируем размеры оригинального элемента
  if (imageElement.width) wrapper.style.width = imageElement.width + "px";
  if (imageElement.height) wrapper.style.height = imageElement.height + "px";
  if (computedStyle.maxWidth && computedStyle.maxWidth !== "none") {
    wrapper.style.maxWidth = computedStyle.maxWidth;
  }
  if (computedStyle.maxHeight && computedStyle.maxHeight !== "none") {
    wrapper.style.maxHeight = computedStyle.maxHeight;
  }

  // Создаем два слоя изображений для плавного crossfade
  const img1 = document.createElement("img");
  const img2 = document.createElement("img");
  

  // Применяем оригинальные классы и стили к обоим изображениям
  [img1, img2].forEach((img) => {
    img.className = originalClasses + " rounded-xl";
    img.alt = imageElement.alt || "";
    
    // Копируем стили размеров
    if (computedStyle.width && computedStyle.width !== "auto") {
      img.style.width = computedStyle.width;
    } else {
      img.style.width = "100%";
    }
    if (computedStyle.height && computedStyle.height !== "auto") {
      img.style.height = computedStyle.height;
    } else {
      img.style.height = "100%";
    }
    if (computedStyle.maxWidth && computedStyle.maxWidth !== "none") {
      img.style.maxWidth = computedStyle.maxWidth;
    }
    if (computedStyle.maxHeight && computedStyle.maxHeight !== "none") {
      img.style.maxHeight = computedStyle.maxHeight;
    }
    
    img.style.objectFit = "contain";
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.transition = "opacity 1s ease-in-out";
  });

  // Устанавливаем начальное состояние
  img1.src = images[0];
  img1.style.opacity = "1";
  img2.style.opacity = "0";

  // Вставляем изображения в обертку
  wrapper.appendChild(img1);
  wrapper.appendChild(img2);

  // Заменяем оригинальный элемент на обертку
  imageElement.parentNode.replaceChild(wrapper, imageElement);

  let currentIndex = 0;
  let isImg1Active = true;

  // Функция для смены изображения с crossfade эффектом
  function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    const nextImage = images[currentIndex];

    if (isImg1Active) {
      // Загружаем новое изображение во второй слой
      img2.src = nextImage;
      // Плавно показываем второй слой, скрываем первый
      img2.style.opacity = "1";
      img1.style.opacity = "0";
    } else {
      // Загружаем новое изображение в первый слой
      img1.src = nextImage;
      // Плавно показываем первый слой, скрываем второй
      img1.style.opacity = "1";
      img2.style.opacity = "0";
    }

    isImg1Active = !isImg1Active;
  }

  // Меняем изображение каждые 3 секунды
  setInterval(changeImage, 3000);
}
