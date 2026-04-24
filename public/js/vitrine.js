const track = document.getElementById("ring");
const previousButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const fullscreen = document.getElementById("pleinEcran");
const fullscreenImage = document.getElementById("pleinEcranImg");
const cards = Array.from(document.querySelectorAll(".img"));

function getScrollStep() {
    const firstCard = cards[0];
    if (!firstCard) {
        return 320;
    }

    const gap = 16;
    return firstCard.getBoundingClientRect().width + gap;
}

previousButton?.addEventListener("click", () => {
    track?.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
});

nextButton?.addEventListener("click", () => {
    track?.scrollBy({ left: getScrollStep(), behavior: "smooth" });
});

cards.forEach((card) => {
    card.addEventListener("click", () => {
        const backgroundImage = window.getComputedStyle(card).backgroundImage;
        const source = backgroundImage.replace(/url\(["']?([^"')]+)["']?\)/, "$1");

        if (!source || !fullscreen || !fullscreenImage) {
            return;
        }

        fullscreenImage.style.backgroundImage = `url("${source}")`;
        fullscreen.classList.add("active");
        fullscreen.setAttribute("aria-hidden", "false");
    });
});

fullscreen?.addEventListener("click", (event) => {
    if (event.target !== fullscreen && event.target !== fullscreenImage) {
        return;
    }

    fullscreen.classList.remove("active");
    fullscreen.setAttribute("aria-hidden", "true");
});

window.addEventListener("keydown", (event) => {
    if (!track) {
        return;
    }

    if (event.key === "Escape") {
        fullscreen?.classList.remove("active");
        fullscreen?.setAttribute("aria-hidden", "true");
    }

    if (event.key === "ArrowLeft") {
        track.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
    }

    if (event.key === "ArrowRight") {
        track.scrollBy({ left: getScrollStep(), behavior: "smooth" });
    }
});
