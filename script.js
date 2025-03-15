const projects = [
    {
        title: "Luger's-VS",
        description: "A vouching website for multiple roblox games. This website is built with HTML, CSS, JavaScript, and a custom API built in Python. This website features multiple well-designed pages which display different information you'd have to check out yourself from the link below.",
        preview: "./assets/VoucherWS.png",
        link: "https://lugers-vs.netlify.app/templates/",
        video: "./assets/LugersVSShowcase.mp4",
        price: "FREE ( Self-Made )",
        duration: "1 week",
        completionDate: "March 6th 2025",
        maintenance: "Monthly checkups",
        technologies: ["HTML", "CSS", "Javascript", "Python"]
    },
    {
        title: "Sinny's Art Display",
        description: "A art display website for a friend of mine. This website is built with HTML, CSS, and Javascript. The website features custom music, dynamic positioning for the art, commision prices, smooth animations, and more. This website was made for free and is customizable and user friendly.",
        preview: "./assets/Sinny.png",
        link: "https://sinnysart.netlify.app/",
        video: "./assets/SinnysWSShowcase.mp4",
        price: "PFP Art Commision",
        duration: "1 day",
        completionDate: "March 13th 2025",
        maintenance: "None",
        technologies: ["HTML", "CSS", "Javascript"]
    },
    {
        title: "Vibranium",
        description: "This website was made for my school to have some entertainment for the students. It was build using HTML, CSS, and Javascript. This website was a good haven for students to have fun but since I stopped updating it, the games and apps no longer work. Maybe in the future I'll update it so students can once again have their fun.",
        preview: "./assets/Vibranium.png",
        link: "https://vibranium.pages.dev/",
        video: "./assets/VibraniumWSShowcase.mp4",
        price: "FREE ( Self-Made )",
        duration: "1 month",
        completionDate: "Undefined",
        maintenance: "Broken",
        technologies: ["HTML", "CSS", "Javascript"]
    }
];

function videoopener(videoPath) {
    const videoURL = new URL(videoPath, window.location.href).href;
    const newTab = window.open('about:blank', '_blank');
    newTab.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Website Demonstration</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background: #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    overflow: hidden;
                }
                video {
                    max-width: 100%;
                    max-height: 100vh;
                }
                .video-container {
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            </style>
        </head>
        <body>
            <div class="video-container">
                <video controls autoplay>
                    <source src="${videoURL}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </body>
        </html>
    `);
    newTab.document.close();
}

function display_portfolio_websites() {
    const container = document.querySelector('.projects-container');
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.innerHTML = `
            <div class="project-preview">
                <img src="${project.preview}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
                <div class="project-details">
                    <div class="detail-item">
                        <i class="fas fa-money-bill"></i>
                        <span>Price: ${project.price}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>Duration: ${project.duration}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar-check"></i>
                        <span>Completed: ${project.completionDate}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-tools"></i>
                        <span>Maintenance: ${project.maintenance}</span>
                    </div>
                </div>
                <div class="project-links">
                    <a href="${project.link}" target="_blank" class="btn">
                        <i class="fas fa-external-link-alt"></i>
                        Visit Website
                    </a>
                    ${project.video ? `
                        <button onclick="videoopener('${project.video}')" class="btn">
                            <i class="fas fa-play"></i>
                            Watch Demo
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    display_portfolio_websites();
}); 