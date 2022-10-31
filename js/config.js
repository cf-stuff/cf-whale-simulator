// timeout at 1000s => 1000000ms
export const TIMER_LIMIT = 1000000;
export const FURY_BURST_THRESHOLD = 300;

export const WeaponType = {
  cudgel: "Cudgel",
  dagger: "Dagger",
  sword: "Sword",
  heavyWeapon: "Heavy Weapon",
  staff: "Staff",
  gloves: "Gloves",
};

export const SKILL_TYPE = {
  water: {
    name: "Water",
    iconId: 1
  },
  fire: {
    name: "Fire",
    iconId: 2
  },
  earth: {
    name: "Earth",
    iconId: 3
  },
  thunder: {
    name: "Thunder",
    iconId: 4
  },
  wind: {
    name: "Wind",
    iconId: 5
  },
  taijutsu: {
    name: "Taijutsu",
    iconId: 6
  },
  ninjutsu: {
    name: "Ninjutsu",
    iconId: 7
  },
  cursedSealJutsu: {
    name: "Cursed Seal Jutsu",
    iconId: 8
  },
  genjutsu: {
    name: "Genjutsu",
    iconId: 9
  },
  healing: {
    name: "Healing",
    iconId: 10
  },
};

export const SkillPhase = {
  beforeFight: "beforeFight",
  beforeYourAttack: "beforeYourAttack",
  beforeEnemyAttack: "beforeEnemyAttack",
  duringYourAttack: "duringYourAttack",
  duringEnemyAttack: "duringEnemyAttack",
  duringAllEnemyAttacks: "duringAllEnemyAttacks",
  afterYourAttack: "afterYourAttack",
  petAttack: "petAttack",
  onPetBlock: "onPetBlock",
  onDebuff: "onDebuff",
  onDeath: "onDeath",
  afterAttacking: "afterAttacking",
  onFuryBurst: "onFuryBurst"
};

export const StatusType = {
  buff: 0,
  debuff: 1,
  other: 2
}

export const Target = {
  self: 0,
  enemy: 1,
  both: 2
}

export const Stat = {
  hp: "hp",
  sp: "sp",
  minAtk: "minAtk",
  maxAtk: "maxAtk",
  spd: "spd",
  hit: "hit",
  eva: "eva",
  brk: "brk",
  def: "def",
  crt: "crt",
  res: "res",
  fury: "furyReversion"
}

export const DamageType = {
  attack: 0,
  dot: 1,
  other: 2
}

export const STATUS = {
  energyShield: {
    name: "Bubble",
    type: StatusType.buff,
    effect: {
      percentHpShield: 20,
      immuneToThunderGod: true,
      preventHealingWhenAttacked: true
    },
    getExpertiseVersion: function () {
      this.effect.percentHpShield = 25
    }
  },
  bloodFrenzy: {
    name: "Blood Frenzy",
    type: StatusType.buff,
    effect: {
      triggerProbabilityMultiplier: 1.5,
      percentHpLostOnHit: 5
    },
    removeAfterDuration: 35000
  },
  wounds: {
    name: "Wounds",
    type: StatusType.buff,
    effect: {
      applyWoundedOnHit: true
    },
    getExpertiseVersion: function () {
      this.effect.expertWounded = true;
    }
  },
  goldenShield: {
    name: "Bell",
    type: StatusType.buff,
    effect: {
      immuneToAttackDamage: true,
      immuneToOtherDamage: true
    },
    removeAfterDuration: 20000,
    getExpertiseVersion: function () {
      this.removeAfterDuration = 23000;
    }
  },
  reflect: {
    name: "Reflect",
    type: StatusType.buff,
    effect: {
      percentDamageReflectedWhenAttacked: 10
    },
    getExpertiseVersion: function () {
      this.effect.percentDamageReflectedWhenAttacked = 12;
    }
  },
  violent: {
    name: "Violent",
    type: StatusType.buff,
    effect: {
      crtIncreasePerTenSeconds: 15,
    },
    getExpertiseVersion: function () {
      this.effect.crtIncreasePerTenSeconds = 20;
    }
  },
  spSteal: {
    name: "Sp Steal",
    type: StatusType.buff,
    effect: {
      spStolenOnHit: 4,
    },
    getExpertiseVersion: function () {
      this.effect.spStolenOnHit = 5;
    }
  },
  barbarism: {
    name: "Horny",
    type: StatusType.buff,
    effect: {
      statusDurationMultiplier: 0.75,
      atkMultiplierPerHpPercentLost: 0.005
    },
    getExpertiseVersion: function () {
      this.effect.atkMultiplierPerHpPercentLost = 0.007
    }
  },
  shieldWall: {
    name: "Shield Wall",
    type: StatusType.buff,
    effect: {
      immuneToAttackDamage: true
    },
    removeWhenAttacked: true
  },
  lifesteal: {
    name: "Life Steal",
    type: StatusType.buff,
    effect: {
      percentDamageHealedOnHit: 10
    },
    getExpertiseVersion: function () {
      this.effect.percentDamageHealedOnHit = 15
    }
  },
  sick: {
    name: "Sick",
    type: StatusType.debuff,
    effect: {
      spConsumptionMultiplier: 2
    }
  },
  frozen: {
    name: "Frozen",
    type: StatusType.debuff,
    effect: {
      skipActions: true,
      damageTakenMultiplier: 2,
      immuneToFireDamage: true,
    },
    removeWhenAttacked: true
  },
  ignited: {
    name: "Ignited",
    type: StatusType.debuff,
    effect: {
      percentHpTakenAtTurnStart: 5
    }
  },
  wounded: {
    name: "Wounded",
    type: StatusType.other,
    effect: {
      damageTakenPerStack: 20
    },
    stackable: true,
    removeOnTurnStart: true,
    getExpertiseVersion: function () {
      this.effect.damageTakenPerStack = 30
    }
  },
  netted: {
    name: "Stuck in a Net",
    type: StatusType.debuff,
    effect: {
      evaMultiplier: 0.75,
      fireDamageTakenMultiplier: 2
    },
    removeOnEnemyTurnStart: true,
    removeWhenAttackedByFire: true
  },
  stunned: {
    name: "Stunned",
    type: StatusType.debuff,
    effect: {
      skipTurn: true
    },
    removeAfterDuration: 3500,
  },
  rooted: {
    name: "Rooted",
    type: StatusType.debuff,
    effect: {
      spdMultiplier: 0.5
    },
    removeAfterDuration: 18000,
    getExpertiseVersion: function () {
      this.removeAfterDuration = 21000
    }
  },
  paralyzed: {
    name: "Paralyzed",
    type: StatusType.debuff,
    effect: {
      skipTurn: true
    },
    removeAfterDuration: 3500,
  },
  thunderGod: {
    name: "Thunder God",
    type: StatusType.debuff,
    effect: {
      percentHpTakenAtTurnStart: 5,
      betrayalPercentPerTenSeconds: 5,
      maxBetrayalPercent: 80
    },
    getExpertiseVersion: function () {
      this.effect.percentHpTakenAtTurnStart = 7
    }
  },
  tired: {
    name: "Tired",
    type: StatusType.debuff,
    effect: {
      skipActions: true
    },
    removeAfterTurns: 1
  },
  poisoned: {
    name: "Poisoned",
    type: StatusType.debuff,
    effect: {
      percentHpTakenAtTurnStart: 5
    }
  },
  timeBomb: {
    name: "Time Bomb",
    type: StatusType.debuff,
    effect: {
      storeDamageTaken: true,
      takeStoredDamageAfterDuration: true
    },
    removeAfterDuration: 25000,
    getExpertiseVersion: function () {
      this.removeAfterDuration = 30000
    }
  },
  wine: {
    name: "Wine",
    type: StatusType.debuff,
    effect: {
      atkMultiplier: 0.9,
      increaseCrt: 130,
      igniteWhenHitByFire: true
    },
    getExpertiseVersion: function () {
      this.effect.atkMultiplier = 0.85;
    }
  },
  weakened: {
    name: "Weakened",
    type: StatusType.debuff,
    effect: {
      atkMultiplier: 0.25
    },
    removeAfterDuration: 25000,
    getExpertiseVersion: function () {
      this.removeAfterDuration = 28000
    }
  },
  silenced: {
    name: "Silenced",
    type: StatusType.debuff,
    effect: {
      disableActiveSkills: true // everything in before attack except cleanse, everything in during and after attack
    },
    removeAfterDuration: 20000,
    getExpertiseVersion: function () {
      this.removeAfterDuration = 23000;
    },
  },
  cursed: {
    name: "Cursed",
    type: StatusType.debuff,
    effect: {
      percentHpTakenAtTurnStart: 4,
      spTakenAtTurnStart: 4
    },
    removeWhenSpConsumed: true,
    getExpertiseVersion: function () {
      this.percentHpTakenAtTurnStart = 6;
    }
  },
  dizzy: {
    name: "Dizzy",
    type: StatusType.debuff,
    effect: {
      skipTurn: true
    },
    removeAfterDuration: 3500,
  },
  furious: {
    name: "Furious",
    type: StatusType.other,
    effect: {
      gainFuryOnHit: 5,
      triggerPercent: 8
    },
  },
  tenacious: {
    name: "Tenacious",
    type: StatusType.other,
    effect: {
      decreaseStatusDuration: 6
    },
  },
  shocked: {
    name: "Shocked",
    type: StatusType.other,
    effect: {
      decreasePetBlockAndMovingIllusionPercent: 4
    },
  }
};

export const SKILL = {
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
    type: SKILL_TYPE.water.name,
    damage: {
      atkMultiplier: 1.1
    },
    effect: {
      status: STATUS.sick.name,
      target: Target.enemy
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
    type: SKILL_TYPE.water.name,
    effect: {
      status: STATUS.frozen.name,
      target: Target.enemy
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
    type: SKILL_TYPE.water.name,
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
    type: SKILL_TYPE.water.name,
    effect: {
      status: STATUS.energyShield.name,
      target: Target.self
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
    type: SKILL_TYPE.fire.name,
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
    type: SKILL_TYPE.fire.name,
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
    type: SKILL_TYPE.fire.name,
    effect: {
      status: STATUS.bloodFrenzy.name,
      target: Target.self,
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
    type: SKILL_TYPE.fire.name,
    effect: {
      status: STATUS.wounds.name,
      target: Target.self
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
    type: SKILL_TYPE.earth.name,
    effect: {
      status: STATUS.goldenShield.name,
      target: Target.self
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
    type: SKILL_TYPE.earth.name,
    effect: {
      status: STATUS.netted.name,
      target: Target.enemy
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
    type: SKILL_TYPE.earth.name,
    effect: {
      status: STATUS.stunned.name,
      target: Target.enemy
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
    type: SKILL_TYPE.earth.name,
    effect: {
      status: STATUS.rooted.name,
      target: Target.enemy
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
    type: SKILL_TYPE.thunder.name,
    damage: {
      atkMultiplier: 1.6
    },
    effect: {
      status: STATUS.paralyzed.name,
      target: Target.enemy
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
    type: SKILL_TYPE.thunder.name,
    damage: {
      atkMultiplier: 0.8
    },
    effect: {
      status: STATUS.paralyzed.name,
      target: Target.enemy
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
    type: SKILL_TYPE.thunder.name,
    effect: {
      status: STATUS.thunderGod.name,
      target: Target.enemy
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
    name: "Anit-damage Chop",
    iconId: 37,
    type: SKILL_TYPE.thunder.name,
    effect: {
      status: STATUS.reflect.name,
      target: Target.self
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
    type: SKILL_TYPE.wind.name,
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
    type: SKILL_TYPE.wind.name,
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
    type: SKILL_TYPE.wind.name,
    effect: {
      status: STATUS.violent.name,
      target: Target.self
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
    type: SKILL_TYPE.wind.name,
    effect: {
      status: STATUS.spSteal.name,
      target: Target.self
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
    type: SKILL_TYPE.taijutsu.name,
    damage: {
      atkMultiplier: 1,
      enemyMaxHpMultiplier: 0.07
    },
    effect: {
      status: STATUS.stunned.name,
      target: Target.enemy
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
    type: SKILL_TYPE.taijutsu.name,
    damage: {
      atkMultiplier: 2.5,
    },
    effect: {
      selfstatus: STATUS.tired.name,
      target: Target.self
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
    type: SKILL_TYPE.taijutsu.name,
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
    type: SKILL_TYPE.taijutsu.name,
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
    type: SKILL_TYPE.ninjutsu.name,
    damage: {
      atkMultiplier: 2.1,
    },
    phase: SkillPhase.duringYourAttack,
    canBeThrownBack: true,
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
    type: SKILL_TYPE.ninjutsu.name,
    damage: {
      atkMultiplier: 0.33,
    },
    effect: {
      status: STATUS.poisoned.name,
      target: Target.enemy
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
    type: SKILL_TYPE.ninjutsu.name,
    effect: {
      status: STATUS.timeBomb.name,
      target: Target.enemy
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
    type: SKILL_TYPE.ninjutsu.name,
    effect: {
      status: STATUS.wine.name,
      target: Target.enemy
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
    type: SKILL_TYPE.cursedSealJutsu.name,
    effect: {
      status: STATUS.weakened.name,
      target: Target.enemy
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
    type: SKILL_TYPE.cursedSealJutsu.name,
    effect: {
      status: STATUS.silenced.name,
      target: Target.enemy
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
    type: SKILL_TYPE.cursedSealJutsu.name,
    effect: {
      damageTakenMultiplier: 0.55,
      reflectRemainingDamage: true
    },
    phase: SkillPhase.duringAllEnemyAttacks,
    triggerPercent: 15,
    spConsumption: 5,
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
    type: SKILL_TYPE.cursedSealJutsu.name,
    effect: {
      status: STATUS.barbarism.name,
      target: Target.self
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
    type: SKILL_TYPE.genjutsu.name,
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
    type: SKILL_TYPE.genjutsu.name,
    effect: {
      status: STATUS.cursed.name,
      target: Target.enemy
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
    type: SKILL_TYPE.genjutsu.name,
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
    type: SKILL_TYPE.genjutsu.name,
    effect: {
      status: STATUS.shieldWall.name,
      target: Target.self
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
    type: SKILL_TYPE.healing.name,
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
    type: SKILL_TYPE.healing.name,
    effect: {
      gainPercentHp: 10,
      removePoison: true
    },
    phase: SkillPhase.duringEnemyAttack,
    triggerPercent: 25,
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
    type: SKILL_TYPE.healing.name,
    effect: {
      gainPercentHp: 20,
      reduceTriggerPercentPerTenSeconds: 5
    },
    phase: SkillPhase.onDeath,
    triggerPercent: 90,
    spConsumption: 25,
    getNormalVersion: function () {
      this.gainPercentHp = 20;
    },
    getExpertiseVersion: function () {
      this.gainPercentHp = 25;
    }
  },
  bloodSacrifice: {
    name: "Blood Sacrifice",
    iconId: 36,
    type: SKILL_TYPE.healing.name,
    effect: {
      status: STATUS.lifesteal.name,
      target: Target.self
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

export const PET_SKILL = {
  scratch: {
    name: "Scratch",
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  block: {
    name: "Defense",
    effect: {
      blockAttack: true
    },
    phase: SkillPhase.duringAllEnemyAttacks,
    triggerPercent: 10,
  },
  dizzy: {
    name: "Stun",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.dizzy.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  seal: {
    name: "Seal",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.silenced.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  healing: {
    name: "Healing",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      gainPercentHp: 10
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  poison: {
    name: "Poison",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.poisoned.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  freezing: {
    name: "Freezing",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.frozen.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  bloodsucking: {
    name: "Bloodsucking",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      percentDamageHealedOnHit: 50
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  weakening: {
    name: "Weakening",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.weakened.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  cleanse: {
    name: "Disperse",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      removeRandomDebuff: true
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  thorns: {
    name: "Wind",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.rooted.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  shieldwall: {
    name: "Armor",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.shieldWall.name,
      target: Target.self
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  barbarian: {
    name: "Barbarian",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.barbarism.name,
      target: Target.self
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  }
};

export const EVOLVED_PET_SKILL = {
  infect: {
    name: "Infect",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.sick.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  needle: {
    name: "Energy",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      removeEnemySpByEnemySpPercent: 15
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  thunder: {
    name: "Thunder",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.thunderGod.name,
      target: Target.enemy,
      removeThunderGod: true
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  force: {
    name: "Force",
    damage: {
      atkMultiplier: 1.8
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  ignite: {
    name: "Fire",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.ignited.name,
      target: Target.enemy,
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  barbarian: {
    name: "Barbarian",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.barbarism.name,
      target: Target.self,
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  wine: {
    name: "Wine",
    effect: {
      status: STATUS.wine.name,
      target: Target.enemy,
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  shieldWall: {
    name: "Shield Wall",
    effect: {
      status: STATUS.shieldWall.name,
      target: Target.self,
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  meditation: {
    name: "Meditation",
    effect: {
      gainPercentSp: 15
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  cleanse: {
    name: "Cleanse",
    effect: {
      removeRandomDebuff: true
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  healing: {
    name: "Healing",
    effect: {
      gainPercentHp: 10,
      removePoison: true
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  energyShield: {
    name: "Energy Shield",
    effect: {
      status: STATUS.energyShield.name,
      target: Target.self,
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
};

export const EVOLVED_FIGHTER_SKILL = {
  energyShield: {
    name: "Energy Shield Reset",
    effect: {
      resetTriggerTimes: SKILL.energyShield.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  bloodFrenzy: {
    name: "Blood Frenzy Reset",
    effect: {
      resetTriggerTimes: SKILL.bloodFrenzy.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  goldenShield: {
    name: "Golden Shield Reset",
    effect: {
      resetTriggerTimes: SKILL.goldenShield.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  thunderclapQuake: {
    name: "Thunderclap Quake Reset",
    effect: {
      resetTriggerTimes: SKILL.thunderclapQuake.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  thornShield: {
    name: "Thorn Shield Reset",
    effect: {
      resetTriggerTimes: SKILL.thornShield.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  heavyHammer: {
    name: "Heavy Hammer Reset",
    effect: {
      resetTriggerTimes: SKILL.heavyHammer.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  rejuvenation: {
    name: "Rejuvenation Reset",
    effect: {
      resetTriggerTimes: SKILL.rejuvenation.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  ghoulBlock: {
    name: "Ghoul Block Reset",
    effect: {
      resetTriggerTimes: SKILL.ghoulBlock.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  skillShackles: {
    name: "Skill Shackles Reset",
    effect: {
      resetTriggerTimes: SKILL.skillShackles.name
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 3,
    triggerPercent: 100,
    maxTriggerTimes: 3,
    spConsumption: 0
  },
  pray: {
    name: "Pray",
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
    effect: {
      gainPercentHp: 15,
      gainPercentSp: 15,
      status: STATUS.wine.name, // todo -200 hit and eva
      target: Target.both
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 2,
    triggerPercent: 100,
    maxTriggerTimes: 5,
    spConsumption: 0
  },
  shieldWall: {
    name: "Shield Wall Burst",
    effect: {
      gainPercentHp: 15,
      gainPercentSp: 15,
      status: STATUS.shieldWall.name, // todo -200 brk and def
      target: Target.self
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 2,
    triggerPercent: 100,
    maxTriggerTimes: 5,
    spConsumption: 0
  },
  fireShield: {
    name: "Fire Shield Burst",
    effect: {
      gainPercentHp: 15,
      gainPercentSp: 15,
      increaseTriggerPercent: SKILL.fireShield.name,
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
    effect: {
      gainPercentHp: 15,
      gainPercentSp: 15,
      increaseTriggerPercent: SKILL.counterattack.name,
      increaseTriggerPercentAmount: 15
    },
    phase: SkillPhase.onFuryBurst,
    numberOfFuryBursts: 2,
    triggerPercent: 100,
    maxTriggerTimes: 5,
    spConsumption: 0
  }
}

export const TOTEM = {
  black: {
    name: "Black",
    iconId: 1,
    effect: {
      status: STATUS.furious.name,
      target: Target.self,
    },
    effectIncreasePerLevel: 0.5,
    phase: SkillPhase.beforeFight,
    triggerPercent: 100
  },
  purple: {
    name: "Purple",
    iconId: 2,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.rooted.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  blue: {
    name: "Blue",
    iconId: 3,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      removeRandomDebuff: true
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  green: {
    name: "Green",
    iconId: 4,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.silenced.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  yellow: {
    name: "Yellow",
    iconId: 5,
    effect: {
      status: STATUS.tenacious.name,
      target: Target.both
    },
    undodgeable: true,
    effectIncreasePerLevel: 0.3,
    phase: SkillPhase.beforeFight,
    triggerPercent: 100,
  },
  orange: {
    name: "Orange",
    iconId: 6,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.dizzy.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  red: {
    name: "Red",
    iconId: 7,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: STATUS.ignited.name,
      target: Target.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  white: {
    name: "White",
    iconId: 8,
    effect: {
      status: STATUS.shocked.name,
      target: Target.enemy
    },
    undodgeable: true,
    effectIncreasePerLevel: 0.5,
    phase: SkillPhase.beforeFight,
    triggerPercent: 100
  },
}

export const FIGHTER = {
  ainu: {
    name: "Ainu",
    evoName: "Ainu: God of CF",
    iconId: 29,
    weaponType: WeaponType.sword,
    isv: [12, 10, 26],
    growthRate: [0.6, 0.5, 1.27],
    bmv: [19, 29, 6],
    mastery: SKILL_TYPE.healing.name
  },
  madara: {
    name: "Madara",
    evoName: "E·Madara",
    iconId: 98,
    weaponType: WeaponType.sword,
    isv: [25, 25, 40],
    growthRate: [1.6, 1.6, 2],
    bmv: [15, 15, 7],
    mastery: SKILL_TYPE.cursedSealJutsu.name
  },
  cc: {
    name: "C.C",
    evoName: "C.C",
    iconId: 206,
    weaponType: WeaponType.staff,
    isv: [24, 38, 34],
    growthRate: [1.5, 1.9, 1.8],
    bmv: [16, 8, 10],
    mastery: SKILL_TYPE.thunder.name
  },
  stryker: {
    name: "Stryker",
    evoName: "E·Stryker",
    iconId: 93,
    weaponType: WeaponType.sword,
    isv: [38, 25, 33],
    growthRate: [1.9, 1.45, 1.85],
    bmv: [8, 15, 11],
    mastery: SKILL_TYPE.fire.name
  },
};

export const PET = {
  galeFox: {
    name: "Gale Fox",
    evoName: "Speedy Fox",
    iconId: 1,
    evoIconId: 1001,
    specialSkill: PET_SKILL.dizzy
  },
  dog: {
    name: "Psychic Dog",
    evoName: "Ghost Dog",
    iconId: 2,
    evoIconId: 1002,
    specialSkill: PET_SKILL.seal
  },
  riceball: {
    name: "Rice Ball",
    evoName: "Armed Rice Ball",
    iconId: 3,
    evoIconId: 1003,
    specialSkill: PET_SKILL.healing
  },
  slime: {
    name: "Slime",
    evoName: "Plague Slime",
    iconId: 4,
    evoIconId: 1004,
    specialSkill: PET_SKILL.poison
  },
  penguin: {
    name: "Polar Penguin",
    evoName: "Battle Penguin",
    iconId: 5,
    evoIconId: 1005,
    specialSkill: PET_SKILL.freezing
  },
  bat: {
    name: "Vampire Bat",
    evoName: "Bat King",
    iconId: 6,
    evoIconId: 1006,
    specialSkill: PET_SKILL.bloodsucking
  },
  toad: {
    name: "Toad King",
    evoName: "Fury Toad",
    iconId: 7,
    evoIconId: 1007,
    specialSkill: PET_SKILL.weakening
  },
  tiger: {
    name: "Ghost Tiger",
    evoName: "Armor Ghost Tiger",
    iconId: 8,
    evoIconId: 1008,
    specialSkill: PET_SKILL.cleanse
  },
  coco: {
    name: "Coco",
    evoName: "COCOS",
    iconId: 9,
    evoIconId: 1009,
    specialSkill: PET_SKILL.thorns
  },
  unicorn: {
    name: "Unicorn",
    evoName: "Blessed Unicorn",
    iconId: 10,
    evoIconId: 1010,
    specialSkill: PET_SKILL.shieldwall
  },
  dragon: {
    name: "Black Dragon",
    evoName: "War Dragon",
    iconId: 11,
    evoIconId: 1011,
    specialSkill: PET_SKILL.barbarian
  },
  fenrir: {
    name: "Fenrir",
    evoName: "Fenrir",
    iconId: 12,
    evoIconId: 1012,
    specialSkill: PET_SKILL.dizzy
  },
  sleipnir: {
    name: "Sleipnir",
    evoName: "Sleipnir",
    iconId: 13,
    evoIconId: 1013,
    specialSkill: PET_SKILL.freezing
  },
  rekachu: {
    name: "Rekachu",
    evoName: "Awakening Rekachu",
    iconId: 15,
    evoIconId: 1015,
    specialSkill: PET_SKILL.seal
  },
  snowFox: {
    name: "Snow Fox",
    evoName: "Snow Fox",
    iconId: 17,
    evoIconId: 1017,
    specialSkill: PET_SKILL.wind
  },
};
