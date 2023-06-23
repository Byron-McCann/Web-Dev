import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize ( window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const geometry = new THREE.TorusKnotGeometry (10, 2, 100,50);
const material = new THREE.MeshStandardMaterial ( {color: "Magenta"} );
const Knot = new THREE.Mesh(geometry, material);

scene.add(Knot);

const pointlight = new THREE.PointLight("Blue");

pointlight.position.set(10,10,10);

const ambientLight = new THREE.AmbientLight(0x89909);
scene.add(pointlight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointlight);
const gridHelper = new THREE.GridHelper(200,50);
lightHelper.position.set(0,0,0);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls (camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: "white"});
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('spacegoburr.jpg');
scene.add(spaceTexture)

function animate () {
  requestAnimationFrame (animate);

  Knot.rotation.x += 0.01;
  Knot.rotation.y += 0.01;
  Knot.rotation.z += 0.01;

controls.update();

  renderer.render (scene, camera);
}


animate();

