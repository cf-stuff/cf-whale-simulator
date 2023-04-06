import { GearType, PetSkillType } from "./data/categories.js";
import CFDB from "./data/CFDB.js";

const addStat = (stat, value, total) => total[stat] += value;
const addStats = (stats, total) => Object.entries(stats).forEach(([key, value]) => total[key] += value);

export const calculateFighterStats = (fighter, plus) => {
  const fighterInfo = CFDB.getFighter(fighter);
  const str = Math.ceil(fighterInfo.growthRate[0] * plus * 8) + fighterInfo.isv[0];
  const dex = Math.ceil(fighterInfo.growthRate[1] * plus * 8) + fighterInfo.isv[1];
  const sta = Math.ceil(fighterInfo.growthRate[2] * plus * 8) + fighterInfo.isv[2];
  return { str, dex, sta };
}

const toStats = build => {
  const stats = {
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
  if (build.fighter.name === "None") {
    return stats;
  }
  const fighterStats = calculateFighterStats(build.fighter.name, build.fighter.evolved ? 34 : build.fighter.plus);
  addStats(fighterStats, stats);
  if (build.fighter.evolved) {
    addStats(build.fighter.potentials, stats);
    build.fighter.stats.map(stat => CFDB.getFighterSkill(stat))
      .forEach(stat => addStat(CFDB.getStatFromDisplayName(stat.name).name, stat.values[2], stats));
  }
  build.pet.skills.map(skill => CFDB.getPetSkill(skill))
    .filter(skill => skill.type === PetSkillType.stat)
    .forEach(skill => addStats(skill.stat, stats));
  if (build.pet.evolved) {
    build.pet.evoSkills.map(skill => CFDB.getPetSkill(skill))
      .filter(skill => skill.type === PetSkillType.evolvedStat)
      .forEach(skill => addStats(skill.stat, stats));
  }
  build.gears.forEach(gear => {
    const gearInfo = CFDB.getGear(gear.name);
    if (gearInfo.type === GearType.weapon.name) {
      const fighterInfo = CFDB.getFighter(build.fighter.name);
      if (gearInfo.weaponType !== fighterInfo.weaponType) return;
      if (gearInfo.exclusiveStat?.fighter === fighterInfo.name) {
        addStats(gearInfo.exclusiveStat.stat, stats);
      }
    }
    addStats(gearInfo.stats, stats);
    gear.stats.filter(stat => stat).forEach(stat => addStats(stat, stats));
    for (let i = 0; i < gear.enhancement; ++i) {
      addStats(gearInfo.statsPerEnhance, stats);
    }
    gear.gems.forEach(gem => {
      if (!gem) return;
      const gemInfo = CFDB.getGem(gem.name);
      for (let i = 0; i < gem.plus + 1; ++i) {
        addStats(gemInfo.statsPerPlus, stats);
      }
    });
  });
  CFDB.getGearSuitBonus().forEach(suit => {
    let count = build.gears.map(gear => CFDB.getGear(gear.name))
      .filter(gear => gear.type !== GearType.weapon.name && gear.name.includes(suit.name)).length;
    if (count >= 2) addStats(suit.twoPieceBonus, stats);
    if (count >= 4) addStats(suit.fourPieceBonus, stats);
    if (count >= 7) addStats(suit.sevenPieceBonus, stats);
  });
  const phyInfo = CFDB.getPhylacteryInfo("4B", build.phylactery.plus);
  build.phylactery.stats.forEach(stat => stats[CFDB.getStatFromDisplayName(stat).name] += phyInfo.bmvAmount);
  addStats(phyInfo.stats, stats);
  build.phylactery.glyphs.forEach(glyph =>
    stats[CFDB.getStatFromDisplayName(glyph.stat).name] += Math.floor((glyph.plus * 4) * phyInfo.glyphMultiplier));
  build.nexus.forEach(soul => stats[CFDB.getStatFromDisplayName(soul.stat).name] += CFDB.calculateNexusStat(soul.stat, soul.level));
  addStats(build.altar, stats);
  addStats(build.totem.stats, stats);
  addStats(CFDB.getArenaTitle(build.arenaTitle).stats, stats);
  const fighterInfo = CFDB.getFighter(build.fighter.name);
  if (fighterInfo) {
    stats.hp = Math.floor(stats.hp * (1 + (stats.hpPercent + Math.floor(stats.sta / fighterInfo.bmv[2])) / 100));
    stats.sp = Math.floor(stats.sp + stats.sta / fighterInfo.bmv[2] + stats.spPercent);
    stats.minAtk = Math.floor(stats.minAtk * (1 + (stats.atkPercent + stats.str / fighterInfo.bmv[0]) / 100));
    stats.maxAtk = Math.floor(stats.maxAtk * (1 + (stats.atkPercent + stats.str / fighterInfo.bmv[0]) / 100));
    stats.spd = Math.floor(stats.spd + stats.dex / fighterInfo.bmv[1]);
    stats.eva = Math.floor(stats.eva + stats.dex / fighterInfo.bmv[1]);
  }
  if (stats.minAtk > stats.maxAtk) stats.minAtk = stats.maxAtk
  return stats;
}

const toPlayer = build => {
  return {
    name: build.name,
    level: build.level,
    fighter: {
      name: build.fighter.name,
      plus: build.fighter.plus,
      evolved: build.fighter.evolved,
      skills: build.fighter.evolved ? [build.fighter.resets[0], build.fighter.healing, build.fighter.resets[1]].filter(skill => skill) : []
    },
    pet: {
      name: build.pet.name,
      plus: build.pet.plus,
      evolved: build.pet.evolved,
      skills: CFDB.getPetCombatSkills().filter(skill => build.pet.skills.includes(skill.name) || build.pet.evoSkills.includes(skill.name))
        .map(skill => skill.name)
    },
    weapon: build.gears.find(gear => CFDB.getGear(gear.name)?.type === GearType.weapon.name)?.name,
    stats: toStats(build),
    skills: build.skills.filter(skill => skill !== build.phylactery.skill),
    expertise: build.expertise,
    resistance: CFDB.getSkillTypes().filter(skillType => build.resistance.includes(skillType.name)).map(skillType => skillType.name),
    phylactery: {
      skill: build.phylactery.skill,
      extraTriggerPercent: CFDB.getPhylacteryExtraTriggerPercent(build.phylactery.plus)
    },
    totem: {
      name: build.totem.name,
      level: build.totem.level
    }
  }
}

export default toPlayer;
