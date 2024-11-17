// Language Toggle Script
const toggleButton = document.getElementById('toggleLang');
const elementsToTranslate = document.querySelectorAll('[data-en]');

let currentLang = 'en';

toggleButton.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'fa' : 'en';
    toggleButton.textContent = currentLang === 'en' ? 'Switch to فارسی' : 'تغییر به English';
    
    elementsToTranslate.forEach(element => {
        element.textContent = element.getAttribute(`data-${currentLang}`);
    });

    // Update text direction for Persian
    document.body.style.direction = currentLang === 'fa' ? 'rtl' : 'ltr';
});
