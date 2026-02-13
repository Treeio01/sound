//сделай скрипт, который будет получить информацию о профиле, если удачно не получит то залогинит пользователя, если не залогинит, то переведет на страницу /login
document.addEventListener("DOMContentLoaded", () => {
  const avatar = document.getElementById("avatar_main");

  var accessToken = localStorage.getItem("accessToken");

  getProfile(accessToken).then((res) => {
    if (res) {
      console.log(res);
      console.log("=======");
      if (res.avatar) {
        avatar.src = res.avatar;
      }
    } else {
      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      console.log("=======");
      loginUser(username, password).then((res) => {
        if (res) {
          getProfile(accessToken).then((res) => {
            if (res) {
              avatar.src = res.avatar;

              $("#avatar_main_2").attr("src", res.avatar);
            }
          });
        } else {
          window.location.href = "/login";
        }
      });
    }
  });
});
