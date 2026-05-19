const nav = document.getElementById("nav");
const progress = document.getElementById("scrollProgress");
const reveals = document.querySelectorAll(".reveal");
const glow = document.querySelector(".cursor-glow");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function handleScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${pct}%`;
  nav.classList.toggle("scrolled", window.scrollY > 32);
}

window.addEventListener("scroll", handleScroll);
handleScroll();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

reveals.forEach((el) => observer.observe(el));

window.addEventListener("pointermove", (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll("[data-img]").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImg.src = button.dataset.img;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeViewer() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

closeLightbox?.addEventListener("click", closeViewer);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeViewer();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeViewer();
});
