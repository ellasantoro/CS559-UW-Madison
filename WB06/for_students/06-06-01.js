// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";


let renderer = new T.WebGLRenderer();
renderer.setSize(500, 500);
document.getElementById("div1").appendChild(renderer.domElement);

let scene = new T.Scene();

// make an array of materials
// student should improve these materials
let materials = [];

// Give each material some parameters to create different appearances
// Or try out other, more complex materials!
materials[0] = new T.MeshStandardMaterial({
    color: 0x6b4832,
    roughness: 0.3
});
materials[1] = new T.MeshStandardMaterial({
    color: 0x43573b,
    emissive: 0x0001,
    roughness: 0.2
});
materials[2] = new T.MeshStandardMaterial({
    color: 0x9bc9ba,
    metalness: 0.5,
    roughness: 0.1

});
materials[3] = new T.MeshStandardMaterial({
    color: 0x9bb9c9,
    rougness: 0.3
});
materials[4] = new T.MeshStandardMaterial({
    color: 0x807660,
    roughness: 0.2,
    metalness: 0.1
});
materials[5] = new T.MeshStandardMaterial({
    color: 0xedc7d8,
    roughness: 0.1
});
materials[6] = new T.MeshStandardMaterial({
    color: 0xd4e3cf,
    roughness: 0.3,
    emissive: 0x42323
});
materials[7] = new T.MeshStandardMaterial({
    color: 0x3b876f,
    roughness: 0.2
});
materials[8] = new T.MeshStandardMaterial({
    color: 0x2c4159,
    roughness: 0.1,
    metalness: 0.1
});

// make spheres to show off the materials
let geometry = new T.SphereGeometry(1, 20, 20);

// array of meshes
let spheres = [];
for (let i = 0; i < 9; i++) {
    spheres[i] = new T.Mesh(geometry, materials[i]);
    spheres[i].position.set(((i % 3) - 1) * 3, 0, Math.floor(i / 3) * 3);
    scene.add(spheres[i]);
}

// make some lights
let l1 = new T.DirectionalLight();
let l2 = new T.PointLight();
l2.position.set(10, 10, 10);
scene.add(l1);
scene.add(l2);

// a camera
let camera = new T.PerspectiveCamera();
camera.position.set(0, 10, 10);
camera.lookAt(0, -2, 0);

renderer.render(scene, camera);


