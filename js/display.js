import Fighters from "./data/fighters.js";
import Totems from "./data/totems.js";
import Pets from "./data/pets.js";
import getImagePath, { ImageType } from "./image.js";
import FighterSkills from "./data/fighterSkills.js";
import PetSkills from "./data/petSkills.js";
import { SkillType } from "./data/categories.js";
import Skills from "./data/skills.js";

export async function createCanvas(player) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");


  const backgroundImage = await getImage("img/display/background.png");
  ctx.drawImage(backgroundImage, 0, 0);

  if (!player || player.fighter.name === "None") return canvas;

  // name
  ctx.font = "bold 21px arial";
  ctx.fillStyle = "#000000";
  ctx.fillText(`${player.name}`, 107, 29);

  // level
  ctx.font = "21px arial";
  ctx.fillStyle = "#FFFFFF";
  const playerLevel = player.level;
  ctx.fillText(`lv${playerLevel.length === 3 ? "" : "l"}: ${playerLevel}`, 13, 118);

  // stat box thing
  ctx.fillStyle = "rgba(25, 0, 21, 0.9)";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.roundRect(-20, 150, 250, player.fighter?.skills?.length > 0 ? 500 : 430, 20);

  // totem
  if (player.totem.name) {
    ctx.drawImage(await getImage(getImagePath(ImageType.totem, getTotemId(player.totem.name))), 300, 400);
  }

  // fighter + pet
  ctx.drawImage(await getImage(getImagePath(ImageType.fighter, getFighterId(player.fighter.name))), 35, 20);
  const fighterDisplayName = getFighterDisplayName(player.fighter.name, player.fighter.evolved);
  ctx.font = "bold 16px arial";
  ctx.fillStyle = "#a15f08";
  ctx.fillText(`${fighterDisplayName}`, 15, 180);

  const fighterNameWidth = ctx.measureText(fighterDisplayName).width;
  ctx.font = "16px arial";
  ctx.fillStyle = "#c2ac3d";
  ctx.fillText(` +${player.fighter.plus}`, 15 + fighterNameWidth, 180);


  if (player.pet.name !== "None") {
    ctx.drawImage(await getImage(getImagePath(ImageType.pet, getPetId(player.pet.name, player.pet.evolved))), 250, 500);
    ctx.font = "bold 16px arial";
    ctx.fillStyle = "#a15f08";
    const petDisplayName = getPetDisplayName(player.pet.name, player.pet.evolved);
    ctx.fillText(`${petDisplayName}`, 15, 200);
    const petNameWidth = (player.pet) ? ctx.measureText(petDisplayName).width : 0;
    ctx.font = "16px arial";
    ctx.fillStyle = "#c2ac3d";
    ctx.fillText(` +${player.pet.plus}`, 15 + petNameWidth, 200);
  }

  lineSeparator(ctx, 210);

  // resistance
  ctx.font = "19px arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Resistance", 15, 240);
  for (let i = 0; i < player.resistance.length; ++i)
    ctx.drawImage(await getImage(getImagePath(ImageType.skillType, getSkillTypeId(player.resistance[i]))), 120 + 40 * i, 215, 39, 36.5);

  lineSeparator(ctx, 250);
  renderStats(ctx, player.stats);
  lineSeparator(ctx, 400);
  renderSkills(ctx, player);

  return canvas;
}

function renderStats(ctx, stats) {
  // hp + sp
  ctx.font = "21px arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${stats.hp}/${stats.hp}`, 235, 53);
  ctx.fillText(`${stats.sp}/${stats.sp}`, 285, 82);

  // stat names
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

  // stat values
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

async function renderSkills(ctx, player) {
  let skillIndex = 0;
  let petSkillIndex = 0;
  let evoPetSkillIndex = 0;
  let phySkillRendered = false;
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 4; ++x) {
      let path;
      ctx.drawImage(await getImage("img/display/skill-frame.png"), 15 + x * 50, 415 + y * 50, 45, 45);
      if (skillIndex < Math.min(6, player.skills.length)) {
        path = await getImage(getImagePath(ImageType.skill, getSkillId(player.skills[skillIndex++])));
      } else if (petSkillIndex < player.pet?.skills.length) {
        path = await getImage(getImagePath(ImageType.petSkill, getPetSkillId(player.pet.name, player.pet.skills[petSkillIndex++])));
      } else if (evoPetSkillIndex < player.pet?.evoSkills.length) {
        path = await getImage(getImagePath(ImageType.petSkill, getEvoPetSkillId(player.pet.evoSkills[evoPetSkillIndex++])));
      } else if (player.phylactery?.skill && !phySkillRendered) {
        path = await getImage(getImagePath(ImageType.skill, getSkillId(player.phylactery.skill)));
        phySkillRendered = true;
      }
      if (path) ctx.drawImage(path, 17 + x * 50, 417 + y * 50, 41, 41);
    }
  }
  if (player.fighter.skills.length > 0) {
    lineSeparator(ctx, 575);
    let resetIndex = 0;
    for (let x = 0; x < 4; ++x) {
      ctx.drawImage(await getImage("img/display/skill-evo-frame.png"), 15 + x * 50, 590, 45, 45);
      if (resetIndex < player.fighter.skills.length) {
        const id = getFighterSkillId(player.fighter.skills[resetIndex++]);
        ctx.drawImage(await getImage(getImagePath(ImageType.fighterSkill, id)), 17 + x * 50, 592, 41, 41);
      }
    }
  }
}

function getImage(path) {
  const image = document.createElement("img");
  image.src = path;
  return new Promise(resolve => image.onload = () => resolve(image));
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

function getFighter(name) {
  return Object.values(Fighters).find(x => x.name === name);
}

function getFighterDisplayName(name, evolved) {
  const fighter = getFighter(name);
  return evolved ? fighter.evoName : fighter.name;
}

function getFighterId(name) {
  return getFighter(name).iconId;
}

function getPet(name) {
  return Object.values(Pets).find(x => x.name === name);
}

function getPetDisplayName(name, evolved) {
  const pet = getPet(name);
  return evolved ? pet.evoName : pet.name;
}

function getPetId(name, evo) {
  const pet = getPet(name);
  return evo ? pet.evoIconId : pet.iconId;
}

function getSkillId(name) {
  return Object.values(Skills).find(x => x.name === name).iconId;
}

function getPetSkillId(petName, name) {
  return Object.values(PetSkills).find(x => {
    if (x.name === name) {
      if (String(x.iconId).startsWith("28")) {
        return x.iconId.endsWith(getPet(petName).iconId);
      }
      return true;
    }
    return false;
  }).iconId;
}

function getEvoPetSkillId(name) {
  return Object.values(EVOLVED_PET_SKILL_ICONS).find(x => x.name === name).iconId;
}

function getFighterSkillId(name) {
  return Object.values(FighterSkills).find(x => x.name === name).iconIds[2];
}

function getSkillTypeId(name) {
  return Object.values(SkillType).find(x => x.name === name).iconId;
}

function getTotemId(name) {
  return Object.values(Totems).find(x => x.name === name).iconId;
}
