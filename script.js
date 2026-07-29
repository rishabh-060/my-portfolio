const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector("aside");
const navLinks = document.querySelectorAll(".nav-link");
const copyEmailButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");
const currentYear = document.getElementById("current-year");
const emailAddress = "verma.rishabh924@gmail.com";

const setThemeIcon = (isLight) => {
  if (!themeIcon) return;
  themeIcon.classList.toggle("ri-sun-line", !isLight);
  themeIcon.classList.toggle("ri-moon-line", isLight);
};

const savedTheme = localStorage.getItem("theme");
const useLightTheme = savedTheme === "light";
document.body.classList.toggle("light-theme", useLightTheme);
document.documentElement.classList.toggle("dark", !useLightTheme);
setThemeIcon(useLightTheme);

themeToggle?.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  document.documentElement.classList.toggle("dark", !isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
  setThemeIcon(isLight);
});

const closeMobileMenu = () => {
  sidebar?.classList.add("-translate-x-full");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  if (!sidebar) return;
  const isOpening = sidebar.classList.contains("-translate-x-full");
  sidebar.classList.toggle("-translate-x-full", !isOpening);
  menuToggle.setAttribute("aria-expanded", String(isOpening));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 1024) closeMobileMenu();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && window.innerWidth < 1024) {
    closeMobileMenu();
  }
});

const sections = [...document.querySelectorAll("main section[id]")];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
);

sections.forEach((section) => observer.observe(section));

copyEmailButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailAddress);
    if (copyStatus) copyStatus.textContent = "Email copied to clipboard.";
  } catch {
    if (copyStatus) {
      copyStatus.textContent = `Copy failed. Email me directly at ${emailAddress}.`;
    }
  }
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    gsap.fromTo(
      "#sidebar, #site-logo",
      { x: "-18%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.7, ease: "power3.out" }
    );
  });

  window.addEventListener("load", () => {
    const timeline = gsap.timeline({ defaults: { duration: 0.75, ease: "power3.out" } });
    timeline
      .from("#hero .status-pill", { y: 14, opacity: 0, stagger: 0.08 })
      .from("#hero h1, #hero h2", { y: 24, opacity: 0, stagger: 0.08 }, "-=0.2")
      .from("#hero p, #hero .btn-primary, #hero .btn-secondary, #hero .btn-ghost", { y: 18, opacity: 0, stagger: 0.06 }, "-=0.25")
      .from("#hero img, #hero .snapshot-list li", { y: 22, opacity: 0, scale: 0.98, stagger: 0.07 }, "-=0.25");
  });

  gsap.utils.toArray(".section-heading").forEach((heading) => {
    gsap.from(heading.children, {
      scrollTrigger: {
        trigger: heading,
        start: "top 86%",
      },
      y: 18,
      opacity: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: "power2.out",
    });
  });

  gsap.utils.toArray(".stat-card, .skill-card, .timeline-card, .project-card, .info-card, .contact-action").forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
      },
      y: 24,
      opacity: 0,
      duration: 0.58,
      ease: "power2.out",
    });
  });
}
