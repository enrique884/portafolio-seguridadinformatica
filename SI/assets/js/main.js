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

  // por si algún día quieres detener:
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
    particle.style.animationDuration = (6 + Math.random() * 4) + 's';
    container.appendChild(particle);
  }
}

function initNavigation() {
  const header = document.getElementById('header');
  const links = document.querySelectorAll('.nav-link[href^="#"], .nav-dropitem[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

      window.scrollTo({ top: y, behavior: 'smooth' });

      // cerrar menú mobile si está abierto
      const navMenu = document.getElementById('navMenu');
      const menuToggle = document.getElementById('menuToggle');
      if (navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
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

  // Desktop: hover abre/cierra
    // Desktop: hover abre/cierra (✅ con delay para evitar "parpadeo")
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
    if (window.innerWidth > 768) {
      scheduleClose();
    }
  });

  // ✅ si el mouse entra al menú, NO cierres
  menu?.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) cancelClose();
  });

  // ✅ si sales del menú, ahora sí cierra con delay
  menu?.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) scheduleClose();
  });
}

function initHeroAnimations() {
  // si existe anime, anima; si no, no pasa nada
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
      delay: 150,
      duration: 700,
      easing: 'easeOutBack'
    });
  }
}

function initContactForm() {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (status) status.textContent = 'Enviando...';

    // Aquí puedes conectar EmailJS real si ya lo tienes configurado.
    // Por ahora: simulación de envío.
    setTimeout(() => {
      if (status) status.textContent = 'Mensaje enviado (simulación).';
      form.reset();
      setTimeout(() => {
        if (status) status.textContent = '';
      }, 2500);
    }, 800);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initMatrix();
  initParticles();
  initNavigation();
  initMobileMenu();
  initDropdownParciales();
  initContactForm();
});