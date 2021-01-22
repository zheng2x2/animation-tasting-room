/** 
//"gsap.from/to" allows us to animate to a certain state or from a certain state
// Now all of our elements are already in their final "to" destination.
// let's use an animation of from.
gsap.from('.header', { 
    duration: 1,
    y: '-100%', //upwards 100% of its whole height
    ease: 'bounce'
} )

// animating our links so that they actually fade into the page 
// instead of appearing on the page to begin with 
gsap.from('.link', {
    duration: 2,
    opacity: 0,
    delay: 1,
    stagger: .5, //put a delay between each one of the elements that's selected by '.link' so that each link comes in one after the other instead of all coming in at the exact same time
})
gsap.from('.right', {
    duration: 1,
    x: '-100vw', //make it fly in from the left side of our screen
    delay: 1,
    ease: 'power2.in' //speed up at the end
})
gsap.from('.left', {
    duration: 1,
    delay: 1.5, //it comes in half way through this right animation
    x: '-100%', //make it fly in from the left side of our screen
    ease: 'power2.in' //speed up at the end
})
gsap.to('.footer', {
    duration: 1,
    y: 0,
    ease: 'elastic',
    delay: 2.5 // it occurs right ater our left animation is done
})
gsap.fromTo('button', // this allows you to specify both the from value and the to value.
                    // you don't have to worry abt any default styles in your CSS.
{ //from
    opacity: 0, //we want it to fade in
    scale: 0,
    rotation: 720
},
{ //to
    duration: 1,
    delay: 3.5,
    opacity: 1,
    scale: 1,
    rotation: 0
}) */

//timeline allows us to do is combined a bunch of different animations that? all occur one after another 
//that way if you change the duration of the first animation, 
//all the other animations are going to stagger theirselves properly after that animation
const timeline = gsap.timeline( { defaults: { duration: 1} } ) 
timeline
    .from('.header', { y: '-100%', ease: 'bounce' })
    .from('.link', { opacity: 0, stagger: .5 })
    .from('.right', { x: '-100vw', ease: 'power2.in' }, 1) //want to start as soon as the header finished not after the links
                                                        // thie 3rd prop can either be a relative delay or can be an absolute delay
                                                        // absolute delay would be from when the timeline starts
                                                        // relative delay would be from when the last animation finished
    .from('.left', { x: '-100%' }, '<.5') //we want this to start half a second after the right side animation
                                        //the left caret is referencing when the previous animation starts
                                        //just saying '<' will start the exact same time with the right side animation
                                        //but we added in a delay of 0.5 so that it will start the half way of right side animation
    .to('.footer', { y: 0, ease: 'elastic' })
    .fromTo('button', { opacity: 0, scale: 0, rotation: 720 }, { opacity: 1, scale: 1, rotation: 0 })

const button = document.querySelector('.button')

button.addEventListener('click', () => { // whenever we click this button we want to reverse our animation
    timeline.timeScale(3) // three times fater ...
    timeline.reverse()
})

const obj = { x: 0 }
gsap.to(obj, { 
    duration: 2, 
    x: 100, 
    onUpdate: () => console.log(obj.x)  
})