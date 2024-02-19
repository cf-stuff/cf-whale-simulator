import { html, useState, useEffect, useRef } from "https://unpkg.com/htm/preact/standalone.module.js"
import { createProfile } from "../display.js";
import AnimationDefinitions from "../animations.js";

function getImage(path) {
  const image = document.createElement("img");
  image.src = path;
  return new Promise(resolve => image.onload = () => resolve(image));
}

const Replay = ({ logs, play = false }) => {
  const canvasRef = useRef(null);
  console.log(logs);

  const testLog = ["animation1", "animation2", "animation1"]

  // state needs to keep track of:
  // active fighter on each side
  // state for each fighter: hp, sp, statuses


  useEffect(() => {
    if (!canvasRef) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    let ongoingAnimations = [];
    let logIndex = 0;

    const interval = setInterval(() => {
      if (logIndex < testLog.length) {
        console.log("adding animation " + testLog[logIndex])
        const animationId = testLog[logIndex];
        const animationInstance = new AnimationDefinitions[animationId];
        ongoingAnimations.push(animationInstance);
        logIndex++;
      } else {
        console.log("all animations added, clearing interval")
        clearInterval(interval);
      }
    }, 1000);

    async function draw() {
      console.log("draw()")
      console.log(`${ongoingAnimations.length} animations to animate`)
      ctx.drawImage(await getImage("img/display/battle-bg.png"), 0, 0);
      ctx.drawImage(await getImage("img/display/battle-hud.png"), 0, 0);

      ongoingAnimations.sort((a, b) => a.layer - b.layer);
      ongoingAnimations.forEach(animation => {
        animation.update();
        animation.draw(ctx);
      });

      ongoingAnimations = ongoingAnimations.filter(animation => !animation.isFinished());
      console.log(`after purge, ${ongoingAnimations.length} animations remaining`)

      canvasRef.current.getContext("2d").drawImage(canvas, 0, 0);

      if (ongoingAnimations.length > 0 || logIndex < testLog.length) {
        requestAnimationFrame(draw)
      }
    }

    draw();
    return () => cancelAnimationFrame(draw);
  }, []);
  return html`<canvas class="replay" ref=${canvasRef} width="1024" height="720" />`;
}

export default Replay;
