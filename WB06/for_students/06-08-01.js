// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";

let renderer = new T.WebGLRenderer();
renderer.setSize(500, 500);
document.getElementById("div1").appendChild(renderer.domElement);

let scene = new T.Scene();

// Use solid colors for materials
let whiteStuff = new T.MeshStandardMaterial({ color: 0xffffff });
let blackStuff = new T.MeshStandardMaterial({ color: 0x000000 });
let orangeStuff = new T.MeshStandardMaterial({ color: 0xffa500 });
let brownStuff = new T.MeshStandardMaterial({ color: 0xb39b72 });
let redStuff = new T.MeshStandardMaterial({ color: 0xb83e37 });
let greenStuff = new T.MeshStandardMaterial({ color: 0x4d8c59 });

//plane/ground:
let groundGeometry = new T.PlaneGeometry(50, 30);
let groundMaterial = new T.MeshStandardMaterial({ color: 0xc7e7f2 });
let ground = new T.Mesh(groundGeometry, groundMaterial);
ground.rotateX(-Math.PI / 2); 
scene.add(ground);

//BIG SNOWMAN (this is my second, creative snowman in the advanced points)
let topBody = new T.Mesh(new T.SphereGeometry(0.5, 50, 50), whiteStuff);
topBody.position.set(0, 3.5, 0);
scene.add(topBody);

//middle part of snowman body:
let middleBody = new T.Mesh(new T.SphereGeometry(0.98, 50, 50), whiteStuff);
middleBody.position.set(0, 2.2, 0);
scene.add(middleBody);

//bottom part of snowman body:
let bottomBody = new T.Mesh(new T.SphereGeometry(1.5, 50, 50), whiteStuff);
bottomBody.position.set(0, 0.4, 0);
scene.add(bottomBody);

//snowman left arm:
let armConfig = new T.CylinderGeometry(0.08, 0.05, 1.5, 50);
let leftArm = new T.Mesh(armConfig, brownStuff);
leftArm.position.set(-0.9, 2.6, 0); 
//point stick arms outwards:
leftArm.rotateZ(Math.PI / 4);
scene.add(leftArm);

//snowman right arm:
let rightArm = new T.Mesh(armConfig, brownStuff);
rightArm.position.set(0.9, 2.6, 0);
//point stick arms outwards:
rightArm.rotateZ(-Math.PI / 4); 
scene.add(rightArm);

//snowman eyes:
let leftEye = new T.Mesh(new T.SphereGeometry(0.1, 50, 50), blackStuff);
leftEye.position.set(-0.3, 3.65, 0.4);
scene.add(leftEye);

let rightEye = new T.Mesh(new T.SphereGeometry(0.1, 50, 50), blackStuff);
rightEye.position.set(0.3, 3.65, 0.4);
scene.add(rightEye);

//snowman nose:
let nose = new T.Mesh(new T.ConeGeometry(0.1, 0.5, 50), orangeStuff);
nose.position.set(0, 3.4, 0.7);
nose.rotateX(Math.PI / 2);
scene.add(nose);

//snowman buttons:
let buttonGeometry = new T.SphereGeometry(0.1, 50, 50);
let button1 = new T.Mesh(buttonGeometry, redStuff);
button1.position.set(0, 2.2, 1.1); 
scene.add(button1);

let button2 = new T.Mesh(buttonGeometry, greenStuff);
button2.position.set(0, 2.6, 1.1); 
scene.add(button2);

let button3 = new T.Mesh(buttonGeometry, redStuff);
button3.position.set(0, 3, 1.1);
scene.add(button3);

//snowman hat top:
let hatTopGeometry = new T.CylinderGeometry(0.4, 0.4, 0.4, 32);
let hatTop = new T.Mesh(hatTopGeometry, redStuff);
hatTop.position.set(0, 4.2, 0);
scene.add(hatTop);

//snowman hat rim:
let hatBottomGeometry = new T.CylinderGeometry(0.6, 0.6, 0.2, 32);
let hatBottom = new T.Mesh(hatBottomGeometry, redStuff);
hatBottom.position.set(0, 4, 0); 
scene.add(hatBottom);

//BABY SNOWMAN:
//baby snowman's body:
let babyTop = new T.Mesh(new T.SphereGeometry(0.35, 50, 50), whiteStuff);
babyTop.position.set(3.5, 1.7, 0);
scene.add(babyTop);

let babyMiddle = new T.Mesh(new T.SphereGeometry(0.5, 50, 50), whiteStuff);
babyMiddle.position.set(3.5, 1, 0);
scene.add(babyMiddle);

let babyBottom = new T.Mesh(new T.SphereGeometry(0.7, 50, 50), whiteStuff);
babyBottom.position.set(3.5, 0, 0);
scene.add(babyBottom);

//baby snowman's arms:
let babyArmConfig = new T.CylinderGeometry(0.03, 0.03, 0.5, 50);

let babyLeftArm = new T.Mesh(babyArmConfig, brownStuff);
babyLeftArm.position.set(3, 1.2, 0);
babyLeftArm.rotateZ(Math.PI / 4);
scene.add(babyLeftArm);

let babyRightArm = new T.Mesh(babyArmConfig, brownStuff);
babyRightArm.position.set(4.05, 1.2, 0);
babyRightArm.rotateZ(-Math.PI / 4);
scene.add(babyRightArm);

//baby snowman's eyes:
let babyLeftEye = new T.Mesh(new T.SphereGeometry(0.06, 50, 50), blackStuff);
babyLeftEye.position.set(3.3, 1.9, 0.3);
scene.add(babyLeftEye);

let babyRightEye = new T.Mesh(new T.SphereGeometry(0.06, 50, 50), blackStuff);
babyRightEye.position.set(3.58, 1.9, 0.3);
scene.add(babyRightEye);

//baby snowman's nose:
let babyNose = new T.Mesh(new T.ConeGeometry(0.07, 0.2, 40), orangeStuff);
babyNose.position.set(3.4, 1.7, 0.45);
babyNose.rotateX(Math.PI / 2);
scene.add(babyNose);


//lighting: (partially took my own code from 06-05-03)
let direction1 = new T.DirectionalLight(0xffffff, 0.5);
direction1.position.set(1, 1, 1);
scene.add(direction1);

let spot1 = new T.SpotLight("white");
spot1.angle = Math.PI / 2;
spot1.position.set(0, 5, 0);
spot1.target.position.set(10, 5, 0);
scene.add(spot1);

let ambient1 = new T.AmbientLight(0xffffff, 0.5);
scene.add(ambient1);


//make camera: ( partially taken from box 06-05-02 of this workbook)
let camera = new T.PerspectiveCamera();
camera.position.z = 10;
camera.position.y = 6;
camera.position.x = 3;
camera.lookAt(0, 3, 0);

//animation function to make waving stick arms as mentioned in the WB writeup for advanced points:
function animate() {
    //use the time & convert to millisecs:
    let time = performance.now() * 0.001;
    //initially began with sin and just a function of time, all values were obtained
    //through visual cues and deciding how I wanted it to look, ended up with these values.
    //also had to add 1 because the arms were pointing upwards too much and the other end of the
    //stick would come out of the other end.
    let armRotation = Math.cos(time * 5) * 0.4 + 1;
    //rotate the arms using the calculated rotation using a function of time:
    leftArm.rotation.z = armRotation;
    rightArm.rotation.z = -armRotation;
    babyLeftArm.rotation.z = armRotation;
    babyRightArm.rotation.z = -armRotation;
    //have to rerender every time since its animating. this will be continuously called since this function
    //is looped:
    renderer.render(scene, camera);
    //continue the loop:
    requestAnimationFrame(animate);
}

animate(); // Start the animation loop
