document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const html = document.documentElement;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    const currentLanguage = localStorage.getItem('language') || 'ja';
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        html.classList.add('dark');
    }
    
    setLanguage(currentLanguage);
    
    themeToggle.addEventListener('click', function() {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    languageToggle.addEventListener('click', function() {
        const currentLang = localStorage.getItem('language') || 'ja';
        const newLang = currentLang === 'ja' ? 'en' : 'ja';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    });
    
    function setLanguage(lang) {
        const jaElements = document.querySelectorAll('.ja-content');
        const enElements = document.querySelectorAll('.en-content');
        
        if (lang === 'en') {
            jaElements.forEach(el => el.classList.add('hidden'));
            enElements.forEach(el => el.classList.remove('hidden'));
            languageToggle.textContent = '日本語';
        } else {
            jaElements.forEach(el => el.classList.remove('hidden'));
            enElements.forEach(el => el.classList.add('hidden'));
            languageToggle.textContent = 'EN';
        }
    }
    
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && message) {
                alert(currentLanguage === 'en' ? 'Thank you for your message! I will get back to you soon.' : 'メッセージをありがとうございます！近日中にご返信いたします。');
                this.reset();
            } else {
                alert(currentLanguage === 'en' ? 'Please fill in all fields.' : 'すべての項目を入力してください。');
            }
        });
    }
});