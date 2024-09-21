let img = document.getElementById('hero-img');
let cv = document.getElementById('cv');



gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#right-aside"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#right-aside" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#right-aside", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#right-aside").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



img.addEventListener("mouseenter", function(){
    img.style.opacity = "0.6";
})

img.addEventListener("mouseleave", function(){
    img.style.opacity = "1";
})

// cv.addEventListener("mouseenter", function(){
//     cv.innerHTML = `<i class="ri-download-2-fill"></i>`
// })

// cv.addEventListener("mouseleave", function(){
//     cv.innerHTML = `<span><video src="icons/cv.mp4" muted autoplay loop></video></span>`
    
// });

function loadingAnimation(){
    gsap.from("#hero img,#hero h2,#hero p,#hero #mail", {
        y: 100,
        opacity:0,
        delay:0.5,
        duration:0.6,
        stagger: 0.2,
        // scale:1.4,
        scrollTrigger : "#hero",
    })

    gsap.from("#nav-menu li, #nav-menu-2 li", {
        x : 20,
        opacity : 0,
        delay : 0.3,
        duration : 0.3,
        stagger : 0.1,
        scrollTrigger : "#hero",
    })

    gsap.from("#nav-sec h1", {
        y : -50,
        opacity : 0,
        duration : 0.8,
        delay : 0.3,
    })

    gsap.from("#pr-dets h3, #pr-dets h5",{
        y : 50,
        opacity : 0,
        delay : 0.3,
        duration : 0.3,
        stagger : 0.1,
        // repeat : -1,
        // yoyo: true,
        // ease: "sine.inOut",
        scrollTrigger : {
            trigger: ".project-item",
            start: 'top bottom', // When the top of the section hits the bottom of the viewport
            end: 'bottom top', // When the bottom of the section hits the top of the viewport
            scrub: true, // Smooth animation linked to scroll progress
            markers: true,
            scroller : "#right-aside",,
            markers: false
        }
        
    })
    
    gsap.from("#pr-img img",{
        y : 50,
        opacity : 0,
        scale : 0,
        delay : 0.1,
        duration : 0.4,
        stagger : 0.1,
        scrollTrigger : {
            trigger: ".project-item",
            start: 'top bottom', // When the top of the section hits the bottom of the viewport
            end: 'bottom top', // When the bottom of the section hits the top of the viewport
            scrub: true, // Smooth animation linked to scroll progress
            markers: true,
            scroller : "#right-aside",
            markers: false
        }
    })

    gsap.from(".education-item h3,.education-item p",{
        y : 80,
        opacity : 0,
        delay : 0.1,
        duration : 0.5,
        stagger : 0.1,
        scrollTrigger : {
            trigger: ".education-item",
            start: 'top bottom', // When the top of the section hits the bottom of the viewport
            end: 'bottom top', // When the bottom of the section hits the top of the viewport
            scrub: true, // Smooth animation linked to scroll progress
            markers: true,
            scroller : "#right-aside",
            markers: false
        }
    })

    gsap.from(".experience-item h3,.experience-item p",{
        y : 50,
        opacity : 0,
        delay : 0.3,
        duration : 0.6,
        stagger : 0.1,
        scrollTrigger : {
            trigger: ".experience-item",
            start: 'top 70%', // When the top of the section hits the bottom of the viewport
            end: 'bottom 70%', // When the bottom of the section hits the top of the viewport
            scrub: true, // Smooth animation linked to scroll progress
            markers: true,
            scroller : "#right-aside",
            markers: false
        }
    })
    
    gsap.from("#contact a",{
        x : 50,
        opacity : 0,
        delay : 0.3,
        duration : 1.2,
        stagger : 0.1,
        scrollTrigger : {
            trigger: "#contact a",
            start: 'top 90%', // When the top of the section hits the bottom of the viewport
            end: 'bottom 90%', // When the bottom of the section hits the top of the viewport
            scrub: true, // Smooth animation linked to scroll progress
            markers: true,
            scroller : "#right-aside",
            markers: false
        }
    })

}


loadingAnimation()

const scroll = new LocomotiveScroll({
    el: document.querySelector('#right-aside'),
    smooth: true
});