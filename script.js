function loadingAnimation(){
    gsap.from("#hero img,#hero h2,#hero p,#hero #mail", {
        y: 100,
        opacity:0,
        delay:0.5,
        duration:0.6,
        stagger: 0.2
    })

    gsap.from("#nav-menu li, #nav-menu-2 li", {
        x : 20,
        opacity : 0,
        delay : 0.3,
        duration : 0.3,
        stagger : 0.1,
    })

    gsap.from("#nav-sec h1", {
        y : -50,
        opacity : 0,
        duration : 0.8,
        delay : 0.3,
    })

    gsap.from("#pr-dets h3, #pr-dets h5 , #pr-img img",{
        y : 50,
        opacity : 0,
        delay : 0.3,
        duration : 0.3,
        stagger : 0.1,
        scrollTrigger : "#projects",
    })
    
    gsap.from("#contact a",{
        y : -100,
        opacity : 0,
        delay : 0.3,
        duration : 1.2,
        scrollTrigger : "#contact a",
    })
}

loadingAnimation()