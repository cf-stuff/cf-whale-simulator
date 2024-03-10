import { FighterState } from "./animations/Fighter.js";
import { PetState } from "./animations/Pet.js";
import AnimationDefinitions from "./animations/animations.js";
import { FURY_BURST_THRESHOLD } from "./config.js";
import CFDB from "./data/CFDB.js";
import { PetSkillType } from "./data/categories.js";
import PetSkills from "./data/petSkills.js";
import Skills from "./data/skills.js";
import { renderHudDetails, renderStatBox, renderStatusEffect, renderTotem } from "./display.js";
import { getImage } from "./image.js";

const skillsWithNoCastAnimation = [
  Skills.energyShield,
  Skills.woundInfection,
  Skills.arrivalOfThunderGod,
  Skills.antiDamageChop,
  Skills.magicStealing,
  Skills.shieldWall,
  Skills.bloodSacrifice
];

const petAttacks = [...CFDB.getPetSkills(PetSkillType.skill), ...CFDB.getPetActives(), ...CFDB.getTotemPetAttacks()];

const battleBg = getImage("img/display/battle-bg.png");
const battleHud = getImage("img/display/battle-hud.png");

export default class Timeline {
  constructor(logs) {
    this.logs = logs;
    this.logIndex = 0;
    this.eventFrame = 30;
    this.currentFrame = 0;
    this.left = [];
    this.right = [];
    this.leftIndex = 0;
    this.rightIndex = 0;
    this.events = [];
    this.ongoingAnimations = [];
    this.framesAfterEnd = 0;

    for (const log of logs) {
      if (log.startsWith("|player|")) {
        this.parsePlayerLog(log);
      } else {
        break;
      }
    }
    this.addEvents();
  }

  isFinished() {
    return this.framesAfterEnd >= 60;
  }

  parsePlayerLog(log) {
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
    object.sprite = new AnimationDefinitions.Fighter(left);
    object.petSprite = new AnimationDefinitions.Pet(object.pet, left);
    if (left) {
      this.left.push(object);
    } else {
      this.right.push(object);
    }
    this.logIndex++;
  }

  parseNextLog() {
    if (this.logIndex >= this.logs.length) return false;
    const log = this.logs[this.logIndex++];
    if (log.startsWith("|skill|")) {
      const [, , id, name] = log.split("|");
      if (name === Skills.normal.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => sprite.state = FighterState.attack
        });
        this.eventFrame += 57;
      } else if (name === Skills.bacteria.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Bacteria(id % 2 === 0))
        });
        this.eventFrame += 45;
      } else if (name === Skills.freezingSkill.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.FreezingSkill(id % 2 === 0, sprite))
        });
        this.eventFrame += 130;
      } else if (name === Skills.cleanse.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Cleanse(id % 2 === 0))
        });
        this.eventFrame += 34;
      } else if (name === Skills.fireMeteorite.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.FireMeteorite(id % 2 === 0, sprite))
        });
        this.eventFrame += 57;
      } else if (name === Skills.fireShield.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.FireShield(id % 2 === 0))
        });
        this.eventFrame += 37;
      } else if (name === Skills.bloodFrenzy.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.BloodFrenzy(id % 2 === 0))
        });
        this.eventFrame += 31;
      } else if (name === Skills.goldenShield.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.GoldenShield(id % 2 === 0))
        });
        this.eventFrame += 38;
      } else if (name === Skills.inescapableNet.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.InescapableNet(id % 2 === 0))
        });
        this.eventFrame += 40;
      } else if (name === Skills.thunderclapQuake.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.ThunderclapQuake(id % 2 === 0, sprite))
        });
        this.eventFrame += 63;
      } else if (name === Skills.thornShield.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.ThornShield(id % 2 === 0))
        });
        this.eventFrame += 52;
      } else if (name === Skills.lightningBall.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.LightningBall(id % 2 === 0, sprite))
        });
        this.eventFrame += 83;
      } else if (name === Skills.thunderboltBoxing.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.ThunderboltBoxing(id % 2 === 0, sprite))
        });
        this.eventFrame += 62;
      } else if (name === Skills.stormBoxing.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.StormBoxing(id % 2 === 0, sprite))
        });
        this.eventFrame += 67;
      } else if (name === Skills.fastMove.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.FastMove(id % 2 === 0))
        });
        this.eventFrame += 67;
      } else if (name === Skills.violence.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Violence(id % 2 === 0))
        });
        this.eventFrame += 46;
      } else if (name === Skills.heavyHammer.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.HeavyHammer(id % 2 === 0))
        });
        this.eventFrame += 106;
      } else if (name === Skills.explosiveBlow.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.ExplosiveBlow(id % 2 === 0))
        });
        this.eventFrame += 59;
      } else if (name === Skills.gallop.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Gallop(id % 2 === 0))
        });
        this.eventFrame += 30;
      } else if (name === Skills.counterattack.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Counterattack(id % 2 === 0, sprite))
        });
        this.eventFrame += 26;
      } else if (name === Skills.bomb.name || name === "Bomb Throwback") {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Bomb(id % 2 === 0))
        });
        this.eventFrame += 30;
      } else if (name === Skills.poisonousFog.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.PoisonousFog(id % 2 === 0, sprite))
        });
        this.eventFrame += 82;
      } else if (name === Skills.timeBomb.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.TimeBomb(id % 2 === 0, sprite))
        });
        this.eventFrame += 75;
      } else if (name === Skills.wine.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Wine(id % 2 === 0, sprite))
        });
        this.eventFrame += 67;
      } else if (name === Skills.ghoulBlock.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.GhoulBlock(id % 2 === 0))
        });
        this.eventFrame += 116;
      } else if (name === Skills.skillShackles.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.SkillShackles(id % 2 === 0, sprite))
        });
        this.eventFrame += 130;
      } else if (name === Skills.earthStyleWall.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.EarthStyleWall(id % 2 === 0))
        });
        this.eventFrame += 62;
      } else if (name === Skills.barbarism.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Barbarism(id % 2 === 0))
        });
        this.eventFrame += 80;
      } else if (name === Skills.assassinate.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Assassinate(id % 2 === 0))
        });
        this.eventFrame += 49;
      } else if (name === Skills.darkCurse.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.DarkCurse(id % 2 === 0, sprite))
        });
        this.eventFrame += 85;
      } else if (name === Skills.movingIllusion.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.MovingIllusion(id % 2 === 0, sprite))
        });
        this.eventFrame += 22;
      } else if (name === Skills.drawPower.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.DrawPower(id % 2 === 0, sprite))
        });
        this.eventFrame += 76;
      } else if (name === Skills.rejuvenation.name) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Rejuvenation(id % 2 === 0))
        });
        this.eventFrame += 30;
      } else if (name === Skills.rebirth.name) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
        this.events.push({
          frame: this.eventFrame,
          callback: () => this.ongoingAnimations.push(new AnimationDefinitions.Rebirth(id % 2 === 0, sprite))
        });
        this.eventFrame += 81;
      } else if (skillsWithNoCastAnimation.some(x => x.name === name)) {
        // this.frame += 30;
      } else if (petAttacks.some(x => x.name === name)) {
        const sprite = id % 2 === 0 ? this.left[this.leftIndex].petSprite : this.right[this.rightIndex].petSprite;
        const isBlock = name === PetSkills.block.name;
        this.events.push({
          frame: this.eventFrame,
          callback: () => sprite.state = isBlock ? PetState.block : PetState.attack
        });
        this.eventFrame += isBlock ? 39 : 45;
      }
    } else if (log.startsWith("|status|")) {
      const [, , action, id, name] = log.split("|");
      if (id % 2 === 0) {
        if (action === "add") {
          this.events.push({
            frame: this.eventFrame,
            callback: () => this.left[this.leftIndex].current.status.add(name)
          });
        } else {
          this.events.push({
            frame: this.eventFrame,
            callback: () => this.left[this.leftIndex].current.status.delete(name)
          });
        }
      } else {
        if (action === "add") {
          this.events.push({
            frame: this.eventFrame,
            callback: () => this.right[this.rightIndex].current.status.add(name)
          });
        } else {
          this.events.push({
            frame: this.eventFrame,
            callback: () => this.right[this.rightIndex].current.status.delete(name)
          });
        }
      }
      this.eventFrame += 10;
    } else if (log.startsWith("|stat|")) {
      // idea: if previous log was a stat add small delay
      let [, , action, id, stat, amount, current, initial, source, crt] = log.split("|");
      if (stat === "hp") {
        this.events.push({
          frame: this.eventFrame,
          callback: () => {
            if (id % 2 == 0) {
              this.left[this.leftIndex].animations.hp.setTarget(Math.floor(current / initial * 100));
              this.left[this.leftIndex].current.hp = current;
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
              this.ongoingAnimations.push(new AnimationDefinitions.TextFloat(amount, 300, startY, gradTop, gradBot));
            } else {
              this.right[this.rightIndex].animations.hp.setTarget(Math.floor(current / initial * 100));
              this.right[this.rightIndex].current.hp = current;
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
              this.ongoingAnimations.push(new AnimationDefinitions.TextFloat(amount, 1024 - 300, startY, gradTop, gradBot));
            }
          }
        });
        if (current === "0") {
          const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
          this.events.push({
            frame: this.eventFrame,
            callback: () => sprite.state = FighterState.die
          });
          this.eventFrame += 47;
        }
      } else if (stat === "sp") {
        this.events.push({
          frame: this.eventFrame,
          callback: () => {
            if (id % 2 == 0) {
              this.left[this.leftIndex].animations.sp.setTarget(Math.floor(current / initial * 100));
              this.left[this.leftIndex].current.sp = current;
              if (source != "skill cost") {
                if (action === "remove") {
                  if (!amount.startsWith("-")) {
                    amount = "-" + amount;
                  }
                } else if (action === "add") {
                  amount = "+" + amount;
                }
                this.ongoingAnimations.push(new AnimationDefinitions.TextFloat(amount, 300, 250, "rgb(9,252,230)", "rgb(0,178,254)"));
              }
            } else {
              this.right[this.rightIndex].animations.sp.setTarget(Math.floor(current / initial * 100));
              this.right[this.rightIndex].current.sp = current;
              if (source != "skill cost") {
                if (action === "remove") {
                  if (!amount.startsWith("-")) {
                    amount = "-" + amount;
                  }
                } else if (action === "add") {
                  amount = "+" + amount;
                }
                this.ongoingAnimations.push(new AnimationDefinitions.TextFloat(amount, 1024 - 300, 250, "rgb(9,252,230)", "rgb(0,178,254)"));
              }
            }
          }
        });
      }
    } else if (log.startsWith("|fury|")) {
      const [, , id, amount, current] = log.split("|");
      this.events.push({
        frame: this.eventFrame,
        callback: () => {
          if (id % 2 == 0) {
            this.left[this.leftIndex].animations.fury.setTarget(Math.floor(current / FURY_BURST_THRESHOLD * 100));
            this.left[this.leftIndex].current.fury = current;
          } else {
            this.right[this.rightIndex].animations.fury.setTarget(Math.floor(current / FURY_BURST_THRESHOLD * 100));
            this.right[this.rightIndex].current.fury = current;
          }
        }
      });
    } else if (log.startsWith("|furyburst|")) {
      const [, , id] = log.split("|");
      this.events.push({
        frame: this.eventFrame,
        callback: () => {
          if (id % 2 == 0) {
            this.left[this.leftIndex].animations.fury.setTarget(0);
            this.left[this.leftIndex].current.fury = 0;
          } else {
            this.right[this.rightIndex].animations.fury.setTarget(0);
            this.right[this.rightIndex].current.fury = 0;
          }
        }
      });
      this.eventFrame += 15;
      this.events.push({
        frame: this.eventFrame,
        callback: () => this.ongoingAnimations.push(new AnimationDefinitions.FuryBurst(id % 2 === 0))
      });
      this.eventFrame += 34;
    } else if (log.startsWith("|win|")) {
      const [, , id] = log.split("|");
      this.eventFrame += 14;
      if (id % 2 == 0) {
        this.events.push({
          frame: this.eventFrame,
          callback: () => {
            if (++this.rightIndex < this.right.length) {
              this.left[this.leftIndex].current.status = new Set();
            }
          }
        });
      } else {
        this.events.push({
          frame: this.eventFrame,
          callback: () => {
            if (++this.leftIndex < this.left.length) {
              this.right[this.rightIndex].current.status = new Set();
            }
          }
        });
      }
    } else if (log.startsWith("|turn|")) {
      this.eventFrame += 4;
    } else if (log.startsWith("|dodge|")) {
      const [, , id] = log.split("|");
      const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
      this.events.push({
        frame: this.eventFrame,
        callback: () => sprite.state = FighterState.dodge
      });
      this.eventFrame += 16;
    } else if (log.startsWith("|parry|")) {
      const [, , id] = log.split("|");
      const sprite = id % 2 === 0 ? this.left[this.leftIndex].sprite : this.right[this.rightIndex].sprite;
      this.events.push({
        frame: this.eventFrame,
        callback: () => sprite.state = FighterState.parry
      });
      this.eventFrame += 11;
    }
    return true;
  }

  addEvents() {
    while (this.events.length < 10 && this.parseNextLog()) { }
  }

  update() {
    this.addEvents();
    this.events.forEach(event => {
      if (this.currentFrame >= event.frame) event.callback();
    });

    if (this.leftIndex >= this.left.length || this.rightIndex >= this.right.length) ++this.framesAfterEnd;
    const left = this.left[Math.min(this.leftIndex, this.left.length - 1)];
    const right = this.right[Math.min(this.rightIndex, this.right.length - 1)];
    left.sprite.update();
    right.sprite.update();
    left.petSprite.update();
    right.petSprite.update();
    this.ongoingAnimations.forEach(animation => animation.update());
    Object.values(left.animations).forEach(animation => animation.update());
    Object.values(right.animations).forEach(animation => animation.update());

    this.events = this.events.filter(event => this.currentFrame < event.frame);
    this.ongoingAnimations = this.ongoingAnimations.filter(animation => !animation.isFinished());
  }

  async render() {
    const canvas = new OffscreenCanvas(1024, 720);
    const ctx = canvas.getContext("2d");
    const promises = [];
    ctx.drawImage(battleBg, 0, 0);
    const left = this.left[Math.min(this.leftIndex, this.left.length - 1)];
    const right = this.right[Math.min(this.rightIndex, this.right.length - 1)];

    renderTotem(ctx, left.totem, { left: true }, promises);
    renderTotem(ctx, right.totem, { left: false }, promises);
    await Promise.allSettled(promises);

    left.sprite.draw(ctx);
    right.sprite.draw(ctx);

    left.petSprite.draw(ctx);
    right.petSprite.draw(ctx);

    left.current.status.forEach(status => renderStatusEffect(ctx, status, left.sprite.pos.x, left.sprite.pos.y, true));
    right.current.status.forEach(status => renderStatusEffect(ctx, status, right.sprite.pos.x, right.sprite.pos.y, false));
    this.ongoingAnimations.sort((a, b) => a.layer - b.layer);
    this.ongoingAnimations.forEach(animation => animation.draw(ctx));

    renderStatBox(ctx, left, { left: true }, promises);
    renderStatBox(ctx, right, { left: false }, promises);

    ctx.drawImage(battleHud, 0, 0);
    Object.values(left.animations).forEach(animation => animation.draw(ctx));
    Object.values(right.animations).forEach(animation => animation.draw(ctx));
    renderHudDetails(ctx, left, {
      left: true,
      hpOverride: true, hp: left.current.hp,
      spOverride: true, sp: left.current.sp
    }, promises);
    renderHudDetails(ctx, right, {
      left: false,
      hpOverride: true, hp: right.current.hp,
      spOverride: true, sp: right.current.sp
    }, promises);
    // todo: mini heads
    await Promise.allSettled(promises);
    return canvas;
  }
}
