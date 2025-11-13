import './styles/main.css';
import { initConverter } from './components/converter.js';
import { initReducer } from './components/reducer.js';

// راه‌اندازی برنامه
document.addEventListener('DOMContentLoaded', () => {
    console.log('🧠 Tetra 3D Advanced Starting...');
    
    // مقداردهی اولیه کامپوننت‌ها
    initConverter();
    initReducer();
    
    // مدیریت نویگیشن
    setupNavigation();
});

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// توابع utility
export const utils = {
    formatNumber: (num) => {
        return new Intl.NumberFormat('fa-IR').format(num);
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
