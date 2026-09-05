document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        const button = document.querySelector('.theme-toggle');
        if (button) button.textContent = 'Modo Claro';
    }
    
    document.body.style.opacity = '1';
});

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const button = document.querySelector('.theme-toggle');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    if (button) {
        button.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
    }
}

// Animación para las barras de idiomas (si aplica)
const languageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.dataset.level;
        }
    });
});

document.querySelectorAll('.bar-fill').forEach(bar => {
    languageObserver.observe(bar);
});