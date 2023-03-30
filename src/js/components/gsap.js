import { gsap, Power2 } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let tl2

window.addEventListener('load', (event) => {
  animateHero()
  animateSteps()
  animateTick()
  home.addEventListener('pointerleave', animateHeroEnd, { once: true })
})

function animateSteps() {
  let tl = gsap.timeline()
  const progressBarWrapperHeight = parseFloat(getComputedStyle(document.getElementById('progressBarWrapper')).height)
  const steps = Array.from(document.querySelectorAll('.step'))
  const stepsHeight = steps.map(step => parseFloat(getComputedStyle(step).height))
  let stepCounter = 0
  let progressBarHeight = 0

  function getBarHeight() {
      progressBarHeight += stepsHeight[stepCounter]
      stepCounter++
      const progressBarHeightPercent = (progressBarHeight * 100 / progressBarWrapperHeight) + '%'
      return progressBarHeightPercent
  }

  tl
  .to('#step1', {
    opacity: 1,
    duration: 1,
    delay: 0.5,
  })
  .to('#pc', {
    rotate: -10,
    transformOrigin:"center",
    duration: 0.35,
    repeat: 1, 
    yoyo: true
  })
  .to('#mouse', {
    x: 7,
    y: -17,
    duration: 0.35,
    repeat: 1, 
    yoyo: true,
  }, "<")
  .to('#progressBar', {
    height: getBarHeight(),
    duration: 0.5,
  }, ">")
  .to('#step2', {
    opacity: 1,
    duration: 1,
  }, ">") 
  .to('#calculator', {
    rotate: 15,
    x: -5,
    transformOrigin:"center",
    duration: 0.25,
    repeat: 1, 
    yoyo: true
  })
  .to('#coin', {
    rotate: 15,
    x: -5,
    transformOrigin:"center",
    duration: 0.25,
    repeat: 1, 
    yoyo: true,
  }, "<")
  .to('#progressBar', {
    height: getBarHeight(),
    duration: 0.7,
  })
  .to('#step3', {
    opacity: 1,
    duration: 1,
  })
  .to('#car', {
    // rotate: 8,
    // x: 7.88,
    // // y: 5.18,
    // y: 3.95,
    rotate: 8,
    x: 7.88,
    y: 6.95,
    transformOrigin:"center",
    duration: 0.3,
    repeat: 1, 
    yoyo: true
  })
  .to('#jackscrew', {
    rotate: 8,
    x: -1,
    y: -6.95,
    // rotate: 8,
    // x: -1,
    // y: -3.95,
    transformOrigin:"center",
    duration: 0.3,
    repeat: 1, 
    yoyo: true,
  }, "<")
  .to('#jackscrewDetail', {
    x: 4,
    y: 10,
    duration: 0.3,
    repeat: 1, 
    yoyo: true,
  }, "<")
  .to('#progressBar', {
    height: getBarHeight(),
    duration: 0.5,
  }, ">")
  .to('#step4', {
    opacity: 1,
    duration: 1,
  })
  .to('#papers', {
    rotate: -5.39,
    transformOrigin:"center",
    duration: 0.25,
    repeat: 1, 
    yoyo: true
  })
  .to('#pen', {
    rotate: 10.95,
    transformOrigin:"center",
    duration: 0.25,
    repeat: 1, 
    yoyo: true,
  }, "<")
  .to('#papers', {
    rotate: 6.9,
    transformOrigin:"center",
    duration: 0.25,
    repeat: 1, 
    yoyo: true
  })
  .to('#pen', {
    rotate: 7.6,
    transformOrigin:"center",
    duration: 0.25,
    repeat: 1, 
    yoyo: true,
  }, "<")
    .to('#progressBar', {
    height: getBarHeight(),
    duration: 0.5,
  }, ">")
  .to('#step5', {
    opacity: 1,
    duration: 1,
  })
  .to('.block1', {
    y: -15,
    duration: 0.25,
    repeat: 1, 
    yoyo: true
  })
  .to('.block2', {
    y: -10,
    duration: 0.25,
    repeat: 1, 
    yoyo: true
  }, "<")
  .to('.block3', {
    y: -5,
    duration: 0.25,
    repeat: 1, 
    yoyo: true
  }, "<")
  .fromTo('.drop', {
    opacity: 0,
    duration: 0.5,
  }, {
    opacity: 1,
    duration: 0.5,
  })
  .to('#progressBar', {
    height: getBarHeight(),
    duration: 0.5,
  }, ">")


  ScrollTrigger.create({
    animation: tl,
    trigger: '#sectionHow',
  })

}

function animateTick() {
  const tl1 = gsap.timeline()

  const stage1 = 'M531 147.008L500.508 117.5L486.008 132L516.008 162L531 147.008Z'
  const stage2 = 'M568.507 109.5L554.007 95.0001L501.5 147.492L516.007 162L568.507 109.5Z'

  ScrollTrigger.batch("#thirtyMinSection", {
    start: 'top center',
    onEnter: (elements, triggers) => {
      tl1
      .to('#tick1', {
        opacity: 1,
        duration: 0.1,
        delay: 0,
      })
      .to('#tick1', {
        attr: { d: stage1 },
        ease: Power2.easeIn,
        duration: 0.35,
      })
      .to('#tick2', {
        opacity: 1,
        duration: 0,
      })
      .to('#tick2', {
        attr: { d: stage2 },
        ease: Power2.easeIn,
        duration: 0.35,
      })
    },
  });
}

function animateHero() {
  tl2 = gsap.timeline()

  const svgWidth = document.getElementById('bigCar').closest('svg').clientWidth
  const xBigCar = svgWidth * 12.59 / 100
  const yBigCar = svgWidth * 4.39 / 100

  const xRoadLineTo = -1516
  const yRoadLineTo = -713
  
  tl2
  .to('#bigCar', {
    x: xBigCar,
    y: yBigCar,
    repeat: -1, 
    duration: 0.75,
    delay: 0,
    yoyo: true,
  })
  .to('#roadLine', {
    x: xRoadLineTo,
    y: yRoadLineTo,
    repeat: -1, 
    duration: 0.35,
    delay: 0,
    yoyo: true,
  }, "<")


  ScrollTrigger.create({
    animation: tl2,
    trigger: '#home',
  })
}

function animateHeroEnd() {
  tl2.getChildren()[0].repeat(1)
  tl2.getChildren()[1].repeat(1)

  const tl3 = gsap.timeline()

  const xBigCarEnd = 2300
  const yBigCarEnd = 1200

  const xRoadLineFrom = -1516
  const yRoadLineFrom = -713
  const xRoadLineTo = -758
  const yRoadLineTo = -225

  tl3
  .to('#bigCar', {
    x: xBigCarEnd,
    y: yBigCarEnd,
    repeat: 0, 
    duration: 2,
    delay: 0,
    yoyo: false,
  })
  .fromTo('#roadLine', {
    x: xRoadLineFrom,
    y: yRoadLineFrom,
    repeat: 0, 
    duration: 0.35,
    delay: 0,
    yoyo: false,
  }, {
    x: xRoadLineTo,
    y: yRoadLineTo,
    repeat: 0, 
    duration: 1.35,
    delay: 0,
    yoyo: false,
  },  "<")
}