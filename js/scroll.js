/* Scroll state, parallax, reveal observer and animated statistics. */
(() => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.progress span');
  const top = document.querySelector('.back-top');
  const heroSlides = document.querySelector('.hero-slides');
  const update = () => {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle('scrolled', y > 35); top.classList.toggle('visible', y > 650);
    progress.style.width = `${max ? y / max * 100 : 0}%`;
    heroSlides.style.transform = `translateY(${y * .12}px)`;
  };
  addEventListener('scroll', update, { passive: true }); update();
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .13 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; entry.target.querySelectorAll('[data-count]').forEach(node => { const end = +node.dataset.count; const start = performance.now(); const duration = 1300; const tick = time => { node.textContent = Math.min(end, Math.floor((time - start) / duration * end)); if (time - start < duration) requestAnimationFrame(tick); else node.textContent = end; }; requestAnimationFrame(tick); }); countObserver.unobserve(entry.target); }), { threshold: .45 });
  document.querySelectorAll('.metrics').forEach(item => countObserver.observe(item));
})();
