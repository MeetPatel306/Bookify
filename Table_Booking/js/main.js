// Initiate the WOW.js library
if (typeof WOW !== "undefined") {
    new WOW().init();
}

// Sticky Navbar
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 45) {
        navbar.classList.add("sticky-top", "shadow-sm");
    } else {
        navbar.classList.remove("sticky-top", "shadow-sm");
    }
});

// Modal Video
const btnPlay = document.querySelectorAll(".btn-play");
let videoSrc = "";

btnPlay.forEach(btn => {
    btn.addEventListener("click", function () {
        videoSrc = this.getAttribute("data-src");
    });
});

const videoModal = document.getElementById("videoModal");
const videoElement = document.getElementById("video");

if (videoModal) {
    videoModal.addEventListener("shown.bs.modal", function () {
        videoElement.setAttribute("src", videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
    });

    videoModal.addEventListener("hide.bs.modal", function () {
        videoElement.setAttribute("src", "");
    });
}

// Filter button click handlers
const filterButtons = document.querySelectorAll('.filter-btn');
const carousels = document.querySelectorAll('.carousel');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show selected carousel, hide others
        const targetCarousel = button.getAttribute('data-target');
        carousels.forEach(carousel => {
            if (carousel.id === targetCarousel) {
                carousel.classList.add('active');
            } else {
                carousel.classList.remove('active');
            }
        });
    });
});