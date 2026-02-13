document.addEventListener("DOMContentLoaded", function () {
  const feedbackHtml = `
<section id="notification" style="z-index: -111111;position:absolute" class="hiddenNOTIF"
    aria-label="Notifications alt+T" tabindex="-1">
    <ol dir="ltr" tabindex="-1" data-sonner-toaster="true" data-theme="light" data-y-position="top"
        data-x-position="right" style="--front-toast-height: 74.453125px; --offset: 32px; --width: 356px; --gap: 14px;">
        <li aria-live="polite" aria-atomic="true" role="status" tabindex="0"
            class="w-full min-h-[3.5rem] flex items-center" data-sonner-toast="" data-styled="false" data-mounted="true"
            data-promise="false" data-removed="false" data-visible="true" data-y-position="top" data-x-position="right"
            data-index="0" data-front="true" data-swiping="false" data-dismissible="true" data-swipe-out="false"
            data-expanded="false"
            style="--index: 0; --toasts-before: 0; --z-index: 1; --offset: 0px; --initial-height: 74.453125px;">
            <div class="w-full h-fit rounded px-3 py-3 flex flex-col pointer-events-auto select-none bg-success-200 border-1 border-success-700"
                style="z-index: 100000;">
                <section class="flex gap-2 items-center"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4" style="max-width: 50vw; max-height: 50vh;">
                        <g fill="none">
                            <path class="stroke-[3px] stroke-success-700" stroke-linecap="round" stroke-linejoin="round"
                                d="m20 6.5-11 11-5-5"></path>
                        </g>
                    </svg>
                    <h5>Feedback received, thank you 🎉</h5>
                </section>
                <p>We are probably reading it right now!</p>
            </div>
        </li>
    </ol>
</section>

<div id="overlay" style="display:none;z-index: 999;"
    class="fixed inset-0 box-content shadow-apple backdrop-blur-[2px] bg-neutral-700/40 " data-state="open"
    style="pointer-events: auto; z-index: 199;    z-index: 999; opacity: 1;" data-aria-hidden="true" aria-hidden="true">
</div>

<div style="display:none; z-index:999999" id="modalFeedback"
    class="focus:outline-none rounded m-auto fixed inset-x-0 inset-y-0 flex items-center absolute bg-neutral-100 overflow-hidden min-w-[5rem] max-w-[40rem] h-fit max-h-[95%] rounded p-3"
    role="dialog" aria-describedby="radix-:r3v:" aria-labelledby="radix-:r3u:" data-state="open" tabindex="-1"
    style="z-index: 200; opacity: 1; transform: none; pointer-events: auto;">
    <div class="h-full w-full rounded">
        <div class="w-full flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                class="h-6 w-6" style="max-width: 50vw; max-height: 50vh;">
                <path fill="none" class="stroke-2 stroke-neutral-700" stroke-linecap="round" stroke-linejoin="round"
                    d="M12.967 3 4.75 14H12l-.967 7 8.217-11H12Z"></path>
                <path fill="none" d="M0 0h24v24H0Z"></path>
            </svg>
            <h2>Send a feedback to the HearUp team</h2>
        </div>
        <div class="flex flex-col gap-4 mt-4">
            <form>
                <div class="bg-neutral-100 rounded">
                    <div class="flex flex-col gap-1"><textarea
                            class="text-primary p-2 rounded transition-colors resize-none hover:cursor-cool-clickable disabled:cursor-cool-normal min-h-[16rem] px-2 py-2 w-full bg-neutral-200 border-1 border-neutral-300 p"
                            placeholder="What can we do better?" rows="1" id="feedbackHTML" name="feedbackHTML"
                            style="height: 253px;"></textarea></div>
                </div>
                <p role="alert" class="text-danger-500 pt-1 pl-1 text-transparent"> </p>
                <section class="w-full flex items-center justify-end gap-2 mt-2"><button type="button" id="closeButton"
                        class="flex items-center justify-center gap-2 rounded font-medium leading-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis w-auto min-w-0 min-h-0 select-none px-3 py-2 bg-neutral-200 border-1 border-neutral-400 opacity-100"
                        tabindex="0" style="transform: none; transform-origin: 50% 50% 0px;">
                        <h5>Cancel</h5>
                    </button><button type="submit" id="submitButton"
                        class="flex items-center justify-center gap-2 rounded font-medium leading-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis w-auto min-w-0 min-h-0 select-none px-3 py-2 bg-primary-500 bg-grainy-texture outline-neutral-700 opacity-60"
                        tabindex="0" style="transform: none; transform-origin: 50% 50% 0px;" disabled="">
                        <h5>Send feedback</h5>
                    </button></section>
            </form>
        </div>
    </div>
</div>

<style>
    .hiddenNOTIF {
        opacity: 0;
        transition: 0.5s all;
        z-index: -1;
    }

    .visibleNOTIF {
        opacity: 1;
        transition: 0.5s all;
        z-index: 9999;
    }
</style>

    `;
  $(document.body).append(feedbackHtml);

  function openText() {
    const modal = $("#modalFeedback");
    const overlay = $("#overlay");

    if (modal.length && overlay.length) {
      modal.css("display", "flex");
      overlay.css("display", "block");
    }
  }
  var openModalButton = $("#app-navbar > div > button.flex.items-center.font-bold.rounded.text-base.font-bold.px-3.py-3");
  var closeModalButton = $("#closeButton");
  openModalButton.on("click", function () {
    console.log("fsdfsd");
    openText();
  });

  closeModalButton.on("click", function () {
    const modal = $("#modalFeedback");
    const overlay = $("#overlay");
    if (modal.length && overlay.length) {
      modal.css("display", "none");
      overlay.css("display", "none");
    }
  });

  $(document).on("click", function (event) {
    const modal = $("#modalFeedback");
    const overlay = $("#overlay");
    if (modal.length && event.target === overlay[0]) {
      modal.css("display", "none");
      overlay.css("display", "none");
    }
  });

  var completeImportButton = $("#submitButton");
  var textArea = $("#feedbackHTML");

  textArea.on("input", function () {
    if ($(this).val().trim().length > 0) {
      completeImportButton.prop("disabled", false);
      completeImportButton.removeClass("opacity-60").addClass("opacity-100");
    } else {
      completeImportButton.prop("disabled", true);
      completeImportButton.removeClass("opacity-100").addClass("opacity-60");
    }
  });
  completeImportButton.on("click", function (e) {
    e.preventDefault();
    if (!$(this).prop("disabled")) {
      var notification = $("#notification");
      notification.removeClass("hiddenNOTIF").addClass("visibleNOTIF");
      notification.css("z-index", 1);
      setTimeout(function () {
        notification.removeClass("visibleNOTIF").addClass("hiddenNOTIF");
        notification.css("z-index", -111111);
      }, 5000);

      const modal = $("#modalFeedback");
      const overlay = $("#overlay");

      if (modal.length && overlay.length) {
        modal.css("display", "none");
        overlay.css("display", "none");
      }
    }
  });
});
