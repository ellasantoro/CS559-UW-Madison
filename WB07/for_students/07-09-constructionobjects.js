/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

let craneObCtr = 0;

// A simple crane
/**
 * @typedef CraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCrane extends GrObject {
  /**
   * @param {CraneProperties} params
   */
  constructor(params = {}) {
    let crane = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false
    };

    // first, we define the base of the crane.
    // Just draw a curve for the shape, then use three's "ExtrudeGeometry"
    // to create the shape itself.
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-0.5, 0);
    base_curve.lineTo(-0.5, 2);
    base_curve.lineTo(-0.25, 2.25);
    base_curve.lineTo(-0.25, 5);
    base_curve.lineTo(-0.2, 5);
    base_curve.lineTo(-0.2, 5.5);
    base_curve.lineTo(0.2, 5.5);
    base_curve.lineTo(0.2, 5);
    base_curve.lineTo(0.25, 5);
    base_curve.lineTo(0.25, 2.25);
    base_curve.lineTo(0.5, 2);
    base_curve.lineTo(0.5, 0);
    base_curve.lineTo(-0.5, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let crane_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, crane_mat);
    crane.add(base);
    base.translateZ(-0.25);

    // Use a similar process to create the cross-arm.
    // Note, we create a group for the arm, and move it to the proper position.
    // This ensures rotations will behave nicely,
    // and we just have that one point to work with for animation/sliders.
    let arm_group = new T.Group();
    crane.add(arm_group);
    arm_group.translateY(4.5);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-1.5, 0);
    arm_curve.lineTo(-1.5, 0.25);
    arm_curve.lineTo(-0.5, 0.5);
    arm_curve.lineTo(4, 0.4);
    arm_curve.lineTo(4, 0);
    arm_curve.lineTo(-1.5, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm = new T.Mesh(arm_geom, crane_mat);
    arm_group.add(arm);
    arm.translateZ(-0.25);

    // Finally, add the hanging "wire" for the crane arm,
    // which is what carries materials in a real crane.
    // The extrusion makes this not look very wire-like, but that's fine for what we're doing.
    let wire_group = new T.Group();
    arm_group.add(wire_group);
    wire_group.translateX(3);
    let wire_curve = new T.Shape();
    wire_curve.moveTo(-0.25, 0);
    wire_curve.lineTo(-0.25, -0.25);
    wire_curve.lineTo(-0.05, -0.3);
    wire_curve.lineTo(-0.05, -3);
    wire_curve.lineTo(0.05, -3);
    wire_curve.lineTo(0.05, -0.3);
    wire_curve.lineTo(0.25, -0.25);
    wire_curve.lineTo(0.25, 0);
    wire_curve.lineTo(-0.25, 0);
    let wire_geom = new T.ExtrudeGeometry(wire_curve, exSettings);
    let wire_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let wire = new T.Mesh(wire_geom, wire_mat);
    wire_group.add(wire);
    wire.translateZ(-0.25);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super(`Crane-${craneObCtr++}`, crane, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["wire", 1, 3.5, 2],
      ["arm_rotation", 0, 360, 0]
    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = crane;
    this.arm = arm_group;
    this.wire = wire_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    crane.scale.set(scale, scale, scale);
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.wire.position.x = paramValues[3];
    this.arm.rotation.y = degreesToRadians(paramValues[4]);
  }
}

let excavatorObCtr = 0;

// A simple excavator
/**
 * @typedef ExcavatorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrExcavator extends GrObject {
  /**
   * @param {ExcavatorProperties} params
   */
  constructor(params = {}) {
    let excavator = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    // As with the crane, we define the base (treads) of the excavator.
    // We draw a line, then extrude the line with ExtrudeGeometry,
    // to get the "cutout" style object.
    // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
    // This makes rotation about the y-axis work nicely
    // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
    //  rather than an axis through the center of the piece).
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    excavator.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
    excavator.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
    let cab_group = new T.Group();
    excavator.add(cab_group);
    cab_group.translateY(0.7);
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    let cab = new T.Mesh(cab_geom, excavator_mat);
    cab_group.add(cab);
    cab.translateZ(-0.2);

    // Next up is the first part of the bucket arm.
    // In general, each piece is just a series of line segments,
    // plus a bit of extra to get the geometry built and put into a group.
    // We always treat the group as the "pivot point" around which the object should rotate.
    // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
    // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
    // The remaining few pieces are very similar to the arm piece.
    let arm_group = new T.Group();
    cab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, 0);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-2.25, 0);
    arm_curve.lineTo(-2.35, 0.15);
    arm_curve.lineTo(-1, 0.5);
    arm_curve.lineTo(0, 0.25);
    arm_curve.lineTo(-0.2, 0);
    arm_curve.lineTo(-1, 0.3);
    arm_curve.lineTo(-2.25, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateZ(-0.2);

    let forearm_group = new T.Group();
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_curve = new T.Shape();
    forearm_curve.moveTo(-1.5, 0);
    forearm_curve.lineTo(-1.5, 0.1);
    forearm_curve.lineTo(0, 0.15);
    forearm_curve.lineTo(0.15, 0);
    forearm_curve.lineTo(-1.5, 0);
    let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
    let forearm = new T.Mesh(forearm_geom, arm_mat);
    forearm_group.add(forearm);
    forearm.translateZ(-0.2);

    let bucket_group = new T.Group();
    forearm_group.add(bucket_group);
    bucket_group.position.set(-1.4, 0, 0);
    let bucket_curve = new T.Shape();
    bucket_curve.moveTo(-0.25, -0.9);
    bucket_curve.lineTo(-0.5, -0.5);
    bucket_curve.lineTo(-0.45, -0.3);
    bucket_curve.lineTo(-0.3, -0.2);
    bucket_curve.lineTo(-0.15, 0);
    bucket_curve.lineTo(0.1, 0);
    bucket_curve.lineTo(0.05, -0.2);
    bucket_curve.lineTo(0.5, -0.7);
    bucket_curve.lineTo(-0.25, -0.9);
    let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
    let bucket = new T.Mesh(bucket_geom, arm_mat);
    bucket_group.add(bucket);
    bucket.translateZ(-0.2);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Excavator-${excavatorObCtr++}`, excavator, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["spin", 0, 360, 0],
      ["arm_rotate", 0, 50, 45],
      ["forearm_rotate", 0, 90, 45],
      ["bucket_rotate", -90, 45, 0]
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = excavator;
    this.cab = cab_group;
    this.arm = arm_group;
    this.forearm = forearm_group;
    this.bucket = bucket_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    excavator.scale.set(scale, scale, scale);
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.cab.rotation.y = degreesToRadians(paramValues[3]);
    this.arm.rotation.z = degreesToRadians(-paramValues[4]);
    this.forearm.rotation.z = degreesToRadians(paramValues[5]) + Math.PI / 16;
    this.bucket.rotation.z = degreesToRadians(paramValues[6]);
  }
}

/**
 * code for the mini loader object (blue) in my project. a lot of this code is modeled after the excavator object
 * given to us, but it is very largely changed, and all the coordinates and shapes other than the base were hand
 * picked. I had a hard time with the moveTo and lineTO and did not realize we could use other geometries, and that
 * is why this shape is not very good.
 */
let miniLoaderObCtr = 0;
export class GrMiniLoader extends GrObject {
  constructor(params = {}) {
    let miniloader = new T.Group();

    //settings, taken from the code given to us (above in this file)
    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    //create the base of the mini loader - this was taken largely from the excavator code given to us already, but a lot
    //of the other parts are completely built on my own so see how that is done below. i wanted to start with something I knew 
    //since using the moveTo and lineTo proved to be a struggle.
    let baseShape = new T.Shape();
    baseShape.moveTo(-1, 0.6);
    baseShape.lineTo(-1, 0.6);
    baseShape.lineTo(-1, 0.6);
    baseShape.lineTo(-1, 0.8);
    baseShape.lineTo(1, 0.8);
    baseShape.lineTo(0.8, 0.6);
    baseShape.lineTo(0.8, 0.6);
    baseShape.lineTo(0.8, 0);
    baseShape.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(baseShape, exSettings);
    let miniLoaderMaterial = new T.MeshStandardMaterial({
      color: "#4287f5",
      metalness: 0.6
    });
    let base = new T.Mesh(base_geom, miniLoaderMaterial);
    miniloader.add(base);
    //scaled z - explained why below
    base.scale.z = 2;
    base.translateZ(-0.2);

    //created group for the scooper tool in the front of the mini loader.
    let scooperGroup = new T.Group();
    base.add(scooperGroup);
    scooperGroup.position.set(-1, 0.4, 0);

    //created the actual scooper part - this is in the front of the mini loader
    let scoopShape = new T.Shape();
    scoopShape.moveTo(-0.8, 0);
    scoopShape.lineTo(-0.8, 0.6);
    scoopShape.lineTo(0, 0.3);
    scoopShape.lineTo(0.09, 0);
    scoopShape.lineTo(-0.2, 0);
    let scoopGeometry = new T.ExtrudeGeometry(scoopShape, exSettings);
    let scoopMaterial = new T.MeshStandardMaterial({
      color: "#5a5d63",
    });
    let scoop = new T.Mesh(scoopGeometry, scoopMaterial);
    //wanted to scale the z so that it was wider - i had a hard time with this since it was moveTo and lineTo with x and y.
    scoop.scale.z = 2;
    scoop.rotateZ(Math.PI / 4);
    scooperGroup.add(scoop);
    scoop.translateZ(-0.2);

    //create the first pole closer to the front.
    let pole1 = new T.Group();
    miniloader.add(pole1);
    pole1.translateY(0.7);
    let cabPoleShape1 = new T.Shape();
    cabPoleShape1.moveTo(-1, 0);
    cabPoleShape1.lineTo(-1, 2);
    cabPoleShape1.lineTo(-0.5, 2);
    cabPoleShape1.lineTo(-0.5, 0);
    cabPoleShape1.lineTo(-1, 0);
    let cabGeometry1 = new T.ExtrudeGeometry(cabPoleShape1, exSettings);
    let cab = new T.Mesh(cabGeometry1, miniLoaderMaterial);
    cab.scale.z = 2;
    pole1.add(cab);
    cab.translateZ(-0.2);

    //create the top part that connects the two poles:
    let cabTop = new T.Group();
    miniloader.add(cabTop);
    cabTop.translateY(0.7);
    let cabPoleShape2 = new T.Shape();
    cabPoleShape2.moveTo(-1, 2);
    cabPoleShape2.lineTo(-1, 1.5);
    cabPoleShape2.lineTo(1, 1.5);
    cabPoleShape2.lineTo(-0.5, 2);
    cabPoleShape2.lineTo(-1, 2);
    let cabGeometry2 = new T.ExtrudeGeometry(cabPoleShape2, exSettings);
    let cab2 = new T.Mesh(cabGeometry2, miniLoaderMaterial);
    cab2.scale.z = 2;
    cabTop.add(cab2);
    cab2.translateZ(-0.2)

    //create the second main pole in the back:
    let pole2 = new T.Group();
    miniloader.add(pole2);
    pole2.translateY(0.7);
    let cabPoleShape3 = new T.Shape();
    cabPoleShape3.moveTo(1, 1.5);
    cabPoleShape3.lineTo(0.5, 1.5);
    cabPoleShape3.lineTo(0.5, -0.3);
    cabPoleShape3.lineTo(1, -0.3)
    cabPoleShape3.lineTo(1, 1.5)
    let cabGeometry3 = new T.ExtrudeGeometry(cabPoleShape3, exSettings);
    let cab3 = new T.Mesh(cabGeometry3, miniLoaderMaterial);
    //scale z because I wanted my object to be wider. it was difficult using the moveTo and lineTo's
    cab3.scale.z = 2;
    pole2.add(cab3);
    cab3.translateZ(-0.2)

    //copied and changed from the code that was provided for us in this file. changed to fit my object.
    super(`Mini Loader-${miniLoaderObCtr++}`, miniloader, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["scoop_rotate", -90, 45, 0]
    ]);

    this.whole_ob = miniloader;
    this.cab = pole1;
    this.scoop = scooperGroup;
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;

  }

  //update parameters based on UI. this is largely copied from the given code that we were provided, but of course
  //changed so that it matches my object.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.scoop.rotation.z = degreesToRadians(paramValues[3]);
  }
}

/**
 * Class to create the garbage truck. This is the green object in my project. Young Wu said on piazza that we didn't
 * have to make all the objects from scratch, so I used geometries from THREE to make this one, unlike the previous
 * one above where I did all of it using lineTo and moveTo's. 
 * 
 * One thing to note about this class is that there is code taken from the given code in this workbook, and altered
 * to fit my objects.
 */
let garbageTruckObCtr = 0;
export class GrGarbageTruck extends GrObject {
  constructor(params = {}) {
    //create the main group for the truck. we will add the separate objects onto here.
    let garbageTruck = new T.Group();

    //create truck geometries and materials, make a mesh:
    let truckGeometry = new T.BoxGeometry(2, 1.5, 1);
    let truckMaterial = new T.MeshStandardMaterial({ color: "#70e34f" });
    let truckMesh = new T.Mesh(truckGeometry, truckMaterial);
    //set the position, 0.1 for y because it was appearing underground when i was making it.
    truckMesh.position.set(0, 0.1, 0);
    garbageTruck.add(truckMesh);

    //create wheel geometries and materials:
    let wheelGeometry = new T.SphereGeometry(0.37, 30, 30);
    let wheelMaterial = new T.MeshStandardMaterial({ color: "#5a5d63", metalness: 0.5 });

    //create the wheels: two on each side.
    let wheel1 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel1.position.set(0.8, -0.7, -0.5);
    garbageTruck.add(wheel1);

    let wheel2 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel2.position.set(0.8, -0.7, 0.5);
    garbageTruck.add(wheel2);

    let wheel3 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel3.position.set(-0.8, -0.7, -0.5);
    garbageTruck.add(wheel3);

    let wheel4 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel4.position.set(-0.8, -0.7, 0.5);
    garbageTruck.add(wheel4);


    //create the arms that will be like the arms on a garbage truck that pick up the trash
    let armMaterial = new T.MeshStandardMaterial({ color: "#5a5d63" });

    //create the groups for the right and left arms:
    let rightArm = new T.Group();
    garbageTruck.add(rightArm);

    let leftArm = new T.Group();
    garbageTruck.add(leftArm);

    //create the left arm made out of two stick-like box geometries:
    let leftArmLong = new T.Mesh(new T.BoxGeometry(1.5, 0.2, 0.1), armMaterial);
    leftArmLong.position.set(-0.8, -0.2, 0.5);
    leftArm.add(leftArmLong);

    let leftArmShort = new T.Mesh(new T.BoxGeometry(0.2, 0.6, 0.1), armMaterial);
    leftArmShort.position.set(0, 0, 0.5);
    leftArm.add(leftArmShort);

    //now for the right arm, which is basically the exact same as the left arm but with the z-coords shifted down
    //so it's on the other side.
    let rightArmLong = new T.Mesh(new T.BoxGeometry(1.5, 0.2, 0.1), armMaterial);
    rightArmLong.position.set(-0.8, -0.2, -0.5);
    rightArm.add(rightArmLong);

    let rightArmShort = new T.Mesh(new T.BoxGeometry(0.2, 0.6, 0.1), armMaterial);
    rightArmShort.position.set(0, 0, -0.5);
    rightArm.add(rightArmShort);

    //trash can for the front of the truck so it looks like its picking up the garbage
    let cylinderGeometry = new T.CylinderGeometry(0.4, 0.4, 1, 32);
    let cylinderMaterial = new T.MeshStandardMaterial({ color: "#5a5d63", metalness: 0.3, roughness: 0.3 });
    let trash = new T.Mesh(cylinderGeometry, cylinderMaterial);
    trash.position.set(-1.3, 0, 0);
    //add the trash can to one of the arms because i am going to have arm rotation, and i want the trash can to 
    //travel with the arm. doesn't really matter which arm since the cylinder is centered between.
    rightArm.add(trash);

    //copied from logic given to us by the already written code (altered to make it work for my object):
    super(`Garbage Truck-${garbageTruckObCtr++}`, garbageTruck, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["armRotation", -90, 20, 0]
    ]);

    //groups that may be manipulated by UI:
    this.whole_ob = garbageTruck;
    this.wheels = [wheel1, wheel2, wheel3, wheel4];
    this.rightArm = rightArm;
    this.leftArm = leftArm;
    this.cylinder = trash;

    //y position doesn't change - 0.98 is right above ground. x and z are subject to change - this code is taken 
    //from the code that was already in this file that was given to us.
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = 0.98;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
  }

  //update the parameters based on UI. this code is copied and altered from what was given to us in this file.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);

    let armRotation = degreesToRadians(paramValues[3]);
    this.rightArm.rotation.z = armRotation;
    this.leftArm.rotation.z = armRotation;
  }
}

/**
 * telescoping truck that has a telescope that comes out of the top, some code used from original code given to us.
 */
let telescopingTruckObCtr = 0;
export class GrTelescopingTruck extends GrObject {
  constructor(params = {}) {
    let telescopingTruck = new T.Group();

    //create truck & material
    let truckGeometry = new T.BoxGeometry(2, 1.5, 1);
    let truckMaterial = new T.MeshStandardMaterial({ color: "red" });
    let truckMesh = new T.Mesh(truckGeometry, truckMaterial);
    //make sure to set the pos and add to the mesh!
    truckMesh.position.set(0, 0.1, 0);
    telescopingTruck.add(truckMesh);

    //create the wheels, 4 wheels on each side.
    let wheelGeometry = new T.SphereGeometry(0.37, 30, 30);
    let wheelMaterial = new T.MeshStandardMaterial({ color: "#5a5d63", metalness: 0.5 });

    let wheel1 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel1.position.set(0.8, -0.7, -0.5);
    //ensure toa dd wheel to the truck each time.
    telescopingTruck.add(wheel1);

    let wheel2 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel2.position.set(0.8, -0.7, 0.5);
    telescopingTruck.add(wheel2);

    let wheel3 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel3.position.set(-0.8, -0.7, -0.5);
    telescopingTruck.add(wheel3);

    let wheel4 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel4.position.set(-0.8, -0.7, 0.5);
    telescopingTruck.add(wheel4);

    //create stick for the top - will have an extension option.
    let stickMaterial = new T.MeshStandardMaterial({ color: "gray" });
    let stickGeometry = new T.BoxGeometry(0.3, 1.5, 0.1);
    let telescopingStick = new T.Mesh(stickGeometry, stickMaterial);
    telescopingStick.position.set(-0.6, 0.75, 0);
    telescopingStick.rotateZ(Math.PI / 8);
    telescopingTruck.add(telescopingStick);

    //code taken from given code before, as mentioned above.
    super(`Telescoping Truck-${telescopingTruckObCtr++}`, telescopingTruck, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["stick_extension", 0, 3, 0]
    ]);

    //create options for the following.
    this.whole_ob = telescopingTruck;
    this.wheels = [wheel1, wheel2, wheel3, wheel4];
    this.telescopingStick = telescopingStick;

    //taken from original code given to us as mentioned above:
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = 0.98;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
  }

  //update param values for UI
  update(paramValues) {
    //x theta and z can be altered
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);

    //retract and extending stick in the top of the truck:
    this.telescopingStick.scale.y = paramValues[3] + 1;
  }
}
