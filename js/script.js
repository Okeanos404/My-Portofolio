// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCustomCursor();
  initHamburger();
  initScrollObserver();
  initAboutTabs();
  initSkillsTabs();
  initProjectModal();
  initScrollSpy();
  
  // Start Typing Effect
  setTimeout(typeEffect, 1000);
  
  renderProjects();
  renderServices();
  renderSkills('frontend'); // Render default tab
  
  document.getElementById("year").textContent = new Date().getFullYear();
});

// ==================== TYPING EFFECT ====================
const typedTextSpan = document.getElementById('typed-text');
const textArray = ['Riyan Samuel Harahap'];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typedTextSpan) return;
  const currentText = textArray[typingIndex];
  
  if (isDeleting) {
    typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 3000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

// ==================== THEME TOGGLE (LIGHT/DARK) ====================
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const icon = themeToggleBtn.querySelector('i');

  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(icon, savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(icon, newTheme);
  });
}

function updateThemeIcon(icon, theme) {
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const hoverElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-box, .sidebar-list li');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ==================== HAMBURGER MENU ====================
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll("#navMenu a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
}

// ==================== SCROLL OBSERVER (FADE-IN) ====================
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  setTimeout(() => {
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
  }, 100);
}

// ==================== ABOUT TERMINAL TABS ====================
function initAboutTabs() {
  const tabs = document.querySelectorAll('#about-tabs li');
  const panels = document.querySelectorAll('.about-panel');
  const terminalTitle = document.querySelector('.terminal-title');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-panel');
      
      panels.forEach(panel => {
        panel.style.display = 'none';
        panel.classList.remove('active');
      });

      const activePanel = document.getElementById(`panel-${target}`);
      if (activePanel) {
        activePanel.style.display = 'block';
        // Trigger reflow for animation
        void activePanel.offsetWidth;
        activePanel.classList.add('active');
      }

      // Update terminal title text
      if (target === 'identity') {
        terminalTitle.textContent = "ABOUT_OKEANOS_404 - ROOT";
      } else {
        terminalTitle.textContent = `ABOUT_OKEANOS_404 - ${target.toUpperCase()}.MD`;
      }
    });
  });
}

// ==================== DATA ====================
const projectsData = [
  {
    title: "Web - Classic Motors",
    description: "Website katalog motor klasik berbasis web dengan penyajian informasi yang lengkap untuk memudahkan pengguna.",
    images: [
      "assets/images/web photo/Motor_1.png",
      "assets/images/web photo/Motor_2.png"
    ],
    link: "https://okeanos404.github.io/Classic-Motors-web/"
  },
  {
    title: "Web - SIAP Merdeka SMA",
    description: "Sistem Informasi Akademik sederhana berbasis web yang dilengkapi dengan fitur login yang aman dan dashboard responsif.",
    images: [
      "assets/images/web photo/Siakad_1.png",
      "assets/images/web photo/Siakad_2.png"
    ],
    link: "https://okeanos404.github.io/SIAP-Merdeka-SMA/"
  },
  {
    title: "Web — Photobooth",
    description: "Aplikasi Photobooth interaktif berbasis web dengan fitur penangkapan gambar real-time dan fungsionalitas unduhan yang mudah.",
    images: [
      "assets/images/web photo/Photo_1.png",
      "assets/images/web photo/Photo_2.png"
    ],
    link: "https://okeanos404.github.io/Photobooth-web/"
  },
  {
    title: "Web — Ecopedia",
    description: "Platform ensiklopedia modern berbasis web yang didedikasikan untuk pengetahuan tentang pengelolaan dan daur ulang sampah.",
    images: [
      "assets/images/web photo/Eco_1.png",
      "assets/images/web photo/Eco_2.png"
    ],
    link: "https://okeanos404.github.io/EcoPedia-web/"
  }
];

const servicesData = [
  {
    id: "01",
    tag: "DEVELOPMENT & DELIVERY",
    title: "Static Website",
    desc: "Membuat landing page cepat dan aman untuk profil bisnis atau portofolio pribadi dengan performa maksimal.",
    type: "light",
    linkText: "Start a project"
  },
  {
    id: "02",
    tag: "FULLSTACK ARCHITECTURE",
    title: "Dynamic Website",
    desc: "Membangun sistem informasi, platform e-commerce, atau aplikasi web kustom yang terintegrasi database handal.",
    type: "dark",
    linkText: "View possibilities"
  },
  {
    id: "03",
    tag: "INFRASTRUCTURE & OPS",
    title: "Deployment & Maintenance",
    desc: "Melakukan deployment aplikasi, setup hosting, pembaruan keamanan rutin, serta pemantauan performa sistem agar tetap stabil.",
    type: "dark",
    linkText: "Secure your product"
  },
  {
    id: "04",
    tag: "DESIGN & ASSESSMENT",
    title: "UI/UX & Optimization",
    desc: "Merancang UI/UX yang intuitif serta meningkatkan performa dan SEO website agar lebih ramah bagi pengguna dan mesin pencari.",
    type: "light",
    linkText: "Click to see details!"
  }
];

const skillsData = {
  frontend: [
    { name: "HTML5", icon: "fa-brands fa-html5", color: "#E34F26" },
    { name: "CSS3", icon: "fa-brands fa-css3-alt", color: "#1572B6" },
    { name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E" },
    { name: "Tailwind CSS", icon: "fa-solid fa-wind", color: "#38B2AC" }
  ],
  backend: [
    { name: "PHP", icon: "fa-brands fa-php", color: "#777BB4" },
    { name: "Laravel", icon: "fa-brands fa-laravel", color: "#FF2D20" },
    { name: "MySQL", icon: "fa-solid fa-database", color: "#4479A1" }
  ],
  languages: [
    { name: "PHP", icon: "fa-brands fa-php", color: "#777BB4" },
    { name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E" },
    { name: "Python", icon: "fa-brands fa-python", color: "#3776AB" }
  ],
  design: [
    { name: "Canva", icon: "fa-solid fa-palette", color: "#00C4CC" },
    { name: "CorelDraw", icon: "fa-solid fa-pen-nib", color: "#000000" }, /* Set to black, css hover will make it pop */
    { name: "UI/UX", icon: "fa-solid fa-layer-group", color: "#FF61F6" }
  ],
  tools: [
    { name: "Git", icon: "fa-brands fa-git-alt", color: "#F05032" },
    { name: "GitHub", icon: "fa-brands fa-github", color: "#181717" },
    { name: "VS Code", icon: "fa-solid fa-code", color: "#007ACC" },
    { name: "Excel", icon: "fa-solid fa-table", color: "#217346" }
  ]
};

// ==================== RENDERING FUNCTIONS ====================
function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = projectsData.map(proj => {
    const projDataStr = JSON.stringify(proj).replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    return `
    <div class="project-card" data-project="${projDataStr}">
      <div class="project-image">
        <img src="${proj.images[0]}" alt="${proj.title}" loading="lazy">
        <div class="project-overlay">
          <i class="fa-solid fa-eye"></i>
        </div>
      </div>
      <div class="project-info">
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
      </div>
    </div>
    `;
  }).join('');
}

function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  container.innerHTML = servicesData.map(srv => {
    const cardClass = srv.type === 'dark' ? 'dark-card' : 'light-card';
    return `
    <div class="service-card ${cardClass}">
      <div class="service-header">
        <span class="service-tag">${srv.tag}</span>
        <span class="service-number">${srv.id}</span>
      </div>
      <h3 class="service-title">${srv.title}</h3>
      <p class="service-desc">${srv.desc}</p>
      <a href="#contact" class="service-link">${srv.linkText}</a>
    </div>
    `;
  }).join('');
}

function renderSkills(category) {
  const container = document.getElementById('skills-grid');
  if (!container || !skillsData[category]) return;

  container.innerHTML = '';
  container.style.animation = 'none';
  container.offsetHeight; /* trigger reflow */
  container.style.animation = 'fadeIn 0.4s ease-out';

  // Apply the specific color inline via style
  container.innerHTML = skillsData[category].map(skill => {
    // For icons like github in dark mode, we don't want it to be pure black if it's invisible
    let iconColorStr = skill.color;
    if (skill.color === "#000000" || skill.color === "#181717") {
        // Just use CSS class logic or inherit for black icons so they show in dark mode properly
        // We will assign a custom attribute and handle via css or just let it be text color in dark mode
        // Let's use a small check:
        iconColorStr = `var(--text-main)`;
    }
    
    // Explicitly color it, with a fallback for dark mode adapting elements
    const isDarkAdapting = (skill.color === "#000000" || skill.color === "#181717");
    
    return `
    <div class="skill-box">
      <i class="${skill.icon}" style="${isDarkAdapting ? 'color: var(--text-main);' : `color: ${skill.color};`}"></i>
      <span class="skill-name">${skill.name}</span>
    </div>
  `}).join('');
}

// ==================== SKILLS TAB LOGIC ====================
function initSkillsTabs() {
  const tabs = document.querySelectorAll('.tab-item');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const target = tab.getAttribute('data-target');
      renderSkills(target);
    });
  });
}

// ==================== MODAL LOGIC ====================
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.querySelector('.close-modal');
  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-description');
  const imagesContainer = document.getElementById('modal-images');
  const link = document.getElementById('modal-link');

  if (!modal) return;

  document.getElementById('projects-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    const rawData = card.getAttribute('data-project').replace(/&apos;/g, "'").replace(/&quot;/g, '"');
    const project = JSON.parse(rawData);

    title.textContent = project.title;
    desc.textContent = project.description;
    link.href = project.link;
    
    imagesContainer.innerHTML = project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('');

    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// ==================== SCROLL SPY ====================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}