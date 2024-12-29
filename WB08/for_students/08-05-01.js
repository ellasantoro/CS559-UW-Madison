/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

class Dice extends GrObject {
  constructor() {
    let geometry = new T.BufferGeometry();
    const vertices = new Float32Array([
      //all triangles / cube faces are made COUNTER-CLOCKWISE
      // front square
      -0.5, 0, 0.5,   // bottom left
      0.5, 0, 0.5,    // bottom right
      0.5, 1, 0.5,    // top right

      0.5, 1, 0.5,    // top right
      -0.5, 1, 0.5,   // top left
      -0.5, 0, 0.5,   // bottom left

      // back square
      0.5, 0, -0.5,   // bottom left
      -0.5, 0, -0.5,  // bottom right
      -0.5, 1, -0.5,  // top right

      -0.5, 1, -0.5,  // top right
      0.5, 1, -0.5,  // top left
      0.5, 0, -0.5,   // bottom left

      // right square
      0.5, 1, 0.5,   // top left
      0.5, 0, 0.5,   // bottom left
      0.5, 0, -0.5,    // bottom right

      0.5, 0, -0.5,    // bottom right
      0.5, 1, -0.5,    // top right
      0.5, 1, 0.5,   // top left

      // left square
      -0.5, 1, -0.5,  // top left
      -0.5, 0, -0.5,   // bottom left
      -0.5, 0, 0.5,   // bottom right

      -0.5, 0, 0.5,   // bottom right
      -0.5, 1, 0.5,  // top right
      -0.5, 1, -0.5,  // top left

      // top square
      0.5, 1, 0.5,   // bottom right
      0.5, 1, -0.5,    // top right
      -0.5, 1, -0.5,   // top left

      -0.5, 1, -0.5,   // top left
      -0.5, 1, 0.5,   // bottom left
      0.5, 1, 0.5,   // bottom right

      //bottom square
      -0.5, 0, -0.5,    // bottom left
      0.5, 0, -0.5,    // bottom right
      0.5, 0, 0.5,   // top right

      0.5, 0, 0.5,   // top right
      -0.5, 0, 0.5,  // top left
      -0.5, 0, -0.5    // bottom left


    ]);
    geometry.setAttribute('position', new T.BufferAttribute(vertices, 3));
    // give it UVs
    // @@Snippet:texcoords
    const uvs = new Float32Array([
      // front square (face 6 on original dice)
      0.666, 0.333,
      1, 0.333,
      1, 0,
      1, 0,
      0.666, 0,
      0.666, 0.333,

      // back square (face 1 on original dice)
      0.333, 0.666,
      0.666, 0.666,
      0.666, 0.333,
      0.666, 0.333,
      0.333, 0.333,
      0.333, 0.666,

      // right square (face 4 on original dice)
      0.333, 0.666,
      0.333, 1,
      0.666, 1,
      0.666, 1,
      0.666, 0.666,
      0.333, 0.666,


      // left square (face two on original dice)
      0, 0.333,
      0, 0.666,
      0.333, 0.666,
      0.333, 0.666,
      0.333, 0.333,
      0, 0.333,

      //top square (face five on original dice)
      //you'll notice the coords look a little different here compared to 
      //the other uv's - this is because when i did the math for all of them,
      //the all seemed relatively centered - but face 5 (top square on original) 
      //seemed particularly off center, so I scaled it adding a constant number to x
      //components and a constant number to y component until I thought it looked more centered.
      0.67, 0.34,
      1.004, 0.34,
      1.004, 0.7,
      1.004, 0.7,
      0.67, 0.7,
      0.67, 0.34,

      //bottom square (face three on original dice)
      0.333, 0,
      0.666, 0,
      0.666, 0.333,
      0.666, 0.333,
      0.333, 0.333,
      0.333, 0

    ]);
    //THE FOLLOWING CODE UNTIL END OF CONSTRUCTOR WAS TAKEN FROM 08-04-01.js:
    //the code sets the uv attribute using BufferAttribute, it passes in my vertices for
    //uv's for texture mapping, as well as the number 2 which specifies how many elements in
    //each vertex (there are two as you can see above in the uv list)
    geometry.setAttribute('uv', new T.BufferAttribute(uvs, 2));
    //computeVertexNormals calculates the vertex normals for a geometry - this basically just makes
    //it so that we have correct rendering and lighting, and insures the normals are interpolated
    //correctly along all of the surfaces.
    geometry.computeVertexNormals();

    //using a texture loader - nothing much to say here other than this is how you
    //use the texture loader to load in an image or texture to use with your shapes and uvs
    //(again this is taken from 08-04-01.js)
    let tl = new T.TextureLoader().load("../images/dice_texture.png");
    //create the material for the dice - should be white since die are white.
    //we also have to make sure to use the map property to actually map the texture to
    //the object
    let material = new T.MeshStandardMaterial({
      color: "white",
      map: tl
    });

    let mesh = new T.Mesh(geometry, material);
    super("Dice", mesh);
  }
}

/**
 * function to shift a gr object by a specified x-component value
 * (given code from workbook)
 * 
 * @param {*} grobj 
 * @param {*} x 
 * @returns the newly translated (by x axis) Gr Object 
 */
function shift(grobj, x) {
  grobj.objects[0].translateX(x);
  return grobj;
}

/**
 * function to rotate a gr object by specified angles in regards to the
 * Y and Z axes, as well as translating by the Y axis of a passed in value y
 * in order to ensure that the rotated object will still be above ground. This code
 * is inspired by the function above that was given to us by the workbook.
 * @param {*} grobj 
 * @param {*} angleY 
 * @param {*} angleZ 
 * @param {*} y 
 * @returns the newly rotated (and possibly translated) Gr Object
 */
function rotate(grobj, angleY, angleZ, y) {
  grobj.objects[0].translateY(y);
  grobj.objects[0].rotateY(angleY);
  grobj.objects[0].rotateZ(angleZ);
  return grobj;
}

let world = new GrWorld();
//shift by -1 from center so that the dice don't run into each other
let dice1shift = shift(new Dice(), -1);
//rotated y's for both dice so they look like they've recently been thrown
let dice1 = rotate(dice1shift, Math.PI / 4, 0, 0);
//shift by 1 from center so that the dice don't run into each other
let dice2shift = shift(new Dice(), 1);
//rotate y (explained above) and rotate z so that the top of the dice have 
//different numbers as mentioned in activity writeup - also remember to translate y by
//1 since when we rotate by Z it flips over and goes under the ground. 
let dice2 = rotate(dice2shift, Math.PI / 3, Math.PI, 1);

//put the two dice into the world Here
//don't forget to orient them so they have different numbers facing up
world.add(dice1);
world.add(dice2);
world.go();

