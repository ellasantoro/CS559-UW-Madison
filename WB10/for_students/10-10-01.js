/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

{
  let mydiv = document.getElementById("div1");
  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });

  let shaderMat = shaderMaterial("./shaders/10-10-01.vs", "./shaders/10-10-01.fs",{
      side: T.DoubleSide,
      //add all the uniforms specified in the shader files - copied the values that were visible on
      //shaderfrog when they show you the demo of it
      uniforms: {
        //default val of time, we update this as seen below so that it actually animates like how they show on the website
        time: { value: 0.0 },
        resolution: { value: 3. }, //changed from example since our shapes are kinda small
        intensity: { value: 10. },
        speed: { value: 1. },
        //used T.Color to choose my own colors (used rgb and divided by 255 using a color picker)
        lightColor: { value: new T.Color(0.41, 0.72, 0.36) },
        baseColor: { value: new T.Color(0.5, 0.5, 0.5) },
      },
    }
  );

  world.add(new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat }));
  world.add( new SimpleObjects.GrSquareSign({ x: 2, y: 1, size: 1, material: shaderMat }));

  
    //set the start time, we will be using this in the animation.
    let startTime = Date.now();

    /**
     * Function to update the time variable so that we can actually use the intended animation of the shader
     */
    function animate() {
      //calculate the new time based on the current time and the start time that we recorded above, also scale it by dividing by 800,
      //can increase or decrease that value to change how fast the animation is
      let newTime = (Date.now() - startTime) / 800;
      //make sure to update the uniform time variable for the shaders
      shaderMat.uniforms.time.value = newTime;
      world.renderer.render(world.scene, world.camera);
      //continuously call the function:
      requestAnimationFrame(animate);
    }

    animate();

  world.go();
}
