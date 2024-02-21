import { html, useState, useEffect, useRef } from "https://unpkg.com/htm/preact/standalone.module.js"
import { renderBackgroundSprites, renderHudDetails, renderStatBox } from "../display.js";
import AnimationDefinitions from "../animations/animations.js";
import { getImage } from "../image.js";
import { FURY_BURST_THRESHOLD } from "../config.js";
import TextFloat from "../animations/TextFloat.js";
import Skills from "../data/skills.js";
import Status from "../data/status.js";


const char = await getImage("img/display/char.png");
const horns = await getImage("img/display/effects/horns.png");
const bell = await getImage("img/display/effects/bell.png");

const Replay = ({ logs, play = false }) => {
  const canvasRef = useRef(null);
  console.log(logs);

  useEffect(() => {
    if (!canvasRef) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    let timestamp = 1000;
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
        fury: 0,
        status: new Set()
      }
      if (id % 2 === 0) {
        left.push(object);
      } else {
        right.push(object);
      }
    });
    console.log(left);
    const leftHp = new AnimationDefinitions.HpBar(true);
    const leftSp = new AnimationDefinitions.SpBar(true);
    const leftFury = new AnimationDefinitions.FuryBar(true);
    const rightHp = new AnimationDefinitions.HpBar(false);
    const rightSp = new AnimationDefinitions.SpBar(false);
    const rightFury = new AnimationDefinitions.FuryBar(false);
    hudAnimations.push(leftHp, rightHp, leftSp, rightSp, leftFury, rightFury);

    logs.filter(log => !log.startsWith("|player")).forEach(log => {
      if (log.startsWith("|skill|")) {
        const [, , id, name] = log.split("|");
        if (name === Skills.goldenShield.name) {
          timeline.push({
            timestamp,
            callback: () => ongoingAnimations.push(new AnimationDefinitions.GoldenShield(id % 2 === 0))
          });
          timestamp += 1200;
        } else if (name === Skills.assassinate.name) {
          timeline.push({
            timestamp,
            callback: () => ongoingAnimations.push(new AnimationDefinitions.Assassinate(id % 2 === 0))
          });
          timestamp += 1800;
        } else if (name === Skills.fireShield.name) {
          timeline.push({
            timestamp,
            callback: () => ongoingAnimations.push(new AnimationDefinitions.FireShield(id % 2 === 0))
          });
          timestamp += 1500;
        } else if (name === Skills.barbarism.name) {
          timeline.push({
            timestamp,
            callback: () => ongoingAnimations.push(new AnimationDefinitions.Barbarism(id % 2 === 0))
          });
          timestamp += 1800;
        } else {
          timestamp += 400; // temp hardcode for unhandled skills
        }
      } else if (log.startsWith("|status|")) {
        const [, , action, id, name] = log.split("|");
        if (id % 2 === 0) {
          if (action === "add") {
            timeline.push({
              timestamp,
              callback: () => left[leftIndex].current.status.add(name)
            });
          } else {
            timeline.push({
              timestamp,
              callback: () => left[leftIndex].current.status.delete(name)
            });
          }
        } else {
          if (action === "add") {
            timeline.push({
              timestamp,
              callback: () => right[rightIndex].current.status.add(name)
            });
          } else {
            timeline.push({
              timestamp,
              callback: () => right[rightIndex].current.status.delete(name)
            });
          }
        }
      } else if (log.startsWith("|stat|")) {
        let [, , action, id, stat, amount, current, initial, source, crt] = log.split("|");
        if (stat === "hp") {
          timeline.push({
            timestamp,
            callback: () => {
              if (id % 2 == 0) {
                leftHp.setTarget(Math.floor(current / initial * 100));
                left[leftIndex].current.hp = current;
                let gradTop;
                let gradBot;
                let startY = 300; // temp, idk where to position these
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
            }
          });
        } else if (stat === "sp") {
          timeline.push({
            timestamp,
            callback: () => {
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
            }
          });
        }
      } else if (log.startsWith("|fury|")) {
        const [, , id, amount, current] = log.split("|");
        timeline.push({
          timestamp,
          callback: () => {
            if (id % 2 == 0) {
              leftFury.setTarget(Math.floor(current / FURY_BURST_THRESHOLD * 100));
              left[leftIndex].current.fury = current;
            } else {
              rightFury.setTarget(Math.floor(current / FURY_BURST_THRESHOLD * 100));
              right[rightIndex].current.fury = current;
            }
          }
        });
      }
    });

    let req;
    const start = new Date();

    async function animate() {
      const elaspedTime = new Date() - start;
      timeline.forEach(event => {
        if (elaspedTime >= event.timestamp) event.callback();
      });
      timeline = timeline.filter(event => elaspedTime < event.timestamp);
      const promises = [];
      ctx.drawImage(await getImage("img/display/battle-bg.png"), 0, 0);
      renderBackgroundSprites(ctx, left[leftIndex], { left: true }, promises);
      await renderBackgroundSprites(ctx, right[rightIndex], { left: false }, promises);
      ctx.drawImage(char, 300 - char.width / 2, 450 - char.height / 2);
      ctx.scale(-1, 1);
      ctx.drawImage(char, 300 - char.width / 2 + ctx.canvas.width * -1, 450 - char.height / 2);
      ctx.scale(-1, 1);
      left[leftIndex].current.status.forEach(status => {
        if (status === Status.barbarism.name) {
          ctx.drawImage(horns, 0, 0, 104, 82, 300 - 104 / 2, 400 - 20 - 82 / 2, 104, 82);
        } else if (status === Status.goldenShield.name) {
          ctx.drawImage(bell, 0, 0, 146, 148, 250 - 146 / 2, 400 - 148 / 2, 146 * 2, 148 * 2);
        }
      });
      right[rightIndex].current.status.forEach(status => {
        if (status === Status.barbarism.name) {
          ctx.scale(-1, 1);
          ctx.drawImage(horns, 0, 0, 104, 82, 300 + ctx.canvas.width * -1 - 104 / 2, 400 - 20 - 82 / 2, 104, 82);
          ctx.scale(-1, 1);
        } else if (status === Status.goldenShield.name) {
          ctx.scale(-1, 1);
          ctx.drawImage(bell, 0, 0, 146, 148, 250 + ctx.canvas.width * -1 - 146 / 2, 400 - 148 / 2, 146 * 2, 148 * 2);
          ctx.scale(-1, 1);
        }
      });
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

      if (canvasRef.current) {
        canvasRef.current.getContext("2d").drawImage(canvas, 0, 0);

        // this causes canvas to freeze before the hud / ui fully updates
        // last frame of last ongoing animation(s) will still show
        if (ongoingAnimations.length > 0 || timeline.length > 0) {
          req = requestAnimationFrame(animate);
        }
      }
    }

    animate();
    return () => {
      // timeline.forEach(event => {
      //   clearTimeout(event);
      // })
      cancelAnimationFrame(req);
    };
  }, [logs]);
  return html`<canvas class="replay" ref=${canvasRef} width="1024" height="720" />`;
}

export default Replay;
