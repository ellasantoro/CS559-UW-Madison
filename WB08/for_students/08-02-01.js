/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

/*
 * Define your 3 objects here. If the objects fit inside +/- 1,
 * the world code below will place them nicely.
 * Otherwise, you need to modify the world code below to make the
 * world bigger and space the objects out differently.
 */

/**
 * this class creates a diamond shape that satisfies the second requirement - has 
 * vertex coloring such that we can see the colors smoothly varying across a 
 * triangle boundary. you can see at each shared vertex all sides converge to
 * one color (either magenta or blue)
 */
class Object1 extends GrObject {
  constructor() {
    let geometry = new T.BufferGeometry();
    const vertices = new Float32Array([
      //DIAMOND SHAPE
      //triangle 1
      -0.75, 1, 0.75,      //left
      0.75, 1, 0.75,       //right
      0, 2, 0,             //top

      //triangle 2
      0.75, 1, 0.75,       //right
      0.75, 1, -0.75,      //left
      0, 2, 0,             //top

      //triangle 3
      0.75, 1, -0.75,      //right
      -0.75, 1, -0.75,     //left
      0, 2, 0,            //top

      //triangle 4
      -0.75, 1, -0.75,     //left
      -0.75, 1, 0.75,      //right
      0, 2, 0,            //top

      //triangle 1 (flipped upside down)
      0.75, 1, -0.75,      //left
      0, 0, 0,             //bottom
      -0.75, 1, -0.75,     //right

      //triangle 2 (flipped upside down)
      0.75, 1, -0.75,      //right
      0.75, 1, 0.75,       //left
      0, 0, 0,            //bottom

      //triangle 3 (flipped upside down)
      0, 0, 0,              //bottom
      -0.75, 1, 0.75,      //right
      -0.75, 1, -0.75,     //left

      //triangle 4 (flipped upside down)
      -0.75, 1, 0.75,      //right
      0, 0, 0,             //bottom
      0.75, 1, 0.75,       //left

    ]);
    //set attribute for position & compute vertex normals
    geometry.setAttribute('position', new T.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    const colors = new Float32Array([
      //different variations of blue and pink as shading:
      0, 0.2, 0.8,
      1, 0.2, 0.8,
      0, 0.2, 0.8,

      1, 0.2, 0.8,
      0, 0.2, 0.8,
      0, 0.2, 0.8,

      0, 0.2, 0.8,
      1, 0.2, 0.8,
      0, 0.2, 0.8,

      1, 0.2, 0.8,
      0, 0.2, 0.8,
      0, 0.2, 0.8,

      0, 0.2, 0.8,
      0, 0.2, 0.8,
      1, 0.2, 0.8,

      0, 0.2, 0.8,
      1, 0.2, 0.8,
      0, 0.2, 0.8,

      0, 0.2, 0.8,
      0, 0.2, 0.8,
      1, 0.2, 0.8,

      0, 0.2, 0.8,
      0, 0.2, 0.8,
      1, 0.2, 0.8

    ]);
    //set attribute for color:
    geometry.setAttribute("color", new T.BufferAttribute(colors, 3));

    //create materials and ensure vertexColors is marked as true so that it uses them
    let material = new T.MeshStandardMaterial({
      roughness: 0.75,
      vertexColors: true
    });
    //create the mesh using our geometry and material, and call super
    let mesh = new T.Mesh(geometry, material);
    super("Object1", mesh);
  }
}

/**
 * this class creates an cube shape that satisfies the first requirement - it 
 * has face coloring where you can see triangles with different colors. 
 */
class Object2 extends GrObject {
  constructor() {
    let geometry = new T.BufferGeometry();
    const vertices = new Float32Array([
      //front square
      -1, 0, 1,    //bottom left
      1, 0, 1,     //bottom right
      1, 2, 1,     //top right

      1, 2, 1,     //top right
      -1, 2, 1,    //top left
      -1, 0, 1,    //bottom left

      //back square
      1, 0, -1,    //bottom right
      -1, 0, -1,   //bottom left
      -1, 2, -1,   //top left

      -1, 2, -1,   //top left
      1, 2, -1,    //top right
      1, 0, -1,    //bottom right

      //right square
      1, 0, 1,     //bottom right
      1, 0, -1,    //bottom right
      1, 2, -1,    //top right

      1, 2, -1,    //top right
      1, 2, 1,     //top right
      1, 0, 1,     //bottom right

      //left square
      -1, 0, -1,   //bottom left
      -1, 0, 1,    //bottom left
      -1, 2, 1,    //top left

      -1, 2, 1,    //top left
      -1, 2, -1,   //top left
      -1, 0, -1,   //bottom left

      //top square
      -1, 2, 1,    //top left
      1, 2, 1,     //top right
      1, 2, -1,    //top right

      1, 2, -1,    //top right
      -1, 2, -1,   //top left
      -1, 2, 1,    //top left

    ]);

    //set attribute for position & compute normals:
    geometry.setAttribute('position', new T.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    const colors = new Float32Array([
      0, 0.1, 1, //dark blue
      0, 0.1, 1,
      0, 0.1, 1,

      0.1, 0.2, 1, //blue
      0.1, 0.2, 1,
      0.1, 0.2, 1,

      1, 1, 0, //lime green
      1, 1, 0,
      1, 1, 0,

      0, 0.7, 0, //green
      0, 0.7, 0,
      0, 0.7, 0,

      0.6, 0, 1, //pink
      0.6, 0, 1,
      0.6, 0, 1,

      1, .2, 1, //magenta
      1, .2, 1,
      1, .2, 1,

      0.5, 0.3, 0.1, //dark grey
      0.5, 0.3, 0.1,
      0.5, 0.3, 0.1,

      0.7, 0.5, 0.3, //grey
      0.7, 0.5, 0.3,
      0.7, 0.5, 0.3,

      0.1, 0.3, 0.3, //teal
      0.1, 0.3, 0.3,
      0.1, 0.3, 0.3,

      0.2, 0.5, 0.3, //seafoam green
      0.2, 0.5, 0.3,
      0.2, 0.5, 0.3,
    ]);
    //set attribute for color:
    geometry.setAttribute("color", new T.BufferAttribute(colors, 3));

    //create the material and ensure we use the colors from our array
    let material = new T.MeshStandardMaterial({
      roughness: 0.75,
      vertexColors: true
    });
    let mesh = new T.Mesh(geometry, material);
    super("Object2", mesh);
  }
}

/**
 * this class creates a pyramid that satisfies the last requirement since it has vertex
 * normals that set it so that the lighting is smooth across the triangle boundary.
 */
class Object3 extends GrObject {
  constructor() {
    let geometry = new T.BufferGeometry();
    const vertices = new Float32Array([
      //front
      0.0, 2.0, 0.0,
      -1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,

      //right
      0.0, 2.0, 0.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, -1.0,

      //back
      0.0, 2.0, 0.0,
      1.0, 0.0, -1.0,
      -1.0, 0.0, -1.0,

      //left
      0.0, 2.0, 0.0,
      -1.0, 0.0, -1.0,
      -1.0, 0.0, 1.0
    ]);
    geometry.setAttribute('position', new T.BufferAttribute(vertices, 3));

    const normals = new Float32Array([
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0
    ]);
    geometry.setAttribute('normal', new T.BufferAttribute(normals, 3));

    const colors = new Float32Array([
      1.0, 0.0, 0.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,

      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0,

      1.0, 0.0, 0.0,
      0.0, 0.0, 1.0,
      0.0, 1.0, 0.0,

      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0,
    ]);
    geometry.setAttribute("color", new T.BufferAttribute(colors, 3));

    let material = new T.MeshStandardMaterial({
      roughness: 0.75,
      vertexColors: true,
      flatShading: false
    });

    let mesh = new T.Mesh(geometry, material);

    super("Object3", mesh);
  }
}


// translate an object in the X direction
function shift(grobj, x) {
  grobj.objects.forEach(element => {
    element.translateX(x);
  });
  return grobj;
}

//rotate y 
function roty(grobj, ry) {
  grobj.objects.forEach(element => {
    element.rotation.y = ry;
  });
  return grobj;
}

/*
 * The world making code here assumes the objects are +/- 1
 * and have a single mesh as their THREE objects.
 * If you don't follow this convention, you will need to modify
 * the code below.
 * The code is a little funky because it is designed to work for
 * a variety of demos.
 */
let mydiv = document.getElementById("div1");

let box = InputHelpers.makeBoxDiv({ width: mydiv ? 640 : 820 }, mydiv);
if (!mydiv) {
  InputHelpers.makeBreak(); // sticks a break after the box
}
InputHelpers.makeHead("Three Different Objects", box);

let world = new GrWorld({ width: mydiv ? 600 : 800, where: box });
let tt = shift(new Object1(), -3);
world.add(tt);

let t2 = shift(new Object2(), 0);
world.add(t2);

let t3 = shift(new Object3(), 3);
world.add(t3);

let div = InputHelpers.makeBoxDiv({}, box);

let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });

InputHelpers.makeBreak(box);

sl.oninput = function (evt) {
  let v = sl.value();
  roty(tt, v);
  roty(t2, v);
  roty(t3, v);
};

world.go();
