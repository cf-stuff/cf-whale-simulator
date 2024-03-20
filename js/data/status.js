import { StatusType } from "./categories.js";

const Status = {
  energyShield: {
    name: "Bubble",
    type: StatusType.buff,
    effect: {
      percentHpShield: 20,
      immuneToThunderGod: true,
      preventHealingWhenDamageAbsorbed: true
    },
    getExpertiseVersion: function () {
      this.effect.percentHpShield = 25
    }
  },
  bloodFrenzy: {
    name: "Frenzy",
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
      debuffDurationMultiplier: 0.75,
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
      removeIgnitedOnInflict: true
    },
    removeWhenAttacked: true,
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
    type: StatusType.debuff,
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
    name: "Drunk",
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
  },
  feeble: {
    name: "Feeble",
    type: StatusType.other,
    effect: {
      decreaseBrk: 200,
      decreaseDef: 200
    },
    stackable: true,
  },
  clumsy: {
    name: "Clumsy",
    type: StatusType.other,
    effect: {
      decreaseHit: 200,
      decreaseEva: 200
    },
    stackable: true,
  },
};

export default Status;
