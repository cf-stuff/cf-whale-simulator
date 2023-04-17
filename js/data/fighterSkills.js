import { FighterSkillType, SkillPhase, SkillTarget } from "./categories.js";
import Skills from "./skills.js";
import Stats from "./stats.js";
import Status from "./status.js";

const FighterSkills = {
  energyShield: {
    name: "Energy Shield Reset",
    type: FighterSkillType.reset,
    iconIds: [1, 10, 19],
    effect: {
      resetTriggerTimes: Skills.energyShield.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  bloodFrenzy: {
    name: "Blood Frenzy Reset",
    type: FighterSkillType.reset,
    iconIds: [2, 11, 20],
    effect: {
      resetTriggerTimes: Skills.bloodFrenzy.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  goldenShield: {
    name: "Golden Shield Reset",
    type: FighterSkillType.reset,
    iconIds: [3, 12, 21],
    effect: {
      resetTriggerTimes: Skills.goldenShield.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  thunderclapQuake: {
    name: "Thunderclap Quake Reset",
    type: FighterSkillType.reset,
    iconIds: [4, 13, 22],
    effect: {
      resetTriggerTimes: Skills.thunderclapQuake.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  thornShield: {
    name: "Thorn Shield Reset",
    type: FighterSkillType.reset,
    iconIds: [5, 14, 23],
    effect: {
      resetTriggerTimes: Skills.thornShield.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  heavyHammer: {
    name: "Heavy Hammer Reset",
    type: FighterSkillType.reset,
    iconIds: [6, 15, 24],
    effect: {
      resetTriggerTimes: Skills.heavyHammer.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  rejuvenation: {
    name: "Rejuventation Reset",
    type: FighterSkillType.reset,
    iconIds: [7, 16, 25],
    effect: {
      resetTriggerTimes: Skills.rejuvenation.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  ghoulBlock: {
    name: "Ghoul Block Reset",
    type: FighterSkillType.reset,
    iconIds: [8, 17, 26],
    effect: {
      resetTriggerTimes: Skills.ghoulBlock.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  skillShackles: {
    name: "Skill Shackles Reset",
    type: FighterSkillType.reset,
    iconIds: [9, 18, 27],
    effect: {
      resetTriggerTimes: Skills.skillShackles.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  pray: {
    name: "Pray",
    type: FighterSkillType.healing,
    iconIds: [28, 33, 38],
    effect: {
      gainPercentHp: 15,
      gainPercentSp: 15,
      removeAllDebuffs: true
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 2,
    triggerPercent: 100,
    maxTriggerTimes: 5,
    spConsumption: 0
  },
  wine: {
    name: "Strong Wine",
    type: FighterSkillType.healing,
    iconIds: [29, 34, 39],
    effect: {
      gainPercentHp: 15,
      gainPercentSp: 15,
      status: Status.wine.name,
      target: SkillTarget.both
    },
    secondaryEffect: {
      status: Status.clumsy.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 2,
    triggerPercent: 100,
    maxTriggerTimes: 5,
    spConsumption: 0
  },
  shieldWall: {
    name: "Shield Wall Burst",
    type: FighterSkillType.healing,
    iconIds: [30, 35, 40],
    effect: {
      gainPercentHp: 15,
      gainPercentSp: 15,
      status: Status.shieldWall.name,
      target: SkillTarget.self
    },
    secondaryEffect: {
      status: Status.feeble.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 2,
    triggerPercent: 100,
    maxTriggerTimes: 5,
    spConsumption: 0
  },
  fireShield: {
    name: "Fire Shield Burst",
    type: FighterSkillType.healing,
    iconIds: [31, 36, 41],
    effect: {
      gainPercentHp: 15,
      gainPercentSp: 15,
      increaseTriggerPercent: Skills.fireShield.name,
      increaseTriggerPercentAmount: 5
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 2,
    triggerPercent: 100,
    maxTriggerTimes: 5,
    spConsumption: 0
  },
  counterattack: {
    name: "Counterattack Burst",
    type: FighterSkillType.healing,
    iconIds: [32, 37, 42],
    effect: {
      gainPercentHp: 15,
      gainPercentSp: 15,
      increaseTriggerPercent: Skills.counterattack.name,
      increaseTriggerPercentAmount: 15
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 2,
    triggerPercent: 100,
    maxTriggerTimes: 5,
    spConsumption: 0
  },
  def: {
    name: Stats.def.displayName,
    type: FighterSkillType.stat,
    iconIds: [43, 56, 69],
    values: [20, 30, 50]
  },
  brk: {
    name: Stats.brk.displayName,
    type: FighterSkillType.stat,
    iconIds: [44, 57, 70],
    values: [20, 30, 50]
  },
  res: {
    name: Stats.res.displayName,
    type: FighterSkillType.stat,
    iconIds: [45, 58, 71],
    values: [20, 30, 50]
  },
  crt: {
    name: Stats.crt.displayName,
    type: FighterSkillType.stat,
    iconIds: [46, 59, 72],
    values: [20, 30, 50]
  },
  hpPercent: {
    name: Stats.hpPercent.displayName,
    type: FighterSkillType.stat,
    iconIds: [47, 60, 73],
    values: [10, 15, 25]
  },
  maxAtk: {
    name: Stats.maxAtk.displayName,
    type: FighterSkillType.stat,
    iconIds: [48, 61, 74],
    values: [20, 30, 50]
  },
  hit: {
    name: Stats.hit.displayName,
    type: FighterSkillType.stat,
    iconIds: [49, 62, 75],
    values: [20, 30, 50]
  },
  sp: {
    name: Stats.sp.displayName,
    type: FighterSkillType.stat,
    iconIds: [50, 63, 76],
    values: [10, 20, 30]
  },
  atkPercent: {
    name: Stats.atkPercent.displayName,
    type: FighterSkillType.stat,
    iconIds: [51, 64, 77],
    values: [10, 15, 25]
  },
  eva: {
    name: Stats.eva.displayName,
    type: FighterSkillType.stat,
    iconIds: [52, 65, 78],
    values: [20, 30, 50]
  },
  hp: {
    name: Stats.hp.displayName,
    type: FighterSkillType.stat,
    iconIds: [53, 66, 79],
    values: [50, 80, 130]
  },
  spd: {
    name: Stats.spd.displayName,
    type: FighterSkillType.stat,
    iconIds: [54, 67, 80],
    values: [10, 20, 30]
  },
  fury: {
    name: Stats.furyReversion.displayName,
    type: FighterSkillType.stat,
    iconIds: [55, 68, 81],
    values: [2, 3, 5]
  }
};

export default FighterSkills;
