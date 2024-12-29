/*jshint esversion: 6 */
// @ts-check

// get things we need
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { AutoUI } from "../libs/CS559-Framework/AutoUI.js";
import { GrCrane, GrExcavator, GrMiniLoader, GrGarbageTruck, GrTelescopingTruck } from "./07-09-constructionobjects.js";

let cDiv = document.getElementById("construction");
let world = new GrWorld({ groundplanesize: 10, where: cDiv, renderparams: { preserveDrawingBuffer: true }, id: "canvas" });

let crane = new GrCrane({ x: 2, z: -2 });
world.add(crane);
let c_ui = new AutoUI(crane, 300, cDiv, 1, true);

let excavator = new GrExcavator({ x: -2, z: 2 });
world.add(excavator);
let e_ui = new AutoUI(excavator, 300, cDiv, 1, true);
e_ui.set("x", 6);
e_ui.set("z", 3);
e_ui.set("theta", 36);

// let excavator2 = new GrExcavator({ x: -2, z: 2 });
// world.add(excavator2);
// let e_ui2 = new AutoUI(excavator, 300, cDiv, 1, true);
// e_ui2.set("x", 6);
// e_ui2.set("z", 3);
// e_ui2.set("theta", 36);

let miniloader = new GrMiniLoader({ x: 0, z: 0 });
world.add(miniloader);
let b_ui = new AutoUI(miniloader, 300, cDiv, 1, true);
b_ui.set("x", -4);
b_ui.set("z", -4);

let garbageTruck = new GrGarbageTruck({ x: 0, z: 0 });
world.add(garbageTruck);
let g_ui = new AutoUI(garbageTruck, 300, cDiv, 1, true);
g_ui.set("x", 2);
g_ui.set("z", 6);

let telescopingTruck = new GrTelescopingTruck({ x: 0, z: 0 });
world.add(telescopingTruck);
let t_ui = new AutoUI(telescopingTruck, 300, cDiv, 1, true);
t_ui.set("x", -6); 
t_ui.set("z", 0);
t_ui.set("theta", 0);


world.go();
