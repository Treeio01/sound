var avatar_1 = document.getElementById('avatar_1');
var avatar_2 = document.getElementById('avatar_2');
var avatar_3 = document.getElementById('avatar_3');

var photoPath = localStorage.getItem("photo")

if(avatar_1){
    avatar_1.src = photoPath;
}
if(avatar_2){
    avatar_2.src = photoPath;
}
if(avatar_3){
    avatar_3.src = photoPath;
}