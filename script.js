// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
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

function threeInit() {
  let threeScene, camera, renderer;
  threeScene = new THREE.Scene();
  threeScene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;

  controls = new THREE.OrbitControls(camera);
  controls.addEventListener("change", renderer);

  hlight = new THREE.AmbientLight(0x404040, 100);
  threeScene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  threeScene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);
  threeScene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);
  threeScene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);
  threeScene.add(light3);

  light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-500, 300, 500);
  threeScene.add(light4);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.load("./assets/scene.gltf", function (gltf) {
    car = gltf.threeScene.children[0];
    car.scale.set(0.5, 0.5, 0.5);
    threeScene.add(gltf.threeScene);
    animate();
  });
}
function animate() {
  renderer.render(threeScene, camera);
  requestAnimationFrame(animate);
}
threeInit();
