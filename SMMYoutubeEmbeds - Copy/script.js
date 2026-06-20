

// CONTACT FORM ALERT


// POP EFFECT ON CLICK
function addPopEffect(element) {
    element.classList.add("pop");
    setTimeout(() => {
        element.classList.remove("pop");
    }, 150);
}

document.querySelectorAll("a, button, .service-card").forEach(el => {
    el.addEventListener("click", () => addPopEffect(el));
});

// SCROLL FADE-IN + FADE-OUT
const sections = document.querySelectorAll('.section-animate');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
            // Section entering viewport
            el.classList.add('visible');
            el.classList.remove('above');
        } else {
            // Section leaving viewport
            if (entry.boundingClientRect.top < 0) {
                // Scrolling down → fade upward
                el.classList.add('above');
            } else {
                // Scrolling up → fade downward
                el.classList.remove('visible');
                el.classList.remove('above');
            }
        }
    });
}, { threshold: 0.2 });

sections.forEach(el => sectionObserver.observe(el));

// PAGE FADE-IN
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-enter");
});

//Auto play on hover
document.querySelectorAll('.service-card').forEach(card => {
    const video = card.querySelector('.service-video');
    if (!video) return;

    card.addEventListener('mouseenter', () => video.play());
    card.addEventListener('mouseleave', () => video.pause());
});

// PAGE FADE-OUT ON LINK CLICK
document.querySelectorAll("a[href]:not(.no-exit)").forEach(link => {
    const url = link.getAttribute("href");

    // Skip anchors and external links
    if (url.startsWith("#") || url.startsWith("http")) return;

    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.add("page-exit");

        setTimeout(() => {
            window.location = url;
        }, 600); // match CSS transition
    });
});



// CLICK SERVICE CARD → OPEN NEW TAB
document.querySelectorAll(".service-card").forEach(card => {
    const link = card.dataset.link;
    if (!link) return;

    card.addEventListener("click", () => {
        window.open(link, "_blank"); // opens in new tab
    });
});


// AUTOPLAY GALLERY VIDEOS ON HOVER
document.querySelectorAll(".gallery-video").forEach(video => {
    video.addEventListener("mouseenter", () => video.play());
    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});


const mediaModal = document.getElementById("media-modal");
const modalImage = document.getElementById("modal-image");
const modalIframe = document.getElementById("modal-iframe");
const closeMedia = document.querySelector(".close-media");

// Open YouTube video fullscreen
document.querySelectorAll(".video-thumb").forEach(thumb => {
    const ytID = thumb.dataset.youtube;

    thumb.addEventListener("click", () => {
        modalImage.style.display = "none";
        modalIframe.style.display = "block";

        modalIframe.src = `https://www.youtube.com/embed/${ytID}?autoplay=1`;

        mediaModal.style.display = "flex";
    });
});

// Open photo fullscreen
document.querySelectorAll(".photo-thumb, .portfolio-img").forEach(img => {
    img.addEventListener("click", () => {
        modalIframe.src = "";
        modalIframe.style.display = "none";

        modalImage.src = img.src;
        modalImage.style.display = "block";

        mediaModal.style.display = "flex";
    });
});

// Close modal
closeMedia.addEventListener("click", () => {
    modalIframe.src = "";
    mediaModal.style.display = "none";
});

// Close when clicking outside
mediaModal.addEventListener("click", (e) => {
    if (e.target === mediaModal) {
        modalIframe.src = "";
        mediaModal.style.display = "none";
    }
});



