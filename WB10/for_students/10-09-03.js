/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

{
  let mydiv = document.getElementById("div1");
  //images for the planets:
  let image = new T.TextureLoader().load("./textures/saturn.jpeg");
  let image2 = new T.TextureLoader().load("./textures/earth.jpeg");
  let image3 = new T.TextureLoader().load("./textures/mars.jpeg");
  let image4 = new T.TextureLoader().load("./textures/venus.jpeg");
  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv, groundplane: null });

  let shaderMat = shaderMaterial("./shaders/10-09-03.vs", "./shaders/10-09-03.fs", {
    side: T.DoubleSide,
    //uniforms include dots, and all xyz directions for light
    uniforms: {
      //these values are updated, these are just the defaults / starter vals
      colormap: { value: image },
      dots: { value: 4.0 },
      dirX: { value: -0.8 },
      dirY: { value: -1.0 },
      dirZ: { value: 0.0 }
    },
  });

  //SLIDERS: (copy pasted from an example of this workbook, changed for all of my
  //specific slider preferences & ideas)
  let s1 = new InputHelpers.LabelSlider("dots", {
    width: 400,
    min: 1,
    max: 20,
    step: 0.5,
    initial: 4,
    where: mydiv,
  });

  function onchange() {
    shaderMat.uniforms.dots.value = s1.value();
  }
  s1.oninput = onchange;
  onchange();

  let s2 = new InputHelpers.LabelSlider("light - X", {
    width: 400,
    min: -1.0,
    max: 1.0,
    step: 0.1,
    initial: -0.8,
    where: mydiv,
  });

  function onchangeDirectionX() {
    shaderMat.uniforms.dirX.value = s2.value();
  }
  s2.oninput = onchangeDirectionX;
  onchangeDirectionX();

  let s3 = new InputHelpers.LabelSlider("light  - Y", {
    width: 400,
    min: -1.0,
    max: 1.0,
    step: 0.1,
    initial: -1.0,
    where: mydiv,
  });

  function onchangeDirectionY() {
    shaderMat.uniforms.dirY.value = s3.value();
  }
  s3.oninput = onchangeDirectionY;
  onchangeDirectionY();

  let s4 = new InputHelpers.LabelSlider("light - Z", {
    width: 400,
    min: -1.0,
    max: 1.0,
    step: 0.1,
    initial: 0.0,
    where: mydiv,
  });

  function onchangeDirectionZ() {
    shaderMat.uniforms.dirZ.value = s4.value();
  }
  s4.oninput = onchangeDirectionZ;
  onchangeDirectionZ();

  //CREATING SATURN:
  //create a group so we can group together the ring and body
  let group = new T.Group();
  //create saturn's body using sphereGeometry
  let sphere = new T.SphereGeometry(3);
  let sphereMesh = new T.Mesh(sphere, shaderMat);
  sphereMesh.translateY(1);
  sphereMesh.rotateZ(Math.PI);
  //add to the group
  group.add(sphereMesh);

  //create saturn's ring using TorusGeometry
  let ring = new T.TorusGeometry(4.2, 0.4, 2);
  let ringMaterial = new T.MeshPhongMaterial({
    color: "grey",
    shininess: 100,
    specular: "orange",
    roughness: 0
  });
  let ringMesh = new T.Mesh(ring, ringMaterial);
  ringMesh.translateY(1);
  ringMesh.rotateX(Math.PI / 2);
  //add to the group
  group.add(ringMesh);

  //add the whole group to the scene"
  world.scene.add(group);

  //ANIMATING THE PLANET: (not in shader , see explanation)
  //the angle of Z - we will be updating this.
  let angleZ = -0.6;
  //i just didnt like the direction it was facing so i updated x rotation a bit:
  group.rotation.x -= 0.4;
  //we will animate the entire group in the animate function, but i wanted a little bit of a 
  //lag with the ring because it looks more realistic when they are not perfectly moving, so thats why
  //i just add 0.1 here to the ringmesh z and y rotations (not in animation).
  ringMesh.rotation.z += 0.1;
  ringMesh.rotation.y += 0.1;

  /**
   * Function to animate the planet (using Y-axis and Z-axis rotation)
   */
  function animate() {
    requestAnimationFrame(animate);
    angleZ += 0.01; //increasing the Z "rotation" by 0.01 each time - its actually just an oscillating function
    group.rotation.y += 0.01; //increase the y rotation by 0.01 every time
    group.rotation.z = 0.7 * Math.sin(angleZ); //z rotation oscillates back and forth (scaled) by angleZ. 
    //if you're wondering why I would increase y rotation each time but have an oscillating z rotation using a sin function,
    //the reason is because when I had both increasing y and z they were completely off sync, and even though I had initially edited it
    //to make it more in sync, it didnt work. i troubleshooted until I got to this.
    world.renderer.render(world.scene, world.camera);
  }
  //call the animate function
  animate();

  //CREATE THE PLANETS IN THE BACKGROUND:
  //earth:
  let earth = new T.SphereGeometry(1);
  let earthMaterial = new T.MeshStandardMaterial({
    map: image2,
    color: "white",
  })
  let earthMesh = new T.Mesh(earth, earthMaterial);
  earthMesh.position.set(-4, -3, 8);
  world.scene.add(earthMesh);

  //mars:
  let mars = new T.SphereGeometry(1);
  let marsMaterial = new T.MeshStandardMaterial({
    map: image3,
    color: "#c98251",
  })
  let marsMesh = new T.Mesh(mars, marsMaterial);
  marsMesh.position.set(12, -3, -3);
  world.scene.add(marsMesh);

  //venus:
  let venus = new T.SphereGeometry(1);
  let venusMaterial = new T.MeshStandardMaterial({
    map: image4,
    color: "#c98251",
  })
  let venusMesh = new T.Mesh(venus, venusMaterial);
  venusMesh.position.set(3, 7, -9);
  world.scene.add(venusMesh);

  //CREATE THE SKYBOX FOR THE SPACE BACKGROUND:
  //taken from my WB9 code:
  let environmentmap = [
    './textures/px.png',
    './textures/nx.png',
    './textures/py.png',
    './textures/ny.png',
    './textures/pz.png',
    './textures/nz.png'
  ]

  //create the texture loader, use the above environment map array of images
  let textureLoader = new T.CubeTextureLoader();
  let skybox = textureLoader.load(environmentmap);
  //set the background to our skybox
  world.scene.background = skybox;
  world.go;
}


