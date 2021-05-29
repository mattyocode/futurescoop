let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline
  .fromTo(".fore", { y: 30 }, { y: -50, duration: 3 })
  .fromTo(".middle", { y: 20 }, { y: -20, duration: 3 }, "-=3")
  .fromTo(".bg", { y: -50 }, { y: 30, duration: 3 }, "-=3")
  .to(".content", 3, { top: "-50" }, "-=3");

// timeline.fromTo(
//   ".text",
//   { y: -25, opacity: 0 },
//   { y: 0, opacity: 1, duration: 2 }
// );

let scene = new ScrollMagic.Scene({
  triggerElement: "section",
  duration: "200%",
  triggerHook: 0, // between 0 and 1
})
  .setTween(timeline)
  .setPin("section")
  .addTo(controller);
