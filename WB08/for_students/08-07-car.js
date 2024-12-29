/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

export class Car extends GrObject{
    constructor(x, z, angle) {
        let carGeometry = new T.BufferGeometry();

        const vertices = new Float32Array([
            // front square
            -0.2, 0, 0.2,   // bottom left
            0.2, 0, 0.2,    // bottom right
            0.2, 0.2, 0.2,    // top right

            0.2, 0.2, 0.2,    // top right
            -0.2, 0.2, 0.2,   // top left
            -0.2, 0, 0.2,   // bottom left

            //slant up
            -0.2,0.2,0.2, //bottom left
            0.2,0.2,0.2, //bottom right
            0.2,0.3,0, //top right

            0.2,0.3,0, //top right
            -0.2,0.3,0, //top left
            -0.2,0.2,0.2, //bottom left

            //window part
            -0.2,0.3, 0, //bottom left
            0.2, 0.3, 0, //bottom right
            0.2, 0.5, -0.1, //top right

            0.2, 0.5, -0.1, //top right
            -0.2,0.5,-0.1, //top left
            -0.2,0.3, 0, //bottom left

            //window to roof connecting part (FRONT)
            -0.2,0.6,-0.2, //top left
            -0.2,0.5,-0.1, //bottom left
            0.2,0.5,-0.1, //bottom right

            0.2,0.5,-0.1, //bottom right
            0.2, 0.6, -0.2, //top right
            -0.2,0.6,-0.2, //top left

            //roof
            -0.2,0.6,-0.2, //bottom left
            0.2,0.6,-0.2, //bottom right
            0.2,0.6,-0.8, //top right

            0.2,0.6,-0.8, //top right
            -0.2,0.6,-0.8, //top left
            -0.2,0.6,-0.2, //bottom left

            //window to roof connecting part (BACK)
            0.2,0.5,-0.9, //bottom left
            -0.2,0.5,-0.9, //bottom right
            -0.2,0.6, -0.8, //top right

            -0.2,0.6, -0.8, //top right
            0.2,0.6, -0.8, //top left
            0.2,0.5,-0.9, //bottom left

            //window part (back)
            0.2,0.5,-0.9, //top left
            0.2,0.25,-1, //bottom left
            -0.2,0.25,-1, //bottom right

            -0.2,0.25,-1, //bottom right
            -0.2,0.5,-0.9, //top right
            0.2,0.5,-0.9, //top left

            //back trunk
            -0.2,0.25,-1, //top right
            0.2,0.25,-1, //top left
            0.2,0,-1, //bottom left

            0.2,0,-1, //bottom left
            -0.2,0,-1, //bottom right
            -0.2,0.25,-1, //top right


            //left side (from front to back iterations)
            -0.2,0,0, //bottom left
            -0.2,0,0.2, //bottom right
            -0.2, 0.2,0.2, //top right

            -0.2, 0.2,0.2, //top right
            -0.2,0.3,0, //top left
            -0.2,0,0, //bottom left

            -0.2,0,0, //bottom left
            -0.2,0.3,0, //bottom right
            -0.2,0.5,-0.1, //top right

            -0.2,0.5,-0.1, //top right
            -0.2,0,-0.1, //top left
            -0.2,0,0, //bottom left

            -0.2,0,-0.2, //bottom left
            -0.2,0,-0.1, //bottom right
            -0.2, 0.5, -0.1, //top right

            -0.2,0.5, -0.1, //top right
            -0.2,0.6, -0.2, //top left
            -0.2,0,-0.2, //bottom left

            -0.2,0,-0.8, //bottom left
            -0.2, 0, -0.1, //bottom right
            -0.2,0.6, -0.2, //top right

            -0.2,0.6, -0.2, //top right
            -0.2, 0.6, -0.8, //top left
            -0.2,0,-0.8, //bottom left

            -0.2, 0, -0.9, //bottom left
            -0.2, 0, -0.8, //bottom right
            -0.2,0.6, -0.8, //top right

            -0.2,0.6, -0.8, //top right
            -0.2,0.5,-0.9, //top left
            -0.2, 0, -0.9, //bottom left

            -0.2,0,-1, //bottom left
            -0.2,0,-0.9, //bottom right
            -0.2,0.5,-0.9, //top right

            -0.2,0.5,-0.9, //top right
            -0.2,0.25, -1, //top left
            -0.2, 0, -1, //bottom left

             //right side (from front to back iterations)
             0.2,0,0.2, //bottom left
             0.2,0,0, //bottom right
             0.2,0.3,0, //top right

             0.2,0.3,0, //top right
             0.2, 0.2,0.2, //top left
             0.2,0,0.2, //bottom left
            
             0.2,0.3,0, //bottom right
             0.2,0,0, //bottom left
             0.2,0,-0.1, //top left

             0.2,0,-0.1, //top left
             0.2,0.5,-0.1, //top right
             0.2,0.3,0, //bottom right

             0.2,0,-0.1, //bottom right
             0.2,0,-0.2, //bottom left
             0.2,0.6, -0.2, //top left

             0.2,0.6, -0.2, //top left
             0.2,0.5, -0.1, //top right
             0.2,0,-0.1, //bottom right

             0.2, 0, -0.1, //bottom right
             0.2,0,-0.8, //bottom left
             0.2, 0.6, -0.8, //top left

             0.2, 0.6, -0.8, //top left
             0.2,0.6, -0.2, //top right
             0.2, 0, -0.1, //bottom right

             0.2, 0, -0.8, //bottom right
             0.2, 0, -0.9, //bottom left
             0.2,0.5,-0.9, //top left

             0.2,0.5,-0.9, //top left
             0.2,0.6, -0.8, //top right
             0.2, 0, -0.8, //bottom right

             0.2,0,-0.9, //bottom right
             0.2,0,-1, //bottom left
             0.2,0.25, -1, //top left

             0.2,0.25, -1, //top left
             0.2,0.5,-0.9, //top right
             0.2,0,-0.9, //bottom right

        ]);

        let uvs = new Float32Array([
            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            0.2,0.2,
            0.8,0.2,
            0.8,0.8,
            
            0.8,0.8,
            0.2,0.8,
            0.2,0.2,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

            -1,-1,
            -1,-1,
            -1,-1,

        ]);

        let group = new T.Group();
        carGeometry.setAttribute('position', new T.BufferAttribute(vertices, 3));
        carGeometry.setAttribute('uv', new T.BufferAttribute(uvs, 2));
        carGeometry.computeVertexNormals();
        let texture = new T.TextureLoader().load("../textures/carwindshield.jpeg");
        let material = new T.MeshStandardMaterial({
            color: "#9e251c",
            roughness: 0.75,
            map: texture
        });

        let carMesh = new T.Mesh(carGeometry, material);
        carMesh.position.set(x, 0.1, z);
        group.add(carMesh);

        let wheelGeometry = new T.CylinderGeometry(0.12,0.12,0.1);
        let wheelMaterial = new T.MeshStandardMaterial({ color: "#ded9db" });
        let wheelMesh = new T.Mesh(wheelGeometry, wheelMaterial);
        let wheelMesh2 = new T.Mesh(wheelGeometry, wheelMaterial);
        let wheelMesh3 = new T.Mesh(wheelGeometry, wheelMaterial);
        let wheelMesh4 = new T.Mesh(wheelGeometry, wheelMaterial);
        wheelMesh.rotateZ(-Math.PI / 2);
        wheelMesh.position.set(x-0.26,0.13,z-0.15);

        wheelMesh2.rotateZ(-Math.PI / 2);
        wheelMesh2.position.set(x-0.26,0.13,z-0.7);

        wheelMesh3.rotateZ(-Math.PI / 2);
        wheelMesh3.position.set(x+0.26,0.13,z-0.15);

        wheelMesh4.rotateZ(-Math.PI / 2);
        wheelMesh4.position.set(x+0.26,0.13,z-0.7);
        group.add(wheelMesh);
        group.add(wheelMesh2);
        group.add(wheelMesh3);
        group.add(wheelMesh4);
        super("Car", group);
    }
}

//test2