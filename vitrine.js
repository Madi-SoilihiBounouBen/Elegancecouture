/* =======================
   SÉLECTION DES ÉLÉMENTS
======================= */
const images = document.querySelectorAll('.img');
const ring = document.getElementById('ring');
const pleinEcran = document.getElementById('pleinEcran');
const pleinEcranImg = document.getElementById('pleinEcranImg');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

/* =======================
   VARIABLES
======================= */
const imgCount = images.length;
let currentIndex = 0;
let rotation = 0;
let isDragging = false;
let startX = 0;
let currentRotation = 0;

// Espacement responsive
function getSpacing() {
  return window.innerWidth <= 768 ? 150 : 350;
}

let spacing = getSpacing();

// Recalculer l'espacement au redimensionnement
window.addEventListener('resize', () => {
  spacing = getSpacing();
  updateCarousel();
});

/* =======================
   POSITIONNEMENT HORIZONTAL AVEC PERSPECTIVE
======================= */
function updateCarousel() {
  images.forEach((img, index) => {
    const offset = (index - currentIndex) * spacing;
    const absOffset = Math.abs(offset);
    const scale = Math.max(0.6, 1 - absOffset / 1200);
    const opacity = Math.max(0.3, 1 - absOffset / 1000);
    const rotateY = offset / 8;
    const translateZ = -Math.abs(offset) / 2;
    
    img.style.transform = `
      translateX(${offset}px)
      translateZ(${translateZ}px)
      rotateY(${rotateY}deg)
      scale(${scale})
    `;
    img.style.opacity = opacity;
    img.style.zIndex = Math.round(100 - absOffset);
  });
}

// Initialisation du carrousel
updateCarousel();

/* =======================
   NAVIGATION PAR BOUTONS
======================= */
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imgCount) % imgCount;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imgCount;
  updateCarousel();
});

/* =======================
   DRAG AVEC LA SOURIS
======================= */
ring.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  currentRotation = rotation;
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const delta = e.clientX - startX;
  rotation = currentRotation + delta;
  
  if (Math.abs(delta) > 50) {
    if (delta > 0) {
      currentIndex = (currentIndex - 1 + imgCount) % imgCount;
    } else {
      currentIndex = (currentIndex + 1) % imgCount;
    }
    startX = e.clientX;
    currentRotation = 0;
    rotation = 0;
  }
  updateCarousel();
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  rotation = 0;
});

/* =======================
   SUPPORT TACTILE
======================= */
ring.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  currentRotation = rotation;
});

ring.addEventListener('touchmove', (e) => {
  const delta = e.touches[0].clientX - startX;
  rotation = currentRotation + delta;
  
  if (Math.abs(delta) > 50) {
    if (delta > 0) {
      currentIndex = (currentIndex - 1 + imgCount) % imgCount;
    } else {
      currentIndex = (currentIndex + 1) % imgCount;
    }
    startX = e.touches[0].clientX;
    currentRotation = 0;
    rotation = 0;
  }
  updateCarousel();
});

/* =======================
   MODE PLEIN ÉCRAN
======================= */

// Ouverture
images.forEach(img => {
  img.addEventListener('click', () => {
    const bg = window.getComputedStyle(img).backgroundImage;
    // Nettoyer l'URL : enlever url() et les guillemets
    const cleanUrl = bg.replace(/url\(['"]?([^'")]+)['"]?\)/g, '$1');
    pleinEcranImg.style.backgroundImage = `url('${cleanUrl}')`;
    pleinEcran.classList.add('active');
  });
});

// Fermeture au clic
pleinEcran.addEventListener('click', (e) => {
  if (e.target === pleinEcran) {
    pleinEcran.classList.remove('active');
  }
});

/* =======================
   NAVIGATION AU CLAVIER
======================= */
window.addEventListener('keydown', (e) => {
  // Échap pour fermer le plein écran
  if (e.key === 'Escape') {
    pleinEcran.classList.remove('active');
  }
  
  // Flèche gauche
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + imgCount) % imgCount;
    updateCarousel();
  }
  
  // Flèche droite
  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % imgCount;
    updateCarousel();
  }
});