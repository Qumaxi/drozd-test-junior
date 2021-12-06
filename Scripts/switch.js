document.addEventListener(
"DOMContentLoaded", function(){
    // При нажатии на кнопку открытия меню
    // выводим меню на передний план.
    document.getElementById("run")
    .addEventListener("click", function(){
    document.getElementById("menu").style.zIndex = 1 });
    // При нажатии на кнопку закрытия меню
    // убираем меню назад, за пределы видимости.
    document.getElementById("close")
    .addEventListener("click", function(){
    document.getElementById("menu").style.zIndex = -1 });
});