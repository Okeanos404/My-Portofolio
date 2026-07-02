// ==================== INISIALISASI ====================
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderExperience();
  renderProjects();
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
    
    // Randomize size, position, and delay
    const size = Math.random() * 30 + 10; // 10px to 40px
    const left = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * 10; // 0s to 10s
    const duration = Math.random() * 5 + 8; // 8s to 13s

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.animationDuration = `${duration}s`;
    
    container.appendChild(bubble);
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
    title: "Web - Mini SIAKAD",
    description: "Website sistem informasi akademik sederhana berbasis web dengan fitur login dan dashboard.",
    link: "https://okeanos404.github.io/Mini-SIAKAD-web/"
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
      <i class="fa-solid fa-check"></i> ${skill}
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

// ==================== SCROLL ANIMATION (FADE-UP) ====================
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // hanya sekali
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  // Observasi semua elemen dengan class fade-up (akan ditambahkan setelah render)
  setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
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

// ==================== COUNTER STATISTIK ====================
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
          let current = 0;
          const increment = target / 50; // naik dalam 50 langkah
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              stat.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              stat.textContent = target;
            }
          };
          updateCounter();
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