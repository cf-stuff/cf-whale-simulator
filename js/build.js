import { calculateFighterStats } from "./calculator.js";
import CFDB from "./data/CFDB.js";
import ArenaTitle from "./data/arena.js";
import { FighterSkillType, GearType, PetSkillType, SkillType } from "./data/categories.js";
import FighterSkills from "./data/fighterSkills.js";
import { Gears } from "./data/gears.js";
import Gems from "./data/gems.js";
import PetSkills from "./data/petSkills.js";
import Pets from "./data/pets.js";
import Skills from "./data/skills.js";
import Stats from "./data/stats.js";
import Totems from "./data/totems.js";
import { maxAltar, maxTotemStats } from "./templates.js";
import Utils from "./utils.js";

// hp, sp, spd, atk, hit, eva, brk, def, crt, res, element
export function randomBuild(weights) {
  if (!weights) weights = Array(10).fill().map(() => Math.random());
  const fighter = randomFighter(weights);
  const pet = Utils.randomElement(CFDB.getPets());
  const skillSet = Utils.randomElements(CFDB.getSkills().filter(skill => skill.name !== "Normal Attack"), 7).map(x => x.name);
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
      stats: Utils.randomElements(CFDB.getFighterSkills(FighterSkillType.stat), 3).map(x => x.name),
      resets: Utils.randomElements(CFDB.getFighterResetSkills(), 2).map(x => x.name),
      healing: Utils.randomElement(CFDB.getFighterHealingSkills()).name
    },
    pet: {
      name: pet.name,
      plus: 21,
      evolved: true,
      skills: randomPetSkills(pet),
      evoSkills: randomEvoPetSkills(),
    },
    gears: CFDB.getGearTypes().map(gearType => randomGear(gearType.name, fighter)),
    phylactery: {
      plus: 20,
      skill: skillSet.pop(),
      stats: Utils.randomElements([Stats.str, Stats.str, Stats.dex, Stats.dex, Stats.sta, Stats.sta], 3).map(x => x.displayName),
      glyphs: Utils.randomElements(CFDB.getGlyphs(), 4).map(x => ({ stat: x.name, plus: 6 }))
    },
    nexus: Utils.randomElements(CFDB.getNexusStats(), 8).map(x => ({ stat: x.name, level: 12 })),
    altar: maxAltar,
    totem: {
      name: Utils.randomElement(CFDB.getTotems()).name,
      level: 64,
      stats: maxTotemStats
    },
    skills: skillSet,
    expertise: Utils.randomElements(CFDB.getSkillTypes(), 9).map(x => x.name),
    resistance: Utils.randomElements(CFDB.getSkillTypes(), 2).map(x => x.name),
    arenaTitle: ArenaTitle.grandMaster2.name
  }
  return build;
}

function randomFighter(weights) {
  const fighters = CFDB.getFighters();
  const scores = fighters.map(fighter => scoreFighter(fighter, weights));
  const sum = Utils.sum(scores);
  const normalisedScores = scores.map(score => score * 100 / sum);
  return fighters[Utils.randomWeightedIndex(normalisedScores)];
}

function scoreFighter(fighter, weights) {
  let score = 0;
  const fighterStats = calculateFighterStats(fighter.name, 34);
  score += (fighterStats.str * 0.5 / fighter.bmv[0] + scoreBmv(fighter.bmv[0]) * 50) * weights[3];
  score += (fighterStats.dex * 0.5 / fighter.bmv[1] + scoreBmv(fighter.bmv[1]) * 50) * (weights[2] + weights[5]) / 2;
  score += (fighterStats.sta * 0.5 / fighter.bmv[2] + scoreBmv(fighter.bmv[2]) * 50) * (weights[0] + weights[1]) / 2;
  if (fighter.mastery === weights.element) {
    score += 5;
  }
  return score;
}

function scoreBmv(bmv) {
  return 1 / (bmv - 5);
}

function randomPetSkills(pet) {
  const eligiblePetSkills = [...CFDB.getPetSkills(PetSkillType.stat), CFDB.getPetSkillByIconId(`27_${pet.iconId}`)];
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

function randomGear(gearType, fighter) { // todo: pick tyrant that matches lowest bmv (random if tie)
  // {
  //   name: Gears.tyrantBloodthirstyHelmet.name,
  //   enhancement: 10,
  //   stats: [{ res: 135 }, { def: 125 }, { hit: 120 }, { brk: 150 }],
  //   gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
  // },
  const gear = Utils.randomElement(CFDB.getGears(gearType)
    .filter(gear => gearType === GearType.weapon.name ? gear.weaponType === fighter.weaponType : true));
  return {
    name: gear.name,
    enhancement: 10,
    stats: Utils.randomElements(CFDB.getGearStats(), 4)
      .map((x, i) => ({ [x.name]: CFDB.getGearMaxValue(gear.level, x.name, i === 3) })),
    gems: randomGems(gear),
  };
}

function randomGems(gear) {
  const gemMaxLevel = CFDB.getGemMaxLevel(gear);
  if (gear.type === GearType.weapon.name) {
    return Array(3).fill().map(() => ({ name: Utils.randomElement(CFDB.getNormalGems()).name, plus: gemMaxLevel }));
  }
  return [
    { name: Utils.randomElement(CFDB.getNormalGems()).name, plus: gemMaxLevel },
    { name: Utils.randomElement(CFDB.getFusionGems()).name, plus: gemMaxLevel }
  ];
}
