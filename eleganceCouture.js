document.addEventListener("DOMContentLoaded", () => {
    const messageField = document.querySelector('textarea[name="message"]');

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            if (type && messageField) {
                messageField.value = `Bonjour,\nJe souhaite une demande de ${type}.`;
            }
        });
    });
});

const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let startX = 0;

/* Créer les dots */
slide.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateSlider() {
    slides.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
}

function goToSlide(i) {
    index = i;
    updateSlider();
}

next.addEventListener("click", () => {
    index = (index + 1) % slide.length;
    updateSlider();
});

prev.addEventListener("click", () => {
    index = (index - 1 + slide.length) % slide.length;
    updateSlider();
});



/* Swipe mobile */
slides.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) next.click();
    if (endX - startX > 50) prev.click();
});
