// Initiate the WOW.js library
if (typeof WOW !== "undefined") {
    new WOW().init();
}

// Sticky Navbar
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar && window.scrollY > 45) {
        navbar.classList.add("sticky-top", "shadow-sm");
    } else if (navbar) {
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
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

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

// ─── AUTH STATE MANAGEMENT ────────────────────────────────────────────────────

/**
 * Retrieves the current session from localStorage or sessionStorage.
 * @returns {Object|null} session object or null
 */
function getSession() {
    try {
        return JSON.parse(
            localStorage.getItem('bookify_session') ||
            sessionStorage.getItem('bookify_session') ||
            'null'
        );
    } catch (e) {
        return null;
    }
}

/**
 * Updates the navbar profile/login button visibility based on auth state.
 * - Logged in  → show profile icon, hide Login button
 * - Logged out → hide profile icon, show Login button
 *
 * Clicking the profile icon when logged in → goes to profile.html
 * Clicking the profile icon when logged out → goes to login.html
 */
function updateAuthNavbar() {
    const session = getSession();
    const profileBtn = document.getElementById('profile-button');
    const loginBtn = document.getElementById('login-button');

    if (!profileBtn) return; // page doesn't have auth buttons

    if (session && session.loggedIn) {
        // User IS logged in
        profileBtn.style.display = 'flex';
        profileBtn.href = 'profile.html';
        profileBtn.title = 'My Profile';
        if (loginBtn) loginBtn.style.display = 'none';
    } else {
        // User is NOT logged in
        // Keep profile icon visible but redirect to login on click
        profileBtn.style.display = 'flex';
        profileBtn.href = 'login.html';
        profileBtn.title = 'Login to view profile';
        if (loginBtn) loginBtn.style.display = 'none';
    }
}

// Run immediately on every page load
document.addEventListener('DOMContentLoaded', updateAuthNavbar);

// Back to top button
window.addEventListener('scroll', function () {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }
});