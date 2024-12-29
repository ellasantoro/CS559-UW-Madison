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

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });
  
  let shaderMat = shaderMaterial("./shaders/10-06-02.vs", "./shaders/10-06-02.fs", {
    side: T.DoubleSide,
    uniforms: {},
  });

  world.add(new SimpleObjects.GrSphere({ x: -3, y: 1, material: shaderMat }));
  world.add(
    new SimpleObjects.GrSquareSign({ x: 0.1, y: 1, z: 0.4, size: 0.9, material: shaderMat })
  );

  world.add(
    new SimpleObjects.GrCube({ x: 3, y: 0.8, size: 1.5, material: shaderMat })
  );

  world.go();
}

//adding this comment to indicate I have completed this box