/* Portfolio filters, full-screen gallery, video modal and testimonial rotation. */
(() => {
  const video = 'https://www.youtube-nocookie.com/embed/ffFSh73KrFo?autoplay=1';
  const projects = [
    ['boda.jpg', 'Bodas', 'Circulo de luz', 'bodas'],
    ['retrato.jpg', 'Retratos', 'Un gesto honesto', 'retratos'],
    ['producto.jpg', 'Productos', 'Materia viva', 'productos'],
    ['evento-01.svg', 'Eventos', 'Despues del atardecer', 'eventos'],
    ['quinceanos.jpg', 'Quinceanos', 'El gran debut', 'quinceanos'],
    ['retrato-02.jpg', 'Retratos', 'Luz propia', 'retratos'],
    ['producto-02.jpg', 'Productos', 'Disenado para sentir', 'productos'],
    ['evento-02.svg', 'Eventos', 'La noche enciende', 'eventos']
  ];
  const galleryItems = projects.map(([image, category, title]) => ({ image, category, title }));
  const grid = document.querySelector('#portfolio-grid');
  let visibleProjects = projects;

  const gallery = document.createElement('div');
  gallery.className = 'gallery-modal';
  gallery.setAttribute('aria-hidden', 'true');
  gallery.setAttribute('role', 'dialog');
  gallery.setAttribute('aria-modal', 'true');
  gallery.setAttribute('aria-label', 'Galeria de proyectos');
  gallery.innerHTML = '<button class="gallery-close" aria-label="Cerrar galeria">&times;</button><button class="gallery-nav gallery-prev" aria-label="Imagen anterior">&larr;</button><figure><img src="" alt=""><figcaption><span class="gallery-category"></span><strong class="gallery-title"></strong><small class="gallery-position"></small></figcaption></figure><button class="gallery-nav gallery-next" aria-label="Imagen siguiente">&rarr;</button>';
  document.body.append(gallery);
  const galleryImage = gallery.querySelector('img');
  const galleryCategory = gallery.querySelector('.gallery-category');
  const galleryTitle = gallery.querySelector('.gallery-title');
  const galleryPosition = gallery.querySelector('.gallery-position');
  let galleryIndex = 0;

  function paintGallery() {
    const item = galleryItems[galleryIndex];
    galleryImage.src = `img/portfolio/${item.image}`;
    galleryImage.alt = `${item.category}: ${item.title}`;
    galleryCategory.textContent = item.category;
    galleryTitle.textContent = item.title;
    galleryPosition.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
  }
  function openGallery(index) { galleryIndex = index; paintGallery(); gallery.classList.add('open'); gallery.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function closeGallery() { gallery.classList.remove('open'); gallery.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  function moveGallery(direction) { galleryIndex = (galleryIndex + direction + galleryItems.length) % galleryItems.length; paintGallery(); }

  function draw(filter = 'all') {
    visibleProjects = projects.filter(project => filter === 'all' || project[3] === filter);
    grid.innerHTML = visibleProjects.map((project) => {
      const index = galleryItems.findIndex(item => item.image === project[0] && item.title === project[2]);
      return `<article class="project"><button class="project-open" data-gallery-index="${index}" aria-label="Abrir ${project[2]}"><img src="img/portfolio/${project[0]}" alt="Proyecto ${project[1]}: ${project[2]}"><span class="project-overlay"><span class="project-meta"><small>${project[1]}</small><h3>${project[2]}</h3><b>Ver galeria <i>&rarr;</i></b></span></span></button></article>`;
    }).join('');
  }
  draw();
  document.querySelector('.filters').addEventListener('click', event => {
    if (!event.target.matches('button')) return;
    document.querySelectorAll('.filters button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected'); draw(event.target.dataset.filter);
  });
  grid.addEventListener('click', event => { const button = event.target.closest('[data-gallery-index]'); if (button) openGallery(Number(button.dataset.galleryIndex)); });
  gallery.querySelector('.gallery-close').addEventListener('click', closeGallery);
  gallery.querySelector('.gallery-prev').addEventListener('click', () => moveGallery(-1));
  gallery.querySelector('.gallery-next').addEventListener('click', () => moveGallery(1));
  gallery.addEventListener('click', event => { if (event.target === gallery) closeGallery(); });

  const modal = document.querySelector('#video-modal');
  const frame = modal.querySelector('.modal-frame');
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-video]');
    if (!trigger) return;
    frame.innerHTML = `<iframe src="${trigger.dataset.video}" title="Video 90 Studio" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  });
  function closeVideo() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); frame.innerHTML = ''; }
  modal.querySelector('.modal-close').addEventListener('click', closeVideo);
  modal.addEventListener('click', event => { if (event.target === modal) closeVideo(); });
  addEventListener('keydown', event => { if (event.key === 'Escape') { closeVideo(); closeGallery(); } if (gallery.classList.contains('open') && event.key === 'ArrowLeft') moveGallery(-1); if (gallery.classList.contains('open') && event.key === 'ArrowRight') moveGallery(1); });

  const slides = [...document.querySelectorAll('.testimonial')];
  const dots = [...document.querySelectorAll('.slide-dots button')];
  let current = 0;
  function show(n) { current = (n + slides.length) % slides.length; slides.forEach((slide, index) => slide.classList.toggle('active', index === current)); dots.forEach((dot, index) => dot.classList.toggle('active', index === current)); }
  document.querySelector('.prev').onclick = () => show(current - 1);
  document.querySelector('.next').onclick = () => show(current + 1);
  dots.forEach((dot, index) => dot.onclick = () => show(index));
  setInterval(() => show(current + 1), 6500);
})();
