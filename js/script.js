// Tahun footer
document.getElementById("year").textContent = new Date().getFullYear();

// Back to top
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 450) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Tutup menu saat klik link
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});


// Smooth highlight navbar active
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


// ===== STARFIELD ANIMATION =====
const canvas = document.getElementById('starfield');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  let shootingStars = [];

  // Pengaturan jumlah bintang dan bintang jatuh
  const STAR_COUNT = 350;
  const SHOOTING_STAR_PROBABILITY = 0.008;  // peluang muncul per frame (~ 0.5% per frame)

  // Inisialisasi bintang tetap
  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,      // 1–3 px
        brightness: Math.random() * 0.6 + 0.4, // 0.3–1.0
        speed: Math.random() * 0.015 + 0.005   // untuk efek kedip
      });
    }
  }

  function createShootingStar() {
  // Pojok kiri atas (area 0-40% lebar, 0-25% tinggi)
  const startX = Math.random() * width * 0.4;
  const startY = Math.random() * height * 0.25;

  // Target di kanan bawah dengan pergeseran yang cukup panjang
  const targetX = startX + (Math.random() * 350 + 300);  // 300–650 px ke kanan
  const targetY = startY + (Math.random() * 200 + 150);  // 150–350 px ke bawah

  return {
    x: startX,
    y: startY,
    targetX: targetX,
    targetY: targetY,
    step: 0,
    speed: Math.random() * 0.006 + 0.004,   // lebih lambat agar lintasan panjang
    length: 40,                              // ekor panjang (40 titik)
    opacity: 1,
  };
}

  // Perbarui ukuran canvas saat layar berubah
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars(); // regenerasi bintang agar sesuai ukuran baru
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas(); // panggil pertama kali

  // Animasi loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Gambar bintang tetap
    stars.forEach(star => {
      // Efek kedip: ubah brightness berdasarkan sinus atau random
      star.brightness += (Math.random() - 0.5) * star.speed;
      if (star.brightness < 0.2) star.brightness = 0.2;
      if (star.brightness > 1) star.brightness = 1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`; // bintang putih
      ctx.fill();
    });

    // Update dan gambar bintang jatuh
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.step += s.speed;

      if (s.step >= 1) {
        // Hapus jika sudah mencapai target
        shootingStars.splice(i, 1);
        continue;
      }

      // Interpolasi posisi
      const curX = s.x + (s.targetX - s.x) * s.step;
      const curY = s.y + (s.targetY - s.y) * s.step;

      // Gambar ekor (beberapa titik di belakang)
      for (let j = 0; j < s.length; j++) {
        const factor = j / s.length; // 0 di ujung, 1 di pangkal
        const tailX = curX - (s.targetX - s.x) * s.speed * factor * 8;
        const tailY = curY - (s.targetY - s.y) * s.speed * factor * 8;
        const opacity = s.opacity * (1 - factor) * 0.8;
        
        ctx.beginPath();
        ctx.arc(tailX, tailY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 80, 80, ${opacity})`; // merah sesuai tema
        ctx.fill();
      }

      // Gambar kepala bintang jatuh (lebih terang)
      ctx.beginPath();
      ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 200, 200, ${s.opacity})`;
      ctx.fill();
    }

    // Tambah bintang jatuh baru secara acak
    if (Math.random() < SHOOTING_STAR_PROBABILITY && shootingStars.length < 3) {
      shootingStars.push(createShootingStar());
    }

    requestAnimationFrame(animate);
  }

  animate();
}