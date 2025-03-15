function showLoadingAnimation(container) {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-heart"></div>';
    container.appendChild(loader);
}

function removeLoadingAnimation(container) {
    const loader = container.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

const galleryData = { //upload the images here
    commissions: [
        { id: 1, src: './assets/coms2.webp', title: 'Sirstinkers' },
        { id: 2, src: './assets/comm2.png', title: 'RedSasha01' },
        { id: 3, src: './assets/comm3.webp', title: 'Edvariron' },
        { id: 4, src: './assets/comm4.png', title: 'Sylven' },
        { id: 5, src: './assets/comm5.png', title: 'FidelMar41' },
        { id: 6, src: './assets/comm6.webp', title: 'Alec' },
        { id: 7, src: './assets/comm7.png', title: 'AcceptableMarty' },
        { id: 8, src: './assets/comm8.png', title: 'Kez' },
        { id: 9, src: './assets/comm9.png', title: 'Faczki' },
        { id: 10, src: './assets/comm10.webp', title: 'q3mi' },
        { id: 11, src: './assets/comm11.png', title: 'Mechanical Matthew' },
        { id: 13, src: './assets/pab.png', title: 'LanTy' },
        { id: 14, src: './assets/vex.png', title: 'Vex' },
        { id: 15, src: './assets/comm13.png', title: 'Dark' },
        { id: 15, src: './assets/srfrogsen.png', title: 'SrFrogSen' },
        { id: 15, src: './assets/Untitled_-_March_13_2025_20.13.png', title: 'Luger' }
    ],
    cute: [
        { id: 3, src: './assets/furry.png', title: 'Muffin' },
        { id: 4, src: './assets/furry2.png', title: 'Protogen' }
    ],
    couples: [
        { id: 5, src: './assets/couple1.jpg', title: 'Sinny & Rollback' },
        { id: 6, src: './assets/couple2.png', title: 'Missus & Dark' },
        { id: 7, src: './assets/image_2025-03-14_235128811.png', title: 'Sinny&Rollback' } 
    ],
};

const galleryGrid = document.querySelector('.gallery-grid');

function createGalleryItems() {
    Object.entries(galleryData).forEach(([category, items]) => {
        const gridContainer = document.querySelector(`.${category}-grid`);
        if (gridContainer) {
            showLoadingAnimation(gridContainer);
            
            items.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                const img = new Image();
                img.src = item.src;
                
                img.onload = function() {
                    galleryItem.innerHTML = `
                        <img src="${item.src}" alt="${item.title}" loading="lazy">
                        <div class="item-overlay">
                            <h3>${item.title}</h3>
                        </div>
                    `;
                    
                    galleryItem.addEventListener('click', () => showLightbox(item));
                    gridContainer.appendChild(galleryItem);
                    
                    if (gridContainer.children.length === items.length + 1) {
                        removeLoadingAnimation(gridContainer);
                    }
                };
                
                img.onerror = function() {
                    console.error(`Failed to load image: ${item.src}`);
                    if (gridContainer.children.length === items.length) {
                        removeLoadingAnimation(gridContainer);
                    }
                };
            });
        }
    });
}

function showLightbox(item) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const img = new Image();
    img.src = item.src;
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <div class="vine-border"></div>
            <div class="vine-corner top-left"></div>
            <div class="vine-corner top-right"></div>
            <div class="vine-corner bottom-left"></div>
            <div class="vine-corner bottom-right"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <div class="loader-heart"></div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    lightbox.offsetHeight;
    lightbox.classList.add('show');
    
    img.onload = function() {
        const content = lightbox.querySelector('.lightbox-content');
        content.innerHTML = `
            <div class="vine-border"></div>
            <div class="vine-corner top-left"></div>
            <div class="vine-corner top-right"></div>
            <div class="vine-corner bottom-left"></div>
            <div class="vine-corner bottom-right"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="flower-decoration"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <div class="sparkle"></div>
            <img src="${item.src}" alt="${item.title}">
            <h3>${item.title}</h3>
        `;
    };
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('fade-out');
            lightbox.classList.remove('show');
            setTimeout(() => lightbox.remove(), 300);
        }
    });
}

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    createGalleryItems();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
        backdrop-filter: blur(0px);
        transition: background 0.3s ease, backdrop-filter 0.3s ease;
        opacity: 0;
    }

    .lightbox.show {
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(5px);
        opacity: 1;
    }
    
    .lightbox-content {
        height: 85vh;
        background: rgba(255, 255, 255, 0.95);
        padding: 3rem;
        border-radius: 20px;
        box-shadow: 0 0 30px rgba(255, 182, 193, 0.3);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: none;
        transform: scale(0.95) translateY(20px);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
        will-change: transform, opacity;
        overflow: hidden;
    }

    .lightbox.show .lightbox-content {
        transform: scale(1) translateY(0);
        opacity: 1;
    }

    .lightbox.fade-out {
        background: rgba(0, 0, 0, 0);
        backdrop-filter: blur(0px);
    }

    .lightbox.fade-out .lightbox-content {
        transform: scale(0.95) translateY(20px);
        opacity: 0;
    }
    
    .vine-border {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 2;
        border-radius: 20px;
        background: 
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' fill='none'%3E%3Cpath d='M0,10 C30,10 25,0 50,0 C75,0 70,10 100,10 C70,10 75,20 50,20 C25,20 30,10 0,10' fill='%23FFB6C1' fill-opacity='0.2'/%3E%3C/svg%3E") 0 0/50px 20px repeat-x,
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 100' fill='none'%3E%3Cpath d='M10,0 C10,30 0,25 0,50 C0,75 10,70 10,100 C10,70 20,75 20,50 C20,25 10,30 10,0' fill='%23FFB6C1' fill-opacity='0.2'/%3E%3C/svg%3E") 0 0/20px 50px repeat-y,
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' fill='none'%3E%3Cpath d='M0,10 C30,10 25,0 50,0 C75,0 70,10 100,10 C70,10 75,20 50,20 C25,20 30,10 0,10' fill='%23FFB6C1' fill-opacity='0.2'/%3E%3C/svg%3E") 0 100%/50px 20px repeat-x,
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 100' fill='none'%3E%3Cpath d='M10,0 C10,30 0,25 0,50 C0,75 10,70 10,100 C10,70 20,75 20,50 C20,25 10,30 10,0' fill='%23FFB6C1' fill-opacity='0.2'/%3E%3C/svg%3E") 100% 0/20px 50px repeat-y;
        animation: vinePulse 4s ease-in-out infinite;
    }

    @keyframes vinePulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 0.8; }
    }

    .vine-corner {
        position: absolute;
        width: 100px;
        height: 100px;
        pointer-events: none;
        z-index: 2;
    }

    .vine-corner::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='%23FFB6C1' stroke-width='2'%3E%3Cpath d='M90,90 C70,90 60,70 60,50 C60,30 40,20 10,20 M80,80 C60,80 50,60 50,40 C50,20 30,10 0,10 M70,70 C50,70 40,50 40,30 C40,10 20,0 0,0' stroke-opacity='0.3' stroke-linecap='round'/%3E%3Ccircle cx='85' cy='85' r='3' fill='%23FFB6C1' fill-opacity='0.4'/%3E%3Ccircle cx='75' cy='75' r='3' fill='%23FFB6C1' fill-opacity='0.4'/%3E%3Ccircle cx='65' cy='65' r='3' fill='%23FFB6C1' fill-opacity='0.4'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0.8;
    }

    .vine-corner.top-left { top: 0; left: 0; transform: rotate(0deg); }
    .vine-corner.top-right { top: 0; right: 0; transform: rotate(90deg); }
    .vine-corner.bottom-left { bottom: 0; left: 0; transform: rotate(-90deg); }
    .vine-corner.bottom-right { bottom: 0; right: 0; transform: rotate(180deg); }

    .flower-decoration {
        position: absolute;
        width: 30px;
        height: 30px;
        pointer-events: none;
        z-index: 2;
        transform-origin: center;
    }

    .flower-decoration:nth-child(6) { top: 5%; left: 5%; }
    .flower-decoration:nth-child(7) { top: 5%; right: 5%; }
    .flower-decoration:nth-child(8) { top: 40%; left: 3%; }
    .flower-decoration:nth-child(9) { top: 40%; right: 3%; }
    .flower-decoration:nth-child(10) { bottom: 5%; left: 5%; }
    .flower-decoration:nth-child(11) { bottom: 5%; right: 5%; }

    .flower-decoration::before {
        content: '✿';
        position: absolute;
        font-size: 1.2rem;
        color: var(--primary-color);
        opacity: 0.6;
        animation: flowerSpin 4s linear infinite;
        text-shadow: 0 0 10px rgba(255, 182, 193, 0.5);
    }

    @keyframes flowerSpin {
        0% { transform: rotate(0deg) scale(0.8); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(0.8); }
    }

    .sparkle {
        position: absolute;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, var(--primary-color) 20%, transparent 70%);
        border-radius: 50%;
        animation: sparkleFloat 3s ease-in-out infinite;
        opacity: 0;
        z-index: 2;
    }

    .sparkle:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
    .sparkle:nth-child(2) { top: 15%; right: 10%; animation-delay: 0.7s; }
    .sparkle:nth-child(3) { bottom: 15%; left: 10%; animation-delay: 1.4s; }
    .sparkle:nth-child(4) { bottom: 15%; right: 10%; animation-delay: 2.1s; }

    @keyframes sparkleFloat {
        0%, 100% { transform: translate(0, 0) scale(0); opacity: 0; }
        50% { transform: translate(5px, -5px) scale(1); opacity: 0.8; }
    }

    .lightbox-content img {
        height: calc(85vh - 10rem);
        width: auto;
        max-width: 90vw;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        border: 3px solid rgba(255, 182, 193, 0.3);
        position: relative;
        z-index: 1;
    }
    
    .lightbox-content h3 {
        color: var(--text-color);
        text-align: center;
        margin-top: 1rem;
        margin-bottom: 1.5rem;
        font-family: 'Dancing Script', cursive;
        font-size: 1.8rem;
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding: 0.5rem 2rem;
        text-shadow: 2px 2px 4px rgba(255, 182, 193, 0.1);
        position: relative;
        white-space: nowrap;
        z-index: 1;
    }

    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);

const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.add('muted');
    } else {
        bgMusic.play();
        musicToggle.classList.remove('muted');
    }
    isMusicPlaying = !isMusicPlaying;
});

document.addEventListener('click', () => {
    if (!isMusicPlaying) {
        bgMusic.volume = 0.2; 
        bgMusic.play().catch(() => {
            console.log('Autoplay prevented');
        });
        isMusicPlaying = true;
    }
}, { once: true });
