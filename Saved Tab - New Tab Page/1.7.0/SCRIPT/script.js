// блок отрисовки вкладок
var cluster = document.getElementsByClassName("cluster")[0];

// загружаемая категория вкладок по умолчанию
code(array_all, "Всё");

// отрисовка категорий вкладок
function code(category, categoryName) {
    // очистка страницы
    cluster.innerHTML = '';

    for (var n = 0; n < category.length; n++) {
        if (category[n].NAME != "" && category[n].ICON != "") {
            var url = category[n].NAME.includes("//") ? "404 error.html" : category[n].URL; // Проверка на //
            cluster.innerHTML += `
                <a class="card" id="card" href="${url}" target="_blank" data-category="${categoryName}">
                    <div class="icon" style="background-image: url(IMG/${category[n].ICON})"></div>
                    <div class="name-container">
                        <div class="name">${category[n].NAME.replace("//", "")}</div> <!-- Убираем // из названия -->
                        <div class="category">${categoryName}</div>
                    </div>
                </a>`;
        }
    }
}

// добавим кнопки с событиями
document.getElementById('allButton').addEventListener('click', function() {
    code(array_all, "Всё");
});

document.getElementById('codeButton').addEventListener('click', function() {
    code(array_code, "Программирование");
});

document.getElementById('programButton').addEventListener('click', function() {
    code(array_program, "Программы");
});

document.getElementById('extensionsButton').addEventListener('click', function() {
    code(array_extensions, "Расширения");
});

document.getElementById('addSite').addEventListener('click', function() {
    window.location.href = '404 error.html'; // Добавлено открытие страницы 404 при клике на ADD сайт
});

window.onload = function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const observer = new MutationObserver(function() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            dropdowns.forEach(dropdown => {
                dropdown.style.backgroundColor = 'rgba(32, 32, 32, 0.0)';
            });
        } else {
            dropdowns.forEach(dropdown => {
                dropdown.style.backgroundColor = 'rgba(255, 255, 255, 0.0)';
            });
        }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});

// вывод времени полной отрисовки страницы
var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
loadTime = loadTime / 1000; // converting from milliseconds to seconds
loadTime = loadTime.toFixed(3);
console.log("Время загрузки:", loadTime, "сек");
