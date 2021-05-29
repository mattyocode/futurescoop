// import "./style.css";
// import * as THREE from "three";

let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline
  .fromTo(".fore", { y: 30 }, { y: -50, duration: 3 })
  .fromTo(".middle", { y: 0 }, { y: -30, duration: 3 }, "-=3")
  .fromTo(".bg", { y: -30 }, { y: 10, duration: 3 }, "-=3")
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

const canvas = document.querySelector("canvas.webgl");

const loader = new THREE.GLTFLoader();
loader.load(
  "./assets/scene.gltf",
  function (gltf) {
    THREE.Scene.add(gltf.scene);

    gltf.animations;
    gltf.scene;
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

const threeScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(threeScene, camera);
}
animate();
