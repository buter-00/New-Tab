document.getElementById('backButton').onclick = function(event) {
    event.preventDefault(); // Предотвращаем стандартное действие ссылки
    const previousPage = sessionStorage.getItem('previousPage'); // Получаем предыдущую страницу из sessionStorage
    window.location.href = previousPage || 'new tab page.html'; // Переходим на предыдущую страницу или на popup.html, если предыдущая страница не найдена
};
