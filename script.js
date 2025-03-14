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
        { id: 13, src: './assets/pab.png', title: 'Pablito?' },
        { id: 14, src: './assets/vex.png', title: 'Vex' },
        { id: 15, src: './assets/comm13.png', title: 'Dark' }
    ],
    cute: [
        { id: 3, src: './assets/furry.png', title: 'Pony' },
        { id: 4, src: './assets/furry2.png', title: 'Furry' }
    ],
    couples: [
        { id: 5, src: './assets/couple1.jpg', title: 'Sinny & Rollback' },
        { id: 6, src: './assets/couple2.png', title: 'Melody & Dark' }
    ]
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
            <div class="loader-heart"></div>
        </div>
    `;
    
    img.onload = function() {
        const content = lightbox.querySelector('.lightbox-content');
        content.innerHTML = `
            <img src="${item.src}" alt="${item.title}">
            <h3>${item.title}</h3>
        `;
    };
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('fade-out');
            setTimeout(() => lightbox.remove(), 300);
        }
    });
    
    document.body.appendChild(lightbox);
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
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    }
    
    .lightbox-content {
        max-width: 90%;
        max-height: 90vh;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
    }
    
    .lightbox-content h3 {
        color: white;
        text-align: center;
        margin-top: 1rem;
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