import ArenaTitles from "./arena.js";
import { FighterSkillType, GearType, GemType, PetSkillType, SkillType } from "./categories.js";
import Fighters from "./fighters.js";
import FighterSkills from "./fighterSkills.js";
import { GearMaxValues, Gears, GearSuits } from "./gears.js";
import Gems from "./gems.js";
import Glyphs from "./glyph.js";
import Nexus from "./nexus.js";
import Pets from "./pets.js";
import PetSkills from "./petSkills.js";
import Phylactery from "./phylactery.js";
import Skills from "./skills.js";
import StarAltar from "./starAltar.js";
import Stats from "./stats.js";
import Status from "./status.js";
import Totems from "./totems.js";

const CFDB = {};

CFDB.getFighters = () => Object.values(Fighters);
CFDB.getFighter = name => CFDB.getFighters().find(fighter => fighter.name === name);

CFDB.getPets = () => Object.values(Pets);
CFDB.getPet = name => CFDB.getPets().find(pet => pet.name === name);

CFDB.getSkills = () => Object.values(Skills);
CFDB.getSkill = name => CFDB.getSkills().find(skill => skill.name === name);

CFDB.getSkillTypes = () => Object.values(SkillType);
CFDB.getSkillType = name => CFDB.getSkillTypes().find(type => type.name === name);

CFDB.getStatusEffects = () => Object.values(Status);
CFDB.getStatusEffect = name => CFDB.getStatusEffects().find(status => status.name === name);

CFDB.getStats = () => Object.values(Stats);
CFDB.getStatFromName = name => CFDB.getStats().find(stat => stat.name === name);
CFDB.getStatFromDisplayName = name => CFDB.getStats().find(stat => stat.displayName === name);

CFDB.getFighterSkills = type => type ? Object.values(FighterSkills).filter(skill => skill.type === type) : Object.values(FighterSkills);
CFDB.getFighterSkill = name => CFDB.getFighterSkills().find(skill => skill.name === name);
CFDB.getFighterHealingSkills = () => CFDB.getFighterSkills(FighterSkillType.healing);
CFDB.getFighterResetSkills = () => CFDB.getFighterSkills(FighterSkillType.reset);
CFDB.getFighterCombatSkills = () => [...CFDB.getFighterHealingSkills(), ...CFDB.getFighterResetSkills()];

CFDB.getPetSkills = type => type ? Object.values(PetSkills).filter(skill => skill.type === type) : Object.values(PetSkills);
CFDB.getPetSkill = name => CFDB.getPetSkills().find(skill => skill.name === name);
CFDB.getPetSkillByIconId = id => CFDB.getPetSkills().find(skill => skill.iconId === id);
CFDB.getPetPassives = () => CFDB.getPetSkills(PetSkillType.passive);
CFDB.getPetActives = () => CFDB.getPetSkills(PetSkillType.active);
CFDB.getPetCombatSkills = () => [...CFDB.getPetSkills(PetSkillType.skill), ...CFDB.getPetActives(), ...CFDB.getPetPassives()];

CFDB.getGearTypes = () => Object.values(GearType);
CFDB.getGearType = name => CFDB.getGearTypes().find(gearType => gearType.name === name);
CFDB.getGears = type => type ? Object.values(Gears).filter(gear => gear.type === type) : Object.values(Gears);
CFDB.getGear = name => CFDB.getGears().find(gear => gear.name === name);
CFDB.getGearStats = () => CFDB.getStats().filter(stat => stat !== Stats.furyReversion);
CFDB.getGearMaxValue = (level, stat, purple = false) => {
  if (purple) {
    if (level >= 96) return GearMaxValues.purple96[stat];
    if (level >= 91) return GearMaxValues.purple91[stat];
    if (level >= 86) return GearMaxValues.purple86[stat];
    if (level >= 81) return GearMaxValues.purple81[stat];
  } else {
    if (level >= 96) return GearMaxValues.white96[stat];
    if (level >= 91) return GearMaxValues.white91[stat];
    if (level >= 86) return GearMaxValues.white86[stat];
    if (level >= 81) return GearMaxValues.white81[stat];
  }
  console.error(`Couldn't find max value for ${level} ${stat}`);
  return 0;
}

CFDB.getGearSuitBonus = () => Object.values(GearSuits);

CFDB.getGems = () => Object.values(Gems);
CFDB.getGem = name => CFDB.getGems().find(gem => gem.name === name);
CFDB.getNormalGems = () => CFDB.getGems().filter(gem => gem.type === GemType.normal);
CFDB.getFusionGems = () => CFDB.getGems().filter(gem => gem.type === GemType.fusion);
CFDB.getGemMaxLevel = gear => Math.floor((gear.level - 1) / 10);

CFDB.getTotems = () => Object.values(Totems);
CFDB.getTotem = name => CFDB.getTotems().find(totem => totem.name === name);
CFDB.getTotemPetAttacks = () => [Totems.purple, Totems.blue, Totems.green, Totems.orange, Totems.red];

CFDB.getPhylactery = type => Object.values(Phylactery).find(phy => phy.type === type);
CFDB.getPhylacteryExtraTriggerPercent = level => {
  let extraTriggerPercent = 0;
  if (level >= 12) extraTriggerPercent += 1;
  if (level >= 16) extraTriggerPercent += 1;
  if (level >= 20) extraTriggerPercent += 1;
  return extraTriggerPercent;
}
CFDB.getPhylacteryInfo = (type, plus) => {
  const phy = CFDB.getPhylactery(type);
  const bmvAmount = phy.initialBmv + phy.bmvPerPlus[plus];
  const stats = {};
  stats.furyReversion = phy.initialFuryReversion + plus;
  let glyphMultiplier = 1;
  if (plus >= 2) stats.maxAtk = phy.maxAtk;
  if (plus >= 4) stats.minAtk = phy.minAtk;
  if (plus >= 6) stats.hp = phy.hp;
  if (plus >= 8) glyphMultiplier += 0.4;
  if (plus >= 14) glyphMultiplier += 0.4;
  if (plus >= 18) glyphMultiplier += 0.4;
  return { bmvAmount, glyphMultiplier, stats };
}

CFDB.getGlyphs = () => Object.values(Glyphs);
CFDB.getGlyph = name => CFDB.getGlyphs().find(glyph => glyph.name === name);

CFDB.getNexusStats = () => Object.values(Nexus);
CFDB.getNexusStat = name => CFDB.getNexusStats().find(stat => stat.name === name);
CFDB.calculateNexusStat = (stat, level) => {
  return Math.ceil(CFDB.calculateNexusStatRecursive(stat, level));
}
CFDB.calculateNexusStatRecursive = (stat, level) => {
  const nexusStat = CFDB.getNexusStat(stat);
  if (level == 1) return nexusStat.startingAmount;
  else if (level <= 7) return nexusStat.amountPerLevel + CFDB.calculateNexusStatRecursive(stat, level - 1);
  else return nexusStat.amountPerLevelAfter7 + CFDB.calculateNexusStatRecursive(stat, level - 1);
}

CFDB.getStarAltar = () => Object.values(StarAltar);

CFDB.getArenaTitles = () => Object.values(ArenaTitles);
CFDB.getArenaTitle = name => CFDB.getArenaTitles().find(title => title.name === name);

export default CFDB;
