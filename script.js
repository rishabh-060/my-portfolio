// Card animation
gsap.utils.toArray("#project-item, #education-item, #certificate-item, #skill-item, #experience-item").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    y: 80,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1,
    ease: "power3.out"
  });
});

window.addEventListener("load", () => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    // Animate image
    tl.from("#hero img", {
      y: -50,
      opacity: 0,
      scale: 0.8,
    })

    // Animate heading
    .from("#hero h2", {
      y: 30,
      opacity: 0,
    }, "-=0.5")

    // Animate paragraph
    .from("#hero p", {
      y: 30,
      opacity: 0,
    }, "-=0.5");
  });


  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#about h2", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%", // when top of section hits 80% of viewport
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