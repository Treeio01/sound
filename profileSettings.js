document.addEventListener("DOMContentLoaded", function () {
  const profileSettingsHtml = `
<div data-radix-popper-content-wrapper="" dir="ltr" id="profileDropdown" class="hidden"
    style="position: fixed; right: 0px; top: 0px; transform: translate(0, 65px); min-width: max-content; z-index: 300; --radix-popper-available-width: 240px; --radix-popper-available-height: 581.5px; --radix-popper-anchor-width: 146.390625px; --radix-popper-anchor-height: 56px; --radix-popper-transform-origin: 100% 0px;">
    <div data-side="bottom" data-align="start" role="menu" aria-orientation="vertical" data-state="open"
        data-radix-menu-content="" dir="ltr" id="radix-:ri:" aria-labelledby="radix-:rh:"
        class="rounded border-2 border-neutral-300 bg-neutral-100 p-1 shadow-2xl overflow-y-auto select-none w-60 h-fit"
        tabindex="-1" data-orientation="vertical"
        style="outline: none; z-index: 300; --radix-dropdown-menu-content-transform-origin: var(--radix-popper-transform-origin); --radix-dropdown-menu-content-available-width: var(--radix-popper-available-width); --radix-dropdown-menu-content-available-height: var(--radix-popper-available-height); --radix-dropdown-menu-trigger-width: var(--radix-popper-anchor-width); --radix-dropdown-menu-trigger-height: var(--radix-popper-anchor-height); opacity: 1; transform: none;">
        <div role="group">
            <div role="menuitem"
                class="hover:cursor-cool-clickable flex select-none items-center justify-between gap-2 rounded px-2 py-3 outline-none hover:bg-primary-300 focus:bg-primary-300 transition-colors"
                tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
                <div class="w-full h-full flex items-center gap-2">
                    <div
                        class="rounded-full border-neutral-700 relative overflow-hidden flex items-center justify-center bg-primary-500 relative w-8 h-8 min-w-[1.5rem] min-h-[1.5rem] border-1">
                        <img src="/assets/member_avatar_453.png" id="avatar_main_2"
                            alt="Avatar" class="object-cover">
                    </div>
                    <div class="flex flex-col">
                        <h5 class="leading-3" id="username_main_2"> </h5>
                        <p class="text-small" id="email_main_2"></p>
                    </div>
                </div>
            </div>
        </div>
        <div role="group">
            <div role="separator" aria-orientation="horizontal"
                class="h-[1px] bg-neutral-300 m-1 rounded-full mx-auto w-[87%]"></div>
            <div role="menuitem" id="openSettings"
                class="hover:cursor-cool-clickable flex select-none items-center justify-between gap-2 rounded px-2 py-3 outline-none hover:bg-primary-300 focus:bg-primary-300 transition-colors"
                tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
                <div class="flex gap-2 items-center"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-6" style="max-width: 50vw; max-height: 50vh;">
                        <g fill="none">
                            <path d="M0 0h24v24H0Z"></path>
                            <path class="stroke-2 stroke-neutral-700" stroke-linecap="round" stroke-linejoin="round"
                                d="M13.91 10.09a2.7 2.7 0 1 1-3.82 3.82 2.7 2.7 0 0 1 3.82-3.82"></path>
                            <path class="stroke-2 stroke-neutral-700" stroke-linecap="round" stroke-linejoin="round"
                                d="M5.25 12c0 .297.027.594.063.882l-1.588 1.242a.898.898 0 0 0-.224 1.156l1.412 2.443a.898.898 0 0 0 1.112.384l1.422-.571a.912.912 0 0 1 .846.099c.22.146.448.28.684.4.27.137.466.382.509.682l.217 1.513c.063.442.442.77.888.77h2.817a.897.897 0 0 0 .888-.77l.217-1.512a.918.918 0 0 1 .512-.683c.235-.118.462-.251.681-.396a.915.915 0 0 1 .85-.102l1.419.57a.899.899 0 0 0 1.112-.384l1.412-2.443a.898.898 0 0 0-.224-1.156l-1.588-1.242c.036-.288.063-.585.063-.882 0-.297-.027-.594-.063-.882l1.588-1.242a.898.898 0 0 0 .224-1.156l-1.412-2.443a.898.898 0 0 0-1.112-.384l-1.419.57a.918.918 0 0 1-.85-.102 6.597 6.597 0 0 0-.681-.396.918.918 0 0 1-.512-.683l-.216-1.512a.897.897 0 0 0-.888-.77h-2.817a.897.897 0 0 0-.888.77l-.218 1.514a.92.92 0 0 1-.509.682c-.236.12-.464.255-.684.4a.917.917 0 0 1-.847.098l-1.421-.571a.898.898 0 0 0-1.112.384L3.501 8.72a.898.898 0 0 0 .224 1.156l1.588 1.242A7.138 7.138 0 0 0 5.25 12Z">
                            </path>
                        </g>
                    </svg>
                    <h5>Settings</h5>
                </div>
            </div>
            <div role="menuitem" onclick="window.location.href='/product/integrations'"
                class="hover:cursor-cool-clickable flex select-none items-center justify-between gap-2 rounded px-2 py-3 outline-none hover:bg-primary-300 focus:bg-primary-300 transition-colors"
                tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
                <div class="flex gap-2 items-center"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-6" style="max-width: 50vw; max-height: 50vh;">
                        <g stroke-linecap="round" class="stroke-2 stroke-neutral-700" fill="none"
                            stroke-linejoin="round">
                            <path
                                d="M9.5 10.75h5a1 1 0 0 1 1 1V13a2.25 2.25 0 0 1-2.25 2.25h-2.5 0A2.25 2.25 0 0 1 8.5 13v-1.25h0a1 1 0 0 1 1-1ZM10.04 10.75V8.5M13.96 10.75V8.5">
                            </path>
                            <path
                                d="M16 20.051h0A8.994 8.994 0 1 0 3 12h0a9.348 9.348 0 0 0 2.744 6.624v0h0a6.983 6.983 0 0 0 4.928 2.036v0h0c.733 0 1.327-.595 1.328-1.328V15.25">
                            </path>
                        </g>
                        <path fill="none" d="M0 0h24v24H0z"></path>
                    </svg>
                    <h5>Integrations</h5>
                </div>
            </div>
        </div>
        <div role="group">
            <div role="separator" aria-orientation="horizontal"
                class="h-[1px] bg-neutral-300 m-1 rounded-full mx-auto w-[87%]"></div>
            <div role="menuitem" onclick="window.location.href='/spaces/522/friends'"
                class="hover:cursor-cool-clickable flex select-none items-center justify-between gap-2 rounded px-2 py-3 outline-none hover:bg-primary-300 focus:bg-primary-300 transition-colors"
                tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
                <div class="flex gap-2 items-center"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-6 stroke-2" style="max-width: 50vw; max-height: 50vh;">
                        <g stroke-linecap="round" class="stroke-neutral-700" fill="none" stroke-linejoin="round">
                            <path
                                d="M20.793 9.524a2.023 2.023 0 1 1-2.861 2.86 2.023 2.023 0 0 1 2.86-2.86M14.203 5.912a3.115 3.115 0 1 1-4.406 4.406 3.115 3.115 0 0 1 4.406-4.406M6.068 9.524a2.023 2.023 0 1 1-2.86 2.86 2.023 2.023 0 0 1 2.86-2.86M23 19v-1.096a2.5 2.5 0 0 0-2.5-2.5h-.801M1 19v-1.096a2.5 2.5 0 0 1 2.5-2.5h.801M17.339 19v-1.601a3.5 3.5 0 0 0-3.5-3.5H10.16a3.5 3.5 0 0 0-3.5 3.5V19">
                            </path>
                        </g>
                        <path fill="none" d="M0 0h24v24H0Z"></path>
                    </svg>
                    <h5 class="">Invite friends</h5>
                    <div class="px-2 py-1 bg-primary-400 rounded-xl flex items-center justify-center">
                        <p class="text-primary-600 text-small"><span class="font-bold">free</span></p>
                    </div>
                </div>
            </div>
            <div role="menuitem" onclick="window.location.href='/product-discovery-bible/start-here'"
                class="hover:cursor-cool-clickable flex select-none items-center justify-between gap-2 rounded px-2 py-3 outline-none hover:bg-primary-300 focus:bg-primary-300 transition-colors"
                tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
                <div class="flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        class="h-6" style="max-width: 50vw; max-height: 50vh;">
                        <g fill="none" data-name="Layer 2">
                            <path class="stroke-2 stroke-neutral-700" stroke-linecap="round" stroke-linejoin="round"
                                d="M17 3h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h6"></path>
                            <path class="stroke-2 stroke-neutral-700" stroke-linecap="round" stroke-linejoin="round"
                                d="M17 2.833V9a.5.5 0 0 1-.735.442L14.5 8.5l-1.765.94A.5.5 0 0 1 12 9V2.832A.833.833 0 0 1 12.833 2h3.334a.833.833 0 0 1 .833.833ZM7 3v18">
                            </path>
                            <path d="M0 0h24v24H0Z"></path>
                        </g>
                    </svg>
                    <h5>Product bible</h5>
                </div>
            </div>
        </div>

        <div role="group">
            <div role="separator" aria-orientation="horizontal"
                class="h-[1px] bg-neutral-300 m-1 rounded-full mx-auto w-[87%]"></div>
            <div role="menuitem" onclick="logout()"
                class="hover:cursor-cool-clickable flex select-none items-center justify-between gap-2 rounded px-2 py-3 outline-none hover:bg-primary-300 focus:bg-primary-300 transition-colors"
                tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
                <div class="flex gap-2 items-center "><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6" style="max-width: 50vw; max-height: 50vh;">
                        <g stroke-linecap="round" class="stroke-2 stroke-danger-500" fill="none"
                            stroke-linejoin="round">
                            <path
                                d="M11 19.392V7.503c0-.69-.355-1.331-.94-1.696l-4-2.5C4.728 2.475 3 3.432 3 5.003v11.888c0 .69.355 1.331.94 1.696l4 2.5c1.332.833 3.06-.125 3.06-1.695ZM15 11h6M19 13l2-2-2-2M11 19h4a2 2 0 0 0 2-2v-1">
                            </path>
                            <path d="M17 6V5a2 2 0 0 0-2-2H5"></path>
                        </g>
                        <path fill="none" d="M24 24H0V0h24v24Z"></path>
                    </svg>
                    <h5 class="text-danger-500">Log out</h5>
                </div>
            </div>
        </div>
    </div>
</div>
<div style="display:none; z-index:999999; max-width:40rem !important;" id="modalSettings"
    class="focus:outline-none rounded m-auto fixed inset-x-0 inset-y-0 flex items-center absolute bg-neutral-100 overflow-hidden min-w-[30rem] max-w-[80rem] h-[90%] rounded-2xl p-0"
    role="dialog" aria-describedby="radix-:ru:" aria-labelledby="radix-:rt:" data-state="open" tabindex="-1"
    style="z-index: 200; opacity: 1; transform: none; pointer-events: auto;">
    <div class="w-full h-full flex">


        <section class="w-full flex flex-col gap-4  overflow-y-auto">
            <div class="h-full w-full overflow-y-auto">
                <div class="h-full w-full px-10 py-5">
                    <section class="flex flex-col gap-2 items-start my-5">
                        <div class="flex gap-4 items-center mb-4">
                            <div
                                class="rounded-full border-neutral-700 relative overflow-hidden flex items-center justify-center bg-primary-500 relative w-16 h-16 min-w-[2.25rem] min-h-[2.25rem] border-1">
                                <img id="avatar_1"
                                    src="/assets/member_avatar_453.png"
                                    alt="Avatar" class="object-cover">
                            </div>
                            <label for="uploadFile"
                                class="flex items-center justify-center gap-2 rounded font-medium leading-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis w-auto min-w-0 min-h-0 select-none px-2 py-1 bg-neutral-200 border-1 border-neutral-400 opacity-100 cursor-pointer">
                                <h5 class="text-neutral-600">Change picture</h5>
                            </label>
                            <input type="file" id="uploadFile" style="display: none;">

                            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                           
                        </div>
                        <h3>Name</h3>
                        <div class="w-full flex gap-4 items-center">
                            <div class="flex flex-col gap-1">
                                <div style="transform-origin: center center; perspective: 500px; transform: none;">
                                    <input
                                        class="px-2 py-2 rounded transition-colors hover:cursor-cool-clickable disabled:cursor-cool-normal bg-neutral-50 border-1 border-neutral-400 w-60 p focus:outline-primary-500 overflow-hidden text-ellipsis-clip"
                                        type="text" placeholder="First name" value="" id="name">
                                </div>
                            </div>
                            <div class="flex flex-col gap-1">
                                <div style="transform-origin: center center; perspective: 500px; transform: none;">
                                    <input
                                        class="px-2 py-2 rounded transition-colors hover:cursor-cool-clickable disabled:cursor-cool-normal bg-neutral-50 border-1 border-neutral-400 w-60 p focus:outline-primary-500 overflow-hidden text-ellipsis-clip"
                                        type="text" placeholder="Last name" value=""
                                        id="last_name">
                                </div>
                            </div>
                        </div>
                        <p class="text-small">This is the name all your team members will see. Choose it wisely.</p>
                        <h3 class="mt-4">Login</h3>
                        <div class="flex flex-col gap-2">
                            <div class="relative">
                                <div class="flex flex-col gap-1">
                                    <div style="transform-origin: center center; perspective: 500px; transform: none;">
                                        <input
                                            class="px-2 py-2 rounded transition-colors hover:cursor-cool-clickable disabled:cursor-cool-normal bg-neutral-50 border-1 border-neutral-400 w-[25rem] p focus:outline-primary-500 overflow-hidden text-ellipsis-clip"
                                            type="email" placeholder="example@gmail.com" id="email" name="email"
                                            value="{{auth()->user()->login}}">
                                    </div>
                                </div>
                            </div>
                            <p role="alert" class="text-danger-500 pt-1 pl-1 text-transparent" id="errorMessage"></p>
                            <div class="relative">
                                <div class="flex flex-col gap-1">
                                    <div style="transform-origin: center center; perspective: 500px; transform: none;">
                                        <input
                                            class="px-2 py-2 rounded transition-colors hover:cursor-cool-clickable disabled:cursor-cool-normal bg-neutral-50 border-1 border-neutral-400 w-[25rem] p focus:outline-primary-500 overflow-hidden text-ellipsis-clip opacity-70"
                                            type="password" placeholder="Password" value="" id="password">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button id="saveButton" class="flex items-center justify-center gap-2 rounded font-medium leading-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis w-auto min-w-0 min-h-0 select-none px-2 py-1 bg-neutral-200 border-1 border-neutral-400 opacity-100 cursor-pointer" style="padding: 0.5rem 3rem;">
                                    <h5 class="text-neutral-600">Save</h5>
                                </button>
                            </div>
                            
                        </div>
                        <div class="mt-16 flex flex-col gap-2  w-full">
                            <h3>Danger zone</h3>
                            <section id="deleteButton"
                                class="bg-danger-100 py-2 px-4 rounded flex items-center justify-center gap-2 w-fit hover:cursor-cool-clickable disabled:cursor-cool-normal">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-5"
                                    style="max-width: 50vw; max-height: 50vh;">
                                    <g fill="none">
                                        <path d="M0 0h24v24H0Z"></path>
                                        <path class="stroke-2 stroke-danger-500" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m14.83 9.17-5.66 5.66M14.83 14.83 9.17 9.17M12 21v0a9 9 0 0 1-9-9v0a9 9 0 0 1 9-9v0a9 9 0 0 1 9 9v0a9 9 0 0 1-9 9Z">
                                        </path>
                                    </g>
                                </svg>
                                <h5 class="text-danger-500">Delete my account - All your data will be lost for ever</h5>
                            </section>
                        </div>

                    </section>
                </div>
            </div>
        </section>
    </div>
</div>
<section id="errorNotification" style="z-index: -111111;position:absolute" class="hiddenNOTIF"
    aria-label="Notifications alt+T" tabindex="-1">
    <ol dir="ltr" tabindex="-1" data-sonner-toaster="true" data-theme="light" data-y-position="top"
        data-x-position="right"
        style="--front-toast-height: 122.421875px; --offset: 32px; --width: 356px; --gap: 14px;">
        <li aria-live="polite" aria-atomic="true" role="status" tabindex="0"
            class="w-full min-h-[3.5rem] flex items-center" data-sonner-toast="" data-styled="false" data-mounted="true"
            data-promise="false" data-removed="false" data-visible="true" data-y-position="top" data-x-position="right"
            data-index="0" data-front="true" data-swiping="false" data-dismissible="true" data-swipe-out="false"
            data-expanded="false"
            style="--index: 0; --toasts-before: 0; --z-index: 1; --offset: 0px; --initial-height: 122.421875px;">
            <div class="w-full h-fit rounded px-3 py-3 flex flex-col pointer-events-auto select-none bg-danger-100 border-1 border-danger-500"
                style="z-index: 100000;">
                <section class="flex gap-2 items-center"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4" style="max-width: 50vw; max-height: 50vh;">
                        <g fill="none">
                            <path d="M0 0h24v24H0Z"></path>
                            <path class="stroke-[3px] stroke-danger-500" stroke-linecap="round" stroke-linejoin="round"
                                d="m14.83 9.17-5.66 5.66M14.83 14.83 9.17 9.17M12 21v0a9 9 0 0 1-9-9v0a9 9 0 0 1 9-9v0a9 9 0 0 1 9 9v0a9 9 0 0 1-9 9Z">
                            </path>
                        </g>
                    </svg>
                    <h5>You are the last member of the organization 😕</h5>
                </section>
                <p>You can't delete your account, you need to delete the organization instead</p>
            </div>
        </li>
    </ol>
</section>

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

  document.body.insertAdjacentHTML("beforeend", profileSettingsHtml);

  getProfile().then((res) => {
    console.log(res);
    if (res) {
      if (res.avatar) {
        $("#avatar_1").attr("src", res.avatar);
        $("#avatar_main").attr("src", res.avatar);
        $("#avatar_main_2").attr("src", res.avatar);
      }
      if (res.first_name && res.last_name) {
        console.log(res.first_name, res.last_name);
        $("#username_main_2").text(res.first_name + " " + res.last_name);
        $("#username_main").text(res.first_name + " " + res.last_name);
        $("#username_main").css({
          "overflow": "hidden",
          "text-overflow": "ellipsis",
          "max-width": "200px",
          "white-space": "nowrap",
          
        });
        $("#name").val(res.first_name);
        $("#last_name").val(res.last_name);
        $("#email").val(res.username);
      }
      if (res.username) {
        $("#email_main_2").text(res.username);
      }
    }
  });

  $("#profile").click(function () {
    console.log("4234234");
    $("#profileDropdown").toggleClass("hidden");
  });

  $("#openSettings").click(function () {
    openSettings();
  });
  function openSettings() {
    $("#modalSettings").css("display", "flex");
    $("#overlay").css("display", "block");
    $("#profile").addClass("hidden");
  }

  function closeSettings() {
    $("#modalSettings").css("display", "none");
    $("#overlay").css("display", "none");
    $("#profile").removeClass("hidden");
  }

  $(document).click(function (event) {
    if ($("#modalSettings").length && event.target === $("#overlay")[0]) {
      closeSettings();
    }
    if (
      $("#profileDropdown").length &&
      !$("#profileDropdown").has(event.target).length &&
      !$("#profile").has(event.target).length
    ) {
      $("#profileDropdown").addClass("hidden");
    }
  });

  $("#deleteButton").click(function (e) {
    e.preventDefault();
    if (!$(this).prop("disabled")) {
      var notification = $("#errorNotification");
      notification
        .removeClass("hiddenNOTIF")
        .addClass("visibleNOTIF")
        .css("z-index", 4423423423423);
      setTimeout(function () {
        notification
          .removeClass("visibleNOTIF")
          .addClass("hiddenNOTIF")
          .css("z-index", -111111);
      }, 5000);
    }
  });

  $(document).ready(function () {
    $("#saveButton").click(async function () {
      const first_name = $("#name").val();
      const last_name = $("#last_name").val();
      const email = $("#email").val();
      const password = $("#password").val();
      const errorMessage = $("#errorMessage");

      const updateData = {
        ...(first_name ? { first_name: first_name } : {}),
        ...(last_name ? { last_name: last_name } : {}),
        ...(email ? { login: email } : {}),
        ...(password ? { password: password } : {}),
      };

      try {
        const result = await updateProfile(updateData);
        if (result.success) {
          errorMessage
            .text("Data successfully updated")
            .removeClass("text-danger-500")
            .addClass("text-success-500")
            .removeClass("text-transparent");
        } else {
          errorMessage
            .text("Error updating data: " + result.error)
            .addClass("text-danger-500")
            .removeClass("text-transparent");
        }
      } catch (error) {
        console.error("Error:", error);
        errorMessage
          .text("An error occurred while sending the request")
          .addClass("text-danger-500")
          .removeClass("text-transparent");
      }
    });

    $("#uploadFile").on("change", async function () {
      try {
        const file = $(this)[0].files[0];

        // Check if the file is an image
        if (!file || !file.type.match("image.*")) {
          throw new Error("Unsupported media type");
        }

        const reader = new FileReader();

        // Define what happens when the file is read
        reader.onload = async function (event) {
          const base64Data = event.target.result; // Get the Base64 data

          // Call the updateProfile function with the Base64 data
          const result = await updateProfile({ avatar: base64Data });

          // Check if the update was successful
          if (result.success) {
            console.log("Фото профиля успешно обновлено");

            // Store the new photo path in localStorage
            localStorage.setItem("photo", result.path);

            // Update the avatar images
            $("#avatar_1").attr("src", base64Data);
            $("#avatar_main").attr("src", base64Data);
            $("#avatar_main_2").attr("src", base64Data);
          } else {
            console.error("Ошибка при обновлении фото профиля:", result.error);
            alert("Ошибка при обновлении фото профиля: " + result.error);
          }
        };

        // Read the file as Data URL
        reader.readAsDataURL(file);
      } catch (e) {
        // Handle any errors that occur during file processing
        console.error("Ошибка при обработке файла:", e);
        alert("Ошибка при обработке файла: " + e.message);
      }
    });
  });
});
