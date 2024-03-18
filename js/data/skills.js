import { SkillPhase, SkillTarget, SkillType } from "./categories.js";
import Status from "./status.js";

const Skills = {
  normal: {
    name: "Normal Attack",
    damage: {
      atkMultiplier: 1
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 0,
    spConsumption: 0,
  },
  bacteria: {
    name: "Bacteria",
    iconId: 2,
    type: SkillType.water.name,
    damage: {
      atkMultiplier: 1.1
    },
    effect: {
      status: Status.sick.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 22,
    spConsumption: 3,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 1.1;
      this.triggerPercent = 22;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 1.15;
      this.triggerPercent = 26;
    }
  },
  freezingSkill: {
    name: "Freezing Skill",
    iconId: 5,
    type: SkillType.water.name,
    damage: {
      atkMultiplier: 0
    },
    effect: {
      status: Status.frozen.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 25,
    spConsumption: 11,
    getNormalVersion: function () {
      this.triggerPercent = 25;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 27;
    }
  },
  cleanse: {
    name: "Cleanse",
    iconId: 26,
    type: SkillType.water.name,
    effect: {
      removeRandomDebuff: true
    },
    bypassDisableActiveSkills: true,
    phase: SkillPhase.beforeYourAttack,
    triggerPercent: 20,
    spConsumption: 5,
    getNormalVersion: function () {
      this.triggerPercent = 20;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 25;
    }
  },
  energyShield: {
    name: "Energy Shield",
    iconId: 34,
    type: SkillType.water.name,
    effect: {
      status: Status.energyShield.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.beforeEnemyAttack,
    triggerPercent: 28,
    maxTriggerTimes: 1,
    spConsumption: 8,
    getNormalVersion: function () {
      this.triggerPercent = 28;
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 35;
      this.useExpertiseEffect = true;
    }
  },
  fireMeteorite: {
    name: "Fire Meteorite",
    iconId: 1,
    type: SkillType.fire.name,
    damage: {
      atkMultiplier: 1.3
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 28,
    spConsumption: 4,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 1.3;
      this.triggerPercent = 28;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 1.4;
      this.triggerPercent = 30;
    }
  },
  fireShield: {
    name: "Fire Shield",
    iconId: 16,
    type: SkillType.fire.name,
    damage: {
      atkMultiplier: 0.3
    },
    effect: {
      combosWithBloodFrenzy: true,
    },
    phase: SkillPhase.duringEnemyAttack,
    triggerPercent: 33,
    spConsumption: 3,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 0.3;
      this.triggerPercent = 33;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 0.35;
      this.triggerPercent = 40;
    }
  },
  bloodFrenzy: {
    name: "Blood Frenzy",
    iconId: 23,
    type: SkillType.fire.name,
    effect: {
      status: Status.bloodFrenzy.name,
      target: SkillTarget.self,
    },
    phase: SkillPhase.beforeYourAttack,
    triggerPercent: 33,
    maxTriggerTimes: 1,
    spConsumption: 12,
    getNormalVersion: function () {
      this.triggerPercent = 33;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 35;
    }
  },
  woundInfection: {
    name: "Wound Infection",
    iconId: 39,
    type: SkillType.fire.name,
    effect: {
      status: Status.wounds.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.beforeFight,
    triggerPercent: 100,
    spConsumption: 0,
    getNormalVersion: function () {
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.useExpertiseEffect = true;
    }
  },
  goldenShield: {
    name: "Golden Shield",
    iconId: 17,
    type: SkillType.earth.name,
    effect: {
      status: Status.goldenShield.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.duringEnemyAttack,
    triggerPercent: 20,
    maxTriggerTimes: 1,
    spConsumption: 10,
    getNormalVersion: function () {
      this.triggerPercent = 20;
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 23
      this.useExpertiseEffect = true;
    }
  },
  inescapableNet: {
    name: "Inescapable Net",
    iconId: 27,
    type: SkillType.earth.name,
    effect: {
      status: Status.netted.name,
      target: SkillTarget.enemy
    },
    undodgeable: true,
    phase: SkillPhase.beforeYourAttack,
    triggerPercent: 20,
    spConsumption: 0,
    getNormalVersion: function () {
      this.triggerPercent = 20;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 30;
    }
  },
  thunderclapQuake: {
    name: "Thunderclap Quake",
    iconId: 32,
    type: SkillType.earth.name,
    effect: {
      status: Status.stunned.name,
      target: SkillTarget.enemy
    },
    undodgeable: true,
    phase: SkillPhase.onDebuff,
    triggerPercent: 30,
    maxTriggerTimes: 3,
    spConsumption: 5,
    getNormalVersion: function () {
      this.triggerPercent = 30;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 33;
    }
  },
  thornShield: {
    name: "Thorn Shield",
    iconId: 33,
    type: SkillType.earth.name,
    effect: {
      status: Status.rooted.name,
      target: SkillTarget.enemy
    },
    undodgeable: true,
    phase: SkillPhase.beforeEnemyAttack,
    triggerPercent: 33,
    maxTriggerTimes: 1,
    spConsumption: 13,
    getNormalVersion: function () {
      this.triggerPercent = 33;
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 38;
      this.useExpertiseEffect = true;
    }
  },
  lightningBall: {
    name: "Lightning Ball",
    iconId: 6,
    type: SkillType.thunder.name,
    damage: {
      atkMultiplier: 1.6
    },
    effect: {
      status: Status.paralyzed.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 20,
    spConsumption: 7,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 1.6;
      this.triggerPercent = 20;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 1.7
      this.triggerPercent = 23;
    }
  },
  thunderboltBoxing: {
    name: "Thunderbolt Boxing",
    iconId: 13,
    type: SkillType.thunder.name,
    damage: {
      atkMultiplier: 0.8
    },
    effect: {
      status: Status.paralyzed.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.afterYourAttack,
    triggerPercent: 24,
    spConsumption: 5,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 0.8;
      this.triggerPercent = 24;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 0.85
      this.triggerPercent = 26;
    }
  },
  arrivalOfThunderGod: {
    name: "Arrival of Thunder God",
    iconId: 31,
    type: SkillType.thunder.name,
    effect: {
      status: Status.thunderGod.name,
      target: SkillTarget.enemy
    },
    undodgeable: true,
    phase: SkillPhase.beforeYourAttack,
    triggerPercent: 100,
    cantUseIfThunderGodIsActive: true,
    spConsumption: 10,
    getNormalVersion: function () {
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.useExpertiseEffect = true;
    }
  },
  antiDamageChop: {
    name: "Anit-damage Chop", // todo: fix typo -> this will cause local storage builds to break
    iconId: 37,
    type: SkillType.thunder.name,
    effect: {
      status: Status.reflect.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.beforeFight,
    triggerPercent: 100,
    spConsumption: 0,
    getNormalVersion: function () {
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.useExpertiseEffect = true;
    }
  },
  stormBoxing: {
    name: "Storm Boxing",
    iconId: 12,
    type: SkillType.wind.name,
    damage: {
      atkMultiplier: 1.08
    },
    phase: SkillPhase.afterYourAttack,
    triggerPercent: 27,
    spConsumption: 3,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 1.08;
      this.triggerPercent = 27;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 1.13
      this.triggerPercent = 31;
    }
  },
  fastMove: {
    name: "Fast Move",
    iconId: 24,
    type: SkillType.wind.name,
    effect: {
      atkMultiplierForNextAttack: 0.6,
      restartTurnAfterNextAttack: true
    },
    phase: SkillPhase.beforeYourAttack,
    triggerPercent: 20,
    spConsumption: 7,
    getNormalVersion: function () {
      this.triggerPercent = 20;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 25;
    }
  },
  violence: {
    name: "Violence",
    iconId: 28,
    type: SkillType.wind.name,
    effect: {
      status: Status.violent.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.beforeFight,
    triggerPercent: 100,
    spConsumption: 0,
    getNormalVersion: function () {
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.useExpertiseEffect = true;
    }
  },
  magicStealing: {
    name: "Magic Stealing",
    iconId: 38,
    type: SkillType.wind.name,
    effect: {
      status: Status.spSteal.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.beforeFight,
    triggerPercent: 100,
    spConsumption: 0,
    getNormalVersion: function () {
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.useExpertiseEffect = true;
    }
  },
  heavyHammer: {
    name: "Heavy Hammer",
    iconId: 7,
    type: SkillType.taijutsu.name,
    damage: {
      atkMultiplier: 1,
      enemyMaxHpMultiplier: 0.07
    },
    effect: {
      status: Status.stunned.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 15,
    maxTriggerTimes: 3,
    spConsumption: 0,
    getNormalVersion: function () {
      this.damage.enemyMaxHpMultiplier = 0.07;
      this.triggerPercent = 15;
    },
    getExpertiseVersion: function () {
      this.damage.enemyMaxHpMultiplier = 0.08;
      this.triggerPercent = 18;
    }
  },
  explosiveBlow: {
    name: "Explosive Blow",
    iconId: 8,
    type: SkillType.taijutsu.name,
    damage: {
      atkMultiplier: 2.5,
    },
    effect: {
      status: Status.tired.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 23,
    spConsumption: 10,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 2.5;
      this.triggerPercent = 23;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 2.6;
      this.triggerPercent = 25;
    }
  },
  gallop: {
    name: "Gallop",
    iconId: 19,
    type: SkillType.taijutsu.name,
    effect: {
      increaseSpd: 10
    },
    phase: SkillPhase.duringEnemyAttack,
    triggerPercent: 100,
    maxTriggerTimes: 10,
    spConsumption: 0,
    getNormalVersion: function () {
      this.effect.increaseSpd = 10;
    },
    getExpertiseVersion: function () {
      this.effect.increaseSpd = 15;
    }
  },
  counterattack: {
    name: "Counterattack",
    iconId: 21,
    type: SkillType.taijutsu.name,
    damage: {
      atkMultiplier: 1.44,
    },
    phase: SkillPhase.duringEnemyAttack,
    triggerPercent: 17,
    spConsumption: 6,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 1.44;
      this.triggerPercent = 17;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 1.49;
      this.triggerPercent = 19;
    }
  },
  bomb: {
    name: "Bomb",
    iconId: 9,
    type: SkillType.ninjutsu.name,
    damage: {
      atkMultiplier: 2.1,
    },
    phase: SkillPhase.duringYourAttack,
    canBeThrownBack: true,
    throwbackPercentPerTenSeconds: 10,
    minThrowbackPercent: 10,
    maxThrowbackPercent: 90,
    triggerPercent: 30,
    spConsumption: 0,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 2.1;
      this.triggerPercent = 30;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 2.2;
      this.triggerPercent = 32;
    }
  },
  poisonousFog: {
    name: "Poisonous Fog",
    iconId: 14,
    type: SkillType.ninjutsu.name,
    damage: {
      atkMultiplier: 0.33,
    },
    effect: {
      status: Status.poisoned.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.afterYourAttack,
    triggerPercent: 33,
    spConsumption: 0,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 0.33;
      this.triggerPercent = 33;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 0.4;
      this.triggerPercent = 38;
    }
  },
  timeBomb: {
    name: "Time Bomb",
    iconId: 25,
    type: SkillType.ninjutsu.name,
    effect: {
      status: Status.timeBomb.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.beforeYourAttack,
    triggerPercent: 33,
    maxTriggerTimes: 1,
    spConsumption: 15,
    getNormalVersion: function () {
      this.triggerPercent = 33;
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 36;
      this.useExpertiseEffect = true;
    }
  },
  wine: {
    name: "Wine",
    iconId: 29,
    type: SkillType.ninjutsu.name,
    effect: {
      status: Status.wine.name,
      target: SkillTarget.enemy
    },
    undodgeable: true,
    phase: SkillPhase.beforeFight,
    triggerPercent: 100,
    spConsumption: 0,
    getNormalVersion: function () {
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.useExpertiseEffect = true;
    }
  },
  ghoulBlock: {
    name: "Ghoul Block",
    iconId: 3,
    type: SkillType.cursedSealJutsu.name,
    effect: {
      status: Status.weakened.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 24,
    maxTriggerTimes: 1,
    spConsumption: 16,
    getNormalVersion: function () {
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.useExpertiseEffect = true;
    }
  },
  skillShackles: {
    name: "Skill Shackles",
    iconId: 4,
    type: SkillType.cursedSealJutsu.name,
    effect: {
      status: Status.silenced.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 24,
    maxTriggerTimes: 1,
    spConsumption: 13,
    getNormalVersion: function () {
      this.triggerPercent = 24;
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 27;
      this.useExpertiseEffect = true;
    }
  },
  earthStyleWall: {
    name: "Earth-Style Wall",
    iconId: 20,
    type: SkillType.cursedSealJutsu.name,
    effect: {
      damageTakenMultiplier: 0.45,
      reflectRemainingDamage: true
    },
    phase: SkillPhase.duringAllEnemyAttacks,
    triggerPercent: 15,
    spConsumption: 5,
    notAnAction: true,
    getNormalVersion: function () {
      this.triggerPercent = 15;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 16;
    }
  },
  barbarism: {
    name: "Barbarism",
    iconId: 30,
    type: SkillType.cursedSealJutsu.name,
    effect: {
      status: Status.barbarism.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.beforeFight,
    triggerPercent: 100,
    spConsumption: 0,
    getNormalVersion: function () {
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.useExpertiseEffect = true;
    }
  },
  assassinate: {
    name: "Assassinate",
    iconId: 10,
    type: SkillType.genjutsu.name,
    damage: {
      atkMultiplier: 1
    },
    effect: {
      percentDamageHealedOnHit: 50
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 20,
    spConsumption: 0,
    getNormalVersion: function () {
      this.triggerPercent = 20;
      this.effect.percentDamageHealedOnHit = 50;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 23;
      this.effect.percentDamageHealedOnHit = 55;
    }
  },
  darkCurse: {
    name: "Dark Curse",
    iconId: 15,
    type: SkillType.genjutsu.name,
    effect: {
      status: Status.cursed.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.afterYourAttack,
    triggerPercent: 28,
    spConsumption: 3,
    getNormalVersion: function () {
      this.triggerPercent = 28;
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 30;
      this.useExpertiseEffect = true;
    }
  },
  movingIllusion: {
    name: "Moving Illusion",
    iconId: 22,
    type: SkillType.genjutsu.name,
    effect: {
      dodgeAttack: true
    },
    phase: SkillPhase.duringAllEnemyAttacks,
    triggerPercent: 18,
    spConsumption: 0,
    getNormalVersion: function () {
      this.triggerPercent = 18;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 21;
    }
  },
  shieldWall: {
    name: "Shield Wall",
    iconId: 40,
    type: SkillType.genjutsu.name,
    effect: {
      status: Status.shieldWall.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.afterAttacking,
    triggerPercent: 15,
    spConsumption: 0,
    getNormalVersion: function () {
      this.triggerPercent = 15;
    },
    getExpertiseVersion: function () {
      this.triggerPercent = 25;
    }
  },
  drawPower: {
    name: "Draw Power",
    iconId: 11,
    type: SkillType.healing.name,
    damage: {
      atkMultiplier: 1
    },
    effect: {
      removeEnemySpByYourSpPercent: 15
    },
    phase: SkillPhase.duringYourAttack,
    triggerPercent: 20,
    spConsumption: 10,
    getNormalVersion: function () {
      this.damage.atkMultiplier = 1;
      this.triggerPercent = 20;
    },
    getExpertiseVersion: function () {
      this.damage.atkMultiplier = 1.1;
      this.triggerPercent = 23;
    }
  },
  rejuvenation: {
    name: "Rejuvenation",
    iconId: 18,
    type: SkillType.healing.name,
    effect: {
      gainPercentHp: 10,
      removePoison: true
    },
    phase: SkillPhase.duringEnemyAttack,
    triggerPercent: 25,
    canUseIfHpNotFullOrPoisoned: true,
    maxTriggerTimes: 3,
    spConsumption: 6,
    getNormalVersion: function () {
      this.effect.gainPercentHp = 12;
      this.triggerPercent = 25;
    },
    getExpertiseVersion: function () {
      this.effect.gainPercentHp = 12;
      this.triggerPercent = 30;
    }
  },
  rebirth: {
    name: "Rebirth",
    iconId: 35,
    type: SkillType.healing.name,
    effect: {
      gainPercentHp: 20,
      reduceTriggerPercentPerTenSeconds: 5
    },
    phase: SkillPhase.onDeath,
    triggerPercent: 80,
    spConsumption: 25,
    notAnAction: true,
    getNormalVersion: function () {
      this.effect.gainPercentHp = 20;
    },
    getExpertiseVersion: function () {
      this.effect.gainPercentHp = 25;
    },
  },
  bloodSacrifice: {
    name: "Blood Sacrifice",
    iconId: 36,
    type: SkillType.healing.name,
    effect: {
      status: Status.lifesteal.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.beforeFight,
    triggerPercent: 100,
    spConsumption: 0,
    getNormalVersion: function () {
      this.useExpertiseEffect = false;
    },
    getExpertiseVersion: function () {
      this.useExpertiseEffect = true;
    }
  },
};

export default Skills;
