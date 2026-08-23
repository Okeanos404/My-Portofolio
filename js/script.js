// ==================== INISIALISASI ====================
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderExperience();
  renderProjects();
  generateChumBucketDesign();
  setTimeout(typeEffect, 1000);
  initScrollObserver();
  initCustomCursor();
  initProjectModal();
  document.getElementById("year").textContent = new Date().getFullYear();

  // SPLASH SCREEN + SKELETON
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.addEventListener('click', () => {
        preloader.classList.add('hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
          // Tampilkan skeleton
          const skeleton = document.querySelector('.skeleton-screen');
          if (skeleton) {
            skeleton.classList.remove('hide');
            // Setelah 1 detik, sembunyikan skeleton
            setTimeout(() => {
              skeleton.classList.add('hide');
              setTimeout(() => {
                skeleton.style.display = 'none';
              }, 500);
            }, 1000);
          }
        }, 800); // Waktu transisi splash screen
      });
    }
  });

  generateBubbles();
  generateJellyfish();
  initCoverflow();
});

// ==================== BUBBLES GENERATOR ====================
function generateBubbles() {
  const container = document.querySelector('.bubbles-container');
  if (!container) return;

  const bubbleCount = 20; // Number of bubbles
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // SVG markup for bubble without outline, resembling the provided image
    bubble.innerHTML = `
      <div class="bubble-inner" style="width:100%; height:100%;">
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <path d="M 15 50 A 35 35 0 0 1 50 15" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
          <path d="M 22 50 A 28 28 0 0 1 50 22" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
          <circle cx="28" cy="28" r="4.5" fill="#ffffff" opacity="0.9"/>
          <path d="M 82 50 A 32 32 0 0 1 50 82" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
        </svg>
      </div>
    `;
    
    // Randomize size, position, and delay
    const size = Math.random() * 45 + 15; // 15px to 60px
    const left = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * 10; // 0s to 10s
    const duration = Math.random() * 5 + 8; // 8s to 13s
    const wiggleDuration = Math.random() * 2 + 2; // 2s to 4s

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.animationDuration = `${duration}s`;
    
    // Set separate wiggle animation duration for this bubble
    const inner = bubble.querySelector('.bubble-inner');
    inner.style.animationDuration = `${wiggleDuration}s`;
    inner.style.animationDelay = `${delay}s`;

    // Random rotation and opacity for variation
    const rotation = Math.random() * 360;
    const opacity = Math.random() * 0.6 + 0.4; // 0.4 to 1.0
    const svg = bubble.querySelector('svg');
    svg.style.transform = `rotate(${rotation}deg)`;
    svg.style.opacity = opacity;
    
    container.appendChild(bubble);
  }
}

// ==================== JELLYFISH GENERATOR ====================
function generateJellyfish() {
  const container = document.querySelector('.bubbles-container');
  if (!container) return;

  const jellyfishCount = 7; // Number of jellyfish
  
  // 3 Variasi Kepala Ubur-ubur bergaya kartun SpongeBob (tanpa tentakel)
  const domes = [
    // Variant 1: Classic
    `
      <path d="M 15 70 C 15 0, 105 0, 105 70 Q 115 85, 95 85 Q 80 95, 75 85 Q 60 95, 45 85 Q 30 95, 25 85 Q 5 85, 15 70 Z" fill="#e479d2" stroke="#ffffff" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="85" cy="35" r="10" fill="#a0256a"/>
      <circle cx="92" cy="55" r="5" fill="#a0256a"/>
      <circle cx="45" cy="65" r="14" fill="#a0256a"/>
      <ellipse cx="65" cy="20" rx="12" ry="7" fill="#a0256a" transform="rotate(15 65 20)"/>
      <path d="M 22 55 Q 32 45, 24 35 Q 34 25, 28 15" stroke="#f1b3e6" stroke-width="6" fill="none" stroke-linecap="round"/>
    `,
    // Variant 2: Tall
    `
      <path d="M 25 70 C 25 -10, 95 -10, 95 70 Q 105 85, 85 85 Q 70 95, 60 85 Q 50 95, 35 85 Q 15 85, 25 70 Z" fill="#e479d2" stroke="#ffffff" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="50" cy="35" r="11" fill="#a0256a"/>
      <circle cx="75" cy="55" r="8" fill="#a0256a"/>
      <circle cx="75" cy="25" r="5" fill="#a0256a"/>
      <path d="M 32 50 Q 40 40, 33 30 Q 41 20, 35 12" stroke="#f1b3e6" stroke-width="5" fill="none" stroke-linecap="round"/>
    `,
    // Variant 3: Squat
    `
      <path d="M 10 70 C 10 15, 110 15, 110 70 Q 120 85, 100 85 Q 85 95, 70 85 Q 55 95, 40 85 Q 25 95, 10 85 Z" fill="#e479d2" stroke="#ffffff" stroke-width="5" stroke-linejoin="round"/>
      <ellipse cx="85" cy="45" rx="14" ry="7" fill="#a0256a" transform="rotate(-15 85 45)"/>
      <circle cx="35" cy="55" r="9" fill="#a0256a"/>
      <circle cx="55" cy="30" r="7" fill="#a0256a"/>
      <path d="M 18 55 Q 26 45, 19 35" stroke="#f1b3e6" stroke-width="6" fill="none" stroke-linecap="round"/>
    `
  ];

  for (let i = 0; i < jellyfishCount; i++) {
    const jelly = document.createElement('div');
    jelly.classList.add('jellyfish');
    
    // Dynamically generate unique but neat tentacles
    const numTentacles = Math.floor(Math.random() * 2) + 3; // 3 or 4 tentacles (keeps it neat)
    let tentaclesHTML = '';
    
    // Narrower base so tentacles stay under the dome nicely
    const startXOffset = 25; 
    const availableWidth = 70; // 25 to 95
    // Spacing between tentacles
    const spacing = numTentacles > 1 ? availableWidth / (numTentacles - 1) : 0;
    
    for (let t = 0; t < numTentacles; t++) {
      // Base starting point perfectly spaced
      const startX = startXOffset + (t * spacing) + (Math.random() * 6 - 3); // slight random shift
      const startY = 80;
      
      // Direction of the first wave (left or right)
      const swayDir = Math.random() > 0.5 ? 1 : -1;
      
      // Strength of the wave (keeps them in their lane, max 15px sway)
      const waveStr = 10 + Math.random() * 5; 
      
      // First curve (sway out)
      const cp1X = startX + (swayDir * waveStr);
      const cp1Y = 105 + (Math.random() * 10 - 5);
      
      // Mid point (return near center)
      const midX = startX + (swayDir * (waveStr * 0.3));
      const midY = 130 + (Math.random() * 10 - 5);
      
      // Second curve (sway the other way for S-shape)
      const cp2X = startX - (swayDir * waveStr);
      const cp2Y = 150 + (Math.random() * 10 - 5);
      
      // End point (curling slightly up like real SpongeBob jellyfish)
      const endX = startX - (swayDir * waveStr * 0.8);
      const endY = 140 + (Math.random() * 10 - 5);
      
      tentaclesHTML += `<path d="M ${startX} ${startY} Q ${cp1X} ${cp1Y}, ${midX} ${midY} Q ${cp2X} ${cp2Y}, ${endX} ${endY}"/>\n`;
    }

    const randomDome = domes[Math.floor(Math.random() * domes.length)];
    
    const svgHTML = `
      <svg width="100%" height="100%" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
        <!-- White outer stroke for tentacles -->
        <g stroke="#ffffff" stroke-width="16" fill="none" stroke-linecap="round">
          ${tentaclesHTML}
        </g>
        <!-- Pink inner fill for tentacles -->
        <g stroke="#e479d2" stroke-width="10" fill="none" stroke-linecap="round">
          ${tentaclesHTML}
        </g>
        <!-- Dome and spots -->
        ${randomDome}
      </svg>
    `;
    
    jelly.innerHTML = svgHTML;
    
    // Randomize size, position, and delay
    const size = Math.random() * 40 + 50; // 50px to 90px
    const left = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * 15; // 0s to 15s
    const duration = Math.random() * 10 + 15; // 15s to 25s

    jelly.style.width = `${size}px`;
    jelly.style.height = `${size}px`;
    jelly.style.left = `${left}%`;
    jelly.style.animationDelay = `${delay}s`;
    jelly.style.animationDuration = `${duration}s`;

    // Randomize pose (Flip X and Rotation)
    const isFlipped = Math.random() > 0.5 ? -1 : 1;
    const randomRotation = (Math.random() - 0.5) * 30; // -15deg to 15deg
    
    // Randomize inner wiggle animation & pose
    const svgElement = jelly.querySelector('svg');
    if (svgElement) {
      const wiggleDuration = Math.random() * 2 + 3; // 3s to 5s
      const wiggleDelay = Math.random() * 5; // 0s to 5s
      svgElement.style.animationDuration = `${wiggleDuration}s`;
      svgElement.style.animationDelay = `-${wiggleDelay}s`; // Negative delay so it starts mid-animation
      
      // Apply unique pose transform
      svgElement.style.transform = `scaleX(${isFlipped}) rotate(${randomRotation}deg)`;
    }
    
    container.appendChild(jelly);
  }
}

// ==================== CHUM BUCKET BACKGROUND ====================
function generateChumBucketDesign() {
  const container = document.getElementById('chum-bucket-bg');
  if (!container) return;
  
  container.innerHTML = ''; // Clear existing
  
  const width = Math.max(container.clientWidth || 2500, 2500);
  const height = Math.max(container.clientHeight || 800, 800);
  
  const patchSize = 150; 
  const colors = ['#286b8c', '#2c7ba3', '#398bb5', '#1a587a', '#22638a'];
  
  // Create patches
  for (let y = -50; y < height + 50; y += patchSize * 0.75) {
    for (let x = -50; x < width + 50; x += patchSize * 0.75) {
      const patch = document.createElement('div');
      patch.classList.add('metal-patch');
      
      const pWidth = patchSize + (Math.random() * 80 - 40);
      const pHeight = patchSize + (Math.random() * 80 - 40);
      const pColor = colors[Math.floor(Math.random() * colors.length)];
      const pRot = (Math.random() - 0.5) * 10; // -5 to 5 degrees
      
      // Random offset to make it look scattered
      const oX = (Math.random() - 0.5) * 60;
      const oY = (Math.random() - 0.5) * 60;
      
      patch.style.width = `${pWidth}px`;
      patch.style.height = `${pHeight}px`;
      patch.style.left = `${x + oX}px`;
      patch.style.top = `${y + oY}px`;
      patch.style.backgroundColor = pColor;
      patch.style.transform = `rotate(${pRot}deg)`;
      
      // Add rivets to the 4 inner edges of this patch
      addRivetsToEdge(patch, pWidth, pHeight, 'top');
      addRivetsToEdge(patch, pWidth, pHeight, 'bottom');
      addRivetsToEdge(patch, pWidth, pHeight, 'left');
      addRivetsToEdge(patch, pWidth, pHeight, 'right');
      
      container.appendChild(patch);
    }
  }
}

function addRivetsToEdge(patch, width, height, edge) {
  const rivetSpacing = 35; // Jarak antar paku
  const margin = 8; // Jarak dari tepi patch
  
  let length = (edge === 'top' || edge === 'bottom') ? width : height;
  let numRivets = Math.floor((length - margin * 2) / rivetSpacing);
  
  for (let i = 0; i <= numRivets; i++) {
    const rivet = document.createElement('div');
    rivet.classList.add('chum-rivet');
    
    // Random size for the rivet (tidak terlalu besar)
    const size = 5 + Math.random() * 4; // 5px to 9px
    rivet.style.width = `${size}px`;
    rivet.style.height = `${size}px`;
    
    // Random rotation for the highlight
    const rot = Math.random() * 360;
    
    let pos = margin + (i * rivetSpacing) + (Math.random() * 8 - 4);
    
    if (edge === 'top') {
      rivet.style.top = `${margin}px`;
      rivet.style.left = `${pos}px`;
      rivet.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
    } else if (edge === 'bottom') {
      rivet.style.bottom = `${margin}px`;
      rivet.style.left = `${pos}px`;
      // for bottom edge, the center is margin from bottom. 
      rivet.style.transform = `translate(-50%, 50%) rotate(${rot}deg)`;
    } else if (edge === 'left') {
      rivet.style.left = `${margin}px`;
      rivet.style.top = `${pos}px`;
      rivet.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
    } else if (edge === 'right') {
      rivet.style.right = `${margin}px`;
      rivet.style.top = `${pos}px`;
      rivet.style.transform = `translate(50%, -50%) rotate(${rot}deg)`;
    }
    
    patch.appendChild(rivet);
  }
}

// ==================== DATA ====================
const skillsData = [
  "Kepemimpinan & Manajemen Proyek",
  "Kerja Sama Tim & Komunikasi Efektif",
  "Kemampuan Adaptasi Tinggi",
  "PHP, JavaScript, Python",
  "HTML5, CSS3, SQL (MySQL)",
  "Laravel, Blade Engine, Tailwind CSS",
  "Microsoft Excel (Data Cleansing, Pivot)",
  "Git & GitHub (Version Control)",
  "Canva, CorelDraw, UI/UX Basics"
];

const experienceData = [
  {
    icon: "fa-graduation-cap",
    title: "Sistem Informasi — Universitas Krisnadwipayana",
    period: "2023 – Sekarang",
    points: [
      "Fokus pada pengembangan web dan analisis data",
      "Mata Kuliah Relevan: Basis Data (SQL), Sistem Informasi Manajemen, Analisis & Perancangan Sistem"
    ]
  },
  {
    icon: "fa-crown",
    title: "Ketua Himpunan — HIMASI",
    period: "2025 – 2026 (Sekarang)",
    points: [
      "Memimpin dan mengoordinasikan seluruh pengurus dalam menjalankan program kerja selama 1 periode",
      "Mengawasi kinerja tiap departemen, memastikan program kerja berjalan tepat waktu dan sesuai rencana",
      "Menginisiasi dan mengawal proker utama seperti Workshop UI/UX, Temu Wicara, dan Pengabdian Masyarakat",
      "Mewakili himpunan dalam kegiatan eksternal dan kolaborasi organisasi"
    ]
  },
  {
    icon: "fa-laptop-code",
    title: "Programmer (PKL) — Learning X Academy",
    period: "2022 – 2023",
    points: [
      "Mempelajari dasar pemrograman web dengan membuat duplikasi tampilan halaman Instagram, Facebook, dan Shopee",
      "Berkolaborasi dalam tim (6 orang) untuk mengembangkan website company profile",
      "Mengimplementasikan desain dari tim UI/UX ke dalam bentuk website fungsional",
      "Menggunakan Git/GitHub untuk kolaborasi kode dan version control"
    ]
  }
];

const projectsData = [
  {
    images: [
      "assets/images/web photo/Motor_1.png",
      "assets/images/web photo/Motor_2.png",
      "assets/images/web photo/Motor_3.png",
      "assets/images/web photo/Motor_4.png"
    ],
    title: "Web - Classic Motors",
    description: "Website katalog motor berbasis web dengan penyajian Informasi dan pertimbangan pengguna.",
    link: "https://okeanos404.github.io/Classic-Motors-web/"
  },
  {
    images: [
      "assets/images/web photo/Siakad_1.png",
      "assets/images/web photo/Siakad_2.png",
      "assets/images/web photo/Siakad_3.png",
      "assets/images/web photo/Siakad_4.png"
    ],
    title: "Web - SIAP Merdeka SMA",
    description: "Website sistem informasi akademik sederhana berbasis web dengan fitur login dan dashboard.",
    link: "https://okeanos404.github.io/SIAP-Merdeka-SMA/"
  },
  {
    images: [
      "assets/images/web photo/Photo_1.png",
      "assets/images/web photo/Photo_2.png",
      "assets/images/web photo/Photo_3.png",
      "assets/images/web photo/Photo_4.png"
    ],
    title: "Web — Photobooth",
    description: "Photobooth berbasis web dengan fitur capture gambar dan download",
    link: "https://okeanos404.github.io/Photobooth-web/"
  },
  {
    images: [
      "assets/images/web photo/Eco_1.png",
      "assets/images/web photo/Eco_2.png",
      "assets/images/web photo/Eco_3.png",
      "assets/images/web photo/Eco_4.png"
    ],
    title: "Web — Ecopedia",
    description: "Ensiklopedia tentang pengetahuan sampah berbasis web",
    link: "https://okeanos404.github.io/EcoPedia-web/"
  }
];

// ==================== RENDER FUNCTIONS ====================
function renderSkills() {
  const list = document.getElementById('skills-list');
  if (!list) return;
  list.innerHTML = skillsData.map((skill, index) => `
    <li class="fade-up" style="transition-delay: ${index * 0.05}s">
      <svg width="24" height="24" viewBox="0 0 100 100" style="filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.5)); vertical-align: middle; flex-shrink: 0;">
        <defs>
          <radialGradient id="gradRed" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ff7b7b"/>
            <stop offset="100%" stop-color="#cc0000"/>
          </radialGradient>
          <radialGradient id="gradWhite" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#dddddd"/>
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradWhite)" stroke-width="20"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradRed)" stroke-width="20" stroke-dasharray="27.5 27.5"/>
        <circle cx="50" cy="50" r="48" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
        <circle cx="50" cy="50" r="22" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
      </svg>
      ${skill}
    </li>
  `).join('');
}

function renderExperience() {
  const container = document.getElementById('experience-cards');
  if (!container) return;
  container.innerHTML = experienceData.map(exp => `
    <div class="exp-card fade-up antigravity">
      <div class="exp-card__icons">
        <i class="fa-solid ${exp.icon}"></i>
      </div>
      <div class="exp-card__desc">
        <h4>${exp.title}</h4>
        <p class="small-muted">${exp.period}</p>
        <ul>
          ${exp.points.map(point => `<li>${point}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

function renderProjects() {
  const container = document.getElementById('projects-cards');
  if (!container) return;
  container.innerHTML = projectsData.map((proj, index) => `
    <div class="projects-card-box fade-up antigravity" data-project='${JSON.stringify(proj).replace(/'/g, "&apos;")}'>
      <div class="project-collage">
        ${proj.images.map(img => `<img src="${img}" alt="${proj.title}" loading="lazy">`).join('')}
      </div>
      <div class="projects-card-box__desc">
        <h4>${proj.title}</h4>
        <p>${proj.description}</p>
      </div>
      <div class="projects-card-box__buttons">
        <a href="${proj.link}" class="btn btn-dark-outlined" target="_blank" onclick="event.stopPropagation();">
          Lihat <i class="fa-solid fa-external-link"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// ==================== TYPEWRITER EFFECT ====================
const typedTextSpan = document.getElementById('typed-text');
const textArray = ['Riyan Samuel Harahap', 'Ketua HIMASI UNKRIS', 'Web Developer'];
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

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingIndex = (typingIndex + 1) % textArray.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

// ==================== SCROLL ANIMATION (FADE-UP & ANIMEJS) ====================
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // Tambahan Animasi Anime.js saat elemen terlihat
        if (entry.target.classList.contains('cert-item')) {
          anime({
            targets: entry.target,
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutElastic(1, .8)',
            duration: 1200
          });
        }
        
        observer.unobserve(entry.target); // hanya sekali
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  // Observasi semua elemen dengan class fade-up (akan ditambahkan setelah render)
  setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    // Observasi sertifikat juga
    document.querySelectorAll('.cert-item').forEach(el => {
      el.style.opacity = 0; // Sembunyikan awal agar dianimasikan
      observer.observe(el);
    });
  }, 100);
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Perbesar saat hover pada elemen interaktif
  const hoverElements = document.querySelectorAll('a, button, .exp-card, .projects-card-box, .social-icons li, .btn');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ==================== MODAL PROYEK ====================
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalLink = document.getElementById('modal-link');
  const closeModal = document.querySelector('.close-modal');

  if (!modal || !modalTitle || !modalDesc || !modalLink || !closeModal) return;

  // Buka modal saat card diklik (kecuali tombol)
  document.querySelectorAll('.projects-card-box').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) return; // abaikan jika klik tombol
      const project = JSON.parse(card.dataset.project.replace(/&apos;/g, "'"));
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.description;
      modalLink.href = project.link;
      modal.style.display = 'flex';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

// ==================== BACK TO TOP DENGAN PROGRESS ====================
const backToTop = document.getElementById("backToTop");
const progressRect = document.getElementById("progress-rect");
if (backToTop && progressRect) {
  const rectLength = 168; // keliling persegi 42x42

  window.addEventListener("scroll", () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const offset = rectLength * (1 - scrollPercent);
    progressRect.style.strokeDashoffset = offset;

    if (window.scrollY > 450) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    // Rocket blast off effect when full
    const rocketFire = document.getElementById("rocket-fire");
    if (rocketFire) {
      if (scrollPercent >= 0.98) {
        rocketFire.style.opacity = "1";
        backToTop.classList.add("blast-off");
      } else {
        rocketFire.style.opacity = "0";
        backToTop.classList.remove("blast-off");
      }
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Tutup menu saat klik link
  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

// ==================== SMOOTH HIGHLIGHT NAVBAR ====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav ul li a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`header nav ul li a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { threshold: 0.45 }
);

sections.forEach((sec) => observer.observe(sec));

// ==================== STARFIELD ANIMATION (DITINGKATKAN) ====================
const canvas = document.getElementById('starfield');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  let shootingStars = [];

  const STAR_COUNT = 350;
  const SHOOTING_STAR_PROBABILITY = 0.02; // lebih sering

  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        speed: Math.random() * 0.02 + 0.005, // untuk efek kedip
        phase: Math.random() * 2 * Math.PI, // fase awal untuk sin
      });
    }
  }

  function createShootingStar() {
    const startX = Math.random() * width * 0.4;
    const startY = Math.random() * height * 0.25;
    const targetX = startX + (Math.random() * 350 + 300);
    const targetY = startY + (Math.random() * 200 + 150);
    return {
      x: startX,
      y: startY,
      targetX: targetX,
      targetY: targetY,
      step: 0,
      speed: Math.random() * 0.006 + 0.004,
      length: 40,
      opacity: 1,
    };
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Gambar bintang tetap dengan efek kedip sin
    stars.forEach(star => {
      const brightness = 0.5 + 0.5 * Math.sin(Date.now() * star.speed + star.phase);
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fill();
    });

    // Update dan gambar bintang jatuh
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.step += s.speed;

      if (s.step >= 1) {
        shootingStars.splice(i, 1);
        continue;
      }

      const curX = s.x + (s.targetX - s.x) * s.step;
      const curY = s.y + (s.targetY - s.y) * s.step;

      for (let j = 0; j < s.length; j++) {
        const factor = j / s.length;
        const tailX = curX - (s.targetX - s.x) * s.speed * factor * 8;
        const tailY = curY - (s.targetY - s.y) * s.speed * factor * 8;
        const opacity = s.opacity * (1 - factor) * 0.8;
        ctx.beginPath();
        ctx.arc(tailX, tailY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 27, 107, ${opacity})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(69, 202, 255, ${s.opacity})`;
      ctx.fill();
    }

    if (Math.random() < SHOOTING_STAR_PROBABILITY && shootingStars.length < 5) {
      shootingStars.push(createShootingStar());
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==================== COUNTER STATISTIK (DENGAN ANIME.JS) ====================
const statsSection = document.getElementById('stats');
if (statsSection) {
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          
          anime({
            targets: stat,
            innerHTML: [0, target],
            easing: 'linear',
            round: 1, // Membulatkan angka
            duration: 2000
          });
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}

// ===== COVERFLOW 3D =====
function initCoverflow() {
  const container = document.querySelector('.carousel-container');
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  if (!container || !track || !prevBtn || !nextBtn || !indicatorsContainer) return;

  const items = Array.from(document.querySelectorAll('.carousel-item'));
  if (items.length === 0) return;

  const total = items.length;
  let currentIndex = 0;
  let isAnimating = false;

  // Parameter untuk efek coverflow
  const radius = 1400;          // jari-jari lingkaran (semakin besar semakin datar)
  const angleStep = 360 / total;
  const maxScale = 1.4;
  const minScale = 0.65;

  function updatePositions() {
  items.forEach((item, i) => {
    let angle = (i - currentIndex) * angleStep;
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;

    const rad = angle * Math.PI / 180;
    const z = Math.sin(rad) * radius;
    const xOffset = Math.sin(rad) * 360;

    let scale, opacity, brightness;

    if (angle === 0) {
      // Gambar tengah: besar, penuh cahaya, tidak tembus
      scale = 1.5;
      opacity = 1;
      brightness = 1;
      item.style.zIndex = 10;      // item tengah di atas
    } else {
      // Gambar samping: lebih kecil, redup, transparan
      scale = 1.5 - (Math.abs(angle) / 180) * (1.5 - minScale);
      scale = Math.max(minScale, Math.min(1.5, scale));
      opacity = 0.4;          // nilai lebih rendah untuk kontras
      brightness = 0.5;       // lebih redup
      item.style.zIndex = 1;       // item samping di bawah
    }

    // Terapkan transformasi
    item.style.transform = `translateX(${xOffset}px) translateZ(${z}px) rotateY(${angle}deg) scale(${scale})`;
    item.style.opacity = opacity;
    item.style.filter = `brightness(${brightness})`;
    item.classList.toggle('active', angle === 0);
  });
}

  function moveTo(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index;
    updatePositions();
    setTimeout(() => { isAnimating = false; }, 600);
    updateIndicators();
  }

  function next() {
    let newIndex = currentIndex + 1;
    if (newIndex >= total) newIndex = 0;
    moveTo(newIndex);
  }

  function prev() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = total - 1;
    moveTo(newIndex);
  }

  // Buat indikator
  indicatorsContainer.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const ind = document.createElement('span');
    ind.classList.add('indicator');
    ind.dataset.index = i;
    indicatorsContainer.appendChild(ind);
  }
  const indicators = document.querySelectorAll('.indicator');

  function updateIndicators() {
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  indicators.forEach(ind => {
    ind.addEventListener('click', () => {
      moveTo(parseInt(ind.dataset.index, 10));
    });
  });

  // Inisialisasi posisi
  updatePositions();
  updateIndicators();

  // Update posisi saat window resize
  window.addEventListener('resize', () => {
    updatePositions();
  });
}