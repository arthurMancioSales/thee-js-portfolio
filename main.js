import * as three from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"

//Basic Setup
const scene = new three.Scene();

const camera = new three.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    100
);
camera.position.z = 86;

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
spotLight.castShadow = true
spotLight.position.set(0, 64, 32)
scene.add(spotLight)

const loader = new GLTFLoader();
loader.load('src/models/portfolio quarto primeira pessoa.glb', (gltf) => {
    gltf.scene.traverse(c => {
        c.castShadow = true
    })
    scene.add(gltf.scene)
})

const animate = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()