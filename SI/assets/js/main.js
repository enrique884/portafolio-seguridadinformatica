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
// =========================================================================
// MÓDULO: PD05 - VISOR E INTERACCIÓN DE CERTIFICACIONES (7 PESTAÑAS)
// =========================================================================

const CERTIFICACIONES_DATA = [
  {
    id: 1,
    pestaña: "Introducción a la ciberseguridad",
    titulo: "Certification in Cybersecurity Fundamentals",
    tag: "1. Introducción",
    pdf: "assets/docs/cert-introduccion.pdf",
    badge: '<i class="fas fa-user-shield" style="font-size: 5rem; color: var(--primary); filter: drop-shadow(0 0 10px var(--primary));"></i><p style="font-family:var(--font-tech); margin-top:1rem; font-size:0.8rem;">CYBER_INTRO_SECURE</p>',
    reseña: "El análisis crítico de esta certificación inicial me permitió asentar las bases fundamentales de la seguridad de la información, migrando de un enfoque meramente técnico a una visión estratégica de la protección de activos de TI. A lo largo de este módulo de formación, se profundizaron conceptos esenciales como la tríada CIA (Confidencialidad, Integridad y Disponibilidad), los marcos normativos de gestión integral de riesgos y las arquitecturas de políticas para el control de accesos. Lo más enriquecedor a nivel profesional fue comprender que la seguridad informática no recae exclusivamente en los perímetros tecnológicos o cortafuegos físicos, sino en una simbiosis estrecha con el factor humano y los procesos operativos organizacionales. Esta certificación actúa como el núcleo introductorio de mi portafolio digital, dotándome del lenguaje estándar indispensable para interactuar con marcos de trabajo corporativos. El reto principal radicó en asimilar la densidad de políticas de cumplimiento y gobernanza, un área abstracta para un perfil puramente técnico, pero cuya comprensión completa es vital para mitigar vectores de ataque antes de que ocurra una intrusión real. En mi formación académica como estudiante de ingeniería, este logro marca un hito de formalización conceptual, permitiéndome abordar las subsecuentes capas de infraestructura de red y auditoría forense bajo una mentalidad orientada enteramente a la prevención, la resiliencia empresarial y el diseño de entornos seguros."
  },
  {
    id: 2,
    pestaña: "Conceptos básicos de redes",
    titulo: "Networking Security Essentials",
    tag: "2. Redes",
    pdf: "assets/docs/cert-redes.pdf",
    badge: '<i class="fas fa-network-wired" style="font-size: 5rem; color: var(--secondary); filter: drop-shadow(0 0 10px var(--secondary));"></i><p style="font-family:var(--font-tech); margin-top:1rem; font-size:0.8rem;">NET_SECURITY_CORE</p>',
    reseña: "Esta certificación enfocada en redes proporcionó el andamiaje técnico fundamental necesario para comprender rigurosamente cómo viajan los datos a través de una infraestructura distribuida y, de manera crucial, cómo pueden ser interceptados, manipulados o alterados en tránsito por agentes maliciosos. El análisis académico abarcó desde las capas del modelo OSI y la pila TCP/IP, hasta el comportamiento e interconexión intrínseca de protocolos críticos como DNS, DHCP, HTTP y sus extensiones cifradas. Profesionalmente, la asimilación de estos conceptos transforma por completo la visión que poseo de la infraestructura: cada trama y paquete de red pasa de ser un mero flujo de datos automatizado a un vector potencial de análisis forense o explotación mediante técnicas de sniffing o spoofing. El verdadero reto del curso fue dominar el desglose microscópico de las cabeceras de red para identificar anomalías operativas. El impacto en mi formación académica es directo y contundente, pues resulta imposible defender una infraestructura informática que no se comprende a nivel de bits. Las lecciones de ciberseguridad empresarial extraídas demuestran que una arquitectura de red mal diseñada es el origen de brechas catastróficas. Gracias a esta instrucción, el mapeo de servicios de comunicación se realiza bajo metodologías estructuradas, permitiéndome proyectar soluciones de conectividad robustas que integran la seguridad informática desde su fase de diseño físico y lógico inicial."
  },
  {
    id: 3,
    pestaña: "Dispositivos de red y config. inicial",
    titulo: "Switching & Routing Hardening Certification",
    tag: "3. Configuración Inicial",
    pdf: "assets/docs/cert-dispositivos.pdf",
    badge: '<i class="fas fa-server" style="font-size: 5rem; color: var(--warning); filter: drop-shadow(0 0 10px var(--warning));"></i><p style="font-family:var(--font-tech); margin-top:1rem; font-size:0.8rem;">ROUTER_HARDENING_LAB</p>',
    reseña: "Centrada firmemente en la aplicación práctica, esta certificación validó mis habilidades operativas en el aprovisionamiento, despliegue y hardening técnico de dispositivos de interconexión fundamentales como switches y routers corporativos. La experiencia abarcó desde el establecimiento de contraseñas con algoritmos de cifrado robustos y la deshabilitación completa de servicios inseguros o innecesarios (como Telnet o administración HTTP sin TLS), hasta la segmentación estricta de tráfico mediante redes locales virtuales (VLANs). El impacto profesional de este aprendizaje es inmediato: la configuración de fábrica de cualquier dispositivo de red es, por defecto, una vulnerabilidad crítica esperando ser explotada por un atacante. El mayor desafío técnico consistió en asegurar que las configuraciones de mitigación perimetral no interfirieran con el rendimiento de la red ni causaran cuellos de botella en la disponibilidad del negocio. Académicamente, esta competencia consolida mi capacidad para traducir directrices de seguridad abstractas en líneas de comandos reales dentro de entornos CLI. Al dominar la configuración inicial y el robustecimiento de dispositivos de comunicación, adquiero las bases para mitigar de raíz ataques de capa 2 y garantizar que la primera línea de defensa perimetral permanezca inalterable ante intentos de intrusión local o remota en la red organizacional."
  },
  {
    id: 4,
    pestaña: "Seguridad en terminales",
    titulo: "Endpoint Security & Host Hardening",
    tag: "4. Terminales",
    pdf: "assets/docs/cert-terminales.pdf",
    badge: '<i class="fas fa-laptop-code" style="font-size: 5rem; color: var(--danger); filter: drop-shadow(0 0 10px var(--danger));"></i><p style="font-family:var(--font-tech); margin-top:1rem; font-size:0.8rem;">ENDPOINT_DEFENSE_SYS</p>',
    reseña: "La protección y defensa de endpoints o estaciones finales representa uno de los frentes más críticos y complejos en la actualidad corporativa debido al auge global del trabajo remoto y los entornos descentralizados. Esta certificación abordó en profundidad las estrategias esenciales de robustecimiento de sistemas operativos, despliegue administrado de soluciones EDR y antivirus avanzados, control estricto de parches y auditoría automatizada de políticas locales. A través de un análisis crítico del entorno de ejecución, logré comprender cómo los atacantes explotan la falta de hardening en estaciones de trabajo comunes para ganar un acceso inicial y, posteriormente, iniciar movimientos laterales dentro de los servidores de la organización. El reto principal en este módulo radicó en balancear de forma óptima la rigidez de las directivas de seguridad locales con la usabilidad indispensable para que los colaboradores desempeñen sus funciones cotidianas sin fricciones operativas. A nivel profesional y académico, aprender a interpretar la telemetría interna de una terminal y centralizar los registros de logs incrementa exponencialmente mi capacidad analítica para la respuesta a incidentes. Esta formación complementa perfectamente mis estudios de ingeniería en sistemas, proporcionándome un enfoque de defensa en profundidad donde cada host se transforma en un nodo fortificado capaz de resistir malware."
  },
  {
    id: 5,
    pestaña: "Administración de amenazas cibernéticas",
    titulo: "Cyber Threat Management & Incident Response",
    tag: "5. Amenazas",
    pdf: "assets/docs/cert-amenazas.pdf",
    badge: '<i class="fas fa-shield-virus" style="font-size: 5rem; color: var(--success); filter: drop-shadow(0 0 10px var(--success));"></i><p style="font-family:var(--font-tech); margin-top:1rem; font-size:0.8rem;">THREAT_INTEL_SOC</p>',
    reseña: "Esta certificación de nivel avanzado me introdujo formalmente en el panorama del análisis estructurado de amenazas modernas, metodologías de ataque dirigidas e inteligencia de ciberamenazas (Cyber Threat Intelligence). Durante el plan formativo, se exploraron y aplicaron taxonomías globales de la industria como la matriz MITRE ATT&CK y el modelo Cyber Kill Chain para desglosar detalladamente el comportamiento de las amenazas persistentes avanzadas (APTs) y campañas de ransomware organizado. Lo más valioso para mi desarrollo profesional fue adoptar un enfoque proactivo de ciberdefensa: comprender que los indicadores de compromiso (IoCs) constituyen huellas digitales invaluables para neutralizar un ataque informático en sus fases de reconocimiento o entrega. El desafío crítico durante esta preparación fue procesar grandes volúmenes de alertas para discernir falsos positivos de intrusiones reales bajo escenarios de alta presión simulada en tiempo real. Académicamente, este hito expande mi visión de la seguridad hacia la gestión estratégica de un SOC (Security Operations Center) y la orquestación de planes de respuesta. Me capacita no solo para reaccionar ante fallos defensivos, sino para modelar perfiles de amenazas específicos, garantizando la resiliencia corporativa basada en datos de ingeniería rigurosos."
  },
  {
    id: 6,
    pestaña: "Carrera Profesional de Analista Junior en Ciberseguridad",
    titulo: "Junior Cybersecurity Analyst Career Path",
    tag: "6. Perfil Profesional",
    pdf: "assets/docs/cert-analista.pdf",
    badge: '<i class="fas fa-user-ninja" style="font-size: 5rem; color: #a29bfe; filter: drop-shadow(0 0 10px #a29bfe);"></i><p style="font-family:var(--font-tech); margin-top:1rem; font-size:0.8rem;">JR_ANALYST_PATH</p>',
    reseña: "Esta trayectoria de certificación profesional unificó e integró de forma completa y global las competencias técnicas, metodológicas y blandas requeridas para desempeñarse formalmente como un Analista Junior dentro de un equipo de ciberdefensa corporativa. El programa consolidó conocimientos transversales de auditoría, monitoreo continuo de eventos, triaje de vulnerabilidades y la elaboración estructurada de informes técnicos ejecutivos. El análisis reflexivo de esta ruta me permitió asimilar la inmensa responsabilidad ética, civil y legal que conlleva el manejo diario de datos sensibles, información confidencial e infraestructura crítica de terceros. El principal reto de este bloque formativo fue desarrollar habilidades avanzadas de comunicación técnica: aprender a traducir vulnerabilidades complejas de criticidad alta (como inyecciones SQL o ejecuciones remotas de código) en términos de impacto financiero, reputacional y operativo comprensibles para las juntas directivas y gerenciales. Académicamente, representa la culminación integradora de mis semestres de estudio, transformando conocimientos técnicos aislados en un perfil profesional unificado, metódico y competitivo para el mercado laboral, caracterizado por el orden, la responsabilidad y el rigor."
  },
  {
    id: 7,
    pestaña: "Hacker ético",
    titulo: "Certified Ethical Hacker (CEH) - Academic Foundations",
    tag: "7. Hacker Ético",
    pdf: "assets/docs/cert-hacking.pdf",
    badge: '<i class="fas fa-mask" style="font-size: 5rem; color: #ff7675; filter: drop-shadow(0 0 10px #ff7675);"></i><p style="font-family:var(--font-tech); margin-top:1rem; font-size:0.8rem;">ETHICAL_HACKER_FOUND</p>',
    reseña: "Pensar y actuar como el adversario es la premisa fundamental sobre la cual se estructuró esta certificación avanzada en hacking ético y pruebas de penetración. A lo largo de los laboratorios controlados, se replicaron detalladamente cada una de las fases tácticas de un ataque informático real: reconocimiento activo/pasivo, escaneo de vulnerabilidades expuestas, ganancia de acceso remoto, mantenimiento de la persistencia en el sistema y el borrado meticuloso de huellas y logs. Profesionalmente, esta instrucción transforma drásticamente mi perspectiva de la seguridad, pues me capacita para auditar proactivamente sistemas informáticos mediante simulaciones de intrusión ofensiva antes de que un actor malicioso real descubra y explote dichas fallas. El desafío más complejo fue de índole técnica y ética: dominar suites de herramientas avanzadas (como Nmap, Burp Suite y Metasploit) manteniéndose estrictamente dentro de los límites de los alcances legales establecidos en los contratos de auditoría. El impacto de este logro en mi portafolio demuestra una comprensión profunda de las debilidades del software. Este conocimiento corona de manera excelente la materia de Seguridad Informática, alineando destrezas operativas con estándares internacionales."
  }
];

function initCertificacionesViewer() {
  const viewer = document.getElementById('certificacionesViewer');
  if (!viewer) return; // Si no estamos en la página de certificaciones, salimos pacíficamente

  const titleEl = document.getElementById('certTitle');
  const tagEl = document.getElementById('certTag');
  const counterEl = document.getElementById('certCounter');
  const evidenceEl = document.getElementById('certEvidence');
  const reflectionEl = document.getElementById('certReflection');
  const badgeContainer = document.getElementById('badgeContainer');
  
  const prevBtn = document.getElementById('certPrevBtn');
  const nextBtn = document.getElementById('certNextBtn');
  const thumbsContainer = document.getElementById('certThumbs');

  let currentIndex = 0;

  // Generar pestañas/miniaturas inferiores de forma dinámica
  thumbsContainer.innerHTML = '';
  CERTIFICACIONES_DATA.forEach((cert, index) => {
    const thumb = document.createElement('button');
    thumb.className = `lab-thumb ${index === 0 ? 'active' : ''}`;
    thumb.type = 'button';
    thumb.style.padding = '0.75rem';
    thumb.style.color = 'var(--text-primary)';
    thumb.style.display = 'flex';
    thumb.style.flexDirection = 'column';
    thumb.style.alignItems = 'center';
    thumb.style.gap = '0.25rem';
    
    thumb.innerHTML = `
      <span style="font-family:var(--font-code); font-size:0.75rem; color:var(--primary); font-weight:bold;">MOD-0${cert.id}</span>
      <span style="font-size:0.65rem; text-align:center; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; line-height:1.2;">${cert.pestaña}</span>
    `;

    thumb.addEventListener('click', () => {
      currentIndex = index;
      updateViewer();
    });

    thumbsContainer.appendChild(thumb);
  });

  // Actualizar la interfaz con la certificación activa
  function updateViewer() {
    const cert = CERTIFICACIONES_DATA[currentIndex];

    titleEl.textContent = cert.titulo;
    tagEl.textContent = cert.tag;
    counterEl.textContent = `${currentIndex + 1} / ${CERTIFICACIONES_DATA.length}`;
    reflectionEl.textContent = cert.reseña;
    badgeContainer.innerHTML = cert.badge;

    // Enlace con estilo nativo .link-pill
    evidenceEl.innerHTML = `
      <a href="${cert.pdf}" class="link-pill js-download-pdf" data-pdf="${cert.pdf}" data-filename="${cert.titulo.replace(/\s+/g, '_')}.pdf" target="_blank" style="font-size:0.85rem; padding: 0.35rem 0.7rem;">
        <i class="fas fa-file-arrow-down"></i> Descargar Evidencia (.PDF)
      </a>
    `;

    // Actualizar clase activa en los thumbs
    const thumbs = thumbsContainer.querySelectorAll('.lab-thumb');
    thumbs.forEach((t, idx) => {
      t.classList.toggle('active', idx === currentIndex);
    });

    // Re-vincular manejador de descargas si tu plantilla tiene initDownloadPDF
    if (typeof initDownloadPDF === 'function') {
      initDownloadPDF();
    }
  }

  // Controles de flechas anterior/siguiente
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + CERTIFICACIONES_DATA.length) % CERTIFICACIONES_DATA.length;
    updateViewer();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % CERTIFICACIONES_DATA.length;
    updateViewer();
  });

  // Renderizar la primera certificación por defecto
  updateViewer();
}

// Asegurar que se dispare al cargar la página en tu bloque general de DOMContentLoaded
const originalInit = document.addEventListener('DOMContentLoaded', () => {
  // Llama a la función del visor después de que cargue la interfaz
  initCertificacionesViewer();
});