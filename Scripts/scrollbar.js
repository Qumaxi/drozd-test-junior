// Ссылка на доступный для прокрутки элемент,
// если таковой имеется.
var currentScrollable;
// Проверка на необходимость прокрутки, при
// необходимости - обновление ссылки
// на доступный для прокрутки элемент.
function UpdateScrollable(scrollable) {
    if (scrollable.scrollHeight != scrollable.clientHeight) {
        currentScrollable = scrollable;
        currentScrollable.classList.add("text-border");
        slider.hidden = false;
    }
    else {
        slider.hidden = true;
        if (currentScrollable) {
            currentScrollable.classList.remove("text-border");
            currentScrollable = null;
        }
    }
}
// Действия при загрузке документа.
document.addEventListener(
"DOMContentLoaded", function(){
    var slider = document.getElementById("slider");
    var scrollbar = document.getElementById("scrollbar");
    // Изначально полоса прокрутки скрыта.
    slider.hidden = true;
    // Реализация перетаскивания полосы прокрутки.
    scrollbar.onmousedown = function(event) {
        // Не дадим выделить блок полосы прокрутки.
        event.preventDefault();
        // Стартовые метрики.
        var currentTop = scrollbar.getBoundingClientRect().top;
        var shiftY = event.clientY - currentTop;
        // Назначение обработчиков.
        document.addEventListener('mousemove', OnMouseMove);
        document.addEventListener('mouseup', OnMouseUp);
        // Обработчик перемещения мыши.
        function OnMouseMove(event) {
            var newTop = event.clientY - shiftY -
                slider.getBoundingClientRect().top;
            // Контроль границ, чтобы полоса
            // прокрутки не выехала из желобка.
            if (newTop < 0) newTop = 0;
            var bottomEdge = slider.offsetHeight
                - scrollbar.offsetHeight;
            if (newTop > bottomEdge) newTop = bottomEdge;
            // Установка нового положения полосы прокрутки
            // и нового положения прокручиваемого содержимого.
            scrollbar.style.top = newTop + 'px';
            if (currentScrollable) {
                currentScrollable
                    .scrollTop += newTop - currentTop;
            }
            currentTop = newTop;
        }
        // Действия по окончании процесса перетаскивания.
        function OnMouseUp() {
            document.removeEventListener('mouseup', OnMouseUp);
            document.removeEventListener('mousemove', OnMouseMove);
        }
    }
});