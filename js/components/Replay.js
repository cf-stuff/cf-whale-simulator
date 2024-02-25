import { html, useState, useEffect, useRef } from "https://unpkg.com/htm/preact/standalone.module.js"
import { renderTimeline } from "../display.js";
import AnimationDefinitions from "../animations/animations.js";
import { FURY_BURST_THRESHOLD } from "../config.js";
import TextFloat from "../animations/TextFloat.js";
import Skills from "../data/skills.js";
import { FighterState } from "../animations/Fighter.js";

const skillsWithNoCastAnimation = [
  Skills.energyShield,
  Skills.woundInfection,
  Skills.arrivalOfThunderGod,
  Skills.antiDamageChop,
  Skills.magicStealing,
  Skills.shieldWall,
  Skills.bloodSacrifice
]

const createTimeline = logs => {
  const timeline = {
    left: [],
    right: [],
    leftIndex: 0,
    rightIndex: 0,
    events: [],
    ongoingAnimations: []
  }
  let frame = 30;
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
      object.pos = {
        x: 300, // mid
        y: 550 // bot
      }
      object.sprite = new AnimationDefinitions.Fighter(object.pos, left)
      if (left) {
        timeline.left.push(object);
      } else {
        timeline.right.push(object);
      }
    } else if (log.startsWith("|skill|")) {
      const [, , id, name] = log.split("|");
      if (name === Skills.normal.name) {
        const sprite = id % 2 === 0 ? timeline.left[timeline.leftIndex].sprite : timeline.right[timeline.rightIndex].sprite;
        timeline.events.push({
          frame,
          callback: () => sprite.state = FighterState.attack
        });
        frame += 57;
      } else if (name === Skills.goldenShield.name) {
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.GoldenShield(id % 2 === 0))
        });
        frame += 38;
      } else if (name === Skills.lightningBall.name) {
        const sprite = id % 2 === 0 ? timeline.left[timeline.leftIndex].sprite : timeline.right[timeline.rightIndex].sprite;
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.LightningBall(id % 2 === 0, sprite))
        });
        frame += 83;
      } else if (name === Skills.thunderboltBoxing.name) {
        const sprite = id % 2 === 0 ? timeline.left[timeline.leftIndex].sprite : timeline.right[timeline.rightIndex].sprite;
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.ThunderboltBoxing(id % 2 === 0, sprite))
        });
        frame += 62;
      } else if (name === Skills.counterattack.name) {
        const sprite = id % 2 === 0 ? timeline.left[timeline.leftIndex].sprite : timeline.right[timeline.rightIndex].sprite;
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.Counterattack(id % 2 === 0, sprite))
        });
        frame += 26;
      } else if (name === Skills.assassinate.name) {
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.Assassinate(id % 2 === 0))
        });
        frame += 49;
      } else if (name === Skills.movingIllusion.name) {
        const sprite = id % 2 === 0 ? timeline.left[timeline.leftIndex].sprite : timeline.right[timeline.rightIndex].sprite;
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.MovingIllusion(id % 2 === 0, sprite))
        });
        frame += 22;
      } else if (name === Skills.bloodFrenzy.name) {
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.BloodFrenzy(id % 2 === 0))
        });
        frame += 31;
      } else if (name === Skills.fireShield.name) {
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.FireShield(id % 2 === 0))
        });
        frame += 37;
      } else if (name === Skills.barbarism.name) {
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.Barbarism(id % 2 === 0))
        });
        frame += 80;
      } else if (name === Skills.earthStyleWall.name) {
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.EarthStyleWall(id % 2 === 0))
        });
        frame += 62;
      } else if (name === Skills.drawPower.name) {
        const sprite = id % 2 === 0 ? timeline.left[timeline.leftIndex].sprite : timeline.right[timeline.rightIndex].sprite;
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.DrawPower(id % 2 === 0, sprite))
        });
        frame += 76;
      } else if (name === Skills.rejuvenation.name) {
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.Rejuvenation(id % 2 === 0))
        });
        frame += 30;
      } else if (name === Skills.rebirth.name) {
        const sprite = id % 2 === 0 ? timeline.left[timeline.leftIndex].sprite : timeline.right[timeline.rightIndex].sprite;
        timeline.events.push({
          frame,
          callback: () => timeline.ongoingAnimations.push(new AnimationDefinitions.Rebirth(id % 2 === 0, sprite))
        });
        frame += 81;
      } else if (skillsWithNoCastAnimation.some(x => x.name === name)) {
        // skills with no cast animation
      } else {
        frame += 30; // temp hardcode for unhandled skills
      }
    } else if (log.startsWith("|status|")) {
      const [, , action, id, name] = log.split("|");
      if (id % 2 === 0) {
        if (action === "add") {
          timeline.events.push({
            frame,
            callback: () => timeline.left[timeline.leftIndex].current.status.add(name)
          });
        } else {
          timeline.events.push({
            frame,
            callback: () => timeline.left[timeline.leftIndex].current.status.delete(name)
          });
        }
      } else {
        if (action === "add") {
          timeline.events.push({
            frame,
            callback: () => timeline.right[timeline.rightIndex].current.status.add(name)
          });
        } else {
          timeline.events.push({
            frame,
            callback: () => timeline.right[timeline.rightIndex].current.status.delete(name)
          });
        }
      }
      frame += 10;
    } else if (log.startsWith("|stat|")) {
      // idea: if previous log was a stat add small delay
      let [, , action, id, stat, amount, current, initial, source, crt] = log.split("|");
      if (stat === "hp") {
        timeline.events.push({
          frame,
          callback: () => {
            if (id % 2 == 0) {
              timeline.left[timeline.leftIndex].animations.hp.setTarget(Math.floor(current / initial * 100));
              timeline.left[timeline.leftIndex].current.hp = current;
              let gradTop;
              let gradBot;
              let startY = 300; // todo temp, idk where to position these
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
        if (current === "0") {
          const sprite = id % 2 === 0 ? timeline.left[timeline.leftIndex].sprite : timeline.right[timeline.rightIndex].sprite;
          timeline.events.push({
            frame,
            callback: () => sprite.state = FighterState.die
          });
          frame += 47;
        }
      } else if (stat === "sp") {
        timeline.events.push({
          frame,
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
                timeline.ongoingAnimations.push(new TextFloat(amount, 1024 - 300, 250, "rgb(9,252,230)", "rgb(0,178,254)"));
              }
            }
          }
        });
      }
    } else if (log.startsWith("|fury|")) {
      const [, , id, amount, current] = log.split("|");
      timeline.events.push({
        frame,
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
    } else if (log.startsWith("|furyburst|")) {
      const [, , id] = log.split("|");
      timeline.events.push({
        frame,
        callback: () => {
          if (id % 2 == 0) {
            timeline.left[timeline.leftIndex].animations.fury.setTarget(0);
            timeline.left[timeline.leftIndex].current.fury = 0;
          } else {
            timeline.right[timeline.rightIndex].animations.fury.setTarget(0);
            timeline.right[timeline.rightIndex].current.fury = 0;
          }
        }
      });
      frame += 15;
      // todo animation
    } else if (log.startsWith("|win|")) {
      const [, , id] = log.split("|");
      frame += 14;
      if (id % 2 == 0) {
        timeline.events.push({
          frame,
          callback: () => {
            ++timeline.rightIndex;
            timeline.left[timeline.leftIndex].current.status = new Set();
          }
        });
      } else {
        timeline.events.push({
          frame,
          callback: () => {
            ++timeline.leftIndex;
            timeline.right[timeline.rightIndex].current.status = new Set();
          }
        });
      }
    } else if (log.startsWith("|turn|")) {
      frame += 4;
    }
  });
  return timeline;
}

const Replay = ({ logs, play = true }) => {
  const canvasRef = useRef(null);
  console.log(logs);

  useEffect(() => {
    if (!canvasRef) return;

    const timeline = createTimeline(logs);
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    let req;
    let frames = 0;

    async function animate() {
      ++frames;
      timeline.events.forEach(event => {
        if (frames >= event.frame) event.callback();
      });
      if (timeline.leftIndex >= timeline.left.length || timeline.rightIndex >= timeline.right.length) return;
      timeline.events = timeline.events.filter(event => frames < event.frame);
      await renderTimeline(ctx, timeline);
      timeline.ongoingAnimations = timeline.ongoingAnimations.filter(animation => !animation.isFinished());
      if (canvasRef.current) {
        canvasRef.current.getContext("2d").drawImage(canvas, 0, 0);
        req = requestAnimationFrame(animate);
      }
    }

    animate();
    return () => {
      cancelAnimationFrame(req);
      timeline.leftIndex = 100;
    };
  }, [logs]);
  return html`<canvas class="replay" ref=${canvasRef} width="1024" height="720" />`;
}

export default Replay;
