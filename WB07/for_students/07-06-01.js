/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

let renderer = new T.WebGLRenderer({ preserveDrawingBuffer: true });
renderer.setSize(600, 400);
document.body.appendChild(renderer.domElement);
renderer.domElement.id = "canvas";

let scene = new T.Scene();

let camera = new T.PerspectiveCamera(
  40,
  renderer.domElement.width / renderer.domElement.height,
  1,
  1000
);

camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 0, 0);

// since we're animating, add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);

// two lights - both a little off white to give some contrast
let ambientLight = new T.AmbientLight(0xffffff, 0.5); // Soft white ambient light
scene.add(ambientLight);

let dirLight1 = new T.DirectionalLight(0xffffff, 0.8); // White directional light
dirLight1.position.set(5, 5, 5); // Position the light
scene.add(dirLight1);

let dirLight2 = new T.DirectionalLight(0xffffff, 0.5); // White directional light
dirLight2.position.set(-5, -5, -5); // Position the light
scene.add(dirLight2);

// make a ground plane (changed it)
let groundBox = new T.BoxGeometry(20, 0.1, 30);
let groundMesh = new T.Mesh(
  groundBox,
  new T.MeshStandardMaterial({ color: 0x7b9e80, roughness: 0.8 })
);
// put the top of the box at the ground level (0)
groundMesh.position.y = -3;
scene.add(groundMesh);

//create quadcopter group 
//source used: (https://threejs.org/docs/#api/en/objects/Group)
let quadcopter = new T.Group();
//create quadcopter body: (use capsule & meshphong)
let bodyGeom = new T.CapsuleGeometry(0.3, 0.6, 2, 8);
let bodyMat = new T.MeshPhongMaterial({ color: 0x9dd6ed, specular: "#00ff00", shininess: 10 });
let bodyMesh = new T.Mesh(bodyGeom, bodyMat);
bodyMesh.rotateZ(Math.PI / 2); //rotate so the capsule is parallel to ground (looks more copter/plane-like)
quadcopter.add(bodyMesh);

//create group for propellers - add it to the copter group (kind of like a subgroup)
let propellerGroup = new T.Group();


//propellers:
let propellerGeom = new T.BoxGeometry(0.1, 0.05, 1);
let propellerMat = new T.MeshPhongMaterial({ color: 0x445c9e, specular: 0xffffff, shininess: 20 });
let propeller1 = new T.Mesh(propellerGeom, propellerMat);
let propeller2 = new T.Mesh(propellerGeom, propellerMat);

//make the propellers be on top of the quadcopter (visually adjusted - x and z should be @ the center of quadcopter, so set to 0)
propeller1.position.set(0, -0.69, 0);
propeller1.rotateY(Math.PI);
propeller2.position.set(0, -0.69, 0);
propeller2.rotateY(Math.PI + 1.5);
//add to the group
propellerGroup.add(propeller1);
propellerGroup.add(propeller2);

//back propellers (behind the copter)
//create new group for back propellers
let propellerBackGroup = new T.Group();
let propellerGeom2 = new T.BoxGeometry(0.05, 0.05, 0.3);
let propellerMat2 = new T.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, shininess: 1 });
let propeller3 = new T.Mesh(propellerGeom2, propellerMat2);
let propeller4 = new T.Mesh(propellerGeom2, propellerMat2);
//set at 0,0,0 , we will shift the x component as an entire group later
propeller3.position.set(0, 0, 0);
propeller4.position.set(0, 0, 0);

//rotate the propellers (this will help for when we are making them move)
propeller3.rotateX(Math.PI / 4);
propeller4.rotateX(-Math.PI / 4);
//add the propellers to the group
propellerBackGroup.add(propeller3);
propellerBackGroup.add(propeller4);

//position is set to the top of where the capsule is (aka propeller goes on top)
propellerGroup.position.set(0, 1, 0);
propellerBackGroup.position.set(-0.6, 0, 0);
quadcopter.add(propellerGroup);
quadcopter.add(propellerBackGroup);
scene.add(quadcopter);

//create radar:
let radarGeom = new T.ConeGeometry(0.5, 0.8, 32);

//rotate x component so that the non-flat side is parallel to the floor
radarGeom.rotateX(-Math.PI / 2);
let radarMat = new T.MeshPhongMaterial({ color: "#756650", specular: "#9c5b16", shininess: 40 });
let radarMesh = new T.Mesh(radarGeom, radarMat);
radarMesh.position.set(0, -2.5, 0);
scene.add(radarMesh);

//build front windshield
let windshieldGeom = new T.BoxGeometry(0.1, 0.2, 0.5);
let windshieldMaterial = new T.MeshPhongMaterial({ color: 0x445c9e });
let windshieldMesh = new T.Mesh(windshieldGeom, windshieldMaterial);
windshieldMesh.position.set(0.5, -0.1, 0);
windshieldMesh.rotateY(Math.PI / 2);
quadcopter.add(windshieldMesh);
windshieldMesh.position.set(0.5, 0, 0);

//rotate so that it looks horizontal in the front of the copter
windshieldMesh.rotateZ(Math.PI / 2);
windshieldMesh.rotateX(Math.PI / 2);
quadcopter.add(windshieldMesh);

//build wheels (for design aesthetic)
//idea: build super short rotated cylinders
let wheelGroup = new T.Group();
let wheelGeom = new T.CylinderGeometry(0.1, 0.1, 0.05, 16);
let wheelMat = new T.MeshStandardMaterial({ color: 0xffffff });
let wheel1 = new T.Mesh(wheelGeom, wheelMat);
let wheel2 = new T.Mesh(wheelGeom, wheelMat);
let wheel3 = new T.Mesh(wheelGeom, wheelMat);
let wheel4 = new T.Mesh(wheelGeom, wheelMat);
wheel1.position.set(0.25, -0.28, 0.15);
wheel2.position.set(-0.25, -0.28, 0.15);
wheel3.position.set(0.25, 0.28, 0.15);
wheel4.position.set(-0.25, 0.28, 0.15);

//add wheels to group
wheelGroup.add(wheel1);
wheelGroup.add(wheel2);
wheelGroup.add(wheel3);
wheelGroup.add(wheel4);

//rotate so they seem to be on the side (circular part NOT parallel to ground)
wheelGroup.rotateX(Math.PI / 2);
//add group to quadcopter
quadcopter.add(wheelGroup);

//create line to connect radar to quadcopter (will actually move it in animation function)
let lineMaterial = new T.LineBasicMaterial({ color: 0xffffff });
let lineGeometry = new T.BufferGeometry();
let connectionLine = new T.Line(lineGeometry, lineMaterial);
scene.add(connectionLine);

//spotlight to follow the quadcopter
let spotlight = new T.SpotLight(0xffffff, 1);
spotlight.position.set(0, 10, 0);
spotlight.angle = Math.PI / 6;
spotlight.penumbra = 0.5;
spotlight.decay = 2;
scene.add(spotlight);

//target the quadcopter:
spotlight.target = quadcopter;


//SECOND QUADCOPTER - COPIED FROM MY OWN CODE ABOVE:
//I unfortunately did not have time to add the second quadcopter as a new one, so this is my second quadcopter.
let quadcopter2 = new T.Group();

let bodyMesh2 = bodyMesh.clone();
bodyMesh2.position.set(-5, 0, 0);
quadcopter2.add(bodyMesh2);

let propellerGroup2 = propellerGroup.clone();
let propellerBackGroup2 = propellerBackGroup.clone();

propellerGroup2.position.set(-5, 1, 0);
propellerBackGroup2.position.set(-5 - 0.6, 0, 0);

quadcopter2.add(propellerGroup2);
quadcopter2.add(propellerBackGroup2);

let windshieldMesh2 = windshieldMesh.clone();
windshieldMesh2.position.set(-5 + 0.5, 0, 0);
quadcopter2.add(windshieldMesh2);

let wheelGroup2 = wheelGroup.clone();
wheelGroup2.position.set(-5, 0, 0);
quadcopter2.add(wheelGroup2);

scene.add(quadcopter2);

/**
 * function used to animate all objects in the scene (repeatedly called!)
 * 
 * @param {*} timestamp 
 */
function animateLoop(timestamp) {
  let radius = 3;
  let centerX = 0;
  let centerZ = 0;
  let angularSpeed1 = 0.5;
  let angularSpeed2 = 0.4;
  let x1 = centerX + radius * Math.cos((timestamp / 1000) * angularSpeed1);
  let z1 = centerZ + radius * Math.sin((timestamp / 1000) * angularSpeed1);
  let x2 = centerX + radius * Math.cos((timestamp / 1000) * angularSpeed2);
  let z2 = centerZ + radius * Math.sin((timestamp / 1000) * angularSpeed2);

  quadcopter.position.x = x1;
  quadcopter.position.z = z1;

  quadcopter2.position.x = x2;
  quadcopter2.position.z = z2;

  //spotlight the quadcopter as it moves around.
  spotlight.target.position.copy(quadcopter.position);
  let forwardDirection = new T.Vector3(centerX - x1, 0, centerZ - z1).normalize();

  //ensure that the quadcopters look where they are going - 
  quadcopter.lookAt(x1 + forwardDirection.x, quadcopter.position.y, z1 + forwardDirection.z);
  quadcopter2.lookAt(x1 + forwardDirection.x, quadcopter2.position.y, z1 + forwardDirection.z);

  //rotate the propellers - the first two are for the top so rotate by y and the bottom two are on the back so rotate by x
  propeller1.rotation.y += 0.2;
  propeller2.rotation.y += 0.2;
  propeller3.rotation.x += 0.1;
  propeller4.rotation.x += 0.1;

  //create a new vector so that it looks at the quadcopter's position
  let quadcopterPosition = new T.Vector3(x1, quadcopter.position.y, z1);
  radarMesh.lookAt(quadcopterPosition);

  //THE FOLLOWING ONE LINE WAS TAKEN FROM CHAT GPT.
  //ensure that the connection line connects to the copter; I did not know how to connect them
  //so I asked chatGPT and it introduced me to the setFromPoints method, which basically will
  //connect the quadcopter position to the radarMesh position.
  connectionLine.geometry.setFromPoints([quadcopter.position, radarMesh.position]);

  renderer.render(scene, camera);
  window.requestAnimationFrame(animateLoop);
}
// Function to handle keydown events
function onKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      quadcopter.position.z += 0.1; // Move quadcopter forward
      break;
    case "ArrowDown":
      quadcopter.position.z -= 0.1; // Move quadcopter backward
      break;
    case "ArrowLeft":
      quadcopter.position.x -= 0.1; // Move quadcopter left
      break;
    case "ArrowRight":
      quadcopter.position.x += 0.1; // Move quadcopter right
      break;
  }
}

// Add event listener to handle keydown events
document.addEventListener("keydown", onKeyDown);

//call the animation for the first time
window.requestAnimationFrame(animateLoop);

