import { getImage, getImageAsync, getImagePath, ImageType } from "./image.js";
import CFDB from "./data/CFDB.js";
import Status from "./data/status.js";

const hud = getImage("img/display/hud.png");
const skillFrame = getImage("img/display/skill-frame.png");
const evoSkillFrame = getImage("img/display/skill-evo-frame.png");

const char = getImage("img/display/char.png");
const horns = getImage("img/display/effects/horns.png");
const bell = getImage("img/display/effects/bell.png");
const frenzy = getImage("img/display/effects/frenzy.png");
const bubble = getImage("img/display/effects/bubble.png");
const ice = getImage("img/display/effects/ice.png");
const paralyzed = getImage("img/display/effects/paralyzed.png");
const shieldWall = getImage("img/display/effects/shieldwall.png");
const ignited = getImage("img/display/effects/ignited.png");
const net = getImage("img/display/effects/net.png");
const chains = getImage("img/display/effects/chains.png");
const cloud = getImage("img/display/effects/aotg-cloud.png");
const cursed = getImage("img/display/effects/cursed.png");
const rooted = getImage("img/display/effects/rooted.png");
const poisoned = getImage("img/display/effects/poisoned.png");
const drunk = getImage("img/display/effects/drunk.png");
const mask = getImage("img/display/effects/mask.png");
const violent = getImage("img/display/effects/violent.png");
const stunned = getImage("img/display/effects/stunned.png");
const sick = getImage("img/display/effects/sick.png");
const timeBomb = getImage("img/display/effects/timebomb.png");

export async function createProfile(player, options = { bg: 11, left: true }) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  const promises = [];
  if (options.left) {
    await asyncDraw(ctx, getImagePath(ImageType.bg, options.bg), 0, 0);
    ctx.drawImage(hud, 5, 5);
  } else {
    await asyncDrawFlipped(ctx, getImagePath(ImageType.bg, options.bg), 0, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(hud, 5 - ctx.canvas.width, 5);
    ctx.scale(-1, 1);
  }

  if (!player) return canvas;

  if (player.fighter.name === "None") {
    renderPlayerDetails(ctx, player, options);
    return canvas;
  }

  renderTotem(ctx, player.totem, options, promises);
  await renderPetSprite(ctx, player.pet, options, promises);
  renderStatBox(ctx, player, options, promises);
  renderHudDetails(ctx, player, options, promises);
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

export function renderStatBox(ctx, player, options, promises) {
  ctx.fillStyle = "rgba(25, 0, 21, 0.85)";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  if (options.left) {
    roundRect(ctx, -20, 150, 250, player.fighter?.skills?.length > 0 ? 500 : 430, 20);
  } else {
    ctx.scale(-1, 1);
    roundRect(ctx, -20 - ctx.canvas.width, 150, 250, player.fighter?.skills?.length > 0 ? 500 : 430, 20);
    ctx.scale(-1, 1);
  }
  renderPetDetails(ctx, player.pet, options);
  renderFighterDetails(ctx, player.fighter, options);
  lineSeparator(ctx, 210, options.left);
  renderResistances(ctx, player.resistance, options, promises);
  lineSeparator(ctx, 250, options.left);
  renderStats(ctx, player.stats, options);
  lineSeparator(ctx, 400, options.left);
  renderSkills(ctx, player, options, promises);
}

export function renderHudDetails(ctx, player, options, promises) {
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

export function renderTotem(ctx, playerTotem, options, promises) {
  if (!playerTotem.name) return;
  const totem = CFDB.getTotem(playerTotem.name);
  if (options.left) {
    promises.push(asyncDraw(ctx, getImagePath(ImageType.totem, totem.iconId), 350, 400));
  } else {
    promises.push(asyncDrawFlipped(ctx, getImagePath(ImageType.totem, totem.iconId), 350, 400));
  }
}

function renderFighterDetails(ctx, playerFighter, options) {
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

function renderResistances(ctx, resistance, options, promises) {
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

function renderSkills(ctx, player, options, promises) {
  let skillIndex = 0;
  let petSkillIndex = 0;
  let phySkillRendered = false;
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
    for (let x = 0; x < 4; ++x) {
      ctx.drawImage(evoSkillFrame, xOffset + x * 50, 590, 45, 45);
      if (fighterSkillIndex < player.fighter.skills.length) {
        const fighterSkill = CFDB.getFighterSkill(player.fighter.skills[fighterSkillIndex++]);
        promises.push(asyncDraw(ctx, getImagePath(ImageType.fighterSkill, fighterSkill.iconIds[2]), xOffset + 2 + x * 50, 592, 41, 41));
      }
    }
  }
}

export function renderStatusEffect(ctx, status, x, y, left = true) {
  if (!left) {
    x += ctx.canvas.width * -1;
    ctx.scale(-1, 1);
  }
  if (status === Status.frozen.name) {
    ctx.drawImage(ice, x - ice.width / 2, y - ice.height);
  } else if (status === Status.energyShield.name) {
    ctx.drawImage(bubble, x - bubble.width / 2, y - bubble.height);
  } else if (status === Status.ignited.name) {
    ctx.globalAlpha = 0.5;
    ctx.drawImage(ignited, x - ignited.width / 2, y - ignited.height);
    ctx.globalAlpha = 1.0;
  } else if (status === Status.goldenShield.name) {
    ctx.drawImage(bell, 0, 0, bell.width, bell.height, x - bell.width, y - bell.height * 1.8, bell.width * 2, bell.height * 2);
  } else if (status === Status.netted.name) {
    ctx.drawImage(net, x - net.width / 2, y - net.height);
  } else if (status === Status.rooted.name) {
    ctx.drawImage(rooted, x - rooted.width / 2, y - rooted.height); // could be a bit higher but idk
  } else if (status === Status.paralyzed.name) {
    ctx.drawImage(paralyzed, x - paralyzed.width / 2, y - paralyzed.height);
  } else if (status === Status.thunderGod.name) {
    ctx.drawImage(cloud, x - cloud.width / 2, y - char.height - cloud.height);
  } else if (status === Status.bloodFrenzy.name) {
    ctx.drawImage(frenzy, 0, 0, frenzy.width, frenzy.height, x - frenzy.width * 0.9, y - frenzy.height * 2, frenzy.width * 2, frenzy.height * 2);
  } else if (status === Status.poisoned.name) {
    ctx.drawImage(poisoned, x - poisoned.width / 2, y - poisoned.height);
  } else if (status === Status.wine.name) {
    ctx.drawImage(drunk, x - drunk.width / 2, y - drunk.height);
  } else if (status === Status.weakened.name) {
    ctx.drawImage(mask, x - mask.width / 2, y - mask.height - 40);
  } else if (status === Status.silenced.name) {
    ctx.drawImage(chains, x - chains.width / 2, y - chains.height);
  } else if (status === Status.barbarism.name) {
    ctx.drawImage(horns, x - horns.width / 2, y - char.height - horns.height / 4);
  } else if (status === Status.cursed.name) {
    ctx.drawImage(cursed, x - cursed.width / 2, y - char.height - cursed.height);
  } else if (status === Status.shieldWall.name) {
    ctx.drawImage(shieldWall, x - shieldWall.width / 2, y - shieldWall.height);
  } else if (status === Status.violent.name) {
    ctx.drawImage(violent, x - violent.width / 2, y - violent.height);
  } else if (status === Status.stunned.name || status === Status.dizzy.name) {
    ctx.drawImage(stunned, x - stunned.width / 2, y - 150 - stunned.height);
  } else if (status === Status.sick.name) {
    ctx.drawImage(sick, x - sick.width / 2, y - sick.height);
  } else if (status === Status.timeBomb.name) {
    ctx.drawImage(timeBomb, x - timeBomb.width / 2, y - timeBomb.height);
  }
  if (!left) {
    ctx.scale(-1, 1);
  }
}

async function asyncDraw(ctx, path, x, y, w, h) {
  await getImageAsync(path).then(image => {
    if (!w) {
      ctx.drawImage(image, x, y);
    } else {
      ctx.drawImage(image, x, y, w, h);
    }
  });
}

async function asyncDrawFlipped(ctx, path, x, y, w, h) {
  await getImageAsync(path).then(image => {
    ctx.save();
    ctx.scale(-1, 1);
    if (!w) {
      ctx.drawImage(image, x - ctx.canvas.width, y);
    } else {
      ctx.drawImage(image, x - ctx.canvas.width, y, w, h);
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

function roundRect(ctx, x, y, width, height, radius = 5, stroke = true) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  ctx.fill();
}
