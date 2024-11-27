// Блок отрисовки вкладок
var cluster = document.getElementsByClassName("cluster")[0];

// Загружаемая категория вкладок по умолчанию
code(array_all, "Всё");

// Отрисовка категорий вкладок
function code(category, categoryName) {
    cluster.innerHTML = '';

    category.forEach(function(item) {
        if (item.NAME && item.ICON) {
            var url = item.NAME.includes("//") ? "404 error.html" : item.URL;
            var target = item.NAME.includes("//") ? "_self" : "_blank";

            // Сохранение текущей страницы в sessionStorage перед переходом
            cluster.innerHTML += `
                <a class="card" id="card" href="${url}" target="${target}" data-category="${categoryName}" onclick="sessionStorage.setItem('previousPage', window.location.href)">
                    <div class="icon" style="background-image: url(IMG/${item.ICON})"></div>
                    <div class="name-container">
                        <div class="name">${item.NAME.replace("//", "")}</div>
                        <div class="category">${categoryName}</div>
                    </div>
                </a>`;
        }
    });
}

// Добавим кнопки с событиями
function addButtonEvent(buttonId, category, categoryName) {
    document.getElementById(buttonId).addEventListener('click', function() {
        if (categoryName.includes("//")) {
            sessionStorage.setItem('previousPage', window.location.href);
            window.location.href = '404 error.html';
        } else {
            code(category, categoryName.replace("//", ""));
        }
    });
}

addButtonEvent('allButton', array_all, "Всё");
addButtonEvent('codeButton', array_code, "Программирование");
addButtonEvent('programButton', array_program, "Программы");
addButtonEvent('extensionsButton', array_extensions, "Расширения");
addButtonEvent('antivirusesButton', array_antiviruses, "Антивирусы");
addButtonEvent('androidButton', array_android, "Android");
addButtonEvent('addSite', [], "//ADD сайт//");

window.onload = function() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const observer = new MutationObserver(function() {
        dropdowns.forEach(dropdown => {
            dropdown.style.backgroundColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'rgba(32, 32, 32, 0.0)' : 'rgba(255, 255, 255, 0.0)';
        });
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});

// Вывод времени полной отрисовки страницы
var loadTime = (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) / 1000;
loadTime = loadTime.toFixed(3);
console.log("Время загрузки:", loadTime, "сек");
