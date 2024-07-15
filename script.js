function loadingAnimation(){
    gsap.from("#hero img,#hero h2,#hero p,#hero #resume,#hero #mail", {
        y: 100,
        opacity:0,
        delay:0.5,
        duration:0.6,
        stagger: 0.2
    })
}

loadingAnimation()

