function initLoader() {
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('loaderProgress');
  const loaderPercent = document.getElementById('loaderPercent');
  if (!loader || !progressBar) return;

  let progress = 0;
  const terminalLines = loader.querySelectorAll('.terminal-line');
  terminalLines.forEach((line, i) => {
    setTimeout(() => (line.style.opacity = '1'), i * 180);
  });

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      setTimeout(() => {
        loader.classList.add('hidden');
        initHeroAnimations();
      }, 450);
    }

    progressBar.style.width = progress + '%';
    if (loaderPercent) loaderPercent.textContent = Math.floor(progress) + '%';
  }, 80);
}
function initHallOfFameDropdown() {
  const dropdown = document.getElementById('hofDropdown');
  if (!dropdown) return;

  const button = dropdown.querySelector('.nav-dropbtn');
  const menu = dropdown.querySelector('.nav-dropmenu');
  if (!button || !menu) return;

  button.addEventListener('click', (e) => {
    e.preventDefault();

    const isOpen = dropdown.classList.toggle('is-open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }
  });
}
function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array.from({ length: columns }, () => 1);

  function draw() {
    ctx.fillStyle = 'rgba(10, 14, 26, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  const timer = setInterval(draw, 35);

  window.addEventListener('resize', () => {
    resize();
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => 1);
  });

  canvas.dataset.timer = String(timer);
}

function initParticles() {
  const container = document.getElementById('hackParticles');
  if (!container) return;

  container.innerHTML = '';
  const particleCount = 30;
  const chars = ['0', '1', '{', '}', '[', ']', '<', '>', '/', '*'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = chars[Math.floor(Math.random() * chars.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 8) + 's';
    container.appendChild(particle);
  }
}

function initNavigation() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    header.classList.toggle('scrolled', current > 10);
    header.classList.toggle('hide', current > lastScrollY && current > 120);
    lastScrollY = current;
  });
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function initDropdownParciales() {
  const dropdown = document.getElementById('parcialesDropdown');
  if (!dropdown) return;

  const btn = dropdown.querySelector('.nav-dropbtn');
  const menu = dropdown.querySelector('.nav-dropmenu');

  function setOpen(state) {
    dropdown.classList.toggle('open', state);
    btn?.setAttribute('aria-expanded', state ? 'true' : 'false');
  }

  let closeTimer = null;

  function scheduleClose() {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => setOpen(false), 180);
  }

  function cancelClose() {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = null;
  }

  dropdown.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
      cancelClose();
      setOpen(true);
    }
  });

  dropdown.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) scheduleClose();
  });

  menu?.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) cancelClose();
  });

  menu?.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) scheduleClose();
  });
}

function initHeroAnimations() {
  if (typeof anime === 'undefined') return;

  const words = document.querySelectorAll('.title-word');
  anime({
    targets: words,
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(140),
    duration: 800,
    easing: 'easeOutExpo'
  });

  const badge = document.querySelector('.hero-badge');
  if (badge) {
    anime({
      targets: badge,
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 700,
      delay: 100,
      easing: 'easeOutExpo'
    });
  }

  const cards = document.querySelectorAll('.card, .skill-card, .activity-card');
  anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [22, 0],
    delay: anime.stagger(100, { start: 300 }),
    duration: 900,
    easing: 'easeOutCubic'
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Si no usas EmailJS en alguna página, no pasa nada.
  if (typeof emailjs === 'undefined') return;

  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const old = btn ? btn.innerHTML : '';

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Enviando...';
    }
    if (status) status.textContent = '';

    try {
      // Ajusta a tus IDs reales
      // emailjs.init('TU_PUBLIC_KEY');
      // await emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', form);

      if (status) status.textContent = 'Mensaje enviado correctamente ✅';
      form.reset();
    } catch (err) {
      console.error(err);
      if (status) status.textContent = 'No se pudo enviar. Intenta de nuevo.';
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = old;
      }
    }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}
// =========================
// EXPORT PDF (html2pdf) — por si lo usas en alguna página
// =========================
function initExportToPDF() {
  const buttons = document.querySelectorAll('.js-export-pdf');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const oldHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Generando PDF...';

      document.body.classList.add('pdf-export');

      try {
        if (typeof html2pdf === 'undefined') {
          throw new Error('html2pdf no está cargado. Debes agregar el CDN antes de main.js');
        }

        const article = document.querySelector('.card.article');
        const source = article || document.querySelector('main') || document.body;

        const filenameBase = (document.title || 'actividad')
          .replace(/[\\/:*?"<>|]/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        const options = {
          margin: [10, 10, 10, 10],
          filename: `${filenameBase || 'actividad'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            scrollX: 0,
            scrollY: 0,
            windowWidth: document.documentElement.clientWidth
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        await html2pdf().set(options).from(source).save();

      } catch (err) {
        console.error('Error exportando PDF:', err);
        alert('No se pudo generar el PDF. Abre consola (F12) para ver el error.');
      } finally {
        document.body.classList.remove('pdf-export');
        btn.disabled = false;
        btn.innerHTML = oldHTML;
      }
    });
  });
}

// =========================
// DIRECT PDF DOWNLOAD (sin visualizar)
// =========================
function initDownloadPDF() {
  const triggers = document.querySelectorAll('.js-download-pdf');
  if (!triggers.length) return;

  const forceDownload = async (url, filename) => {
    // 1) Intento robusto: fetch -> blob -> objectURL (fuerza descarga)
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => URL.revokeObjectURL(objectUrl), 8000);
      return;
    } catch (e) {
      // 2) Fallback: download attribute (funciona bien en GitHub Pages cuando es mismo origen)
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  triggers.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = btn.getAttribute('data-pdf') || btn.dataset.pdf;
      if (!url) return;

      const filename =
        btn.getAttribute('data-filename') ||
        btn.dataset.filename ||
        (url.split('/').pop() || 'actividad.pdf');

      // UI feedback leve (sin cambiar tu diseño)
      const oldHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Descargando...';

      try {
        await forceDownload(url, filename);
      } finally {
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = oldHTML;
        }, 600);
      }
    });
  });
}

// =========================
// INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  // Core visuals / UX
  initLoader();
  initMatrix();
  initParticles();

  // Navigation
  initNavigation();
  initMobileMenu();
  initDropdownParciales();

  // Forms
  initContactForm();
initHallOfFameDropdown();
  // PDF buttons
  initExportToPDF();   // si alguna página usa .js-export-pdf + html2pdf
  initDownloadPDF();   // descarga directa con .js-download-pdf
});