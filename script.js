/* =========================
   MOBILE MENU TOGGLE
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll("#navMenu a");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        
        // Toggle icon between hamburger and close cross
        const icon = menuBtn.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");
        }
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
            }
        });
    });
}


/* =========================
   DYNAMIC NAVBAR ON SCROLL
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = "rgba(34, 211, 238, 0.25)";
        navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    } else {
        navbar.style.borderBottomColor = "var(--border)";
        navbar.style.boxShadow = "none";
    }
});


/* =========================
   ACTIVE NAV LINK ON SCROLL
========================= */

const sections = document.querySelectorAll("section[id]");

const highlightActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute("id");
        const correspondingLink = document.querySelector(`#navMenu a[href*=${sectionId}]`);

        if (correspondingLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink.style.color = "var(--primary)";
            } else {
                correspondingLink.style.color = "var(--muted)";
            }
        }
    });
};

window.addEventListener("scroll", highlightActiveNavLink);


/* =========================
   INTERSECTION OBSERVER (SCROLL REVEAL)
========================= */

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select elements to animate as user scrolls
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(
        ".stat-card, .skill-card, .project-card, .timeline-content, .education-card, .contact-box"
    );

    animatedElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1), transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)";
        revealOnScroll.observe(el);
    });
});


/* =========================
   DYNAMIC FOOTER YEAR
========================= */

const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}