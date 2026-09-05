        document.addEventListener('DOMContentLoaded', () => {
            const savedDarkMode = localStorage.getItem('darkMode') === 'true';
            if(savedDarkMode) {
                document.body.classList.add('dark-mode');
                document.querySelector('.theme-toggle').textContent = 'Modo Claro';
            }
            
            // Animación inicial
            document.body.style.opacity = '1';
        });
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            const button = document.querySelector('.theme-toggle');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            button.textContent = isDarkMode 
                ? 'Modo Claro' 
                : 'Modo Oscuro';
        }

        // Animación suave al cargar
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });

        // Efecto de aparición al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.section').forEach((section) => {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.5s ease-out';
            observer.observe(section);
        });
        // Animación para las barras de idiomas
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