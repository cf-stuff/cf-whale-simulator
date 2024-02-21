import { html, useState, useEffect, useRef } from "https://unpkg.com/htm/preact/standalone.module.js"
import { renderTimeline } from "../display.js";
import AnimationDefinitions from "../animations/animations.js";
import { FURY_BURST_THRESHOLD } from "../config.js";
import TextFloat from "../animations/TextFloat.js";
import Skills from "../data/skills.js";

const createTimeline = logs => {
  const timeline = {
    left: [],
    right: [],
    leftIndex: 0,
    rightIndex: 0,
    events: [],
    ongoingAnimations: []
  }
  let timestamp = 1000; // idea use frame counter instead of real time
  logs.forEach(log => {
    if (log.startsWith("|player|")) {
      const [, , id, player] = log.split("|");
      const left = id % 2 === 0;
      const object = JSON.parse(player);
      object.current = {
        hp: object.stats.hp,
        sp: object.stats.sp,
        fury: 0,
        status: new Set()
      }
      object.animations = {
        hp: new AnimationDefinitions.HpBar(left),
        sp: new AnimationDefinitions.SpBar(left),
        fury: new AnimationDefinitions.FuryBar(left)
      }
      if (left) {
        timeline.left.push(object);
      } else {
        timeline.right.push(object);
      }
    } else if (log.startsWith("|skill|")) {
      const [, , id, name] = log.split("|");
      if (name === Skills.goldenShield.name) {
        timeline.events.push({
          timestamp,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.GoldenShield(id % 2 === 0))
        });
        timestamp += 1200;
      } else if (name === Skills.assassinate.name) {
        timeline.events.push({
          timestamp,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.Assassinate(id % 2 === 0))
        });
        timestamp += 1800;
      } else if (name === Skills.fireShield.name) {
        timeline.events.push({
          timestamp,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.FireShield(id % 2 === 0))
        });
        timestamp += 1500;
      } else if (name === Skills.barbarism.name) {
        timeline.events.push({
          timestamp,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.Barbarism(id % 2 === 0))
        });
        timestamp += 1800;
      } else {
        timestamp += 400; // temp hardcode for unhandled skills
      }
    } else if (log.startsWith("|status|")) {
      const [, , action, id, name] = log.split("|");
      if (id % 2 === 0) {
        if (action === "add") {
          timeline.events.push({
            timestamp,
            callback: () => timeline.left[timeline.leftIndex].current.status.add(name)
          });
        } else {
          timeline.events.push({
            timestamp,
            callback: () => timeline.left[timeline.leftIndex].current.status.delete(name)
          });
        }
      } else {
        if (action === "add") {
          timeline.events.push({
            timestamp,
            callback: () => timeline.right[timeline.rightIndex].current.status.add(name)
          });
        } else {
          timeline.events.push({
            timestamp,
            callback: () => timeline.right[timeline.rightIndex].current.status.delete(name)
          });
        }
      }
    } else if (log.startsWith("|stat|")) {
      let [, , action, id, stat, amount, current, initial, source, crt] = log.split("|");
      if (stat === "hp") {
        timeline.events.push({
          timestamp,
          callback: () => {
            if (id % 2 == 0) {
              timeline.left[timeline.leftIndex].animations.hp.setTarget(Math.floor(current / initial * 100));
              timeline.left[timeline.leftIndex].current.hp = current;
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
              timeline.ongoingAnimations.push(new TextFloat(amount, 300, startY, gradTop, gradBot));
            } else {
              timeline.right[timeline.rightIndex].animations.hp.setTarget(Math.floor(current / initial * 100));
              timeline.right[timeline.rightIndex].current.hp = current;
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
              timeline.ongoingAnimations.push(new TextFloat(amount, 1024 - 300, startY, gradTop, gradBot));
            }
          }
        });
      } else if (stat === "sp") {
        timeline.events.push({
          timestamp,
          callback: () => {
            if (id % 2 == 0) {
              timeline.left[timeline.leftIndex].animations.sp.setTarget(Math.floor(current / initial * 100));
              timeline.left[timeline.leftIndex].current.sp = current;
              if (source != "skill cost") {
                if (action === "remove") {
                  if (!amount.startsWith("-")) {
                    amount = "-" + amount;
                  }
                } else if (action === "add") {
                  amount = "+" + amount;
                }
                timeline.ongoingAnimations.push(new TextFloat(amount, 300, 250, "rgb(9,252,230)", "rgb(0,178,254)"));
              }
            } else {
              timeline.right[timeline.rightIndex].animations.sp.setTarget(Math.floor(current / initial * 100));
              timeline.right[timeline.rightIndex].current.sp = current;
              if (source != "skill cost") {
                if (action === "remove") {
                  if (!amount.startsWith("-")) {
                    amount = "-" + amount;
                  }
                } else if (action === "add") {
                  amount = "+" + amount;
                }
                timeline.ongoingAnimations.push(new TextFloat(amount, canvas.width - 300, 250, "rgb(9,252,230)", "rgb(0,178,254)"));
              }
            }
          }
        });
      }
    } else if (log.startsWith("|fury|")) {
      const [, , id, amount, current] = log.split("|");
      timeline.events.push({
        timestamp,
        callback: () => {
          if (id % 2 == 0) {
            timeline.left[timeline.leftIndex].animations.fury.setTarget(Math.floor(current / FURY_BURST_THRESHOLD * 100));
            timeline.left[timeline.leftIndex].current.fury = current;
          } else {
            timeline.right[timeline.rightIndex].animations.fury.setTarget(Math.floor(current / FURY_BURST_THRESHOLD * 100));
            timeline.right[timeline.rightIndex].current.fury = current;
          }
        }
      });
    }
  });
  return timeline;
}

const Replay = ({ logs, play = false }) => {
  const canvasRef = useRef(null);
  console.log(logs);

  useEffect(() => {
    if (!canvasRef) return;

    const timeline = createTimeline(logs);

    let req;
    const start = new Date();

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");

    async function animate() {
      const elaspedTime = new Date() - start;
      timeline.events.forEach(event => {
        if (elaspedTime >= event.timestamp) event.callback();
      });
      timeline.events = timeline.events.filter(event => elaspedTime < event.timestamp);

      await renderTimeline(ctx, timeline);

      timeline.ongoingAnimations = timeline.ongoingAnimations.filter(animation => !animation.isFinished());

      if (canvasRef.current) {
        canvasRef.current.getContext("2d").drawImage(canvas, 0, 0);

        // this causes canvas to freeze before the hud / ui fully updates
        // last frame of last ongoing animation(s) will still show
        if (timeline.ongoingAnimations.length > 0 || timeline.events.length > 0) {
          req = requestAnimationFrame(animate);
        }
      }
    }

    animate();
    return () => cancelAnimationFrame(req);
  }, [logs]);
  return html`<canvas class="replay" ref=${canvasRef} width="1024" height="720" />`;
}

export default Replay;
