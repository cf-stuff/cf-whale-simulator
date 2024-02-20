import { html, useState, useEffect, useRef } from "https://unpkg.com/htm/preact/standalone.module.js"
import { renderBackgroundSprites, renderHudDetails, renderStatBox } from "../display.js";
import AnimationDefinitions from "../animations/animations.js";
import { getImage } from "../image.js";
import { FURY_BURST_THRESHOLD } from "../config.js";
import TextFloat from "../animations/TextFloat.js";
import Skills from "../data/skills.js";

const Replay = ({ logs, play = false }) => {
  const canvasRef = useRef(null);
  console.log(logs);

  // const testLog = ["animation1", "animation2", "animation1"]

  useEffect(() => {
    if (!canvasRef) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    let plannedTime = 0;
    let timeline = [];
    let ongoingAnimations = [];
    let hudAnimations = [];

    // state needs to keep track of:
    // active fighter on each side
    // state for each fighter: hp, sp, statuses

    // 1: parse players, first one on each side is active, mini heads for rest
    const left = [];
    const right = [];
    let leftIndex = 0;
    let rightIndex = 0;
    logs.filter(log => log.startsWith("|player")).forEach(log => {
      const [, , id, player] = log.split("|");
      const object = JSON.parse(player);
      object.current = {
        hp: object.stats.hp,
        sp: object.stats.sp,
        fury: 0
      }
      if (id % 2 === 0) {
        left.push(object);
      } else {
        right.push(object);
      }
    });
    const leftHp = new AnimationDefinitions.HpBar(true);
    const leftSp = new AnimationDefinitions.SpBar(true);
    const leftFury = new AnimationDefinitions.FuryBar(true);
    const rightHp = new AnimationDefinitions.HpBar(false);
    const rightSp = new AnimationDefinitions.SpBar(false);
    const rightFury = new AnimationDefinitions.FuryBar(false);
    hudAnimations.push(leftHp, rightHp, leftSp, rightSp, leftFury, rightFury);

    logs.filter(log => !log.startsWith("|player")).forEach(log => {
      if (log.startsWith("|skill")) {
        const [, , id, name] = log.split("|");
        if (name === Skills.assassinate.name) {
          timeline.push(setTimeout(() => {
            // idea: have a mapping from name to class
            ongoingAnimations.push(new AnimationDefinitions.Assassinate(id % 2 === 0));
          }, plannedTime));
          plannedTime += 2000;
        } else if (name === Skills.fireShield.name) {
          timeline.push(setTimeout(() => {
            ongoingAnimations.push(new AnimationDefinitions.FireShield(id % 2 === 0));
          }, plannedTime));
          plannedTime += 2000;
        } else {
          plannedTime += 400; // for now hardcode for unhandled skills
        }
      }
      if (log.startsWith("|stat|add") || log.startsWith("|stat|remove")) {
        let [, , action, id, stat, amount, current, initial, source, crt] = log.split("|");
        if (stat === "hp") {
          // crt: red
          timeline.push(setTimeout(() => {
            // this solution won't work with fast forward
            // alternate solution: push callback functions to timeline, with planned time
            // then actually call it during draw based on elasped time
            if (id % 2 == 0) {
              leftHp.setTarget(Math.floor(current / initial * 100));
              left[leftIndex].current.hp = current;
              let gradTop;
              let gradBot;
              let startY = 300; // temp
              if (action === "remove") {
                if (!amount.startsWith("-")) {
                  amount = "-" + amount;
                }
                if (crt === "crt") {
                  gradTop = "rgb(255,195,0)";
                  gradBot = "rgb(255,6,0)";
                } else {
                  gradTop = "rgb(255,247,172)";
                  gradBot = "rgb(255,213,17)";
                }
              } else if (action === "add") {
                amount = "+" + amount;
                gradTop = "rgb(153,254,0)";
                gradBot = "rgb(21,202,0)";
                startY = 350;
              }
              ongoingAnimations.push(new TextFloat(amount, 300, startY, gradTop, gradBot));
            } else {
              rightHp.setTarget(Math.floor(current / initial * 100));
              right[rightIndex].current.hp = current;
              let gradTop;
              let gradBot;
              let startY = 300;
              if (action === "remove") {
                if (!amount.startsWith("-")) {
                  amount = "-" + amount;
                }
                if (crt === "crt") {
                  gradTop = "rgb(255,195,0)";
                  gradBot = "rgb(255,6,0)";
                } else {
                  gradTop = "rgb(255,247,172)";
                  gradBot = "rgb(255,213,17)";
                }
              } else if (action === "add") {
                amount = "+" + amount;
                gradTop = "rgb(153,254,0)";
                gradBot = "rgb(21,202,0)";
                startY = 350;
              }
              ongoingAnimations.push(new TextFloat(amount, canvas.width - 300, startY, gradTop, gradBot));
            }
          }, plannedTime));
        } else if (stat === "sp") {
          // set target sp to current
          // todo: animate +/- amount text - blue text
          // number logic: appear above head, go up and fade out
          timeline.push(setTimeout(() => {
            if (id % 2 == 0) {
              leftSp.setTarget(Math.floor(current / initial * 100));
              left[leftIndex].current.sp = current;
              if (source != "skill cost") {
                if (action === "remove") {
                  if (!amount.startsWith("-")) {
                    amount = "-" + amount;
                  }
                } else if (action === "add") {
                  amount = "+" + amount;
                }
                ongoingAnimations.push(new TextFloat(amount, 300, 250, "rgb(9,252,230)", "rgb(0,178,254)"));
              }
            } else {
              rightSp.setTarget(Math.floor(current / initial * 100));
              right[rightIndex].current.sp = current;
              if (source != "skill cost") {
                if (action === "remove") {
                  if (!amount.startsWith("-")) {
                    amount = "-" + amount;
                  }
                } else if (action === "add") {
                  amount = "+" + amount;
                }
                ongoingAnimations.push(new TextFloat(amount, canvas.width - 300, 250, "rgb(9,252,230)", "rgb(0,178,254)"));
              }
            }

          }, plannedTime));
        }
        // plannedTime += 50;
      } else if (log.startsWith("|fury")) {
        const [, , id, amount, current] = log.split("|");
        timeline.push(setTimeout(() => {
          if (id % 2 == 0) {
            leftFury.setTarget(Math.floor(current / FURY_BURST_THRESHOLD * 100));
            left[leftIndex].current.fury = current;
          } else {
            rightFury.setTarget(Math.floor(current / FURY_BURST_THRESHOLD * 100));
            right[rightIndex].current.fury = current;
          }

        }, plannedTime));
      }
    });
    // let logIndex = 0;
    // const interval = setInterval(() => {
    //   if (logIndex < testLog.length) {
    //     console.log("adding animation " + testLog[logIndex])
    //     const animationId = testLog[logIndex];
    //     const animationInstance = new AnimationDefinitions[animationId];
    //     ongoingAnimations.push(animationInstance);
    //     logIndex++;
    //   } else {
    //     console.log("all animations added, clearing interval")
    //     clearInterval(interval);
    //   }
    // }, 1000);
    let req;

    async function animate() {
      const promises = [];
      ctx.drawImage(await getImage("img/display/battle-bg.png"), 0, 0);
      renderBackgroundSprites(ctx, left[leftIndex], { left: true }, promises);
      await renderBackgroundSprites(ctx, right[rightIndex], { left: false }, promises);
      // todo: renderFighterSprites
      ongoingAnimations.sort((a, b) => a.layer - b.layer);
      ongoingAnimations.forEach(animation => {
        animation.update();
        animation.draw(ctx);
      });

      renderStatBox(ctx, left[leftIndex], { left: true }, promises);
      await renderStatBox(ctx, right[rightIndex], { left: false }, promises);

      ctx.drawImage(await getImage("img/display/battle-hud.png"), 0, 0);
      hudAnimations.forEach(animation => {
        animation.update();
        animation.draw(ctx);
      });
      renderHudDetails(ctx, left[leftIndex], {
        left: true,
        hpOverride: true, hp: left[leftIndex].current.hp,
        spOverride: true, sp: left[leftIndex].current.sp
      }, promises);
      renderHudDetails(ctx, right[rightIndex], {
        left: false,
        hpOverride: true, hp: right[rightIndex].current.hp,
        spOverride: true, sp: right[rightIndex].current.sp
      }, promises);
      await Promise.allSettled(promises);

      ongoingAnimations = ongoingAnimations.filter(animation => !animation.isFinished());
      // console.log(`after purge, ${ongoingAnimations.length} animations remaining`)

      if (canvasRef.current) {
        canvasRef.current.getContext("2d").drawImage(canvas, 0, 0);

        // how to check if animation finished playing? maybe check if elapsed time < planned time
        req = requestAnimationFrame(animate);
      }

      // if (ongoingAnimations.length > 0 || logIndex < testLog.length) {
      //   requestAnimationFrame(animate)
      // }
    }

    animate();
    return () => {
      timeline.forEach(event => {
        clearTimeout(event);
      })
      cancelAnimationFrame(req);
    };
  }, [logs]);
  return html`<canvas class="replay" ref=${canvasRef} width="1024" height="720" />`;
}

export default Replay;
