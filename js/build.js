import { calculateFighterStats } from "./calculator.js";
import CFDB from "./data/CFDB.js";
import ArenaTitle from "./data/arena.js";
import { FighterSkillType, GearType, PetSkillType, SkillType } from "./data/categories.js";
import FighterSkills from "./data/fighterSkills.js";
import Fighters from "./data/fighters.js";
import { Gears } from "./data/gears.js";
import Gems from "./data/gems.js";
import PetSkills from "./data/petSkills.js";
import Pets from "./data/pets.js";
import Skills from "./data/skills.js";
import Stats from "./data/stats.js";
import Totems from "./data/totems.js";
import { maxAltar, maxTotemStats } from "./templates.js";
import Utils from "./utils.js";

const getStr = weights => weights[0];
const getDex = weights => weights[1];
const getSta = weights => weights[2];
const getHp = weights => weights[3];
const getSp = weights => weights[4];
const getSpd = weights => weights[5];
const getAtk = weights => weights[6];
const getHit = weights => weights[7];
const getEva = weights => weights[8];
const getBrk = weights => weights[9];
const getDef = weights => weights[10];
const getCrt = weights => weights[11];
const getRes = weights => weights[12];
const getElement = weights => CFDB.getSkillTypes()[Math.floor(weights[13] * 10)].name;

// str, dex, sta, hp, sp, spd, atk, hit, eva, brk, def, crt, res, element
export function randomBuild(weights) {
  if (!weights) weights = Array(14).fill().map(() => Math.random());
  console.log(weights)
  console.log(getElement(weights))
  const fighter = randomFighter(weights);
  const pet = Utils.randomElement(CFDB.getPets()); // todo score from weights
  const skillSet = randomSkillset(weights).map(x => x.name);
  const build = {
    name: crypto.randomUUID().substring(0, 13),
    level: 100,
    fighter: {
      name: fighter.name,
      plus: 21,
      evolved: true,
      potentials: {
        str: 360,
        dex: 360,
        sta: 360
      },
      stats: Utils.randomElements(CFDB.getFighterSkills(FighterSkillType.stat), 3).map(x => x.name), // todo
      resets: Utils.randomElements(CFDB.getFighterResetSkills(), 2).map(x => x.name), // todo try to pick skills from skillset
      healing: Utils.randomElement(CFDB.getFighterHealingSkills()).name // todo omit fs/ca if dont have the skill
    },
    pet: {
      name: pet.name,
      plus: 21,
      evolved: true,
      skills: randomPetSkills(pet), // todo
      evoSkills: randomEvoPetSkills(), // todo
    },
    gears: CFDB.getGearTypes().map(gearType => randomGear(gearType.name, fighter, weights)),
    phylactery: {
      plus: 20,
      skill: skillSet.pop(),
      stats: Utils.randomElements([Stats.str, Stats.str, Stats.dex, Stats.dex, Stats.sta, Stats.sta], 3).map(x => x.displayName), // todo 2 of highest 1 of 2nd highest
      glyphs: randomGlyphs(weights)
    },
    nexus: randomNexus(weights),
    altar: maxAltar,
    totem: {
      name: Totems.white.name,
      level: 64,
      stats: maxTotemStats
    },
    skills: skillSet,
    expertise: Utils.randomElements(CFDB.getSkillTypes(), 9).map(x => x.name), // todo cover all skills from skillset
    resistance: Utils.randomElements(CFDB.getSkillTypes(), 2).map(x => x.name),
    arenaTitle: ArenaTitle.grandMaster2.name
  }
  return build;
}

function randomFighter(weights) {
  const fighters = CFDB.getFighters().filter(fighter => fighter !== Fighters.ironMan && fighter !== Fighters.ainu);
  const scores = fighters.map(fighter => scoreFighter(fighter, weights));

  // give extra score to higher placed fighters and pick from top 10
  let fighterScoreMap = fighters.map((fighter, i) => ({ fighter: fighter.name, score: scores[i] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((x, i) => ({ fighter: x.fighter, score: x.score * (10 - i) }));
  const sum = Utils.sum(fighterScoreMap.map(x => x.score));
  fighterScoreMap = fighterScoreMap.map(x => ({ fighter: x.fighter, score: x.score * 100 / sum }));
  console.log("Fighter:", fighterScoreMap);
  const randomFighter = fighterScoreMap[Utils.randomWeightedIndex(fighterScoreMap.map(x => x.score))];
  return fighters[fighters.findIndex(fighter => fighter.name === randomFighter.fighter)];
}

function scoreFighter(fighter, weights) {
  let score = 0;
  const fighterStats = calculateFighterStats(fighter.name, 34);
  score += (fighterStats.str * 0.5 / fighter.bmv[0] + scoreBmv(fighter.bmv[0]) * 50) * getStr(weights);
  score += (fighterStats.dex * 0.5 / fighter.bmv[1] + scoreBmv(fighter.bmv[1]) * 50) * getDex(weights);
  score += (fighterStats.sta * 0.5 / fighter.bmv[2] + scoreBmv(fighter.bmv[2]) * 50) * getSta(weights);
  if (fighter.mastery === getElement(weights)) {
    score *= 1.25;
  }
  return score;
}

function scoreBmv(bmv) {
  return 1 / (bmv - 5);
}

function randomPetSkills(pet) {
  const eligiblePetSkills = [...CFDB.getPetSkills(PetSkillType.stat).filter(x => typeof x.iconId === "number"), CFDB.getPetSkillByIconId(`27_${pet.iconId}`)];
  return [PetSkills.block, CFDB.getPetSkillByIconId(`28_${pet.iconId}`), ...Utils.randomElements(eligiblePetSkills, 10)].map(x => x.name);
}

function randomEvoPetSkills() {
  const pickPassive = Utils.testProbability(0.8);
  const pickActive = Utils.testProbability(0.8);
  const stats = Utils.randomElements(CFDB.getPetSkills(PetSkillType.evolvedStat), 4 + pickActive + pickPassive);
  if (pickPassive) stats.push(Utils.randomElement(CFDB.getPetPassives()));
  if (pickActive) stats.push(Utils.randomElement(CFDB.getPetActives()));
  return stats.map(x => x.name);
}

function randomSkillset(weights) {
  const skills = CFDB.getSkills()
    .filter(skill => skill.name !== "Normal Attack");
  const element = getElement(weights);
  const elementBoost = 6;
  const scores = skills.map(skill => (skill.type === element ? 100 * elementBoost : 100) / (36 + 4 * elementBoost));
  return Utils.randomWeightedIndices(scores, 7).map(index => skills[index]);
}

function randomGear(gearType, fighter, weights) {
  const bmvMap = [
    { stat: Stats.str, bmv: fighter.bmv[0], keyword: "Bloodthirsty" },
    { stat: Stats.dex, bmv: fighter.bmv[1], keyword: "Agile" },
    { stat: Stats.sta, bmv: fighter.bmv[2], keyword: "Callous" }
  ].sort((a, b) => a.bmv - b.bmv);
  const lowestBmv = bmvMap[0].bmv;
  const lowestBmvStat = Utils.randomElement(bmvMap.filter(x => x.bmv === lowestBmv));
  let gearStatMap = [
    { stat: Stats.str, weight: getStr(weights) + getAtk(weights) * 0.5 },
    { stat: Stats.dex, weight: getDex(weights) + (getEva(weights) + getSpd(weights)) * 0.5 },
    { stat: Stats.sta, weight: getSta(weights) + (getSp(weights) + getHp(weights)) * 0.5 },
    { stat: Stats.brk, weight: getBrk(weights) * 2 },
    { stat: Stats.def, weight: getDef(weights) * 2 },
    { stat: Stats.hit, weight: getHit(weights) * 1.5 },
    { stat: Stats.eva, weight: getEva(weights) * 2 },
    { stat: Stats.res, weight: getRes(weights) * 1.3 },
    { stat: Stats.crt, weight: getCrt(weights) * 2 },
    { stat: Stats.hp, weight: getHp(weights) }
  ].sort((a, b) => a.weight - b.weight).map((x, i) => ({ stat: x.stat, weight: x.weight * (i + 1) }));
  const highest = gearStatMap.pop();
  const gear = Utils.randomElement(CFDB.getGears(gearType)
    .filter(gear => gearType === GearType.weapon.name ? gear.weaponType === fighter.weaponType && gear.name.startsWith(`Tyrant ${lowestBmvStat.keyword}`) : true));
  const purpleStat = { [highest.stat.name]: CFDB.getGearMaxValue(gear.level, highest.stat.name, true) };
  gearStatMap = gearStatMap.reverse().slice(0, 6)
  const weightedSum = Utils.sum(gearStatMap.map(x => x.weight));
  const weightedStatMap = gearStatMap.map(x => ({ stat: x.stat.name, weight: x.weight * 100 / weightedSum }));
  console.log("Gear white stats:", weightedStatMap);
  const whiteStats = Utils.randomWeightedIndices(weightedStatMap.map(x => x.weight), 3)
    .map(i => ({ [weightedStatMap[i].stat]: CFDB.getGearMaxValue(gear.level, weightedStatMap[i].stat, false) }));
  return {
    name: gear.name,
    enhancement: 10,
    stats: [...whiteStats, purpleStat],
    gems: randomGems(gear, weights)
  };
}

function randomGems(gear, weights) {
  const normalGemMap = [
    { gem: Gems.ruby, weight: getStr(weights) },
    { gem: Gems.sapphire, weight: getDex(weights) },
    { gem: Gems.topaz, weight: getSta(weights) }
  ].sort((a, b) => a.weight - b.weight);
  const normalGems = normalGemMap.flatMap((weight, i) => Array(i * 2 + 1).fill().map(() => weight.gem));
  const fusionGemMap = [
    { gem: Gems.amethyst, weight: getStr(weights) + getDex(weights) },
    { gem: Gems.garnet, weight: getStr(weights) + getSta(weights) },
    { gem: Gems.emerald, weight: getDex(weights) + getSta(weights) }
  ].sort((a, b) => a.weight - b.weight);
  const fusionGems = fusionGemMap.flatMap((weight, i) => Array(i * 2 + 1).fill().map(() => weight.gem));
  const gemMaxLevel = CFDB.getGemMaxLevel(gear);
  if (gear.type === GearType.weapon.name) {
    return Array(3).fill().map(() => ({ name: Utils.randomElement(normalGems).name, plus: gemMaxLevel }));
  }
  return [
    { name: Utils.randomElement(normalGems).name, plus: gemMaxLevel },
    { name: Utils.randomElement(fusionGems).name, plus: gemMaxLevel }
  ];
}

function randomNexus(weights) {
  const nexusStatMap = [
    { stat: Stats.str.displayName, weight: getStr(weights) },
    { stat: Stats.dex.displayName, weight: (getDex(weights) + getEva(weights)) / 2 },
    { stat: Stats.sta.displayName, weight: getSta(weights) + getSp(weights) / 2 },
    { stat: Stats.hp.displayName, weight: getHp(weights) },
    { stat: Stats.sp.displayName, weight: getSp(weights) },
    { stat: Stats.spd.displayName, weight: getSpd(weights) },
    { stat: Stats.maxAtk.displayName, weight: getAtk(weights) },
    { stat: Stats.minAtk.displayName, weight: getAtk(weights) * 0.8 },
    { stat: Stats.brk.displayName, weight: getBrk(weights) },
    { stat: Stats.def.displayName, weight: getDef(weights) },
    { stat: Stats.hit.displayName, weight: getHit(weights) },
    { stat: Stats.eva.displayName, weight: getEva(weights) },
    { stat: Stats.crt.displayName, weight: getCrt(weights) },
    { stat: Stats.res.displayName, weight: getRes(weights) }
  ].sort((a, b) => a.weight - b.weight).map((x, i) => ({ stat: x.stat, weight: x.weight * (i + 1) }));
  const weightedSum = Utils.sum(nexusStatMap.map(x => x.weight));
  const weightedStatMap = nexusStatMap.map(x => ({ stat: x.stat, weight: x.weight * 100 / weightedSum }));
  console.log("Nexus:", weightedStatMap);
  return Utils.randomWeightedIndices(weightedStatMap.map(x => x.weight), 8)
    .map(i => ({ stat: weightedStatMap[i].stat, level: 12 }));
}

function randomGlyphs(weights) {
  const glyphStatMap = [
    { stat: Stats.hit, weight: getHit(weights) },
    { stat: Stats.eva, weight: getEva(weights) },
    { stat: Stats.brk, weight: getBrk(weights) },
    { stat: Stats.def, weight: getDef(weights) },
    { stat: Stats.crt, weight: getCrt(weights) },
    { stat: Stats.res, weight: getRes(weights) }
  ].sort((a, b) => b.weight - a.weight).slice(0.4);
  return glyphStatMap.map(x => ({ stat: x.stat.displayName, plus: 6 }));
}
