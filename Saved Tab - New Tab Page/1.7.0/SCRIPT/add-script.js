document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = 'ADD.html';
});

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('ADD.html') || window.location.pathname.includes('NEW TAB.html')) {
        code(array_all, "Всё");
    }
});

console.log("ADD Page Script Loaded");
