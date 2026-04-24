document.addEventListener("DOMContentLoaded", () => {
    const messageField = document.querySelector('textarea[name="message"]');
    const serviceButtons = document.querySelectorAll(".btn[data-type]");

    serviceButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!messageField) {
                return;
            }

            messageField.value = `Bonjour,\nJe souhaite des informations pour une ${button.dataset.type}.`;
        });
    });

    const slides = document.querySelector(".slides");
    const slideItems = Array.from(document.querySelectorAll(".slide"));
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");
    let currentIndex = 0;

    if (slides && slideItems.length > 0 && dotsContainer) {
        slideItems.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "dot";
            dot.setAttribute("aria-label", `Aller a la creation ${index + 1}`);
            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                currentIndex = index;
                updateSlider();
            });

            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll(".dot"));

        function updateSlider() {
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }

        nextButton?.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slideItems.length;
            updateSlider();
        });

        prevButton?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slideItems.length) % slideItems.length;
            updateSlider();
        });
    }

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-img");
    const caption = document.getElementById("caption");
    const closeButton = document.querySelector(".close");
    const galleryImages = document.querySelectorAll(".apercu img, .slide img, .photo-card img");

    galleryImages.forEach((image) => {
        image.addEventListener("click", () => {
            if (!lightbox || !lightboxImage || !caption) {
                return;
            }

            lightbox.style.display = "flex";
            lightbox.setAttribute("aria-hidden", "false");
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            caption.textContent = image.alt;
        });
    });

    closeButton?.addEventListener("click", () => {
        if (!lightbox) {
            return;
        }

        lightbox.style.display = "none";
        lightbox.setAttribute("aria-hidden", "true");
    });

    lightbox?.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
            lightbox.setAttribute("aria-hidden", "true");
        }
    });

    document.querySelectorAll(".photo-card").forEach((card) => {
        const photoId = card.dataset.id;
        const commentInput = card.querySelector(".comment-input");
        const commentButton = card.querySelector(".comment-btn");
        const commentList = card.querySelector(".comment-list");

        if (!photoId || !commentInput || !commentButton || !commentList) {
            return;
        }

        let comments = JSON.parse(localStorage.getItem(`${photoId}_comments`) || "[]");

        const renderComments = () => {
            commentList.innerHTML = "";

            comments.forEach((comment) => {
                const item = document.createElement("li");
                item.textContent = comment;
                commentList.appendChild(item);
            });
        };

        renderComments();

        commentButton.addEventListener("click", () => {
            const value = commentInput.value.trim();
            if (!value) {
                return;
            }

            comments.push(value);
            localStorage.setItem(`${photoId}_comments`, JSON.stringify(comments));
            commentInput.value = "";
            renderComments();
        });
    });
});
