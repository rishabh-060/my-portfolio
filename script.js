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