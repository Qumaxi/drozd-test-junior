document.addEventListener(
"DOMContentLoaded", function(){
    var menu, lang, flag, abbr, dropdown;
    // Запомним ссылки на ключевые элементы.
    menu = document.getElementById("menu");
    lang = document.getElementById("lang");
    flag = lang.firstElementChild;
    abbr = flag.nextElementSibling;
    dropdown =
        document.getElementById("lang-dropdown");
    // Защита от непредусмотренного всплытия события.
    dropdown.addEventListener("click",
        function(evt) {evt.stopPropagation()});
    // Обработчик для кнопки выбора языка.
    function lang_click_handler(evt) {
        lang.removeEventListener(
            "click", lang_click_handler);
        evt.stopPropagation();
        menu.addEventListener(
            "click", hide_dropdown);
        // Придадим кнопке выбора языка вид,
        // соответствующий активному состоянию.
        lang.className = "lang-active";
        // Выведем выпадающий список для выбора
        // языка на передний план.
        dropdown.style.display = "block";
    }
    function hide_dropdown() {
        menu.removeEventListener(
            "click", hide_dropdown);
        dropdown.style.display = "none";
        lang.className = "lang-unactive";
        lang.addEventListener(
            "click", lang_click_handler);
    }
    lang.addEventListener(
        "click", lang_click_handler);
    // На каждый неактивный пункт списка
    // выбора языка повесим обработчик,
    // позволяющий сменить текущий язык.
    function option_click_handler(evt) {   
        var current_option = evt.currentTarget;
        var active_option = dropdown.querySelector(
            ".dropdown-option-active")
        current_option.removeEventListener(
            "click", option_click_handler);
        current_option.className =
            "dropdown-option-active";
        active_option.className =
            "dropdown-option-unactive"
        active_option.addEventListener(
            "click", option_click_handler);
        var old_abbr = abbr.innerHTML;
        var new_abbr = current_option.dataset.abbr;
        var option_image =
            current_option.querySelector(
                "div > img.flag-small")
        // Приводим вид кнопки выбора языка
        // в соответствие с выбранным пунктом.
        // 1) установили флаг.
        flag.src = option_image.src;
        // 2) сменили подсказку к изображению.
        flag.alt = flag.title =
            option_image.dataset.flag;
        // 3) сменили сокращение названия языка.
        abbr.innerHTML = new_abbr;
        // Проводим смену языка меню.
        for (let localization
                of menu.querySelectorAll("[data-lang]"))
            if (localization.dataset.lang == old_abbr)
                localization.hidden = true;
            else if (localization.dataset.lang == new_abbr)
                localization.hidden = false;
        // Закрываем список выбора языка.
        hide_dropdown();
    }
    for (let dropdown_option
            of dropdown.querySelectorAll(
                ".dropdown-option-unactive"))
        dropdown_option.addEventListener(
            "click", option_click_handler);
});