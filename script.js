const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector("aside");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");
const contactSubmit = document.getElementById("contact-submit");
const formStatus = document.getElementById("form-status");

const setThemeIcon = (isDark) => {
  if (!themeIcon) return;
  themeIcon.classList.toggle("ri-moon-line", !isDark);
  themeIcon.classList.toggle("ri-sun-line", isDark);
};

const preferredDark =
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

document.documentElement.classList.toggle("dark", preferredDark);
setThemeIcon(preferredDark);

themeToggle?.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  setThemeIcon(isDark);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = !sidebar.classList.contains("-translate-x-full");
  sidebar.classList.toggle("-translate-x-full", isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
      sidebar.classList.add("-translate-x-full");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });
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

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    gsap.fromTo(
      "#sidebar, #site-logo",
      { x: "-18%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  });

  window.addEventListener("load", () => {
    const timeline = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
    timeline
      .from("#hero .space-y-7 > *", { y: 24, opacity: 0, stagger: 0.12 })
      .from("#hero img", { y: 24, opacity: 0, scale: 0.96 }, "-=0.35");
  });

  gsap.utils.toArray(".stat-card, .skill-card, .timeline-card, .project-card, .info-card").forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
      },
      y: 28,
      opacity: 0,
      duration: 0.65,
      ease: "power2.out",
    });
  });
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (contactSubmit.disabled) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please fill in all required fields.";
    formStatus.className = "mt-4 min-h-6 text-sm font-medium text-red-600";
    return;
  }

  if (!emailPattern.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.className = "mt-4 min-h-6 text-sm font-medium text-red-600";
    return;
  }

  contactSubmit.disabled = true;
  contactSubmit.innerHTML = '<i class="ri-loader-4-line animate-spin" aria-hidden="true"></i>Preparing Email';
  formStatus.textContent = "Opening your email app...";
  formStatus.className = "mt-4 min-h-6 text-sm font-medium text-blue-600";

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );
  const mailto = `mailto:verma.rishabh924@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  window.location.href = mailto;

  window.setTimeout(() => {
    formStatus.textContent = "Message prepared. If your email app did not open, email me directly at verma.rishabh924@gmail.com.";
    formStatus.className = "mt-4 min-h-6 text-sm font-medium text-emerald-600";
    contactSubmit.disabled = false;
    contactSubmit.innerHTML = '<i class="ri-send-plane-line" aria-hidden="true"></i>Open Email App';
  }, 1200);
});
