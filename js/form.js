import { FIGHTER, PET, SKILL, SkillType, TOTEM } from "./config.js";
import { createCanvas as render } from "./display.js";
import { ARENA_TITLE, BuildStat, BuildStatReverse, EVOLVED_PET_SKILL_ICONS, FighterSkillIconType, FIGHTER_SKILL_ICONS, GEAR, GearType, GEAR_MAX_VALUES, GEAR_SUIT_BONUS, GEM, GemType, GlyphStat, NEXUS_STATS, PetSkillIconType, PET_SKILL_ICONS, Phylactery } from "./formInfo.js";
import Utils from "./utils.js";

export function buildToPlayer(build) {
  if (!validate(build)) return;
  const statTotal = {
    str: 0,
    dex: 0,
    sta: 0,
    brk: 10,
    def: 10,
    hit: 10,
    eva: 10,
    res: 10,
    crt: 10,
    atkPercent: 0,
    minAtk: 10,
    maxAtk: 10,
    hpPercent: 0,
    hp: 200 + (20 * build.level),
    spd: 100,
    spPercent: 0,
    sp: 100,
    furyReversion: 0
  }
  const fighter = mapFighter(build.fighter, statTotal);
  const pet = mapPet(build.pet, statTotal);
  addGearStatsToTotal(build.gear, statTotal);
  const phylactery = mapPhylactery(build.phylactery, statTotal);
  addNexusToTotal(build.nexus, statTotal);
  addStats(build.altar, statTotal);
  addStatsFromArenaTitle(build.arenaTitle, statTotal)
  const totem = mapTotem(build.totem, statTotal);
  return {
    name: build.name,
    level: build.level,
    fighter,
    pet,
    weapon: getWeaponName(build.gear),
    stats: compileStatTotal(statTotal, fighter.name),
    skills: build.skills,
    expertise: build.expertise,
    resistance: build.resistance,
    phylactery,
    totem
  }
}

function mapFighter(fighter, total) {
  const fighterInfo = Object.values(FIGHTER).find(x => x.name === fighter.name);
  const level = fighter.evolved ? 34 : fighter.plus;
  if (fighterInfo) {
    const str = Math.ceil(fighterInfo.growthRate[0] * level * 8) + fighterInfo.isv[0];
    const dex = Math.ceil(fighterInfo.growthRate[1] * level * 8) + fighterInfo.isv[1];
    const sta = Math.ceil(fighterInfo.growthRate[2] * level * 8) + fighterInfo.isv[2];
    console.log(`[DEBUG] calculated fighter stats: str=${str} dex=${dex} sta=${sta}`);
    addStats({ str, dex, sta }, total);
  }
  addStats(fighter.potentials, total);
  const fighterSkills = [];
  fighter.skills.map(skill => Object.values(FIGHTER_SKILL_ICONS).find(x => x.name === skill))
    .forEach(skill => skill.type === FighterSkillIconType.stat ? total[BuildStatReverse[skill.name]] += skill.values[2] : fighterSkills.push(skill.name));
  return {
    name: fighter.name,
    plus: fighter.plus,
    mastery: fighterInfo?.mastery,
    evolved: fighter.evolved,
    skills: fighterSkills
  }
}

function mapPet(pet, total) {
  const petSkills = [];
  const evoPetSkills = [];
  pet.skills.map(skill => Object.values(PET_SKILL_ICONS).find(x => x.name === skill))
    .forEach(skill => skill.type === PetSkillIconType.stat ? addPetStatToTotal(skill.name, total) : petSkills.push(skill.name));
  pet.evoSkills.map(skill => Object.values(EVOLVED_PET_SKILL_ICONS).find(x => x.name === skill))
    .forEach(skill => skill.type === PetSkillIconType.stat ? addPetStatToTotal(skill.name, total) : evoPetSkills.push(skill.name));
  return {
    name: pet.name,
    plus: pet.plus,
    evolved: pet.evolved,
    skills: petSkills,
    evoSkills: evoPetSkills,
  }
}

function addPetStatToTotal(petStat, total) {
  const stat = Object.entries(BuildStat).find(x => petStat.indexOf(x[1]) >= 0);
  const value = petStat.substring(0, petStat.indexOf(stat[1]));
  total[stat[0]] += Number(value);
}

function getWeaponName(gears) {
  const weaponIndex = gears.map(gear => Object.values(GEAR).find(gearInfo => gear.name === gearInfo.name))
    .findIndex(gear => gear.type === GearType.weapon.name);
  return weaponIndex >= 0 ? weaponIndex[0] : undefined;
}

function addGearStatsToTotal(gears, total) {
  gears.forEach(gear => {
    const gearInfo = Object.values(GEAR).find(x => x.name === gear.name);
    addStats(gearInfo.stats, total);
    addStats(gear.stats, total);
    for (let i = 0; i < gear.enhancement; ++i) {
      addStats(gearInfo.statsPerEnhance, total);
    }
    gear.gems.forEach(gem => {
      const gemInfo = Object.values(GEM).find(x => x.name === gem.name);
      for (let i = 0; i < gem.level; ++i) {
        addStats(gemInfo.statsPerLevel, total);
      }
    });
  });
  GEAR_SUIT_BONUS.forEach(suit => {
    let count = gears.map(gear => Object.values(GEAR).find(x => x.name === gear.name))
      .filter(gear => gear.type !== GearType.weapon.name && gear.name.includes(suit.name)).length;
    if (count >= 2) addStats(suit.two, total);
    if (count >= 4) addStats(suit.four, total);
    if (count >= 7) addStats(suit.seven, total);
  })
}

function mapPhylactery(phy, total) {
  phy.stats.forEach(stat => total[BuildStatReverse[stat]] += Phylactery.initialBMV + Phylactery.bmvStats[phy.level]);
  let extraTriggerPercent = 0;
  let glyphMultiplier = 1;
  if (phy.level >= 2) total.maxAtk += 32;
  if (phy.level >= 4) total.minAtk += 32;
  if (phy.level >= 6) total.hp += 128;
  if (phy.level >= 8) glyphMultiplier += 0.4;
  if (phy.level >= 12) extraTriggerPercent += 1;
  if (phy.level >= 14) glyphMultiplier += 0.4;
  if (phy.level >= 16) extraTriggerPercent += 1;
  if (phy.level >= 18) glyphMultiplier += 0.4;
  if (phy.level >= 20) extraTriggerPercent += 1;
  phy.glyphs.forEach(glyph => total[BuildStatReverse[glyph.stat]] += Math.floor(4 * glyph.level * glyphMultiplier));
  return {
    skill: phy.level >= 10 ? phy.skill : undefined,
    extraTriggerPercent
  }
}

function addNexusToTotal(nexus, total) {
  nexus.forEach(soul => total[BuildStatReverse[soul.stat]] += calculateNexusStat(soul.stat, soul.level));
}

function mapTotem(totem, total) {
  addStats(totem.stats, total);
  return {
    name: totem.name,
    level: totem.level
  }
}

function addStatsFromArenaTitle(title, total) {
  addStats(Object.values(ARENA_TITLE).find(x => x.name === title).stats, total);
}

function addStats(stats, total) {
  Object.entries(stats).forEach(([key, value]) => total[key] += value);
}

function compileStatTotal(total, fighterName) {
  console.log(total)
  const fighterInfo = Object.values(FIGHTER).find(x => x.name === fighterName);
  if (!fighterInfo) return total;
  return {
    hp: Math.floor(total.hp * (1 + (total.hpPercent + Math.floor(total.sta / fighterInfo.bmv[2])) / 100)),
    sp: Math.floor((total.sp + total.sta / fighterInfo.bmv[2]) * (1 + (total.spPercent) / 100)),
    minAtk: Math.floor(total.minAtk * (1 + (total.atkPercent + total.str / fighterInfo.bmv[0]) / 100)),
    maxAtk: Math.floor(total.maxAtk * (1 + (total.atkPercent + total.str / fighterInfo.bmv[0]) / 100)),
    spd: Math.floor(total.spd + total.dex / fighterInfo.bmv[1]),
    hit: total.hit,
    eva: Math.floor(total.eva + total.dex / fighterInfo.bmv[1]),
    brk: total.brk,
    def: total.def,
    crt: total.crt,
    res: total.res,
    furyReversion: total.furyReversion
  }
}

// todo
export function validate(build) {
  return true;
}

export function formToBuild() {
  return {
    name: document.getElementById("player-name").value,
    level: Number(document.getElementById("player-level").value),
    fighter: formToFighter(),
    pet: formToPet(),
    gear: formToGears(),
    phylactery: formToPhylactery(),
    nexus: formToNexus(),
    altar: formToAltar(),
    totem: formToTotem(),
    skills: getValuesFromCheckbox("skill"),
    expertise: getValuesFromCheckbox("pro"),
    resistance: getValuesFromCheckbox("res"),
    arenaTitle: document.getElementById("arena-select").value
  }
}

function formToFighter() {
  const evolved = document.getElementById("fighter-evolved").checked;
  const skills = getValuesFromCheckbox("fighter-stat");
  const resets = getValuesFromCheckbox("fighter-reset");
  const healing = getValuesFromCheckbox("fighter-healing");
  if (resets.length > 0) {
    skills.push(resets[0]);
    if (healing.length > 0) {
      skills.push(healing[0]);
      if (resets.length > 1) {
        skills.push(resets[1]);
      }
    }
  }
  return {
    name: document.getElementById("fighter-select").value,
    plus: Number(document.getElementById("fighter-level").value),
    evolved,
    potentials: {
      str: evolved ? Number(document.getElementById("potential-str").value) : 0,
      dex: evolved ? Number(document.getElementById("potential-dex").value) : 0,
      sta: evolved ? Number(document.getElementById("potential-sta").value) : 0
    },
    skills: evolved ? skills : []
  }
}

function formToPet() {
  const evolved = document.getElementById("pet-evolved").checked;
  let evoSkills = []
  if (evolved) {
    evoSkills = getValuesFromCheckbox("e-pet-skill");
    const actives = getValuesFromCheckbox("pet-active");
    const passives = getValuesFromCheckbox("pet-passive");
    if (actives.length > 0) evoSkills.push(actives[0]);
    if (passives.length > 0) evoSkills.push(passives[0]);
  }
  return {
    name: document.getElementById("pet-select").value,
    plus: Number(document.getElementById("pet-level").value),
    evolved,
    skills: getValuesFromCheckbox("pet-skill"),
    evoSkills
  }
}

function formToGears() {
  return [...document.querySelectorAll(".gear-component")]
    .filter(component => document.getElementById(`${component.id}-select`).value !== "None")
    .map(component => ({
      name: document.getElementById(`${component.id}-select`).value,
      enhancement: Number(document.getElementById(`${component.id}-enhance`).value),
      stats: getGearStats(component),
      gems: getGems(component)
    }));
}

function getGearStats(component) {
  const stats = {};
  component.querySelectorAll(".gear-stat-group").forEach(group => {
    const stat = group.querySelector(".stat-select").value;
    if (stat === "None") return;
    stats[BuildStatReverse[stat]] = Number(group.querySelector(".stat-value").value);
  });
  return stats;
}

function getGems(component) {
  return [...component.querySelectorAll(".gem-group")]
    .filter(group => group.querySelector(".gem-select").value !== "None")
    .map(group => ({
      name: group.querySelector(".gem-select").value,
      level: Number(group.querySelector(".gem-level").value) + 1
    }))
}

function formToPhylactery() {
  return {
    level: Number(document.getElementById("phy-level").value),
    skill: getValuesFromCheckbox("phy-skill")[0],
    stats: [...document.querySelectorAll(".phy-stat-select")].filter(x => x.value !== "None").map(x => x.value),
    glyphs: getGlyphs()
  }
}

function getGlyphs() {
  return [...document.querySelectorAll(".phy-glyph-group")]
    .filter(group => group.querySelector(".glyph-select").value !== "None")
    .map(group => ({
      stat: group.querySelector(".glyph-select").value,
      level: Number(group.querySelector(".glyph-level").value)
    }));
}

function formToNexus() {
  return [...document.querySelectorAll(".nexus-stat-group")]
    .filter(group => group.querySelector(".nexus-soul-select").value !== "None")
    .map(group => ({
      stat: group.querySelector(".nexus-soul-select").value,
      level: Number(group.querySelector(".nexus-soul-level").value)
    }));
}

function formToAltar() {
  const altar = {};
  document.querySelectorAll(".altar-stat").forEach(stat => altar[stat.id.split("-")[1]] = Number(stat.value));
  return altar;
}

function formToTotem() {
  const totems = getValuesFromCheckbox("totem");
  const stats = {};
  document.querySelectorAll(".totem-stat").forEach(stat => stats[stat.id.split("-")[1]] = Number(stat.value));
  return {
    name: totems.length > 0 ? totems[0] : undefined,
    level: Number(document.getElementById("totem-level").value),
    stats
  }
}

export function initForm() {
  initTabs();
  initFighter();
  initPet();
  initGears();
  initPhy();
  initNexus();
  initAltar();
  initTotem();
  initArena();
  initSkills();

  document.querySelectorAll("button").forEach(btn => btn.addEventListener("click", renderFormToDisplay));

  document.getElementById("form").onchange = renderFormToDisplay;
}

function renderFormToDisplay() {
  setTimeout(() => {
    const build = formToBuild();
    const player = buildToPlayer(build);
    render(player);
  }, 100);
}

function initTabs() {
  document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", event => {
    if (event.target.classList.contains("tab-link")) {
      document.querySelectorAll(".tab-content").forEach(x => x.classList.remove("active"));
      document.getElementById(event.target.getAttribute("data-open-tab")).classList.add("active");
      document.querySelectorAll(".tab-link").forEach(x => x.classList.remove("active"));
      event.target.classList.add("active");
    }
  }));
}

function initFighter() {
  const fighterSelect = document.getElementById("fighter-select");
  Object.values(FIGHTER).forEach(fighter => {
    const option = document.createElement("option");
    option.value = fighter.name;
    option.textContent = fighter.name;
    fighterSelect.appendChild(option);
  });
  fighterSelect.onchange = () => updateGearComponent(document.getElementById("gear-Weapon"));
  const fighterLevel = document.getElementById("fighter-level");
  fighterLevel.onchange = () => fighterLevel.value = Utils.clamp(fighterLevel.value, fighterLevel.min, fighterLevel.max);
  const fighterEvolved = document.getElementById("fighter-evolved");
  const eFighter = document.getElementById("e-fighter");
  fighterEvolved.onchange = () => {
    if (fighterEvolved.checked) {
      fighterLevel.min = 1;
      fighterLevel.max = 21;
      eFighter.classList.remove("d-none");
    } else {
      fighterLevel.min = 0;
      fighterLevel.max = 34;
      eFighter.classList.add("d-none");
    }
  }
  document.getElementById("fighter-max").onclick = () => {
    fighterEvolved.checked = true;
    fighterLevel.value = 21;
    document.getElementById("potential-str").value = 360;
    document.getElementById("potential-dex").value = 360;
    document.getElementById("potential-sta").value = 360;
    fighterEvolved.onchange();
  }
  const fighterStatSelect = document.getElementById("fighter-stat-select");
  const fighterResetSelect = document.getElementById("fighter-reset-select");
  const fighterHealingSelect = document.getElementById("fighter-healing-select");
  setOnchangeLimitCheckbox(fighterStatSelect, 3);
  setOnchangeLimitCheckbox(fighterResetSelect, 2);
  Object.values(FIGHTER_SKILL_ICONS).forEach(skill => {
    const id = `coatSkill_${skill.iconIds[2]}`;
    const url = `img/coatSkillIcon/coatskill_icon${skill.iconIds[2]}.png`;
    if (skill.type === FighterSkillIconType.stat) {
      const checkbox = createImageCheckbox(id, skill.name, "fighter-stat", url);
      fighterStatSelect.appendChild(checkbox);
    } else if (skill.type === FighterSkillIconType.reset) {
      const checkbox = createImageCheckbox(id, skill.name, "fighter-reset", url);
      fighterResetSelect.appendChild(checkbox);
    } else if (skill.type === FighterSkillIconType.healing) {
      const radio = createImageRadio(id, skill.name, "fighter-healing", url);
      fighterHealingSelect.appendChild(radio);
    }
  });
}

function initPet() {
  const petSelect = document.getElementById("pet-select");
  Object.values(PET).forEach(pet => {
    const option = document.createElement("option");
    option.value = pet.name;
    option.textContent = pet.name;
    petSelect.appendChild(option);
  });
  const petLevel = document.getElementById("pet-level");
  const petEvolved = document.getElementById("pet-evolved");
  const ePet = document.getElementById("e-pet");
  petEvolved.onchange = () => {
    if (petEvolved.checked) {
      petLevel.min = 1;
      petLevel.max = 21;
      ePet.classList.remove("d-none");
    } else {
      petLevel.min = 0;
      petLevel.max = 34;
      ePet.classList.add("d-none");
    }
  }
  document.getElementById("pet-max").onclick = () => {
    petEvolved.checked = true;
    petLevel.value = 21;
    petLevel.onchange();
    petEvolved.onchange();
  }

  const petSkillSelect = document.getElementById("pet-skill-select");
  setOnchangeLimitCheckbox(petSkillSelect, 12);
  Object.values(PET_SKILL_ICONS).forEach(skill => {
    const id = `petskill_${skill.iconId}`;
    const url = `img/petskillIcon/petskill_icon_${skill.iconId}.png`;
    const checkbox = createImageCheckbox(id, skill.name, "pet-skill", url);
    if (id.startsWith("petskill_27") || id.startsWith("petskill_28")) {
      checkbox.classList.add("d-none");
    }
    petSkillSelect.append(checkbox);
  });
  petSelect.onchange = () => {
    const selectedPet = Object.values(PET).find(pet => pet.name === petSelect.value);
    let specialStatSelected = false;
    let specialSkillSelected = false;
    petSkillSelect.querySelectorAll("input").forEach(option => {
      if (option.id.startsWith("petskill_27")) {
        if (option.checked) {
          specialStatSelected = true;
          option.checked = false;
        }
        option.parentElement.classList.add("d-none");
      } else if (option.id.startsWith("petskill_28")) {
        if (option.checked) {
          specialSkillSelected = true;
          option.checked = false;
        }
        option.parentElement.classList.add("d-none");
      }
    });
    petSkillSelect.querySelectorAll("input").forEach(option => {
      if (option.id === `petskill_27_${selectedPet.iconId}`) {
        option.checked = specialStatSelected;
        option.parentElement.classList.remove("d-none");
      } else if (option.id === `petskill_28_${selectedPet.iconId}`) {
        option.checked = specialSkillSelected;
        option.parentElement.classList.remove("d-none");
      }
    });
  }
  const ePetSkillSelect = document.getElementById("e-pet-skill-select");
  ePetSkillSelect.onchange = () => {
    const checkboxes = ePetSkillSelect.querySelectorAll("input");
    const selected = [...checkboxes].filter(x => x.checked);
    const notSelected = [...checkboxes].filter(x => !x.checked);
    if (selected.length >= 6) {
      notSelected.forEach(x => x.disabled = true);
      return;
    } else {
      checkboxes.forEach(x => x.disabled = false);
    }
    limitCheckbox(ePetSkillSelect.querySelectorAll("input[name='pet-passive']"), 1);
    limitCheckbox(ePetSkillSelect.querySelectorAll("input[name='pet-active']"), 1);
  }
  Object.values(EVOLVED_PET_SKILL_ICONS).forEach(skill => {
    const id = `petskill_${skill.iconId}`;
    const url = `img/petskillIcon/petskill_icon_${skill.iconId}.png`;
    if (skill.type === PetSkillIconType.stat) {
      ePetSkillSelect.appendChild(createImageCheckbox(id, skill.name, "e-pet-skill", url));
    } else if (skill.type === PetSkillIconType.passive) {
      const checkbox = createImageCheckbox(id, skill.name, "pet-passive", url);
      checkbox.classList.add("d-none");
      ePetSkillSelect.appendChild(checkbox);
    } else if (skill.type === PetSkillIconType.active) {
      const checkbox = createImageCheckbox(id, skill.name, "pet-active", url);
      checkbox.classList.add("d-none");
      ePetSkillSelect.appendChild(checkbox);
    }
  });
  petLevel.onchange = () => {
    petLevel.value = Utils.clamp(petLevel.value, petLevel.min, petLevel.max);
    ePetSkillSelect.querySelectorAll("input[name='pet-passive']").forEach(input => {
      if (petLevel.value < 15) {
        input.checked = false;
        input.parentElement.classList.add("d-none");
        ePetSkillSelect.onchange();
      } else {
        input.parentElement.classList.remove("d-none");
      }
    });
    ePetSkillSelect.querySelectorAll("input[name='pet-active']").forEach(input => {
      if (petLevel.value < 21) {
        input.checked = false;
        input.parentElement.classList.add("d-none");
        ePetSkillSelect.onchange();
      } else {
        input.parentElement.classList.remove("d-none");
      }
    });
  }
}

function initGears() {
  const gearComponents = document.getElementById("gear-components");
  Object.values(GearType).forEach(gearType => {
    const gearOptions = Object.values(GEAR)
      .filter(gear => gear.type === gearType.name)
      .map(gear => {
        const option = document.createElement("option");
        option.value = gear.name;
        option.textContent = gear.name;
        if (gear.type === GearType.weapon.name) {
          option.classList.add("d-none");
          option.setAttribute("disabled", "");
        };
        return option;
      });
    const gearComponent = createGearComponent(gearType, gearOptions);
    gearComponent.onchange = () => updateGearComponent(gearComponent);
    gearComponents.appendChild(gearComponent);
  });
}

function initPhy() {
  const phySkillSelect = document.getElementById("phy-skill-select");
  Object.values(SKILL).forEach(skill => {
    if (skill.name === SKILL.normal.name) return;
    phySkillSelect.appendChild(createImageRadio(`phy-skill${skill.iconId}`, skill.name, "phy-skill", `img/skillIcon/skillIcon${skill.iconId}.png`));
  });
  const phyLevel = document.getElementById("phy-level");
  document.getElementById("phy-max").onclick = () => {
    phyLevel.value = 20;
    document.querySelectorAll(".glyph-level").forEach(x => x.value = 6);
    updatePhyStats();
  }
  document.querySelectorAll(".glyph-select").forEach(select =>
    Object.values(GlyphStat).forEach(stat => {
      const option = document.createElement("option");
      option.value = stat;
      option.textContent = stat;
      select.appendChild(option);
    }));
  document.getElementById("phy-tab").onchange = () => updatePhyStats();
}

function initNexus() {
  const nexusSoulSelect = document.querySelectorAll(".nexus-soul-select");
  nexusSoulSelect.forEach(select =>
    Object.values(NEXUS_STATS).forEach(nexusStat => {
      const option = document.createElement("option");
      option.value = nexusStat.name;
      option.textContent = nexusStat.name;
      select.appendChild(option);
    }));
  document.getElementById("nexus-tab").onchange = () => updateNexus();
}

function initAltar() {
  document.getElementById("altar-max").onclick = () => {
    document.getElementById("altar-tab")
      .querySelectorAll("input[type='number']")
      .forEach(x => x.value = x.max);
  }
  document.getElementById("altar-tab")
    .querySelectorAll("input[type='number']")
    .forEach(x => x.onchange = () => x.value = Utils.clamp(x.value, x.min, x.max));
}

function initTotem() {
  const totemSelect = document.getElementById("totem-select");
  Object.values(TOTEM).forEach(totem => {
    totemSelect.appendChild(createImageRadio(`totem${totem.iconId}`, totem.name, "totem", `img/totems/tuten${totem.iconId}.png`))
  });
  document.getElementById("totem-max").onclick = () => {
    document.getElementById("totem-tab")
      .querySelectorAll("input[type='number']")
      .forEach(x => x.value = x.max);
  }
  document.getElementById("totem-tab")
    .querySelectorAll("input[type='number']")
    .forEach(x => x.onchange = () => x.value = Utils.clamp(x.value, x.min, x.max));
}

function initArena() {
  const arenaSelect = document.getElementById("arena-select");
  arenaSelect.onchange = () => {
    const title = Object.values(ARENA_TITLE)
      .find(x => x.name === arenaSelect.value);
    document.getElementById("arena-info").innerHTML = `HP +${title.stats.hpPercent}%<br>HIT +${title.stats.hit}`;
  }
  Object.values(ARENA_TITLE).forEach(title => {
    const option = document.createElement("option");
    option.value = title.name;
    option.textContent = title.name;
    arenaSelect.appendChild(option);
  });
  arenaSelect.onchange();
  document.getElementById("arena-max").onclick = () => {
    arenaSelect.value = ARENA_TITLE.grandMaster2.name;
    arenaSelect.onchange();
  }
}

function initSkills() {
  const skillSelect = document.getElementById("skill-select");
  setOnchangeLimitCheckbox(skillSelect, 6);
  Object.values(SKILL).forEach(skill => {
    if (skill.name === SKILL.normal.name) return;
    skillSelect.appendChild(createImageCheckbox(`skill${skill.iconId}`, skill.name, "skill", `img/skillIcon/skillIcon${skill.iconId}.png`));
  });

  const proSelect = document.getElementById("pro-select");
  const resSelect = document.getElementById("res-select");
  setOnchangeLimitCheckbox(proSelect, 9);
  setOnchangeLimitCheckbox(resSelect, 2);
  Object.values(SkillType).forEach(skill => {
    proSelect.appendChild(createImageCheckbox(`pro-${skill.iconId}`, skill.name, "pro", `img/skillSet/skillSet${skill.iconId}.png`));
    resSelect.appendChild(createImageCheckbox(`res-${skill.iconId}`, skill.name, "res", `img/skillSet/skillSet${skill.iconId}.png`));
  });
}

function createGearComponent(gearType, gearOptions) {
  const html = `<div id="gear-${gearType.name}" class="col gear-component mb-3">
    <div class="row">
      <div class="col">
        <select id="gear-${gearType.name}-select" class="form-select">
          <option value="None">-</option>
          ${gearOptions.map(option => option.outerHTML).join("")}
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-auto">
        <img id="gear-${gearType.name}-icon" class="item-frame" src="img/itemPlaceholder/icon${gearType.iconId}.png">
      </div>
      <div class="col">
        <div class="input-group">
          <label class="input-group-text" for="gear-${gearType.name}-enhance">+</label>
          <input type="number" id="gear-${gearType.name}-enhance" class="form-control" value="10" min="0" max="10">
        </div>
      </div>
    </div>
    ${createGearStats()}
    ${createGemSlots(gearType)}
  </div>`;
  return stringToHTML(html);
}

function createGearStats() {
  const parent = stringToHTML(`<div class="row row-cols-1 gear-stat-select d-none"></div>`);
  for (let i = 0; i < 4; ++i) {
    const html = stringToHTML(`<div class="col">
      <div class="input-group gear-stat-group">
        <select class="form-select stat-select">
          <option value="None">-</option>
          ${createGearStatOptions()}
        </select>
        <input type="number" class="form-control stat-value" value="0" min="0">
        <button class="btn btn-outline-secondary stat-max">(Max)</button>
      </div>
    </div>`);
    if (i === 3) {
      html.querySelectorAll(".gear-stat-group>*").forEach(x => x.classList.add("pink"));
    }
    parent.appendChild(html);
  }
  return parent.outerHTML;
}

function createGemSlots(gearType) {
  const parent = stringToHTML(`<div class="row row-cols-1 gear-gem-select d-none"></div>`);
  if (gearType.name === GearType.weapon.name) {
    for (let i = 0; i < 3; ++i) {
      parent.appendChild(createGemSlot(GemType.normal));
    }
  } else {
    parent.appendChild(createGemSlot(GemType.normal));
    parent.appendChild(createGemSlot(GemType.fusion));
  }
  return parent.outerHTML;
}

function createGearStatOptions() {
  const options = Object.values(BuildStat)
    .filter(stat => stat !== BuildStat.furyReversion)
    .map(stat => {
      const option = document.createElement("option");
      option.value = stat;
      option.textContent = stat;
      return option.outerHTML;
    });
  return options.join("");
}

function createGemSlot(gemType) {
  const options = Object.values(GEM).filter(gem => gem.type === gemType).map(gem => {
    const option = document.createElement("option");
    option.value = gem.name;
    option.textContent = gem.name;
    return option.outerHTML;
  });
  return stringToHTML(`<div class="col">
    <div class="input-group gem-group">
      <select class="form-select gem-select">
        <option value="None">-</option>
        ${options.join("")}
      </select>
      <span class="input-group-text">+</span>
      <input type="number" class="form-control gem-level" value="9" min="0" max="9">
    </div>
  </div>`);
}

function updateGearComponent(component) {
  const id = component.id;
  const componentGearType = Object.values(GearType).find(x => x.name === id.split("-")[1]);
  const gearSelect = document.getElementById(`${id}-select`);
  const image = document.getElementById(`${id}-icon`);
  if (gearSelect.value === "None") {
    image.src = `img/itemPlaceholder/icon${componentGearType.iconId}.png`;
    component.querySelector(".gear-stat-select").classList.add("d-none");
    component.querySelector(".gear-gem-select").classList.add("d-none");
  } else {
    const gear = getGear(gearSelect.value);
    image.src = `img/equipIcon/equ_icon_${gear.iconId}.png`;
    component.querySelector(".gear-stat-select").classList.remove("d-none");
    component.querySelector(".gear-gem-select").classList.remove("d-none");

    // for each stat selected, update max value based on the gear, update max button
    component.querySelectorAll(".gear-stat-group").forEach(group => {
      const stat = group.querySelector(".stat-select").value;
      const statValue = group.querySelector(".stat-value");
      const maxButton = group.querySelector(".stat-max");
      if (stat === "None") return;
      const maxStatValue = getMaxStatValue(gear, stat, statValue.classList.contains("pink"));
      statValue.max = maxStatValue;
      statValue.value = Utils.clamp(statValue.value, statValue.min, statValue.max);
      maxButton.textContent = `(Max ${maxStatValue})`;
      maxButton.onclick = () => statValue.value = maxStatValue;
    });
    component.querySelectorAll(".gem-level").forEach(gemLevel => {
      gemLevel.max = Math.floor(gear.level / 10);
      gemLevel.value = Utils.clamp(gemLevel.value, gemLevel.min, gemLevel.max);
    });
  }
  // hide stats that have already been selected
  const selectedStats = [...component.querySelectorAll(".stat-select")].map(x => x.value);
  component.querySelectorAll(".stat-select>option").forEach(option => {
    if (selectedStats.includes(option.value)) {
      option.classList.add("d-none");
      option.setAttribute("disabled", "");
    } else {
      option.classList.remove("d-none");
      option.removeAttribute("disabled");
    }
  });
  // for weapon, filter by fighter weapon type
  if (componentGearType.name === GearType.weapon.name) {
    const selectedFighter = Object.values(FIGHTER)
      .find(x => x.name === document.getElementById("fighter-select").value);
    if (gearSelect.value !== "None") {
      const gear = getGear(gearSelect.value);
      if (gear.weaponType !== selectedFighter?.weaponType) {
        gearSelect.value = "None";
        updateGearComponent(component);
      }
    }
    gearSelect.querySelectorAll("option").forEach(option => {
      if (option.value === "None") return;
      if (selectedFighter?.weaponType === getGear(option.value).weaponType) {
        option.classList.remove("d-none");
        option.removeAttribute("disabled");
      } else {
        option.classList.add("d-none");
        option.setAttribute("disabled", "");
      }
    });
  }
}

function getGear(name) {
  return Object.values(GEAR).find(x => x.name === name);
}

function getMaxStatValue(gear, stat, purple) {
  let maxValues;
  if (purple) {
    if (gear.level >= 96) {
      maxValues = GEAR_MAX_VALUES.purple96;
    } else if (gear.level >= 91) {
      maxValues = GEAR_MAX_VALUES.purple91;
    } else if (gear.level >= 86) {
      maxValues = GEAR_MAX_VALUES.purple86;
    } else if (gear.level >= 81) {
      maxValues = GEAR_MAX_VALUES.purple81;
    }
  } else {
    if (gear.level >= 96) {
      maxValues = GEAR_MAX_VALUES.white96;
    } else if (gear.level >= 91) {
      maxValues = GEAR_MAX_VALUES.white91;
    } else if (gear.level >= 86) {
      maxValues = GEAR_MAX_VALUES.white86;
    } else if (gear.level >= 81) {
      maxValues = GEAR_MAX_VALUES.white81;
    }
  }
  if (!maxValues) {
    console.log(`Error getting max stat value of ${stat} ${gear.name}`);
    return 0;
  }
  const buildStat = Object.entries(BuildStat).find(entry => entry[1] === stat);
  return maxValues[buildStat[0]];
}

function updatePhyStats() {
  const selectedStatCount = { STR: 0, DEX: 0, STA: 0 }
  document.querySelectorAll(".phy-stat-select").forEach(select => {
    if (select.value !== "None") {
      selectedStatCount[select.value] += 1;
    }
  });
  document.querySelectorAll(".phy-stat-select>option").forEach(option => {
    if (selectedStatCount[option.value] >= 2) {
      option.classList.add("d-none");
      option.setAttribute("disabled", "");
    } else {
      option.classList.remove("d-none");
      option.removeAttribute("disabled");
    }
  });
  const phyLevel = document.getElementById("phy-level").value;
  const bmvStat = Phylactery.initialBMV + Phylactery.bmvStats[phyLevel];
  document.querySelectorAll(".phy-stat-amount").forEach(x => x.textContent = bmvStat);

  const selectedglyphs = [...document.querySelectorAll(".glyph-select")]
    .filter(select => select.value !== "None")
    .map(select => select.value);
  document.querySelectorAll(".glyph-select>option").forEach(option => {
    if (selectedglyphs.includes(option.value)) {
      option.classList.add("d-none");
      option.setAttribute("disabled", "");
    } else {
      option.classList.remove("d-none");
      option.removeAttribute("disabled");
    }
  });
  document.querySelectorAll(".phy-glyph-group").forEach(group => {
    if (group.querySelector(".glyph-select").value === "None") {
      group.querySelector(".glyph-stat-amount").textContent = "";
      return;
    }
    let bonusStatMultiplier = 0;
    if (phyLevel >= 18) bonusStatMultiplier = 1.2;
    else if (phyLevel >= 14) bonusStatMultiplier = 0.8;
    else if (phyLevel >= 8) bonusStatMultiplier = 0.4;
    const glyphLevel = group.querySelector(".glyph-level");
    const glyphStat = glyphLevel.value * 4;
    group.querySelector(".glyph-stat-amount").textContent = `+${glyphStat} (+${Math.floor(glyphStat * bonusStatMultiplier)})`;
  });
}

function updateNexus() {
  const selectedSouls = [...document.querySelectorAll(".nexus-soul-select")]
    .filter(select => select.value !== "None")
    .map(select => select.value);
  document.querySelectorAll(".nexus-soul-select>option").forEach(option => {
    if (selectedSouls.includes(option.value)) {
      option.classList.add("d-none");
      option.setAttribute("disabled", "");
    } else {
      option.classList.remove("d-none");
      option.removeAttribute("disabled");
    }
  });
  document.querySelectorAll(".nexus-stat-group").forEach(group => {
    const soulstat = group.querySelector(".nexus-soul-select").value;
    if (soulstat === "None") return;
    const soulLevel = group.querySelector(".nexus-soul-level");
    soulLevel.value = Utils.clamp(soulLevel.value, soulLevel.min, soulLevel.max);
    group.querySelector(".soul-stat-amount").textContent = Math.ceil(calculateNexusStat(soulstat, soulLevel.value));
  });
}

function calculateNexusStat(stat, level) {
  const nexusStat = Object.values(NEXUS_STATS).find(x => x.name === stat);
  if (level == 1) {
    return nexusStat.startingAmount;
  } else if (level <= 7) {
    return nexusStat.amountPerLevel + calculateNexusStat(stat, level - 1);
  } else {
    return nexusStat.amountPerLevelAfter7 + calculateNexusStat(stat, level - 1);
  }
}

function createImageCheckbox(id, value, name, src) {
  return stringToHTML(`<div class="image-checkbox">
  <input id="${id}" class="form-check-input" type="checkbox" name="${name}" data-value="${value}">
  <label class="form-check-label" for="${id}" title="${value}"><img src="${src}"></label>
</div>`);
}

function createImageRadio(id, value, name, src) {
  return stringToHTML(`<div class="image-checkbox">
  <input id="${id}" class="form-check-input" type="radio" name="${name}" data-value="${value}">
  <label class="form-check-label" for="${id}" title="${value}"><img src="${src}"></label>
</div>`);
}

function stringToHTML(string) {
  const template = document.createElement("template");
  template.innerHTML = string;
  return template.content.firstChild;
}

function setOnchangeLimitCheckbox(containerElement, limit) {
  containerElement.onchange = () => limitCheckbox(containerElement.querySelectorAll("input"), limit);
}

function limitCheckbox(checkboxes, limit) {
  const selected = [...checkboxes].filter(x => x.checked);
  const notSelected = [...checkboxes].filter(x => !x.checked);
  if (selected.length >= limit) {
    notSelected.forEach(x => x.disabled = true);
  } else {
    checkboxes.forEach(x => x.disabled = false);
  }
}

function getValuesFromCheckbox(name) {
  return [...document.querySelectorAll(`input[name="${name}"]`)]
    .filter(x => x.checked)
    .map(x => x.dataset.value);
}
