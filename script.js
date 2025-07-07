// Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Responsive animations using matchMedia
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    // Sidebar and site logo animation (desktop only)
    gsap.fromTo("#sidebar, #site-logo",
      { x: "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Animate each sidebar nav item with a stagger
    gsap.from("#sidebar nav li", {
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: "power2.out"
    });
  });

  // Hero section timeline animation (image, heading, paragraph)
  window.addEventListener("load", () => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.from("#hero img", {
      y: -50,
      opacity: 0,
      scale: 0.8,
    })
    .from("#hero h2", {
      y: 30,
      opacity: 0,
    }, "-=0.5")
    .from("#hero p", {
      y: 30,
      opacity: 0,
    }, "-=0.5");
  });

  // Parallax effect for hero image
  gsap.to("#hero img", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      scrub: true
    },
    y: 50,
    scale: 1.05,
  });

  // About section animation
  gsap.from("#about h2", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#about p", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 75%",
      toggleActions: "play none none none",
    },
    y: 30,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.out",
  });

  // Card reveal animation using ScrollTrigger.batch for performance
  ScrollTrigger.batch("#project-item, #education-item, #certificate-item, #skill-item, #experience-item", {
    start: "top 90%",
    onEnter: batch => gsap.to(batch, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    }),
    onLeaveBack: batch => gsap.to(batch, {
      y: 80,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.in"
    }),
  });

  // Hover animation for interactive card effect
  document.querySelectorAll("#project-item, #education-item, #certificate-item, #skill-item, #experience-item").forEach(card => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power1.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: "power1.inOut" });
    });
  });