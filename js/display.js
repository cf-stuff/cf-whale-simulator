import { getImage, getImagePath, ImageType } from "./image.js";
import CFDB from "./data/CFDB.js";


export async function createProfile(player, options = { bg: 11, left: true }) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  const promises = [];
  if (options.left) {
    await asyncDraw(ctx, getImagePath(ImageType.bg, options.bg), 0, 0);
    await asyncDraw(ctx, "img/display/hud.png", 5, 5);
  } else {
    await asyncDrawFlipped(ctx, getImagePath(ImageType.bg, options.bg), 0, 0);
    await asyncDrawFlipped(ctx, "img/display/hud.png", 5, 5);
  }

  if (!player) return canvas;

  if (player.fighter.name === "None") {
    renderPlayerDetails(ctx, player, options);
    return canvas;
  }

  await renderBackgroundSprites(ctx, player, options, promises);
  await renderStatBox(ctx, player, options, promises);
  await renderHudDetails(ctx, player, options, promises);
  await Promise.allSettled(promises);
  return canvas;
}

function renderPlayerDetails(ctx, player, options) {
  ctx.font = "bold 21px arial";
  ctx.fillStyle = "#000000";
  if (!options.left) ctx.textAlign = "right";
  const playerNameX = options.left ? 107 : ctx.canvas.width - 107;
  ctx.fillText(`${player.name}`, playerNameX, 29);

  ctx.font = "21px arial";
  ctx.fillStyle = "#FFFFFF";
  const playerLevelX = options.left ? 13 : ctx.canvas.width - 13;
  ctx.fillText(`lvl: ${player.level}`, playerLevelX, 118);
  if (!options.left) ctx.textAlign = "left";
}

export async function renderStatBox(ctx, player, options, promises) {
  ctx.fillStyle = "rgba(25, 0, 21, 0.85)";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  if (options.left) {
    ctx.roundRect(-20, 150, 250, player.fighter?.skills?.length > 0 ? 500 : 430, 20);
  } else {
    ctx.scale(-1, 1);
    ctx.roundRect(-20 + ctx.canvas.width * -1, 150, 250, player.fighter?.skills?.length > 0 ? 500 : 430, 20);
    ctx.scale(-1, 1);
  }
  renderPetDetails(ctx, player.pet, options);
  renderFighterDetails(ctx, player.fighter, options, promises);
  lineSeparator(ctx, 210, options.left);
  renderResistances(ctx, player.resistance, options, promises);
  lineSeparator(ctx, 250, options.left);
  renderStats(ctx, player.stats, options);
  lineSeparator(ctx, 400, options.left);
  await renderSkills(ctx, player, options, promises);
}

export async function renderBackgroundSprites(ctx, player, options, promises) {
  renderTotem(ctx, player.totem, options, promises);
  await renderPetSprite(ctx, player.pet, options, promises);
}

export async function renderHudDetails(ctx, player, options, promises) {
  renderPlayerDetails(ctx, player, options);
  const fighter = CFDB.getFighter(player.fighter.name);
  if (options.left) {
    promises.push(asyncDraw(ctx, getImagePath(ImageType.fighter, fighter.iconId), 35, 20));
  } else {
    promises.push(asyncDrawFlipped(ctx, getImagePath(ImageType.fighter, fighter.iconId), 35, 20));
  }
  
  ctx.font = "21px arial";
  ctx.fillStyle = "#FFFFFF";
  if (!options.left) ctx.textAlign = "right";
  const hpX = options.left ? 235 : ctx.canvas.width - 235;
  const spX = options.left ? 285 : ctx.canvas.width - 285;
  ctx.fillText(`${options.hpOverride ? options.hp : player.stats.hp}/${player.stats.hp}`, hpX, 53);
  ctx.fillText(`${options.spOverride ? options.sp : player.stats.sp}/${player.stats.sp}`, spX, 82);
  if (!options.left) ctx.textAlign = "left";
}

async function renderTotem(ctx, playerTotem, options, promises) {
  if (!playerTotem.name) return;
  const totem = CFDB.getTotem(playerTotem.name);
  if (options.left) {
    promises.push(asyncDraw(ctx, getImagePath(ImageType.totem, totem.iconId), 350, 400));
  } else {
    promises.push(asyncDrawFlipped(ctx, getImagePath(ImageType.totem, totem.iconId), 350, 400));
  }
}

async function renderFighterDetails(ctx, playerFighter, options, promises) {
  const fighter = CFDB.getFighter(playerFighter.name);
  const fighterDisplayName = playerFighter.evolved ? fighter.evoName : fighter.name;
  const x = options.left ? 15 : ctx.canvas.width - 227 + 15;
  ctx.font = "bold 16px arial";
  ctx.fillStyle = "#a15f08";
  ctx.fillText(`${fighterDisplayName}`, x, 180);

  const fighterNameWidth = ctx.measureText(fighterDisplayName).width;
  ctx.font = "16px arial";
  ctx.fillStyle = "#c2ac3d";
  ctx.fillText(` +${playerFighter.plus}`, x + fighterNameWidth, 180);
}

function renderPetDetails(ctx, playerPet, options) {
  if (playerPet.name === "None") return;
  const pet = CFDB.getPet(playerPet.name);
  ctx.font = "bold 16px arial";
  ctx.fillStyle = "#a15f08";
  const petDisplayName = playerPet.evolved ? pet.evoName : pet.name;
  const x = options.left ? 15 : ctx.canvas.width - 227 + 15;
  ctx.fillText(`${petDisplayName}`, x, 200);
  const petNameWidth = (playerPet) ? ctx.measureText(petDisplayName).width : 0;
  ctx.font = "16px arial";
  ctx.fillStyle = "#c2ac3d";
  ctx.fillText(` +${playerPet.plus}`, x + petNameWidth, 200);
}

async function renderPetSprite(ctx, playerPet, options) {
  if (playerPet.name === "None") return;
  const pet = CFDB.getPet(playerPet.name);
  if (options.left) {
    await asyncDraw(ctx, getImagePath(ImageType.pet, playerPet.evolved ? pet.evoIconId : pet.iconId), 200, 500);
  } else {
    await asyncDrawFlipped(ctx, getImagePath(ImageType.pet, playerPet.evolved ? pet.evoIconId : pet.iconId), 200, 500);
  }
}

async function renderResistances(ctx, resistance, options, promises) {
  ctx.font = "19px arial";
  ctx.fillStyle = "#ffffff";
  const x = options.left ? 15 : ctx.canvas.width - 227 + 15;
  ctx.fillText("Resistance", x, 240);
  for (let i = 0; i < resistance.length; ++i) {
    const skillType = CFDB.getSkillType(resistance[i]);
    promises.push(asyncDraw(ctx, getImagePath(ImageType.skillType, skillType.iconId), x + 105 + 40 * i, 215, 39, 36.5));
  }
}

function renderStats(ctx, stats, options) {
  const x = options.left ? 15 : ctx.canvas.width - 227 + 15;
  ctx.font = "18px arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("ATK", x, 280);
  ctx.fillText("SPD", x, 305);
  ctx.fillText("HIT", x, 330);
  ctx.fillText("EVA", x + 90, 330);
  ctx.fillText("BRK", x, 355);
  ctx.fillText("DEF", x + 90, 355);
  ctx.fillText("CRT", x, 380);
  ctx.fillText("RES", x + 90, 380);

  ctx.fillStyle = "#b6a357";
  ctx.fillText(` ${stats.minAtk} ~ ${stats.maxAtk}`, x + 40, 280);
  ctx.fillText(` ${stats.spd}`, x + 40, 305);
  ctx.fillText(` ${stats.hit}`, x + 35, 330);
  ctx.fillText(` ${stats.eva}`, x + 125, 330);
  ctx.fillText(` ${stats.brk}`, x + 35, 355);
  ctx.fillText(` ${stats.def}`, x + 125, 355);
  ctx.fillText(` ${stats.crt}`, x + 35, 380);
  ctx.fillText(` ${stats.res}`, x + 125, 380);
}

async function renderSkills(ctx, player, options, promises) {
  let skillIndex = 0;
  let petSkillIndex = 0;
  let phySkillRendered = false;
  const skillFrame = await getImage("img/display/skill-frame.png");
  const xOffset = options.left ? 15 : ctx.canvas.width - 227 + 15;
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 4; ++x) {
      let skillImage;
      ctx.drawImage(skillFrame, xOffset + x * 50, 415 + y * 50, 45, 45);
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
      if (skillImage) promises.push(asyncDraw(ctx, skillImage, xOffset + 2 + x * 50, 417 + y * 50, 41, 41));
    }
  }

  if (player.fighter.skills.length > 0) {
    lineSeparator(ctx, 575, options.left);
    let fighterSkillIndex = 0;
    const evoSkillFrame = await getImage("img/display/skill-evo-frame.png");
    for (let x = 0; x < 4; ++x) {
      ctx.drawImage(evoSkillFrame, xOffset + x * 50, 590, 45, 45);
      if (fighterSkillIndex < player.fighter.skills.length) {
        const fighterSkill = CFDB.getFighterSkill(player.fighter.skills[fighterSkillIndex++]);
        promises.push(asyncDraw(ctx, getImagePath(ImageType.fighterSkill, fighterSkill.iconIds[2]), xOffset + 2 + x * 50, 592, 41, 41));
      }
    }
  }
}

// function getImage(path) {
//   const image = document.createElement("img");
//   image.src = path;
//   return new Promise(resolve => image.onload = () => resolve(image));
// }

async function asyncDraw(ctx, path, x, y, w, h) {
  await getImage(path).then(image => {
    if (!w) {
      ctx.drawImage(image, x, y);
    } else {
      ctx.drawImage(image, x, y, w, h);
    }
  });
}

async function asyncDrawFlipped(ctx, path, x, y, w, h) {
  await getImage(path).then(image => {
    ctx.save();
    ctx.scale(-1, 1);
    if (!w) {
      ctx.drawImage(image, x + ctx.canvas.width * -1, y);
    } else {
      ctx.drawImage(image, x + ctx.canvas.width * -1, y, w, h);
    }
    ctx.restore();
  });
}

function lineSeparator(ctx, y, left = true) {
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#9c8563";
  if (left) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(225, y);
    ctx.stroke();
  } else {
    ctx.scale(-1, 1);
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width * -1, y);
    ctx.lineTo(ctx.canvas.width * -1 + 225, y);
    ctx.stroke();
  }
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
