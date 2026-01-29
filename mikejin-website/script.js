// ===================================
// MIKEJIN WEBSITE - JAVASCRIPT
// Interactive Features & Animations
// ===================================

// === TRANSLATIONS ===
const translations = {
    'en': {
        'started': "GET STARTED",
        'scroll': "SCROLL",
        'nav-beats': "BEATS",
        'nav-gallery': "GALLERY",
        'nav-store': "STORE",
        'nav-shows': "SHOWS",
        'nav-signup': "SIGN UP",
        'listen-yt': "LISTEN ON\nYOUTUBE",
        'listen-bs': "LISTEN ON\nBEATSTARS",
        'view': "view", // Usually symbols or universal, but can be translated
        'drumkit-title': "DOPAMINA DRUMKIT\n(ALL SOUNDS)",
        'soon': "soon...",
        'buy-now': "BUY NOW",
        'footer-terms': "Terms and Conditions",
        'footer-privacy': "Privacy Policy",
        'modal-desc': "Get notified about new releases, tour dates, and exclusive content",
        'subscribe': "Subscribe",
        // Placeholders (handled separately in JS)
        'email-ph': "Email Address *",
        'fname-ph': "First Name",
        'lname-ph': "Last Name",
        'phone-ph': "Phone Number",
        'country-ph': "Country",
        'beats-hero': "High Quality Beats for Artists", // If you add a hero text later
        'email-domain-error': "We only accept emails from secure providers (Gmail, Outlook, iCloud, Yahoo, Proton)."
    },
    'pt': {
        'started': "ENTRAR",
        'scroll': "SCROLL",
        'nav-beats': "BEATS",
        'nav-gallery': "GALERIA",
        'nav-store': "LOJA",
        'nav-shows': "SHOWS",
        'nav-signup': "INSCREVER",
        'listen-yt': "OUVIR NO\nYOUTUBE",
        'listen-bs': "OUVIR NA\nBEATSTARS",
        'view': "ver",
        'drumkit-title': "DOPAMINA DRUMKIT\n(TODOS OS SONS)",
        'soon': "brevemente...",
        'buy-now': "COMPRAR",
        'footer-terms': "Termos e Condições",
        'footer-privacy': "Política de Privacidade",
        'modal-desc': "Receba notificações sobre lançamentos, datas de shows e conteúdo exclusivo",
        'subscribe': "Subscrever",
        // Placeholders
        'email-ph': "Endereço de Email *",
        'fname-ph': "Primeiro Nome",
        'lname-ph': "Último Nome",
        'phone-ph': "Número de Telefone",
        'country-ph': "País",
        'beats-hero': "Beats de Alta Qualidade para Artistas",
        'email-domain-error': "Apenas aceitamos emails de provedores seguros (Gmail, Outlook, iCloud, Yahoo, Proton)."
    }
};

// === LANGUAGE FUNCTIONS ===
function changeLanguage(lang) {
    // 1. Update Text Content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Handle line breaks encoded as \n
            el.innerText = translations[lang][key].replace(/\\n/g, '\n');
        }
    });

    // 2. Update Placeholders
    const inputs = document.querySelectorAll('[data-placeholder]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-placeholder');
        if (translations[lang] && translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });

    // 3. Save Preference
    localStorage.setItem('mikejin_lang', lang);

    // 4. Toggle Content Blocks (for Terms/Privacy pages)
    const enBlocks = document.querySelectorAll('.lang-en');
    const ptBlocks = document.querySelectorAll('.lang-pt');

    if (lang === 'en') {
        enBlocks.forEach(el => el.style.display = 'block');
        ptBlocks.forEach(el => el.style.display = 'none');
    } else {
        enBlocks.forEach(el => el.style.display = 'none');
        ptBlocks.forEach(el => el.style.display = 'block');
    }

    // 5. Update Visual State of Buttons (Optional)
    /* document.querySelectorAll('.lang-btn').forEach(btn => {
         if(btn.getAttribute('onclick').includes(lang)) btn.classList.add('active');
         else btn.classList.remove('active');
    }); */
}

// Initialize Language
const savedLang = localStorage.getItem('mikejin_lang') || 'en';
// We need to wait for DOM to load for elements to exist, but script is at bottom so it's fine.
// However, sticking to DOMContentLoaded is safer.

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // === HAMBURGER MENU ===
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    // INITIALIZE LANGUAGE
    // 1. Check LocalStorage
    // 2. If empty, check Navigator Language
    // 3. Default to English

    // This runs after DOMContentLoaded, so changeLanguage is safe to call

    if (!localStorage.getItem('mikejin_lang')) {
        // No saved preference, detect browser language
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang && userLang.toLowerCase().startsWith('pt')) {
            changeLanguage('pt');
        } else {
            changeLanguage('en');
        }
    } else {
        // Use saved preference
        changeLanguage(savedLang);
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');

            // Animate Links
            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // === SMOOTH SCROLLING ===
    const navLinks = document.querySelectorAll('.sidebar a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu on clicking a link
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
                navLinksItems.forEach(link => {
                    link.style.animation = '';
                });
            }

            const targetId = this.getAttribute('href');

            if (targetId === '#signup') {
                openModal();
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // === MODAL FUNCTIONALITY ===
    const modal = document.getElementById('signup-modal');
    const modalClose = document.querySelector('.modal-close');
    const signupTriggers = document.querySelectorAll('.signup-trigger, .get-started-btn');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    signupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            if (this.classList.contains('get-started-btn')) {
                this.style.display = 'none';
                const overlay = document.getElementById('intro-overlay');
                if (overlay) {
                    overlay.classList.add('hidden');
                }
            } else {
                openModal();
            }
        });
    });

    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // === FORM SUBMISSION ===
    const signupForm = document.querySelector('.signup-form');

    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailInput = signupForm.querySelector('input[name="email"]');
        const emailError = document.getElementById('email-error');
        const emailValue = emailInput.value.trim().toLowerCase();

        // Approved Domains List
        const allowedDomains = [
            'gmail.com', 'googlemail.com',
            'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
            'icloud.com', 'me.com', 'mac.com',
            'yahoo.com', 'yahoo.com.br',
            'proton.me', 'protonmail.com'
        ];

        // Check if email domain is valid
        const domain = emailValue.split('@')[1];
        const isValidDomain = allowedDomains.includes(domain);

        if (!isValidDomain) {
            const currentLang = localStorage.getItem('mikejin_lang') || 'en';
            emailError.innerText = translations[currentLang]['email-domain-error'];
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#ff4444';
            emailInput.focus();
            return; // Stop submission
        }

        // Reset error state if valid
        emailError.style.display = 'none';
        emailInput.style.borderColor = '';

        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData.entries());

        // Supabase Anon Key (Public Key)
        const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmlnemZtZmlyaGd4dm5wYWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTk5MjUsImV4cCI6MjA4NTI3NTkyNX0.T4pozjkyKIxqug6oS7VmkcwACpui7gfR_WedlcSGJWI";

        try {
            const response = await fetch('https://pbrigzfmfirhgxvnpale.supabase.co/functions/v1/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                showFeedbackModal(true);
                signupForm.reset();
            } else {
                console.error('Error:', result);
                showFeedbackModal(false);
            }
        } catch (error) {
            console.error('Error:', error);
            showFeedbackModal(false);
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // === FEEDBACK MODAL LOGIC ===
    const feedbackModal = document.getElementById('feedback-modal');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackOkBtn = document.getElementById('feedback-ok-btn');
    let isSuccessState = false;

    function showFeedbackModal(success) {
        isSuccessState = success;
        feedbackModal.classList.add('active');

        if (success) {
            feedbackTitle.innerText = "✅ thanks!! updates coming soon!!**";
            // feedbackTitle.style.color = "#FFD700"; // Optional: Gold for success? user didn't specify color but emoji handles it
        } else {
            feedbackTitle.innerText = "❌ something went wrong... please try again...";
            // feedbackTitle.style.color = "#ff4444"; // Optional: Red for error?
        }
    }

    feedbackOkBtn.addEventListener('click', function () {
        feedbackModal.classList.remove('active');

        if (isSuccessState) {
            // If success, close the main Signup modal too
            closeModal();
        } else {
            // If error, keep Signup modal open so user can retry
            // Do nothing, main modal stays open underneath
        }
    });

    // === PRODUCT CAROUSEL ===
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const productCards = document.querySelectorAll('.product-card');

    let currentIndex = 0;
    const totalProducts = productCards.length;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + totalProducts) % totalProducts;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % totalProducts;
        updateCarousel();
    });

    // Auto-advance carousel every 5 seconds
    setInterval(function () {
        currentIndex = (currentIndex + 1) % totalProducts;
        updateCarousel();
    }, 5000);

    // === SIZE SELECTOR ===
    const sizeButtons = document.querySelectorAll('.size-btn');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from siblings
            const siblings = this.parentElement.querySelectorAll('.size-btn');
            siblings.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');
        });
    });

    // === VIDEO OVERLAY INTERACTION ===
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    videoWrappers.forEach(wrapper => {
        const overlay = wrapper.querySelector('.video-overlay');
        const iframe = wrapper.querySelector('iframe');

        wrapper.addEventListener('click', function () {
            // Hide overlay when clicked
            if (overlay) {
                overlay.style.display = 'none';
            }

            // Auto-play video (if YouTube API is available)
            // This is a basic implementation
            const src = iframe.getAttribute('src');
            if (src.indexOf('?') > -1) {
                iframe.setAttribute('src', src + '&autoplay=1');
            } else {
                iframe.setAttribute('src', src + '?autoplay=1');
            }
        });
    });

    // === ACTIVE NAVIGATION HIGHLIGHTING ===
    const sections = document.querySelectorAll('.section');

    function highlightNavigation() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // === SCROLL INDICATOR CLICK ===
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');

    scrollIndicators.forEach(indicator => {
        indicator.addEventListener('click', function () {
            const currentSection = this.closest('.section');
            const nextSection = currentSection.nextElementSibling;

            if (nextSection && nextSection.classList.contains('section')) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === ENHANCED TV STATIC EFFECT ===
    const tvStatic = document.querySelector('.tv-static');

    // Add random glitch effect occasionally
    setInterval(function () {
        if (Math.random() > 0.95) {
            tvStatic.style.opacity = '0.15';
            setTimeout(function () {
                tvStatic.style.opacity = '0.08';
            }, 100);
        }
    }, 1000);

    // === PLATFORM LINKS TRACKING ===
    const platformLinks = document.querySelectorAll('.platform-link, .beat-column');

    platformLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const platform = (this.querySelector('span') || this.querySelector('.beat-label')).textContent;
            console.log(`User clicked: ${platform}`);
            // Here you could send analytics data
        });
    });

    // === KEYBOARD NAVIGATION ===
    document.addEventListener('keydown', function (e) {
        // Arrow keys for carousel
        if (e.key === 'ArrowLeft') {
            const storeSection = document.querySelector('#store');
            if (isInViewport(storeSection)) {
                prevBtn.click();
            }
        } else if (e.key === 'ArrowRight') {
            const storeSection = document.querySelector('#store');
            if (isInViewport(storeSection)) {
                nextBtn.click();
            }
        }
    });

    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // === PRELOAD IMAGES ===
    // Preload any images that might be needed
    const imagesToPreload = [
        // Add any image URLs here
    ];

    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // === PERFORMANCE OPTIMIZATION ===
    // Lazy load videos when they come into view
    const lazyVideos = document.querySelectorAll('.video-wrapper iframe');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                const src = iframe.getAttribute('data-src');
                if (src) {
                    iframe.setAttribute('src', src);
                    iframe.removeAttribute('data-src');
                }
                videoObserver.unobserve(iframe);
            }
        });
    });

    lazyVideos.forEach(video => {
        videoObserver.observe(video);
    });

    // === CONSOLE EASTER EGG ===
    console.log('%c🎵 MIKEJIN OFFICIAL WEBSITE 🎵', 'font-size: 20px; font-weight: bold; color: #FFD700;');
    console.log('%cBuilt with love and TV static ⚡', 'font-size: 14px; color: #fff;');

    // === VISUAL GLITCH EFFECT ON HOVER ===
    // (Previous glitch code if any or just empty)
});

// === ADDITIONAL UTILITY FUNCTIONS ===

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
