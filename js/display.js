import { getImagePath, ImageType } from "./image.js";
import CFDB from "./data/CFDB.js";

export async function createCanvas(player) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  const promises = [];

  await asyncDraw(ctx, "img/display/background.png", 0, 0);

  if (!player) return canvas;

  ctx.font = "bold 21px arial";
  ctx.fillStyle = "#000000";
  ctx.fillText(`${player.name}`, 107, 29);

  ctx.font = "21px arial";
  ctx.fillStyle = "#FFFFFF";
  const playerLevel = player.level;
  ctx.fillText(`lvl: ${playerLevel}`, 13, 118);

  if (player.fighter.name === "None") return canvas;

  // stat box thing
  ctx.fillStyle = "rgba(25, 0, 21, 0.85)";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.roundRect(-20, 150, 250, player.fighter?.skills?.length > 0 ? 500 : 430, 20);

  if (player.totem.name) {
    const totem = CFDB.getTotem(player.totem.name);
    promises.push(asyncDraw(ctx, getImagePath(ImageType.totem, totem.iconId), 300, 400));
  }

  const fighter = CFDB.getFighter(player.fighter.name);
  promises.push(asyncDraw(ctx, getImagePath(ImageType.fighter, fighter.iconId), 35, 20));
  const fighterDisplayName = player.fighter.evolved ? fighter.evoName : fighter.name;
  ctx.font = "bold 16px arial";
  ctx.fillStyle = "#a15f08";
  ctx.fillText(`${fighterDisplayName}`, 15, 180);

  const fighterNameWidth = ctx.measureText(fighterDisplayName).width;
  ctx.font = "16px arial";
  ctx.fillStyle = "#c2ac3d";
  ctx.fillText(` +${player.fighter.plus}`, 15 + fighterNameWidth, 180);


  if (player.pet.name !== "None") {
    const pet = CFDB.getPet(player.pet.name);
    promises.push(asyncDraw(ctx, getImagePath(ImageType.pet, player.pet.evolved ? pet.evoIconId : pet.iconId), 250, 500));
    ctx.font = "bold 16px arial";
    ctx.fillStyle = "#a15f08";
    const petDisplayName = player.pet.evolved ? pet.evoName : pet.name;
    ctx.fillText(`${petDisplayName}`, 15, 200);
    const petNameWidth = (player.pet) ? ctx.measureText(petDisplayName).width : 0;
    ctx.font = "16px arial";
    ctx.fillStyle = "#c2ac3d";
    ctx.fillText(` +${player.pet.plus}`, 15 + petNameWidth, 200);
  }

  lineSeparator(ctx, 210);

  ctx.font = "19px arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Resistance", 15, 240);
  for (let i = 0; i < player.resistance.length; ++i) {
    const skillType = CFDB.getSkillType(player.resistance[i]);
    promises.push(asyncDraw(ctx, getImagePath(ImageType.skillType, skillType.iconId), 120 + 40 * i, 215, 39, 36.5));
  }

  lineSeparator(ctx, 250);
  renderStats(ctx, player.stats);
  lineSeparator(ctx, 400);
  await renderSkills(ctx, player, promises);
  await Promise.allSettled(promises);
  return canvas;
}

function renderStats(ctx, stats) {
  ctx.font = "21px arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${stats.hp}/${stats.hp}`, 235, 53);
  ctx.fillText(`${stats.sp}/${stats.sp}`, 285, 82);

  ctx.font = "18px arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("ATK", 15, 280);
  ctx.fillText("SPD", 15, 305);
  ctx.fillText("HIT", 15, 330);
  ctx.fillText("EVA", 105, 330);
  ctx.fillText("BRK", 15, 355);
  ctx.fillText("DEF", 105, 355);
  ctx.fillText("CRT", 15, 380);
  ctx.fillText("RES", 105, 380);

  ctx.fillStyle = "#b6a357";
  ctx.fillText(` ${stats.minAtk} ~ ${stats.maxAtk}`, 55, 280);
  ctx.fillText(` ${stats.spd}`, 55, 305);
  ctx.fillText(` ${stats.hit}`, 50, 330);
  ctx.fillText(` ${stats.eva}`, 140, 330);
  ctx.fillText(` ${stats.brk}`, 50, 355);
  ctx.fillText(` ${stats.def}`, 140, 355);
  ctx.fillText(` ${stats.crt}`, 50, 380);
  ctx.fillText(` ${stats.res}`, 140, 380);
}

async function renderSkills(ctx, player, promises) {
  let skillIndex = 0;
  let petSkillIndex = 0;
  let phySkillRendered = false;
  const skillFrame = await getImage("img/display/skill-frame.png");
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 4; ++x) {
      let skillImage;
      ctx.drawImage(skillFrame, 15 + x * 50, 415 + y * 50, 45, 45);
      if (skillIndex < Math.min(6, player.skills.length)) {
        const skill = CFDB.getSkill(player.skills[skillIndex++]);
        skillImage = getImagePath(ImageType.skill, skill.iconId);
      } else if (petSkillIndex < player.pet?.skills.length) {
        const skill = CFDB.getPetSkill(player.pet.skills[petSkillIndex++]);
        skillImage = getImagePath(ImageType.petSkill, skill.iconId);
      } else if (player.phylactery?.skill && !phySkillRendered) {
        const skill = CFDB.getSkill(player.phylactery.skill);
        skillImage = getImagePath(ImageType.skill, skill.iconId);
        phySkillRendered = true;
      }
      if (skillImage) promises.push(asyncDraw(ctx, skillImage, 17 + x * 50, 417 + y * 50, 41, 41));
    }
  }

  if (player.fighter.skills.length > 0) {
    lineSeparator(ctx, 575);
    let fighterSkillIndex = 0;
    const evoSkillFrame = await getImage("img/display/skill-evo-frame.png");
    for (let x = 0; x < 4; ++x) {
      ctx.drawImage(evoSkillFrame, 15 + x * 50, 590, 45, 45);
      if (fighterSkillIndex < player.fighter.skills.length) {
        const fighterSkill = CFDB.getFighterSkill(player.fighter.skills[fighterSkillIndex++]);
        promises.push(asyncDraw(ctx, getImagePath(ImageType.fighterSkill, fighterSkill.iconIds[2]), 17 + x * 50, 592, 41, 41));
      }
    }
  }
}

function getImage(path) {
  const image = document.createElement("img");
  image.src = path;
  return new Promise(resolve => image.onload = () => resolve(image));
}

async function asyncDraw(ctx, path, x, y, w, h) {
  await getImage(path).then(image => {
    if (!w) {
      ctx.drawImage(image, x, y);
    } else {
      ctx.drawImage(image, x, y, w, h);
    }
  });
}

function lineSeparator(ctx, y) {
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#9c8563";
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(225, y);
  ctx.stroke();
  ctx.restore();
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius = 5, stroke = true) {
  this.beginPath();
  this.moveTo(x + radius, y);
  this.lineTo(x + width - radius, y);
  this.quadraticCurveTo(x + width, y, x + width, y + radius);
  this.lineTo(x + width, y + height - radius);
  this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  this.lineTo(x + radius, y + height);
  this.quadraticCurveTo(x, y + height, x, y + height - radius);
  this.lineTo(x, y + radius);
  this.quadraticCurveTo(x, y, x + radius, y);
  this.closePath();
  if (stroke) {
    this.stroke();
  }
  this.fill();
}
