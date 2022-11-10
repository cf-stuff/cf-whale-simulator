import ArenaTitles from "./arena.js";
import { FighterSkillType, GearType, GemType, PetSkillType, SkillType } from "./categories.js";
import Fighters from "./fighters.js";
import FighterSkills from "./fighterSkills.js";
import { GearMaxValues, Gears } from "./gears.js";
import Gems from "./gems.js";
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
CFDB.getPetCombatSkills = () => [...CFDB.getPetActives(), ...CFDB.getPetPassives(), ...CFDB.getPetSkills(PetSkillType.skill)];

CFDB.getGearTypes = () => Object.values(GearType);
CFDB.getGearType = name => CFDB.getGearTypes().find(gearType => gearType.name === name);
CFDB.getGears = () => Object.values(Gears);
CFDB.getGear = name => CFDB.getGears().find(gear => gear.name === name);
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

CFDB.getNormalGems = () => Object.values(Gems).filter(gem => gem.type === GemType.normal);
CFDB.getFusionGems = () => Object.values(Gems).filter(gem => gem.type === GemType.fusion);

CFDB.getTotems = () => Object.values(Totems);
CFDB.getTotem = name => CFDB.getTotems().find(totem => totem.name === name);

CFDB.getPhylactery = type => Object.values(Phylactery).find(phy => phy.type === type);

CFDB.getNexusStats = () => Object.values(Nexus);
CFDB.getNexusStat = name => CFDB.getNexusStats().find(stat => stat.name === name);
CFDB.calculateNexusStat = (stat, level) => {
  const nexusStat = CFDB.getNexusStat(stat);
  if (level == 1) return nexusStat.startingAmount;
  else if (level <= 7) return Math.ceil(nexusStat.amountPerLevel + CFDB.calculateNexusStat(stat, level - 1));
  else return Math.ceil(nexusStat.amountPerLevelAfter7 + CFDB.calculateNexusStat(stat, level - 1));
}

CFDB.getStarAltar = () => Object.values(StarAltar);

CFDB.getArenaTitles = () => Object.values(ArenaTitles);
CFDB.getArenaTitle = name => CFDB.getArenaTitles().find(title => title.name === name);

export default CFDB;
