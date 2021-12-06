// Используемые сокращения языков.
const languages = ["US","Nl","Бр","Ру","Кз","Tü"];
// Количество используемых сокращений.
const langs_num = languages.length;
// Строковые ресурсы с переводами
// текстов на используемые языки.
const resources = {
    "Контакты": ["Contacts","Contacten","Кантакты",
                "Контакты","Контактілер","Kişiler"],
    "Поиск":    ["Search","Zoekactie","Пошукі",
                "Поиск","Iзденіс","Arama"],
    "Услуги":   ["Services","Diensten","Паслугі",
                "Услуги","Қызметтер","Hizmetler"],
    "ОбслИС":   ["Managed IT","Beheerde IT","Кіраваныя IT",
        "Обслуживание ИС","Басқарылатын АТ","Yönetilen BT"],
    "Телеком":  ["Telecom Solutions","Telecom-oplossingen",
        "Тэлекамуныя рашэнні","Телекоммуникационные решения",
        "Телекомялық шешімдер","Telekom Çözümleri"],
    "Мы":       ["About Us","Over ons","Пра нас",
                "О нас","Біз туралы","Hakkımızda"],
    "Облако":   ["Cloud computing","Cloud computing",
        "Воблачныя вылічэнні","Облачные вычисления",
        "Бұлтты есептеу","Bulut bilişim"],
    "Серверы":  ["Dedicated servers","Toegewijde servers",
        "Выдзеленыя серверы","Выделенные серверы",
        "Арнайы серверлер","Özel sunucular"],
    "Сервисы":  ["Platform services","Platformdiensten",
        "Паслугі платформы","Платформенные сервисы",
        "Платформа қызметтері","Platform hizmetleri"],
    "Безопасность": [
        "Information security","Informatiebeveiliging",
        "Інфармацыйная бяспека","Информационная безопасность",
        "Ақпараттық қауіпсіздік","Bilgi Güvenliği"],
    "Консультирование": [
        "Cloud consulting","Cloud-advies","Хмарны кансалтынг",
        "Консультирование по облачным сервисам",
        "Бұлттық консалтинг","Bulut danışmanlığı"],
    "Инфраструктура": [
        "Cloud infrastructure analytics",
        "Analyse van cloudinfrastructuur",
        "Аналітыка воблачнай інфраструктуры",
        "Анализ облачной инфраструктуры",
        "Бұлтты инфрақұрылымды талдау",
        "Bulut altyapısı analitiği"],
    "Гибрид":   ["Hybrid Cloud","Hybride cloud",
                "Гібрыднае хмарь","Гибридное облако",
                "Гибридті бұлт","Hibrit Bulut"],
    "Мультиоблако": ["Multicloud","Multicloud",
        "Мультывоблака","Мультиоблако",
        "Көпбұлт","çoklu bulut"],
    "Реляции": [
        "Relational database services for MySQL, PostgreSQL, and SQL Server.",
        "Relationele databaseservices voor MySQL, PostgreSQL en SQL-server.",
        "Службы рэляцыйных баз дадзеных для MySQL, PostgreSQL і SQL Server.",
        "Сервисы реляционных баз данных для MySQL, PostgreSQL и SQL Server.",
        "MySQL, PostgreSQL және SQL серверіне арналған реляциялық дерекқор қызметтері.",
        "MySQL, PostgreSQL ve SQL Server için ilişkisel veritabanı hizmetleri."],
    "Оздоровление": [
        "Health-specific solutions to enhance the patient experience.",
        "Gezondheidsspecifieke oplossingen om de patiëntervaring te verbeteren.",
        "Спецыфічныя для здароўя рашэнні для паляпшэння вопыту пацыента.",
        "Ориентированные на здоровье информационной системы решения, повышающие качество обслуживания потребителей.",
        "Науқас тәжірибесін жақсарту үшін денсаулыққа қатысты шешімдер.",
        "Hasta deneyimini geliştirmek için sağlığa özel çözümler."],
    "Правительству": [
        "Data storage, AI, and analytics solutions for government agencies.",
        "Oplossingen voor gegevensopslag, AI en analyse voor overheidsinstanties.",
        "Рашэнні для захоўвання даных, AI і аналітыкі для дзяржаўных устаноў.",
        "Решения для хранения данных, ИИ и аналитики для государственных учреждений.",
        "Мемлекеттік органдарға арналған деректерді сақтау, AI және аналитикалық шешімдер.",
        "Devlet kurumları için veri depolama, yapay zeka ve analitik çözümleri."],
    "Тестирование": ["Testing","Testen","Тэставанне",
    "Тестирование","Тестілеу","Deneme"]
}
// Дерево пунктов меню.
const tree = {
    "Услуги": {
        "Облако": {
            "Консультирование": "Реляции",
            "Инфраструктура": "Оздоровление",
            "Гибрид": "Правительству",
            "Мультиоблако": "Реляции",
            "Контакты": "Правительству",
            "Поиск": "Оздоровление"
        },
        "Серверы": null,
        "Сервисы": null,
        "Безопасность": null
    },
    "ОбслИС": {
        "Тестирование": null
    },
    "Телеком": null,
    "Мы": null
}
// Переменные, используемые для хранения
// предыдущего состояния меню.
var rollbackState;
var rollbackInfoA1, rollbackInfoA2;
var rollbackInfoB1, rollbackInfoB2, rollbackInfoB3;
rollbackState = 0;
rollbackInfoA1 = [];
rollbackInfoA2 = null;
rollbackInfoB1 = [];
rollbackInfoB2 = null;
rollbackInfoB3 = null;
// Функция поиска в глубину.
function DFS(node, identifier) {
    if (node === null) return null;
    if (typeof node != "object") return null;
    if (identifier in node) return node[identifier];
    for (let child in node) {
        let result = DFS(node[child], identifier);
        if (result != null) return result;
    }
    return null;
}
// Создание пункта меню (первые два уровня).
function CreateOption(identifier, arrows) {
    var div, child, localization;
    var abbr, coded_abbr, translations;
    div = document.createElement("div");
    child = document.createElement("div");
    coded_abbr = document
        .getElementById("lang")
        .firstElementChild
        .nextElementSibling.textContent.trim();
    translations = resources[identifier];
    for (let i = 0; i < langs_num; i++) {
        abbr = languages[i];
        localization = document.createElement("div");
        localization.setAttribute("data-lang", abbr);
        localization.innerHTML = translations[i];
        if (abbr != coded_abbr)
            localization.hidden = true;
        child.append(localization);
    }
    div.append(child);
    var dfs = DFS(tree, identifier);
    if (arrows && (dfs != null)) {
        child = document.createElement("img");
        child.className = "arrow";
        child.src = "Images/Arrows/right.svg";
        child.alt = ">";
        div.append(child);
    }
    return div;
}
// Создание пункта меню (третий уровень).
function CreateOptionWithDescription(identifier) {
    var div, heading, description, coded_abbr, localization;
    var headingTranslations, descriptionTranslations, abbr;
    div = document.createElement("div");
    heading = document.createElement("div");
    description = document.createElement("div");
    coded_abbr = document
        .getElementById("lang")
        .firstElementChild
        .nextElementSibling.textContent.trim();
    headingTranslations = resources[identifier];
    descriptionTranslations = resources[DFS(tree, identifier)];
    for (let i = 0; i < langs_num; i++) {
        abbr = languages[i];
        localization = document.createElement("div");
        localization.setAttribute("data-lang", abbr);
        localization.innerHTML = headingTranslations[i];
        if (abbr != coded_abbr) localization.hidden = true;
        heading.append(localization);
        localization = document.createElement("div");
        localization.setAttribute("data-lang", abbr);
        localization.innerHTML = descriptionTranslations[i];
        if (abbr != coded_abbr) localization.hidden = true;
        description.append(localization);
    }
    heading.className = "heading";
    div.append(heading);
    description.className = "description";
    div.append(description);
    return div;
}
// Действия при загрузке документа.
document.addEventListener(
"DOMContentLoaded", function(){
    var main_options_extras, main_options;
    var chosen_option, sub_options, last_options;
    // Запомним ссылки на ключевые элементы.
    main_options_extras =
        document.getElementById("main-options-extras");
    main_options = document.getElementById("main-options");
    chosen_option = document.getElementById("chosen-option");
    sub_options = document.getElementById("sub-options");
    sub_options.hidden = true;
    last_options = document.getElementById("last-options");
    last_options.hidden = true;
    // Заполним пункты меню.
    for (let title in tree) {
        let src = CreateOption(title, true);
        main_options.append(src);
        let des = CreateOption(title, false);
        des.hidden = true;
        chosen_option.append(des);
        let children = DFS(tree, title);
        let divs = [];
        function Make(theDivs){
            var copy = [];
            for (let i = 0; i < theDivs.length; i++)
                copy[i] = theDivs[i];
            return (function (){
                main_options_extras.style.display = "none";
                des.hidden = false;
                rollbackInfoA2 = des;
                for (let i = 0; i < copy.length; i++) {
                    copy[i].style.display = "flex";
                    rollbackInfoA1.push(copy[i]);
                }
                chosen_option.style.display = "flex";
                sub_options.hidden = false;
                rollbackState = 1;
                UpdateScrollable(sub_options);
            })
        }
        if (children != null) {
            for (let child in children) {
                let src2 = CreateOption(child, true);
                src2.style.display = "none";
                sub_options.append(src2);
                divs.push(src2);
                let des2 = CreateOption(child, false);
                des2.hidden = true;
                chosen_option.append(des2);
                let children2 = DFS(tree, child);
                let divs2 = [];
                function Make2(otherDivs) {
                    var copy = [];
                    for (let i = 0; i < otherDivs.length; i++)
                        copy[i] = otherDivs[i];
                    return (function (){
                        sub_options.hidden = true;
                        des.hidden = true;
                        rollbackInfoB3 = des;
                        des2.hidden = false;
                        rollbackInfoB2 = des2;
                        for (let i = 0; i < copy.length; i++) {
                            copy[i].hidden = false;
                            rollbackInfoB1.push(copy[i]);
                        }
                        last_options.hidden = false;
                        rollbackState = 2;
                        UpdateScrollable(last_options);
                    })
                }
                if (children2 != null) {
                    for (let child2 in children2) {
                        let div = CreateOptionWithDescription(child2);
                        div.hidden = true;
                        last_options.append(div);
                        divs2.push(div);
                    }
                    src2.addEventListener("click", Make2(divs2));
                    src2.classList.add("option-link");
                }
            }
            src.addEventListener("click", Make(divs));
            src.classList.add("option-link");
        }
    }
    extras.append(CreateOption("Контакты", false));
    extras.append(CreateOption("Поиск", false));
    // Событие для возврата ко предыдущему списку.
    chosen_option.addEventListener("click", function(){
        var div;
        if (rollbackState == 1) {
            sub_options.hidden = true;
            chosen_option.style.display = "none";
            while (div = rollbackInfoA1.pop()) div.style.display = "none";
            rollbackInfoA2.hidden = true;
            main_options_extras.style.display = "flex";
            rollbackState = 0;
        }
        else if (rollbackState == 2) {
            last_options.hidden = true;
            while (div = rollbackInfoB1.pop()) div.hidden = true;
            rollbackInfoB2.hidden = true;
            rollbackInfoB3.hidden = false;
            sub_options.hidden = false;
            rollbackState = 1;
            UpdateScrollable(sub_options);
        }
    });
});