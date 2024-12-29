/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define a class of Domino here - it should be a subclass of GrObject
class Domino extends GrObject {
    constructor(type) {
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
            0.5, 0, 0.25,   // bottom left
            -0.5, 0, 0.25,  // bottom right
            -0.5, 1, 0.25,  // top right

            -0.5, 1, 0.25,  // top right
            0.5, 1, 0.25,  // top left
            0.5, 0, 0.25,   // bottom left

            // right square
            0.5, 1, 0.5,   // top left
            0.5, 0, 0.5,   // bottom left
            0.5, 0, 0.25,    // bottom right

            0.5, 0, 0.25,    // bottom right
            0.5, 1, 0.25,    // top right
            0.5, 1, 0.5,   // top left

            // left square
            -0.5, 1, 0.25,  // top left
            -0.5, 0, 0.25,   // bottom left
            -0.5, 0, 0.5,   // bottom right

            -0.5, 0, 0.5,   // bottom right
            -0.5, 1, 0.5,  // top right
            -0.5, 1, 0.25,  // top left

            // top square
            0.5, 1, 0.5,   // bottom right
            0.5, 1, 0.25,    // top right
            -0.5, 1, 0.25,   // top left

            -0.5, 1, 0.25,   // top left
            -0.5, 1, 0.5,   // bottom left
            0.5, 1, 0.5,   // bottom right

            //bottom square
            -0.5, 0, 0.25,    // bottom left
            0.5, 0, 0.25,    // bottom right
            0.5, 0, 0.5,   // top right

            0.5, 0, 0.5,   // top right
            -0.5, 0, 0.5,  // top left
            -0.5, 0, 0.25    // bottom left

        ]);
        geometry.setAttribute('position', new T.BufferAttribute(vertices, 3));

        const uv1 = new Float32Array([
            0.333, 0.666,
            0.666, 0.666,
            0.666, 0.333,
            0.666, 0.333,
            0.333, 0.333,
            0.333, 0.666,

            0.333, 0.666,
            0.666, 0.666,
            0.666, 0.333,
            0.666, 0.333,
            0.333, 0.333,
            0.333, 0.666,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1
        ]);

        const uv2 = new Float32Array([
            0, 0.666,
            0.333, 0.666,
            0.333,0.333,
            0.333, 0.333,
            0,0.333,
            0, 0.666,

            0, 0.666,
            0.333, 0.666,
            0.333,0.333,
            0.333, 0.333,
            0,0.333,
            0, 0.666,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1
        ]);

        const uv3 = new Float32Array([
            0.333,0.333,
            0.666,0.333,
            0.666,0,
            0.666,0,
            0.333,0,
            0.333,0.333,

            0.333,0.333,
            0.666,0.333,
            0.666,0,
            0.666,0,
            0.333,0,
            0.333,0.333,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1
        ])


        const uv4 = new Float32Array([
            0.333, 1,
            0.666, 1,
            0.666, 0.666,
            0.666, 0.666,
            0.333, 0.666,
            0.333, 1,

            0.333, 1,
            0.666, 1,
            0.666, 0.666,
            0.666, 0.666,
            0.333, 0.666,
            0.333, 1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1
        ])

        const uv5 = new Float32Array([
            0.666,0.666,
            1, 0.666,
            1,0.333,
            1,0.333,
            0.666,0.333,
            0.666,0.666,

            0.666,0.666,
            1, 0.666,
            1,0.333,
            1,0.333,
            0.666,0.333,
            0.666,0.666,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1
        ])

        const uv6 = new Float32Array([
            0.666,0.333,
            1,0.333,
            1,0,
            1,0,
            0.666,0,
            0.666,0.333,

            0.666,0.333,
            1,0.333,
            1,0,
            1,0,
            0.666,0,
            0.666,0.333,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1,
            -1, -1
        ])

        //THE FOLLOWING CODE UNTIL END OF CONSTRUCTOR WAS TAKEN FROM 08-04-01.js:
        //the code sets the uv attribute using BufferAttribute, it passes in my vertices for
        //uv's for texture mapping, as well as the number 2 which specifies how many elements in
        //each vertex (there are two as you can see above in the uv list)
        if (type == 1) {
            geometry.setAttribute('uv', new T.BufferAttribute(uv1, 2));
        } else if (type == 2) {
            geometry.setAttribute('uv', new T.BufferAttribute(uv2, 2));
        } else if (type == 3) {
            geometry.setAttribute('uv', new T.BufferAttribute(uv3, 2));
        } else if (type == 4) {
            geometry.setAttribute('uv', new T.BufferAttribute(uv4, 2));
        } else if (type == 5) {
            geometry.setAttribute('uv', new T.BufferAttribute(uv5, 2));
        } else {
            geometry.setAttribute('uv', new T.BufferAttribute(uv6, 2));
        }
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
        super("Domino", mesh);
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
function shift(grobj, x, y, z) {
    grobj.objects[0].translateX(x);
    grobj.objects[0].translateY(y);
    grobj.objects[0].translateZ(z);
    return grobj;
}
function rotate(grobj, xangle, yangle, zangle){
    grobj.objects[0].rotateX(xangle);
    grobj.objects[0].rotateY(yangle);
    grobj.objects[0].rotateZ(zangle);
    return grobj;
}
let world = new GrWorld();
let domino1bottom = rotate(shift(new Domino(6),-1,0.5,-2.01), Math.PI / 2, 0, Math.PI/2);
let domino1top = rotate(shift(new Domino(6),0,0.5,-2.01),Math.PI / 2, 0, Math.PI/2);

let domino2bottom = rotate(shift(new Domino(6),-1,0.5,-1.5), Math.PI / 2,0, 0);
let domino2top = rotate(shift(new Domino(4),-1,0.5,-0.5),Math.PI / 2, 0, 0);

let domino3bottom = rotate(shift(new Domino(4),0.51,0.5,0), Math.PI / 2, 0, Math.PI/2);
let domino3top = rotate(shift(new Domino(1),1.51,0.5,0),Math.PI / 2, 0, Math.PI/2);

let domino4bottom = rotate(shift(new Domino(6),1,0.5,0.51), Math.PI / 2,0, 0);
let domino4top = rotate(shift(new Domino(4),1,0.5,1.51),Math.PI / 2, 0, 0);

let domino5bottom = rotate(shift(new Domino(2),-3.3,0,-3.5), 0, -Math.PI/5, 0);
let domino5top = rotate(shift(new Domino(6),-3.3,1,-3.5), 0, -Math.PI/5, 0);

let domino6bottom = rotate(shift(new Domino(3),-2.6,0,-3.6), 0, -Math.PI/6, 0);
let domino6top = rotate(shift(new Domino(4),-2.6,1,-3.6), 0, -Math.PI/6, 0);

let domino7bottom = rotate(shift(new Domino(5),-2.0,0,-3.7), 0, -Math.PI/7, 0);
let domino7top = rotate(shift(new Domino(6),-2.0,1,-3.7), 0, -Math.PI/7, 0);

let domino8bottom = rotate(shift(new Domino(3),-1.3,0,-3.8), 0, -Math.PI/8, 0);
let domino8top = rotate(shift(new Domino(2),-1.3,1,-3.8), 0,-Math.PI/8, 0);


world.add(domino1bottom);
world.add(domino1top);

world.add(domino2bottom);
world.add(domino2top);

world.add(domino3bottom);
world.add(domino3top);

world.add(domino4bottom);
world.add(domino4top);

world.add(domino5bottom);
world.add(domino5top);

world.add(domino6bottom);
world.add(domino6top);

world.add(domino7bottom);
world.add(domino7top);

world.add(domino8bottom);
world.add(domino8top);

// put the domino into the world Here
// you can, of course, add more than 1

world.go();
