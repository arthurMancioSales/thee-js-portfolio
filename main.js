import * as three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { GUI } from "dat.gui";

//Basic Setup
const scene = new three.Scene();

const camera = new three.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    100
);
camera.position.set(1, 4, 0);
camera.rotation.set(0, 7.8, 0);

const clock = new three.Clock();

const canvas = document.querySelector("#threeJs");

const renderer = new three.WebGL1Renderer({
    canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new three.AmbientLight(0xffffff, 0.5);
ambientLight.castShadow = true;
scene.add(ambientLight);

const spotLight = new three.SpotLight(0xffffff, 1);
spotLight.castShadow = true;
spotLight.position.set(0, 64, 32);
scene.add(spotLight);

const loader = new GLTFLoader();
loader.load("src/models/portfolio quarto primeira pessoa.glb", (gltf) => {
    gltf.scene.traverse((c) => {
        c.castShadow = true;
    });
    scene.add(gltf.scene);
});

const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 0;
controls.lookSpeed = 0.1;
controls.lookVertical = false;

const gui = new GUI();

const cameraFolder = gui.addFolder("Camera Options");
const cameraPositionFolder = cameraFolder.addFolder("Position");
cameraPositionFolder.add(camera.position, "x", -100, 100).name("X");
cameraPositionFolder.add(camera.position, "y", -100, 100).name("Y");
cameraPositionFolder.add(camera.position, "z", -100, 100).name("Z");
const cameraRotationFolder = cameraFolder.addFolder("Rotation");
cameraRotationFolder.add(camera.rotation, "x", -10, 10, 0.1).name("X");
cameraRotationFolder.add(camera.rotation, "y", -10, 10, 0.1).name("Y");
cameraRotationFolder.add(camera.rotation, "z", -10, 10, 0.1).name("Z");

const animate = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
    controls.update( clock.getDelta());
};

animate();
