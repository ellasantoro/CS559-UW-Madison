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
  let image = new T.TextureLoader().load("./textures/8ball.png");
  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });
  world.scene.background = new T.Color("#899da3"); // Sets the background to white
  let shaderMat = shaderMaterial("./shaders/10-09-02.vs", "./shaders/10-09-02.fs", {
    side: T.DoubleSide,
    uniforms: {
      colormap: { value: image },
    },
  });

  //NOTE: I decided to use three geometries here instead of the Gr Shapes because I wanted a perfectly circular 8 ball,
  //and the square sign did not map nicely, so I just thought it would be easier to use the three geometries that I could chosoe
  //the height and width for. I still use the shaders just the exact same, but I pass them in through meshes instead!
  let sphere = new T.SphereGeometry(1);
  let sphereMesh = new T.Mesh(sphere, shaderMat);
  //let sphere = new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat });
  sphereMesh.rotateY(-Math.PI / 2);
  sphereMesh.translateZ(2);
  sphereMesh.translateX(-0.5);
  sphereMesh.translateY(1);
  world.scene.add(sphereMesh);

  let square = new T.PlaneGeometry(3.5, 2);
  let squareMesh = new T.Mesh(square, shaderMat);
  squareMesh.translateY(1);
  squareMesh.translateX(2);
  world.scene.add(squareMesh);

  world.go();
}
