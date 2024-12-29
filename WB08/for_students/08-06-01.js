/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { CustomBuilding, CustomBuilding2, Tree, Castle } from "./08-06-buildings.js";
// your buildings are defined in another file... you should import them
// here

let world = new GrWorld();

// place your buildings and trees into the world here

// Create instances of your custom buildings
const building1 = new CustomBuilding(-1, -3.5, 0);
const building2 = new CustomBuilding(1, -3.5, 0);
const building3 = new CustomBuilding(-4.2, 0, Math.PI / 2);
const building4 = new CustomBuilding(4.2, 0, - Math.PI / 2);
const building5 = new CustomBuilding2(-3.8, 2);
const building6 = new CustomBuilding2(4.2, 2);
const building7 = new CustomBuilding(-4.2, 4,Math.PI / 2);
const building8 = new CustomBuilding(4.2, 4,-Math.PI / 2);
const building9 = new CustomBuilding(-1, 4,0);
const building10 = new CustomBuilding(1, 4,0);

const castle1 = new Castle(-3.4, -3);
const castle2 = new Castle(3.4, -3);

const tree1 = new Tree(-4.5, -4.5);
const tree2 = new Tree(4.5, -4.5);
const tree3 = new Tree(3, -4.5);
const tree4 = new Tree(-3, -4.5);
const tree5 = new Tree(-1.5, -4.5);
const tree6 = new Tree(1.5, -4.5);
const tree7 = new Tree(0, -4.5);
const tree8 = new Tree(-4.3, -1.3);
const tree9 = new Tree(4.3, -1.3);
const tree10 = new Tree(-2.5, 4.3);
const tree11 = new Tree(2.5, 4.3);

const tree12 = new Tree(-1.2, 1);
const tree13 = new Tree(1, -1);
const tree14 = new Tree(1.2, 2);
const tree15 = new Tree(-1, -2);

// Add your buildings to the world
world.add(building1);
world.add(building2);
world.add(building3);
world.add(building4);
world.add(building5);
world.add(building6);
world.add(building7);
world.add(building8);
world.add(building9);
world.add(building10);

world.add(castle1);
world.add(castle2);

world.add(tree1);
world.add(tree2);
world.add(tree3);
world.add(tree4);
world.add(tree5);
world.add(tree6);
world.add(tree7);
world.add(tree8);
world.add(tree9);
world.add(tree10);
world.add(tree11);
world.add(tree12);
world.add(tree13);
world.add(tree14);
world.add(tree15);
world.go();


