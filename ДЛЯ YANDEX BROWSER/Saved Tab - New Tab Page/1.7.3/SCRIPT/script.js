// Блок отрисовки вкладок
var cluster = document.getElementsByClassName("cluster")[0];
var featuredTitle = document.querySelector(".featured-title span");

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
                <a class="card" id="card" href="${url}" target="${target}" data-category="${categoryName}">
                    <div class="icon" style="background-image: url(IMG/${item.ICON})"></div>
                    <div class="name-container">
                        <div class="name">${item.NAME.replace("//", "")}</div>
                        <div class="category">${categoryName}</div>
                    </div>
                </a>`;
        }
    });

    updateHeaderTitle(categoryName.toUpperCase());
    addCardEventListeners(); // Добавляем обработчики событий для новых ссылок
}

function updateHeaderTitle(title) {
    if (featuredTitle) {
        featuredTitle.textContent = title;
    }
}

function addCardEventListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.addEventListener('click', function(event) {
            sessionStorage.setItem('previousPage', window.location.href);
        });
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
            toggleClusterVisibility(true); // Показываем cluster после выбора категории
            hideDropdown(); // Скрываем dropdown после выбора категории
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
    const header = document.querySelector('.header');
    const dropdown = document.querySelector('.dropdown');

    if (header && dropdown) {
        header.addEventListener('mouseenter', function() {
            dropdown.style.display = 'block'; // Показываем dropdown при наведении на header
            toggleClusterVisibility(false); // Скрываем cluster при наведении на header
        });

        dropdown.addEventListener('mouseleave', function() {
            dropdown.style.display = 'none'; // Скрываем dropdown при уходе курсора с header
            toggleClusterVisibility(true); // Показываем cluster при уходе курсора с dropdown
        });
    }
});

function toggleClusterVisibility(show) {
    const cluster = document.querySelector('.cluster.wrapper');
    if (cluster) {
        cluster.style.display = show ? 'flex' : 'none';
    }
}

function hideDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
}

// Вывод времени полной отрисовки страницы
var loadTime = (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) / 1000;
loadTime = loadTime.toFixed(3);
console.log("Время загрузки:", loadTime, "сек");

// Динамическое обновление версии из manifest.json
fetch(chrome.runtime.getURL('manifest.json'))
    .then(response => response.json())
    .then(data => {
        document.getElementById('version').textContent = 'version: ' + data.version;
    })
    .catch(error => console.error('Error fetching manifest:', error));
