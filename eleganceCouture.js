document.addEventListener("DOMContentLoaded", () => {

    /* ===== AUTO MESSAGE CONTACT ===== */
    const messageField = document.querySelector('textarea[name="message"]');

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.type && messageField) {
                messageField.value = `Bonjour,\nJe souhaite une ${btn.dataset.type}.`;
            }
        });
    });

    /* ===== SLIDER ===== */
    const slides = document.querySelector(".slides");
    const slide = document.querySelectorAll(".slide");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    let index = 0;

    slide.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot";
        if (i === 0) dot.classList.add("active");
        dot.onclick = () => goToSlide(i);
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

    next.onclick = () => {
        index = (index + 1) % slide.length;
        updateSlider();
    };

    prev.onclick = () => {
        index = (index - 1 + slide.length) % slide.length;
        updateSlider();
    };

    /* ===== LIGHTBOX ===== */
    const images = document.querySelectorAll(
        ".apercu img, .slide img, .galerie img"
    );

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const caption = document.getElementById("caption");
    const close = document.querySelector(".close");

    images.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            caption.textContent = img.alt;
        });
    });

    close.onclick = () => lightbox.style.display = "none";

    lightbox.onclick = e => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    };
});


document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".photo-card").forEach(card => {
        const photoId = card.dataset.id;

        const likeBtn = card.querySelector(".like-btn");
        const likeCount = card.querySelector(".like-count");

        const commentInput = card.querySelector(".comment-input");
        const commentBtn = card.querySelector(".comment-btn");
        const commentList = card.querySelector(".comment-list");

        /* ===== LIKES ===== */
        let likes = localStorage.getItem(photoId + "_likes") || 0;
        likeCount.textContent = likes;

        likeBtn.addEventListener("click", () => {
            likes++;
            likeCount.textContent = likes;
            localStorage.setItem(photoId + "_likes", likes);
        });

        /* ===== COMMENTAIRES ===== */
        let comments = JSON.parse(localStorage.getItem(photoId + "_comments")) || [];

        function renderComments() {
            commentList.innerHTML = "";
            comments.forEach(c => {
                const li = document.createElement("li");
                li.textContent = c;
                commentList.appendChild(li);
            });
        }

        renderComments();

        commentBtn.addEventListener("click", () => {
            const text = commentInput.value.trim();
            if (text !== "") {
                comments.push(text);
                localStorage.setItem(photoId + "_comments", JSON.stringify(comments));
                commentInput.value = "";
                renderComments();
            }
        });
    });

});
