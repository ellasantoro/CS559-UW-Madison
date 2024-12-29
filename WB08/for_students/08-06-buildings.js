/*jshint esversion: 6 */
// @ts-check

// 08-06-buildings.js

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

/**
 * this class creates a custom building that is white with a blue roof and has a door texture on the front.
 */
export class CustomBuilding extends GrObject {
    constructor(x, z, angle) {
        let baseGeometry = new T.BufferGeometry();
        let roofGeometry = new T.BufferGeometry();

        const vertices1 = new Float32Array([
            //ALL TRIANGLES ARE MADE IN CCW DIRECTION:
            // front square
            -0.5, 0, 0.5,   // bottom left
            0.5, 0, 0.5,    // bottom right
            0.5, 1, 0.5,    // top right

            0.5, 1, 0.5,    // top right
            -0.5, 1, 0.5,   // top left
            -0.5, 0, 0.5,   // bottom left

            // back square
            0.5, 0, -0.5,   // bottom right
            -0.5, 0, -0.5,  // bottom left
            -0.5, 1, -0.5,  // top left

            -0.5, 1, -0.5,  // top left
            0.5, 1, -0.5,   // top right
            0.5, 0, -0.5,   // bottom right

            // right square
            0.5, 0, 0.5,    // bottom right
            0.5, 0, -0.5,   // bottom right
            0.5, 1, -0.5,   // top right

            0.5, 1, -0.5,   // top right
            0.5, 1, 0.5,    // top right
            0.5, 0, 0.5,    // bottom right

            // left square
            -0.5, 0, -0.5,  // bottom left
            -0.5, 0, 0.5,   // bottom left
            -0.5, 1, 0.5,   // top left

            -0.5, 1, 0.5,   // top left
            -0.5, 1, -0.5,  // top left
            -0.5, 0, -0.5,  // bottom left

            // top square
            -0.5, 1, 0.5,   // top left
            0.5, 1, 0.5,    // top right
            0.5, 1, -0.5,   // top right

            0.5, 1, -0.5,   // top right
            -0.5, 1, -0.5,  // top left
            -0.5, 1, 0.5    // top left
        ]);

        const uv = new Float32Array([
            //front square (only map door to the front)
            -0.3, 0, //bottom left
            1.3, 0, //bottom right
            1.3, 1.3, //top right
            1.3, 1.3, //top right
            -0.3, 1.3, //top left
            -0.3, 0, //bottom left

            //using -1's so that its all out of bounds and nothing will be mapped to the other triangles.
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
            -1, -1,
        ])

        const vertices2 = new Float32Array([
            //ALL TRIANGLES ARE MADE IN CCW DIRECTION:
            //PYRAMID (roof on top of box)
            //front
            0, 1.8, 0, //top
            -0.6, 1.0, 0.6, //left
            0.6, 1.0, 0.6, //right

            //right
            0, 1.8, 0, //top
            0.6, 1.0, 0.6, //left
            0.6, 1.0, -0.6, //right

            //back
            0, 1.8, 0, //top
            0.6, 1.0, -0.6, //left
            -0.6, 1.0, -0.6, //right

            //left
            0, 1.8, 0, //top
            -0.6, 1.0, -0.6, //left
            -0.6, 1.0, 0.6, //right

            //bottom (square - made of two triangles)
            0.6, 1.0, -0.6, //top right
            0.6, 1.0, 0.6, //bottom right
            -0.6, 1.0, 0.6, //bottom left

            -0.6, 1.0, 0.6, //bottom left
            -0.6, 1.0, -0.6, //top left
            0.6, 1.0, -0.6 //top right
        ]);

        //mapping the roof pattern onto the roof:
        const uv2 = new Float32Array([
            //front
            0.25, 0, //top
            0, 0.8, //left
            0.5, 0.8, //right

            //right
            0.25, 0, //top
            0, 0.8, //left
            0.5, 0.8, //right

            //back
            0.25, 0, //top
            0, 0.8, //left
            0.5, 0.8, //right

            //left
            0.25, 0, //top
            0, 0.8, //left
            0.5, 0.8, //right

            //using -1's for the bottom since we don't need the roof texture on the bottom square and -1
            //makes it out of bounds for the uvs:
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
        ]);

        //set the attributes & compute vertex normals for both the base and the roof (this code is taken from examples & class - code given to us)
        baseGeometry.setAttribute("position", new T.BufferAttribute(vertices1, 3));
        baseGeometry.setAttribute("uv", new T.BufferAttribute(uv, 2));
        baseGeometry.computeVertexNormals();

        roofGeometry.setAttribute("position", new T.BufferAttribute(vertices2, 3));
        roofGeometry.setAttribute("uv", new T.BufferAttribute(uv2, 2));
        roofGeometry.computeVertexNormals();

        //load the texture using texture loader (learned from class, taken from given code)
        let doorTexture = new T.TextureLoader().load("../textures/door.png");
        //create the new material with the mapping from texture loader:
        let material1 = new T.MeshStandardMaterial({
            color: "#ffffff",
            roughness: 0.75,
            map: doorTexture
        });
        //load the texture using texture loader (learned from class, taken from given code)
        let roofTexture = new T.TextureLoader().load("../textures/roof.jpeg");
        //create the new material with the mapping from texture loader:
        let material2 = new T.MeshStandardMaterial({
            color: "#ffffff",
            roughness: 0.75,
            map: roofTexture
        });

        //create the meshes using the geometries from BufferGeometry and the materials we just made:
        let baseMesh = new T.Mesh(baseGeometry, material1);
        let roofMesh = new T.Mesh(roofGeometry, material2);
        //create group and add all to the group because we want to be able to move all items in the group when
        //given passed in values from the other file since we are going to want to create duplicates of these buildings
        let group = new T.Group();
        group.add(baseMesh);
        group.add(roofMesh);
        //the following two lines are for "user input" from the other file, you can pass in values for angle, x, and z so that
        //we can duplicate buildings and have them all in different spots.
        group.rotateY(angle);
        group.position.set(x, 0, z);

        //super call! necessary for every constructor:
        super("Building1", group);
    }
}

/**
 * This class creates a custom building that has a sandy base color and a brown roof with dormers (these are the little triangles that
 * come out of the roof). It has windows on the sides.
 */
export class CustomBuilding2 extends GrObject {
    constructor(x, z) {
        let baseGeometry = new T.BufferGeometry();
        let roofGeometry = new T.BufferGeometry();

        //building the base:
        const vertices1 = new Float32Array([
            //ALL TRIANGLES ARE BUILT IN THE COUNTER-CLOCKWISE DIRECTION
            // front square
            -0.5, 0, 0.5,   // bottom left
            0.5, 0, 0.5,    // bottom right
            0.5, 1, 0.5,    // top right

            0.5, 1, 0.5,    // top right
            -0.5, 1, 0.5,   // top left
            -0.5, 0, 0.5,   // bottom left

            // back square
            0.5, 0, -0.9,   // bottom right
            -0.5, 0, -0.9,  // bottom left
            -0.5, 1, -0.9,  // top left

            -0.5, 1, -0.9,  // top left
            0.5, 1, -0.9,   // top right
            0.5, 0, -0.9,   // bottom right

            // right square
            0.5, 0, 0.5,    // bottom right
            0.5, 0, -0.9,   // bottom left
            0.5, 1, -0.9,   // top left

            0.5, 1, -0.9,   // top left
            0.5, 1, 0.5,    // top right
            0.5, 0, 0.5,    // bottom right

            // left square
            -0.5, 0, -0.9,  // bottom left
            -0.5, 0, 0.5,   // bottom left
            -0.5, 1, 0.5,   // top left

            -0.5, 1, 0.5,   // top left
            -0.5, 1, -0.9,  // top left
            -0.5, 0, -0.9,  // bottom left

            // top square
            -0.5, 1, 0.5,   // top left
            0.5, 1, 0.5,    // top right
            0.5, 1, -0.5,   // top right

            0.5, 1, -0.5,   // top right
            -0.5, 1, -0.5,  // top left
            -0.5, 1, 0.5    // top left
        ]);


        //uvs for the base - we want to map the window to the sides of the house
        let uv1 = new Float32Array([
            //i only wanted the window on the left and right square, so we will map -1's to all other squares:
            //front:
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,

            //back:
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,

            //left:
            1.15, -0.1, //bottom right
            -0.15, -0.1, //bottom left
            -0.15, 1.1, //top left

            -0.15, 1.1, //top left
            1.15, 1.1, //top right
            1.15, -0.1, //bottom right

            //right:
            -0.15, -0.1, //bottom right
            1.15, -0.1, //bottom left
            1.15, 1.1, //top left

            1.15, 1.1, //top left
            -0.15, 1.1, //top right
            -0.15, -0.1, //bottom right

            //top:
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
        ])

        //roof vertices:
        const vertices2 = new Float32Array([
            //ALL TRIANGLES ARE BUILT IN CCW DIRECTION
            //MAIN ROOF PORTION (not the outlooks)
            //front
            0, 1.8, 0.6, //top
            -0.6, 1, 0.6, //left
            0.6, 1, 0.6, //right

            //right rectangle
            0, 1.8, 0.6, //top left
            0.6, 1, 0.6, //bottom left
            0.6, 1, -1, //bottom right

            0.6, 1, -1, //bottom right
            0, 1.8, -1, //top right
            0, 1.8, 0.6, //top left

            //left rectangle
            -0.6, 1, -1, //bottom left
            -0.6, 1, 0.6, //bottom right
            0, 1.8, 0.6, //top right

            0, 1.8, 0.6, //top right
            0, 1.8, -1, //top left
            -0.6, 1, -1, //bottom left

            //back
            0, 1.8, -1, //top
            0.6, 1, -1, //left
            -0.6, 1, -1, //right

            //roof bottom
            0.6, 1, 0.6,
            -0.6, 1, 0.6,
            -0.6, 1, -1,
            -0.6, 1, -1,
            0.6, 1, -1,
            0.6, 1, 0.6,

            //OUTLOOKS/DORMERS: made with one big long triangular shape that pierces through the main roof
            //front:
            0.6, 1.47, -0.2, //top
            0.6, 1.07, 0.2, //left
            0.6, 1.07, -0.6, //right

            //left side (slanted)
            0.6, 1.07, 0.2, //bottom right
            0.6, 1.47, -0.2, //top right
            -0.6, 1.47, -0.2, //top left

            -0.6, 1.47, -0.2,//top left
            -0.6, 1.07, 0.2, //bottom left
            0.6, 1.07, 0.2, //bottom right

            //right side (slanted):
            -0.6, 1.07, -0.6, //bottom right
            -0.6, 1.47, -0.2, //top right
            0.6, 1.47, -0.2, //top left

            0.6, 1.47, -0.2, //top left
            0.6, 1.07, -0.6, //bottom left
            -0.6, 1.07, -0.6, //bottom right
            //front (on the other side):
            -0.6, 1.47, -0.2, //top
            -0.6, 1.07, -0.6, //right
            -0.6, 1.07, 0.2, //left
        ]);

        //uvs for the roof - all of the "top" areas should be filled, but the faces that dont face upwards to
        //the sky shouldn't be - so some things are mapped to -1
        const uv2 = new Float32Array([
            //front - facing outwards, shouldn't have mapping
            -1, -1,
            -1, -1,
            -1, -1,

            //right rectangle:
            1, 0.8, //top left
            1, 0, //bottom left
            0.5, 0, //bottom right

            0.5, 0, //bottom right
            0.5, 0.8, //top right
            1, 0.8, //top left

            //left rectangle
            0.5, 0, //bottom left
            1, 0, //bottom right
            1, 0.8, //top right

            1, 0.8, //top right
            0.5, 0.8, //top left
            0.5, 0, //bottom left

            //back - facing outwards, shouldn't have mapping:
            -1, -1,
            -1, -1,
            -1, -1,

            //roof bottom - doesn't need mapping, mostly hidden and is underneath
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,

            //OUTLOOKS:
            //front: - facing outwards, shouldnt have mapping
            -1, -1,
            -1, -1,
            -1, -1,

            //left side:
            1, 0, //bottom right
            1, 1, //top right
            0.5, 1, //top left

            0.5, 1, //top left
            0.5, 0, //bottom left
            1, 0, //bottom right

            //right side:
            0.5, 0, //bottom right
            0.5, 1, //top right
            1, 1, //top left

            1, 1, //top left
            1, 0, //bottom left
            0.5, 0, //bottom right

            //front (on the other side): - facing outwards, shouldnt have mapping
            -1, -1,
            -1, -1,
            -1, -1,
        ]);

        //wanted the colors to differ from the tops of roofs in comparison to the fronts facing outwards - so i decided
        //to use a float32array like shown in class to do so.
        const colors2 = new Float32Array([
            //front - sandy brown
            0.361, 0.263, 0.173,
            0.361, 0.263, 0.173,
            0.361, 0.263, 0.173,

            //right rectangle - brown
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,

            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,


            //left rectangle - brown
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,

            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,

            //back - sandy brown
            0.361, 0.263, 0.173,
            0.361, 0.263, 0.173,
            0.361, 0.263, 0.173,

            //bottom - brown
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,

            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,

            //OUTLOOK
            //front: - brown
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,

            //left rect - brown
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,

            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            //right rect - brown
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,

            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,

            //front - sandy brown
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035,
            0.122, 0.075, 0.035
        ])

        //set attributes for position, color (if applicable), and uv and compute vertex normals for base and roof:
        baseGeometry.setAttribute("position", new T.BufferAttribute(vertices1, 3));
        baseGeometry.setAttribute("uv", new T.BufferAttribute(uv1, 2));
        baseGeometry.computeVertexNormals();

        roofGeometry.setAttribute("position", new T.BufferAttribute(vertices2, 3));
        roofGeometry.setAttribute("color", new T.BufferAttribute(colors2, 3));
        roofGeometry.setAttribute("uv", new T.BufferAttribute(uv2, 2));
        roofGeometry.computeVertexNormals();

        //use texture loader and mapping in mesh material to add the windows to the side (again, texture loader was taught
        //in class and given as examples, so that is where the texture loader code is from).
        let windowTexture = new T.TextureLoader().load("../textures/window.png");
        let material1 = new T.MeshStandardMaterial({
            color: "#ded4c1",
            roughness: 0.75,
            map: windowTexture
        });
        //repeat with roof texture & roof material: 
        let roofTexture = new T.TextureLoader().load("../textures/roof2.png");
        let material2 = new T.MeshStandardMaterial({
            roughness: 0.75,
            vertexColors: true,
            map: roofTexture
        });

        //create the meshes for our roof & base using the roof and base geometry from bufferGeometry, and the
        //materials we just made.
        let baseMesh = new T.Mesh(baseGeometry, material1);
        let roofMesh = new T.Mesh(roofGeometry, material2);
        //create a group so that we can move the ENTIRE building around easier
        let group = new T.Group();
        group.add(baseMesh);
        group.add(roofMesh);
        //set the positions based on the input given from the file where we create them so we can duplicate the building
        //but still have them in different places (y always 0 so it stays on the floor).
        group.position.set(x, 0, z);
        group.rotateY(Math.PI / 2);
        //make sure to do a super call, as it is required for constructors!
        super("Building2", group);
    }
}

/**
 * This class creates a Tree object - it does not use BufferGeometry.
 */
export class Tree extends GrObject {
    constructor(x, z) {
        //create the trunk & leaves geometry using cylinder and sphere geometries
        let trunkGeometry = new T.CylinderGeometry(0.2, 0.2, 1);
        let leavesGeometry = new T.SphereGeometry(0.45, 32);

        //add materials - set the color to brown & green respectively:
        let trunkMaterial = new T.MeshStandardMaterial({ color: "#8f6950" });
        let leavesMaterial = new T.MeshStandardMaterial({ color: "#284f2c" });

        //now create the mesh - make loads of leaf meshes so that we have a collection of several spheres that will look
        //slightly more realistic compared to just a sphere on a stick
        let trunkMesh = new T.Mesh(trunkGeometry, trunkMaterial);
        let leavesMesh1 = new T.Mesh(leavesGeometry, leavesMaterial);
        let leavesMesh2 = new T.Mesh(leavesGeometry, leavesMaterial);
        let leavesMesh3 = new T.Mesh(leavesGeometry, leavesMaterial);
        let leavesMesh4 = new T.Mesh(leavesGeometry, leavesMaterial);
        let leavesMesh5 = new T.Mesh(leavesGeometry, leavesMaterial);
        let leavesMesh6 = new T.Mesh(leavesGeometry, leavesMaterial);
        let leavesMesh7 = new T.Mesh(leavesGeometry, leavesMaterial);

        //set the positions of each (we will change their position using input from the other file, but this will help us
        //position them relative to each other so that we can group them and move the entire group)
        leavesMesh1.position.set(0.3, 1.5, 0);
        leavesMesh2.position.set(-0.3, 1.4, 0);
        leavesMesh3.position.set(0, 1.4, 0.3);
        leavesMesh4.position.set(-0.1, 1.2, -0.3);
        leavesMesh5.position.set(0.2, 1.2, 0.1);
        leavesMesh6.position.set(0.2, 1.2, -0.3);
        leavesMesh6.position.set(-0.1, 1.8, -0.1);
        leavesMesh7.position.set(0, 1.5, -0.5);
        trunkMesh.position.set(0, 0.5, 0);
        //now, create the group & add all of our meshes to it so we can move it as a unit
        let treeGroup = new T.Group();
        treeGroup.add(trunkMesh);
        treeGroup.add(leavesMesh1);
        treeGroup.add(leavesMesh2);
        treeGroup.add(leavesMesh3);
        treeGroup.add(leavesMesh4);
        treeGroup.add(leavesMesh5);
        treeGroup.add(leavesMesh6);
        treeGroup.add(leavesMesh7);
        //now move the entire tree with all its parts based on the input from the other file. this way we can have several
        //duplicate trees in different positions
        treeGroup.position.set(x, 0, z);
        //super call to GrObject! required for constructors
        super("Tree", treeGroup);
    }
}

/**
 * This class creates the castle object - it has 4 walls, 4 towers, and 4 tower roofs as well as brick texturing.
 */
export class Castle extends GrObject {
    constructor(x, z) {
        let baseGeometry = new T.BufferGeometry();
        //creating the walls of the tower:
        let vertices = new Float32Array([
            //ALL TRIANGLES ARE BUILT IN THE CCW DIRECTION
            //FRONT WALL:
            // front square
            -0.8, 0, 0.9,   // bottom left
            0.8, 0, 0.9,    // bottom right
            0.8, 1, 0.9,    // top right

            0.8, 1, 0.9,    // top right
            -0.8, 1, 0.9,   // top left
            -0.8, 0, 0.9,   // bottom left

            // back square
            0.8, 0, 0.5,    // bottom left
            -0.8, 0, 0.5,   // bottom right
            -0.8, 1, 0.5,   // top right

            -0.8, 1, 0.5,   // top right
            0.8, 1, 0.5,    // top left
            0.8, 0, 0.5,    // bottom left

            // top square
            -0.8, 1, 0.5,   // top left
            -0.8, 1, 0.9,   // bottom left
            0.8, 1, 0.9,   // bottom right

            0.8, 1, 0.9,   // bottom right
            0.8, 1, 0.5,   //top right
            -0.8, 1, 0.5,   // top left

            //BACK WALL:
            // front square
            -0.8, 0, -0.5,   // bottom left
            0.8, 0, -0.5,    // bottom right
            0.8, 1, -0.5,    // top right

            0.8, 1, -0.5,    // top right
            -0.8, 1, -0.5,   // top left
            -0.8, 0, -0.5,   // bottom left

            // back square
            0.8, 0, -0.9,    // bottom left
            -0.8, 0, -0.9,   // bottom right
            -0.8, 1, -0.9,   // top right

            -0.8, 1, -0.9,   // top right
            0.8, 1, -0.9,    // top left
            0.8, 0, -0.9,    // bottom left

            // top square
            -0.8, 1, -0.9,   // top left
            -0.8, 1, -0.5,   // bottom left
            0.8, 1, -0.5,   // bottom right

            0.8, 1, -0.5,   // bottom right
            0.8, 1, -0.9,   //top right
            -0.8, 1, -0.9,   // top left

            //SIDE WALL (RIGHT)
            //outer wall
            1.2, 0, 0.5,    // bottom left
            1.2, 0, -0.5,   // bottom right
            1.2, 1, -0.5,   // top right

            1.2, 1, -0.5,   // top right
            1.2, 1, 0.5,    // top left
            1.2, 0, 0.5,    // bottom left

            //inner wall
            0.9, 0, -0.5,   // bottom left
            0.9, 0, 0.5,    // bottom right
            0.9, 1, 0.5,    // top right

            0.9, 1, 0.5,    // top right
            0.9, 1, -0.5,   // top left
            0.9, 0, -0.5,   // bottom left

            //top 
            0.9, 1, -0.5,   // bottom left
            0.9, 1, 0.5,    // bottom right
            1.2, 1, 0.5,    // top right

            1.2, 1, 0.5,    // top right
            1.2, 1, -0.5,   // top left
            0.9, 1, -0.5,   // bottom left

            //SIDE WALL (LEFT)
            //outer wall
            -0.9, 0, 0.5,    // bottom left
            -0.9, 0, -0.5,   // bottom right
            -0.9, 1, -0.5,   // top right

            -0.9, 1, -0.5,   // top right
            -0.9, 1, 0.5,    // top left
            -0.9, 0, 0.5,    // bottom left

            //inner wall
            -1.2, 0, -0.5,   // bottom left
            -1.2, 0, 0.5,    // bottom right
            -1.2, 1, 0.5,    // top right

            -1.2, 1, 0.5,    // top right
            -1.2, 1, -0.5,   // top left
            -1.2, 0, -0.5,   // bottom left

            //top 
            -1.2, 1, -0.5,   //bottom left
            -1.2, 1, 0.5,    // bottom right
            -0.9, 1, 0.5,    // top right

            -0.9, 1, 0.5,    // top right
            -0.9, 1, -0.5,   // top left
            -1.2, 1, -0.5,   // bottom left
        ]);

        //uvs for the bricks - all surfaces have bricks
        let uvs = new Float32Array([
            //front square
            0, 0,
            0.6, 0,
            0.6, 0.6,

            0.6, 0.6,
            0, 0.6,
            0, 0,
            //back square
            0, 0,
            0.6, 0,
            0.6, 0.6,

            0.6, 0.6,
            0, 0.6,
            0, 0,

            //top square
            0, 0.2,
            0, 0,
            0.6, 0,

            0.6, 0,
            0.6, 0.2,
            0, 0.2,

            //front square
            0, 0,
            0, 0.2,
            0.6, 0,

            0.6, 0,
            0, 0.2,
            0.6, 0.2,

            //back square
            0, 0,
            0.6, 0,
            0.6, 0.6,

            0.6, 0.6,
            0, 0.6,
            0, 0,

            //top square
            0, 0.2,
            0, 0,
            0.6, 0,

            0.6, 0,
            0.6, 0.2,
            0, 0.2,


            //outer wall
            0, 0,
            0.6, 0,
            0.6, 0.6,

            0.6, 0.6,
            0, 0.6,
            0, 0,

            //inner wall
            0, 0,
            0.6, 0,
            0.6, 0.6,

            0.6, 0.6,
            0, 0.6,
            0, 0,

            //top square
            0, 0,
            0.6, 0,
            0.6, 0.2,

            0.6, 0.2,
            0, 0.2,
            0, 0,

            //outer wall
            0, 0,
            0.6, 0,
            0.6, 0.6,

            0.6, 0.6,
            0, 0.6,
            0, 0,

            //inner wall
            0, 0,
            0.6, 0,
            0.6, 0.6,

            0.6, 0.6,
            0, 0.6,
            0, 0,

            //top square
            0, 0,
            0.6, 0,
            0.6, 0.2,

            0.6, 0.2,
            0, 0.2,
            0, 0,
        ])

        //set attributes for position & uv and compute the vertex normals
        baseGeometry.setAttribute('position', new T.BufferAttribute(vertices, 3));
        baseGeometry.setAttribute('uv', new T.BufferAttribute(uvs, 2));
        baseGeometry.computeVertexNormals();
        //set the texture for the walls & add color through material
        let texture = new T.TextureLoader().load("../textures/stone2.jpeg");
        let baseMaterial = new T.MeshStandardMaterial({
            color: "#b4bbbf",
            roughness: 0.8,
            map: texture
        });
        //now we will create tower & roof through cylinder and cone geometries:
        let towerGeometry = new T.CylinderGeometry(0.3, 0.3, 1.75, 32);
        let roofGeometry = new T.ConeGeometry(0.4, 0.8);

        //create material and map the same texture as before:
        let towerMaterial = new T.MeshStandardMaterial({ color: "#b4bbbf", map: texture });
        let roofMaterial = new T.MeshStandardMaterial({ color: "#3682d1", map: texture });

        //create all the meshes using the geometries and materials:
        let baseMesh = new T.Mesh(baseGeometry, baseMaterial);
        let towerMesh1 = new T.Mesh(towerGeometry, towerMaterial);
        let towerMesh2 = new T.Mesh(towerGeometry, towerMaterial);
        let towerMesh3 = new T.Mesh(towerGeometry, towerMaterial);
        let towerMesh4 = new T.Mesh(towerGeometry, towerMaterial);
        let roofMesh1 = new T.Mesh(roofGeometry, roofMaterial);
        let roofMesh2 = new T.Mesh(roofGeometry, roofMaterial);
        let roofMesh3 = new T.Mesh(roofGeometry, roofMaterial);
        let roofMesh4 = new T.Mesh(roofGeometry, roofMaterial);

        //set all the positions relative to each other - the entire object as a whole will be moved later based on
        //input values
        towerMesh1.position.set(-1, 0.8, 0.7);
        towerMesh2.position.set(1, 0.8, 0.7);
        towerMesh3.position.set(1, 0.8, -0.7);
        towerMesh4.position.set(-1, 0.8, -0.7);
        roofMesh1.position.set(-1, 2, 0.7);
        roofMesh2.position.set(1, 2, 0.7);
        roofMesh3.position.set(1, 2, -0.7);
        roofMesh4.position.set(-1, 2, -0.7);

        //now create a new group and add all the meshes so we can easily duplicate & move the castle
        let castleGroup = new T.Group();
        castleGroup.add(baseMesh);
        castleGroup.add(towerMesh1);
        castleGroup.add(towerMesh2);
        castleGroup.add(towerMesh3);
        castleGroup.add(towerMesh4);
        castleGroup.add(roofMesh1);
        castleGroup.add(roofMesh2);
        castleGroup.add(roofMesh3);
        castleGroup.add(roofMesh4);
        //set the position to the desired coords (specified in other file)
        castleGroup.position.set(x, 0, z);
        //and remember to call super!
        super("Castle", castleGroup);
    }
}
