import './style.css'
import * as THREE from 'three';
import { ACESFilmicToneMapping, Quaternion } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();


// < ----------------------------
// CAMERA

// Declaration of the camera: 
/*
* A perspective camera will be used as it is similar to the human eye
* 1. fov : Field of view (degress)
* 2. aspect ratio
* 3 and 4. view frustum 
*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// < ----------------------------
// RENDERER

// Renderer
const renderer = new THREE.WebGL1Renderer({
  canvas : document.querySelector('#bg'),
});

// Setting the pixel ratio and size of the renderer to the users device
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// Changing the camera position (it is located on 0 by default)
camera.position.setZ(10);
camera.position.setY(1.2);
camera.position.setX(-1);
camera.lookAt(0,0,0);
camera.rotation.x = Math.PI/2
camera.updateProjectionMatrix();


renderer.render(scene, camera);

// < ----------------------------
// LIGHTING
/*
* Lighting in Three.js requires the type of lighting and the position
* The light postion is 0 by defect
*/

// Light from the sun
const pointLight = new THREE.PointLight(0xffffff)
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.65)

scene.add(pointLight, ambientLight)

// < ----------------------------
// HELPERS

// Helps to see the location of the light on the screen
const lightHelper = new THREE.PointLightHelper(pointLight)
// Helpss to see the grid 
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

// < ----------------------------
// CONTROLS

// Controls for listening to DOM (mouse) interactions with the screen
const controls = new OrbitControls( camera, renderer.domElement );

// < ----------------------------
// TEXTURES

// Background texture
const spaceTexture = new THREE.TextureLoader().load('textures/background.jpg');
scene.background = spaceTexture;

// < ----------------------------
// OBJECTS

// Creating objects
/*
* In THREE.js creating an object needs 3 steps, namely
* 1 - geometry (form)
* 2 - Material
* 3 - Mesh
* Then, it must be added to the scene
*/
const torusGeometry = new THREE.TorusGeometry( 5, 1, 16, 100 )
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 } );
const torus = new THREE.Mesh( torusGeometry, material );


// Declaring and adding objects with a function
function addStar() {

  const geometry = new THREE.SphereGeometry(0.1, 24, 24); // radius, width segments, height segments
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh( geometry, material );

  // Randomly populates the screen
  const [x,y,z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 300 ) );
  star.position.set(x,y,z);

  scene.add(star)
}

// Adds 400 randomly positioned stars to the proyect
Array(400).fill().forEach(addStar)

// < ----------------------------
// OBJECTS WITH TEXTURE

// SUN
const sunTexture = new THREE.TextureLoader().load('textures/sun-texture.jpeg')

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(6.95,32,32),
  new THREE.MeshStandardMaterial({ emissive: 0xFFAA00, emissiveMap:sunTexture })
);

// MERCURY

const mercuryTexture = new THREE.TextureLoader().load('textures/mercury-texture.jpeg')

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.2,32,16),
  new THREE.MeshStandardMaterial({ map: mercuryTexture })
);

// VENUS
const venusTexture = new THREE.TextureLoader().load('textures/venus-texture.jpeg')

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(0.6,32,16),
  new THREE.MeshStandardMaterial({ map: venusTexture })
);

// EARTH
const earthTexture = new THREE.TextureLoader().load('textures/earth-texture.jpeg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.6,32,32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);

// MARS

const marsTexture = new THREE.TextureLoader().load('textures/mars-texture.jpeg')

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.3,32,32),
  new THREE.MeshStandardMaterial({ map: marsTexture })
);

// JUPYTER

const jupyterTexture = new THREE.TextureLoader().load('textures/jupyter-texture.jpeg')

const jupyter = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({ map: jupyterTexture })
);

// SATURN
const saturnTexture = new THREE.TextureLoader().load('textures/saturn-texture.jpeg')

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial({ map: saturnTexture })
);

const saturnRingTexture = new THREE.TextureLoader().load('textures/saturn-rings-texture.png')

const saturnRing = new THREE.Mesh(
  new THREE.RingGeometry(2.2,3.8,32),
  new THREE.MeshStandardMaterial({map: saturnRingTexture, side: THREE.DoubleSide})
);

// URANUS
const uranusTexture = new THREE.TextureLoader().load('textures/uranus-texture.jpeg')

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(1.5,32,32),
  new THREE.MeshStandardMaterial({ map: uranusTexture })
);

// NEPTUNE

const neptuneTexture = new THREE.TextureLoader().load('textures/neptune-texture.jpeg')

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(1.3,32,32),
  new THREE.MeshStandardMaterial({ map: neptuneTexture })
);

scene.add(sun, mercury, venus, earth, mars, jupyter, saturn, uranus, neptune)
scene.add( saturnRing )

// Distances

mercury.position.z = 13;

venus.position.z = 21.8;

earth.position.z = 29;

mars.position.z = 46;

jupyter.position.z = 148;

saturn.position.z = 294;
saturnRing.rotation.x = -0.5*Math.PI;
saturn.add(saturnRing)


uranus.position.z = 589;

neptune.position.z = 895;

// < ----------------------------
// FUNCTIONS


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera

var earthQuaternion = new THREE.Quaternion();
var mercuryQuaternion = new THREE.Quaternion();
var venusQuaternion = new THREE.Quaternion();
var marsQuaternion = new THREE.Quaternion();
var jupyterQuaternion = new THREE.Quaternion();
var saturnQuaternion = new THREE.Quaternion();
var uranusQuaternion = new THREE.Quaternion();
var neptuneQuaternion = new THREE.Quaternion();

// Loop for rendering in real time
function animate() {
  requestAnimationFrame( animate );

  sun.rotateY(0.004);

  mercuryQuaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), 0.02076);
  mercury.position.applyQuaternion(mercuryQuaternion);
  mercury.rotateY(0.004);

  venusQuaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), 0.00813);
  venus.position.applyQuaternion( venusQuaternion );
  venus.rotation.y += 0.07;

  earthQuaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), 0.005);
  earth.position.applyQuaternion( earthQuaternion );

  marsQuaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), 0.00266);
  mars.position.applyQuaternion( marsQuaternion );
  mars.rotation.y += 0.075;
  
  jupyterQuaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), 0.00042);
  jupyter.position.applyQuaternion( jupyterQuaternion );
  jupyter.rotation.y += 0.075;

  saturnQuaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), 0.00006);
  saturn.position.applyQuaternion( saturnQuaternion );
  saturn.rotation.y += 0.075;

  uranusQuaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), 0.00003);
  uranus.position.applyQuaternion( uranusQuaternion );
  uranus.rotation.y += 0.075;

  neptuneQuaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), 0.005);
  neptune.position.applyQuaternion( neptuneQuaternion );
  neptune.rotation.y += 0.075;

  controls.update();
  renderer.render( scene, camera );
}

animate()