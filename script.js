let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline
  .fromTo(".fore", { y: 30 }, { y: -60, duration: 3 })
  .fromTo(".scene", { y: 0 }, { y: -50, duration: 3 }, "-=3")
  .fromTo(".middle", { y: 0 }, { y: -30, duration: 3 }, "-=3")
  .fromTo(".bg", { y: -50 }, { y: 0, duration: 3 }, "-=3")
  .to(".content-wrapper", 3, { top: "-50" }, "-=3")
  .fromTo(
    ".text",
    { y: -60, opacity: 0 },
    { y: 0, opacity: 1, duration: 3 },
    "-=2"
  );

let scrollScene = new ScrollMagic.Scene({
  triggerElement: "section",
  duration: "200%",
  triggerHook: 0, // between 0 and 1
})
  .setTween(timeline)
  .setPin("section")
  .addTo(controller);

// Variables for set up

let container;
let camera;
let renderer;
let scene;
let icecream;

function init() {
  container = document.querySelector(".scene");

  // Create scene
  scene = new THREE.Scene();

  // Camera set up
  const fov = 35; // field of view in degrees
  const aspect = container.clientWidth / container.clientHeight;

  // clipping distance range in which you can see objects
  const near = 0.1;
  const far = 500;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 175);

  // Ambient light
  const ambient = new THREE.AmbientLight(0x404040, 2.5); // args = color & intensity
  scene.add(ambient);

  // Directional light
  const light = new THREE.DirectionalLight(0x222222, 1.5);
  light.position.set(10, 10, 250);
  scene.add(light);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // edges blurred slightly to look smooth when moving/zooming
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Load model

  let loader = new THREE.GLTFLoader();
  loader.load("./3d/scene.gltf", function (gltf) {
    // gltf.scene.traverse(function (child) {
    //   if (child.isMesh) {
    //     child.geometry.center();
    //   }
    // });
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.x += gltf.scene.position.x = center.x;
    gltf.scene.position.y += gltf.scene.position.y = center.y;
    gltf.scene.position.z += gltf.scene.position.z = center.z;

    scene.add(gltf.scene);
    icecream = gltf.scene.children[0];
    tick();
  });
}

// Interactivity

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
};

document.addEventListener("mousemove", onDocumentMouseMove);

// function animate() {
//   requestAnimationFrame(animate);
//   targetX = mouseX * 0.01;
//   targetY = mouseY * 0.01;
//   icecream.rotation.z += 0.05;
//   icecream.rotation.z += 0.05 * (targetX - icecream.rotation.z);

//   renderer.render(scene, camera);
// }

const clock = new THREE.Clock();

function tick() {
  const elapsedTime = clock.getElapsedTime();
  targetX = mouseX * 0.005;
  targetY = mouseY * 0.005;
  icecream.rotation.z = elapsedTime;
  icecream.rotation.z += 0.4 * (targetX - icecream.rotation.z * 2);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

function onWindowResize() {
  console.log("resize runs");
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

init();
tick();
