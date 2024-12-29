// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { setupBasicScene } from "./06-09-01-helpers.js";

// students can use the object loader
// uncomment this if necessary
// import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

/** Setup the window */
/** @type{number} */
let wid = 670; // window.innerWidth;
/** @type{number} */
let ht = 500; // window.innerHeight;
/** @type{T.WebGLRenderer} */
let renderer = new T.WebGLRenderer({preserveDrawingBuffer:true});
renderer.setSize(wid, ht);
renderer.shadowMap.enabled = true;

document.getElementById("museum_area").appendChild(renderer.domElement);
renderer.domElement.id = "canvas";

/* setupBasicScene creates a scene and puts the pedestals in place */
/** @type{T.Scene} */
let scene = setupBasicScene();

// Here, we add a basic, simple first object to the museum.
/**@type{T.Material} */
let material = new T.MeshPhongMaterial({
  color: 0x517859,
  shininess: 40,
  specular: "#00ff00",
});
/**@type{T.BufferGeometry} */
let geometry = new T.BoxGeometry(0.5, 0.5, 0.5);
/**@type{T.Mesh} */
let cube = new T.Mesh(geometry, material);
cube.position.set(2, 1.35, 2);
cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
cube.castShadow = true;

// TODO: You need to create three more objects, and place them on pedestals.
//Note: I used the following website to choose my shapes: https://blog.logrocket.com/three-js-geometries-and-materials/s
//object #1:
let material2 = new T.MeshPhongMaterial({
  color: 0xe89bcd,
  shininess: 100,
  specular: "#00ff00"
});
let geometry2 = new T.DodecahedronGeometry(0.3);
let dodecahedron = new T.Mesh(geometry2, material2);
dodecahedron.position.set(2, 1.35, -2);
dodecahedron.castShadow = true;
scene.add(dodecahedron); 

//object #2:
let material3 = new T.MeshPhongMaterial({
  color: 0x8a725a,
  shininess: 100,
  specular: "#bf8932"
});
let geometry3 = new T.SphereGeometry(0.3, 32, 32);
let sphere = new T.Mesh(geometry3, material3);
sphere.position.set(-2, 1.35, 2);
sphere.castShadow = true;
scene.add(sphere);

//object #3:
let material4 = new T.MeshPhongMaterial({
  color: 0x8db6cc, 
  shininess: 40,
  specular: "#00ff00"
});
let geometry4 = new T.TorusGeometry(0.3, 0.2, 16, 100);
let torus = new T.Mesh(geometry4, material4);
torus.position.set(-2, 1.35, -2); 
torus.castShadow = true;
scene.add(torus);


/* put a spotlight on the first object */
/**@type{T.SpotLight} */
let spotlight_1 = new T.SpotLight(0xaaaaff, 50);
spotlight_1.angle = Math.PI / 16;
//set position:
spotlight_1.position.set(2, 5, 2);
//set target so it targets the cube:
spotlight_1.target = cube;
spotlight_1.castShadow = true;
scene.add(spotlight_1);

// TODO: You need to place the lights.
let spotlight_2 = new T.SpotLight(0xaaaaff, 50);
spotlight_2.angle = Math.PI / 16;
//set position:
spotlight_2.position.set(2, 5, -2);
//set the target so it targets the dodecahedron:
spotlight_2.target = dodecahedron;
spotlight_2.castShadow = true;
scene.add(spotlight_2);
let spotlight_3 = new T.SpotLight(0xaaaaff, 50);
spotlight_3.angle = Math.PI / 16;
//set the position:
spotlight_3.position.set(-2, 5, 2);
//set the target so it targets the sphere:
spotlight_3.target = sphere;
spotlight_3.castShadow = true;
scene.add(spotlight_3);
let spotlight_4 = new T.SpotLight(0xaaaaff, 50);
spotlight_4.angle = Math.PI / 16;
spotlight_4.position.set(-2, 5, -2);
spotlight_4.target = torus;
spotlight_4.castShadow = true;
scene.add(spotlight_4);

//add ambient lighting:
let ambientLight = new T.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

/** create a "main camera" */
/** @type{T.PerspectiveCamera} */
let main_camera = new T.PerspectiveCamera(60, wid / ht, 1, 100);
main_camera.position.set(0, 4, 6);
main_camera.rotation.set(-0.5, 0, 0);

/** this will be the "current camera" - we will switch when a button is pressed */
let active_camera = main_camera;

// TODO: You need to place these cameras.
let camera_1 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
//move camera to look at cube head on (chose for all of these to look at it straight on instead of above)
camera_1.position.set(2, 2, 4);
camera_1.lookAt(cube.position);
//move camera to look at the dodecahedron head on
let camera_2 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_2.position.set(2, 2, -4);
camera_2.lookAt(dodecahedron.position);
//move camera to look at the sphere head on
let camera_3 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_3.position.set(-2, 2, 4);
camera_3.lookAt(sphere.position);
//move camera to look at the torus head on
let camera_4 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_4.position.set(-2, 2, -4);
camera_4.lookAt(torus.position);

scene.add(cube);

// add orbit controls - but only to the main camera
let controls = new OrbitControls(main_camera, renderer.domElement);

/** Tie the buttons to the cameras */
function setupCamButton(name, camera) {
  const button = document.getElementById(name);
  if (!(button instanceof HTMLButtonElement))
    throw new Error(`Button ${name} doesn't exist`);
  button.onclick = function () {
    active_camera = camera;
    renderer.render(scene, active_camera);
  };
}
setupCamButton("main_cam", main_camera);
setupCamButton("cam_1", camera_1);
setupCamButton("cam_2", camera_2);
setupCamButton("cam_3", camera_3);
setupCamButton("cam_4", camera_4);

// finally, draw the scene. Also, add animation.
renderer.render(scene, active_camera);

let lastTimestamp; // undefined to start

function animate(timestamp) {
  // Convert time change from milliseconds to seconds
  let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
  lastTimestamp = timestamp;

  // TODO: animate your objects
  //PLEASE NOTE: CHATGPT INFLUENCE IN LINE 177:

  //chatGPT was partially used in line 177 - it was my own idea to use the sin function for bobbing,
  //my original line of code was: let bobbing = Math.sin(timestamp * 0.001). This did not work, so I 
  //fed that line to chatGPT and it gave me the following formula:
  // Math.sin(timestamp * 0.001 * bobbingFrequency + bobbingOffset) * bobbingAmplitude
  //in that formula, bobOffset is used to control the starting point of the bobbing motion, the bobbingAmplitude
  //is used to determine the amplitude of the bobbing (i.e. how far up and down it goes), and the bobbingFrequency
  //is used to determine the speed at which it bobs up and down.
  //The offset is added due to determining the position, the frequency is multiplied within the sin function, which
  //we've learned before is how you can manipulate speed, and the actual amplitude is multiplied outside
  //because that is how you scale the outputs from the sin function to make a more or less "intense" bobbing motion.
  //to find these values, I mostly played around with it until I was satisfied with what I was seeing.
    let bobbing = Math.sin(timestamp * 0.001 * 2 + 0.5) * 0.0017;
    let oscillation = Math.sin(timestamp * 0.001 * 1.5 + 1) * 0.004;
    //played around a bit with dodecahedron - see below
    let moveAround = Math.sin(timestamp * 0.001 * 2 + 8) * 0.5;
    //update position by adding the bobbing value (it will go down as well since sin oscillates from -1 to 1)
    torus.position.y += bobbing; //bobs
    sphere.position.z += oscillation; //oscillates
    //attempted to get a v shape with absolute value, but it kind of does a zig zag or
    //repeated V instead. I thought it was cool, so kept it:
    dodecahedron.position.x += oscillation * 2;
    dodecahedron.position.y = Math.abs(moveAround) + 1.2;
  //the rotation aspect of the shapes ; uses rotateOnWorldAxis
  cube.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
  torus.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
  sphere.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);

  //summary of movements:
  // - cube spins
  // - torus spins & floats
  // - sphere rolls back and forth
  // - dodecahedron bounces in a zig zag path back and forth
  
  //render and make sure to call the loop again so we are continuously updating animation frame
  renderer.render(scene, active_camera);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
