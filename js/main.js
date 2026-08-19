/* Shared UI: visitor counter, mouse cursor and rotating banner images. */
(() => {
  document.querySelector('#year').textContent = new Date().getFullYear();
  const visitKey = '90studio-visits';
  const visits = Number(localStorage.getItem(visitKey) || '1000') + 1;
  localStorage.setItem(visitKey, String(visits));
  const footerNote = document.querySelector('footer small');
  if (footerNote) {
    const counter = document.createElement('span');
    counter.className = 'visit-counter';
    counter.innerHTML = `Visitas: <b>${visits.toLocaleString('es-CO')}</b>`;
    footerNote.append(counter);
  }

  const youtubeUrl = 'https://www.youtube.com/watch?v=ffFSh73KrFo';
  const reelButton = document.querySelector('.reel .play-button');
  if (reelButton) {
    reelButton.removeAttribute('data-video');
    reelButton.addEventListener('click', () => window.open(youtubeUrl, '_blank', 'noopener'));
  }

  const socialLinks = {
    Instagram: 'https://www.instagram.com/90gradox/',
    Facebook: 'https://www.facebook.com/noventagradox',
    WhatsApp: 'https://wa.me/573002573965?text=Estoy%20interesado%20en%20tus%20servicios%2C%20vengo%20desde%20tu%20web%20oficial'
  };
  Object.entries(socialLinks).forEach(([name, url]) => {
    const link = document.querySelector(`.socials a[aria-label="${name}"]`);
    if (link) { link.href = url; link.target = '_blank'; link.rel = 'noopener'; }
  });
  const tiktok = document.querySelector('.socials a[aria-label="YouTube"]');
  if (tiktok) {
    tiktok.href = 'https://www.tiktok.com/@jordiorozcoo'; tiktok.target = '_blank'; tiktok.rel = 'noopener';
    tiktok.setAttribute('aria-label', 'TikTok');
    tiktok.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.2a3.8 3.8 0 1 1-3.1-3.7"/><path d="M14 3c.8 2.7 2.4 4.2 5 4.5"/></svg>';
  }

  document.querySelectorAll('.service-card').forEach(card => {
    const service = card.querySelector('h3')?.textContent.trim();
    const link = card.querySelector('a[href="#contacto"]');
    if (!service || !link) return;
    const message = `Estoy interesado en el servicio de ${service}. Vengo desde tu web oficial.`;
    link.href = `https://wa.me/573002573965?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', `Solicitar servicio de ${service} por WhatsApp`);
  });

  const heroSlides = [...document.querySelectorAll('.hero-slides .hero-bg')];
  const heroImages = ['img/hero/hero-01.jpg', 'img/hero/hero-02.jpg', 'img/hero/hero-03.jpg'];
  heroSlides.forEach((slide, index) => slide.style.backgroundImage = `url('${heroImages[index]}')`);
  const controls = document.createElement('div');
  controls.className = 'hero-slider-controls';
  controls.setAttribute('aria-label', 'Cambiar imagen principal');
  controls.innerHTML = '<button class="hero-arrow" data-direction="-1" aria-label="Imagen anterior">&larr;</button><span class="hero-dots"><button class="active" data-slide="0" aria-label="Imagen 1"></button><button data-slide="1" aria-label="Imagen 2"></button><button data-slide="2" aria-label="Imagen 3"></button></span><button class="hero-arrow" data-direction="1" aria-label="Imagen siguiente">&rarr;</button>';
  document.querySelector('.hero').append(controls);
  const heroDots = [...controls.querySelectorAll('[data-slide]')];
  let activeHero = 0;
  function showHero(next) { activeHero = (next + heroSlides.length) % heroSlides.length; heroSlides.forEach((slide, index) => slide.classList.toggle('active', index === activeHero)); heroDots.forEach((dot, index) => dot.classList.toggle('active', index === activeHero)); }
  controls.addEventListener('click', event => { const dot = event.target.closest('[data-slide]'); const arrow = event.target.closest('[data-direction]'); if (dot) showHero(Number(dot.dataset.slide)); if (arrow) showHero(activeHero + Number(arrow.dataset.direction)); });
  setInterval(() => showHero(activeHero + 1), 6500);

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (matchMedia('(pointer:fine)').matches) {
    addEventListener('mousemove', event => { dot.style.left = ring.style.left = event.clientX + 'px'; dot.style.top = ring.style.top = event.clientY + 'px'; });
    document.querySelectorAll('a,button').forEach(item => item.addEventListener('mouseenter', () => ring.classList.add('hover')));
    document.querySelectorAll('a,button').forEach(item => item.addEventListener('mouseleave', () => ring.classList.remove('hover')));
  }
})();
