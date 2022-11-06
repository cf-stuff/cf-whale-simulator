import { PetSkillType, SkillPhase, SkillTarget } from "./categories.js";
import Status from "./status.js";

const PetSkills = {
  def_30: {
    name: "30DEF",
    type: PetSkillType.stat,
    iconId: 1
  },
  def_60: {
    name: "60DEF",
    type: PetSkillType.stat,
    iconId: 2
  },
  brk_50: {
    name: "50BRK",
    type: PetSkillType.stat,
    iconId: 3
  },
  brk_100: {
    name: "100BRK",
    type: PetSkillType.stat,
    iconId: 4
  },
  res_50: {
    name: "50RES",
    type: PetSkillType.stat,
    iconId: 5
  },
  res_100: {
    name: "100RES",
    type: PetSkillType.stat,
    iconId: 6
  },
  crt_50: {
    name: "50CRT",
    type: PetSkillType.stat,
    iconId: 7
  },
  crt_100: {
    name: "100CRT",
    type: PetSkillType.stat,
    iconId: 8
  },
  hpPercent_5: {
    name: "5HP%",
    type: PetSkillType.stat,
    iconId: 9
  },
  hpPercent_10: {
    name: "10HP%",
    type: PetSkillType.stat,
    iconId: 10
  },
  maxAtk_10: {
    name: "10Max ATK",
    type: PetSkillType.stat,
    iconId: 11
  },
  maxAtk_20: {
    name: "20Max ATK",
    type: PetSkillType.stat,
    iconId: 12
  },
  hit_50: {
    name: "50HIT",
    type: PetSkillType.stat,
    iconId: 13
  },
  hit_100: {
    name: "100HIT",
    type: PetSkillType.stat,
    iconId: 14
  },
  sp_10: {
    name: "10SP",
    type: PetSkillType.stat,
    iconId: 15
  },
  sp_20: {
    name: "20SP",
    type: PetSkillType.stat,
    iconId: 16
  },
  atkPercent_5: {
    name: "5ATK%",
    type: PetSkillType.stat,
    iconId: 17
  },
  atkPercent_10: {
    name: "10ATK%",
    type: PetSkillType.stat,
    iconId: 18
  },
  eva_25: {
    name: "25EVA",
    type: PetSkillType.stat,
    iconId: 19
  },
  eva_50: {
    name: "50EVA",
    type: PetSkillType.stat,
    iconId: 20
  },
  hp_30: {
    name: "30HP",
    type: PetSkillType.stat,
    iconId: 21
  },
  hp_60: {
    name: "60HP",
    type: PetSkillType.stat,
    iconId: 22
  },
  spd_5: {
    name: "5SPD",
    type: PetSkillType.stat,
    iconId: 23
  },
  spd_10: {
    name: "10SPD",
    type: PetSkillType.stat,
    iconId: 24
  },
  scratch: {
    name: "Scratch",
    type: PetSkillType.skill,
    iconId: 25,
    skill: {
      phase: SkillPhase.petAttack,
      triggerPercent: 10
    }
  },
  block: {
    name: "Defense",
    type: PetSkillType.skill,
    iconId: 26,
    skill: {
      effect: {
        blockAttack: true
      },
      phase: SkillPhase.duringAllEnemyAttacks,
      triggerPercent: 10,
    }
  },
  foxSpecialStat: {
    name: "50EVA (Gale Fox Special)",
    type: PetSkillType.stat,
    iconId: "27_1"
  },
  dogSpecialStat: {
    name: "150BRK (Psychic Dog Special)",
    type: PetSkillType.stat,
    iconId: "27_2"
  },
  riceballSpecialStat: {
    name: "60HP (Rice Ball Special)",
    type: PetSkillType.stat,
    iconId: "27_3"
  },
  slimeSpecialStat: {
    name: "150RES (Slime Special)",
    type: PetSkillType.stat,
    iconId: "27_4"
  },
  penguinSpecialStat: {
    name: "60DEF (Penguin Special)",
    type: PetSkillType.stat,
    iconId: "27_5"
  },
  batSpecialStat: {
    name: "150CRT (Vampire Bat Special)",
    type: PetSkillType.stat,
    iconId: "27_6"
  },
  toadSpecialStat: {
    name: "10SPD (Toad King Special)",
    type: PetSkillType.stat,
    iconId: "27_7"
  },
  tigerSpecialStat: {
    name: "50EVA (Ghost Tiger Special)",
    type: PetSkillType.stat,
    iconId: "27_8"
  },
  cocoSpecialStat: {
    name: "150HIT (Coco Special)",
    type: PetSkillType.stat,
    iconId: "27_9"
  },
  unicornSpecialStat: {
    name: "150HIT (Unicorn Special)",
    type: PetSkillType.stat,
    iconId: "27_10"
  },
  dragonSpecialStat: {
    name: "150BRK (Black Dragon Special)",
    type: PetSkillType.stat,
    iconId: "27_11"
  },
  fenrirSpecialStat: {
    name: "150CRT (Fenrir Special)",
    type: PetSkillType.stat,
    iconId: "27_12"
  },
  sleipnirSpecialStat: {
    name: "150BRK (Sleipnir Special)",
    type: PetSkillType.stat,
    iconId: "27_13"
  },
  rekachuSpecialStat: {
    name: "50EVA (Rekachu Special)",
    type: PetSkillType.stat,
    iconId: "27_15"
  },
  snowFoxSpecialStat: {
    name: "10SPD (Snow Fox Special)",
    type: PetSkillType.stat,
    iconId: "27_17"
  },
  foxSpecialSkill: {
    name: "Stun (Gale Fox Special)",
    type: PetSkillType.skill,
    iconId: "28_1",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.dizzy.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,

  },
  dogSpecialSkill: {
    name: "Seal (Psychic Dog Special)",
    type: PetSkillType.skill,
    iconId: "28_2",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.silenced.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  riceballSpecialSkill: {
    name: "Healing (Rice Ball Special)",
    type: PetSkillType.skill,
    iconId: "28_3",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      gainPercentHp: 10
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  slimeSpecialSkill: {
    name: "Poison (Slime Special)",
    type: PetSkillType.skill,
    iconId: "28_4",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.poisoned.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  penguinSpecialSkill: {
    name: "Freezing (Penguin Special)",
    type: PetSkillType.skill,
    iconId: "28_5",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.frozen.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  batSpecialSkill: {
    name: "Bloodsucking (Vampire Bat Special)",
    type: PetSkillType.skill,
    iconId: "28_6",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      percentDamageHealedOnHit: 50
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  toadSpecialSkill: {
    name: "Weakening (Toad King Special)",
    type: PetSkillType.skill,
    iconId: "28_7",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.weakened.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  tigerSpecialSkill: {
    name: "Disperse (Ghost Tiger Special)",
    type: PetSkillType.skill,
    iconId: "28_8",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      removeRandomDebuff: true
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  cocoSpecialSkill: {
    name: "Wind (Coco Special)",
    type: PetSkillType.skill,
    iconId: "28_9",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.rooted.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  unicornSpecialSkill: {
    name: "Armor (Unicorn Special)",
    type: PetSkillType.skill,
    iconId: "28_10",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.shieldWall.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  dragonSpecialSkill: {
    name: "Barbarian (Black Dragon Special)",
    type: PetSkillType.skill,
    iconId: "28_11",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.barbarism.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  fenrirSpecialSkill: {
    name: "Stun (Fenrir Special)",
    type: PetSkillType.skill,
    iconId: "28_12",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.dizzy.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  sleipnirSpecialSkill: {
    name: "Freezing (Sleipnir Special)",
    type: PetSkillType.skill,
    iconId: "28_13",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.frozen.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  rekachuSpecialSkill: {
    name: "Seal (Rekachu Special)",
    type: PetSkillType.skill,
    iconId: "28_15",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.silenced.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  snowFoxSpecialSkill: {
    name: "Wind (Snow Fox Special)",
    type: PetSkillType.skill,
    iconId: "28_17",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.rooted.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  def_20Evo: {
    name: "20DEF",
    type: PetSkillType.evolvedStat,
    iconId: 31
  },
  brk_20Evo: {
    name: "20BRK",
    type: PetSkillType.evolvedStat,
    iconId: 32
  },
  res_20Evo: {
    name: "20RES",
    type: PetSkillType.evolvedStat,
    iconId: 33
  },
  crt_20Evo: {
    name: "20CRT",
    type: PetSkillType.evolvedStat,
    iconId: 34
  },
  hpPercent_10Evo: {
    name: "10HP%",
    type: PetSkillType.evolvedStat,
    iconId: 35
  },
  maxAtk_20Evo: {
    name: "20Max ATK",
    type: PetSkillType.evolvedStat,
    iconId: 36
  },
  hit_20Evo: {
    name: "20HIT",
    type: PetSkillType.evolvedStat,
    iconId: 37
  },
  sp_10Evo: {
    name: "10SP",
    type: PetSkillType.evolvedStat,
    iconId: 38
  },
  atkPercent_10Evo: {
    name: "10ATK%",
    type: PetSkillType.evolvedStat,
    iconId: 39
  },
  eva_20Evo: {
    name: "20EVA",
    type: PetSkillType.evolvedStat,
    iconId: 40
  },
  hp_50Evo: {
    name: "50HP",
    type: PetSkillType.evolvedStat,
    iconId: 41
  },
  spd_10Evo: {
    name: "10SPD",
    type: PetSkillType.evolvedStat,
    iconId: 42
  },
  def_30Evo: {
    name: "30DEF",
    type: PetSkillType.evolvedStat,
    iconId: 51
  },
  brk_30Evo: {
    name: "30BRK",
    type: PetSkillType.evolvedStat,
    iconId: 52
  },
  res_30Evo: {
    name: "30RES",
    type: PetSkillType.evolvedStat,
    iconId: 53
  },
  crt_30Evo: {
    name: "30CRT",
    type: PetSkillType.evolvedStat,
    iconId: 54
  },
  hpPercent_15Evo: {
    name: "15HP%",
    type: PetSkillType.evolvedStat,
    iconId: 55
  },
  maxAtk_30Evo: {
    name: "30Max ATK",
    type: PetSkillType.evolvedStat,
    iconId: 56
  },
  hit_30Evo: {
    name: "30HIT",
    type: PetSkillType.evolvedStat,
    iconId: 57
  },
  sp_20Evo: {
    name: "20SP",
    type: PetSkillType.evolvedStat,
    iconId: 58
  },
  atkPercent_15Evo: {
    name: "15ATK%",
    type: PetSkillType.evolvedStat,
    iconId: 59
  },
  eva_30Evo: {
    name: "30EVA",
    type: PetSkillType.evolvedStat,
    iconId: 60
  },
  hp_80Evo: {
    name: "80HP",
    type: PetSkillType.evolvedStat,
    iconId: 61
  },
  spd_20Evo: {
    name: "20SPD",
    type: PetSkillType.evolvedStat,
    iconId: 62
  },
  def_50Evo: {
    name: "50DEF",
    type: PetSkillType.evolvedStat,
    iconId: 71
  },
  brk_50Evo: {
    name: "50BRK",
    type: PetSkillType.evolvedStat,
    iconId: 72
  },
  res_50Evo: {
    name: "50RES",
    type: PetSkillType.evolvedStat,
    iconId: 73
  },
  crt_50Evo: {
    name: "50CRT",
    type: PetSkillType.evolvedStat,
    iconId: 74
  },
  hpPercent_25Evo: {
    name: "25HP%",
    type: PetSkillType.evolvedStat,
    iconId: 75
  },
  maxAtk_50Evo: {
    name: "50Max ATK",
    type: PetSkillType.evolvedStat,
    iconId: 76
  },
  hit_50Evo: {
    name: "50HIT",
    type: PetSkillType.evolvedStat,
    iconId: 77
  },
  sp_30Evo: {
    name: "30SP",
    type: PetSkillType.evolvedStat,
    iconId: 78
  },
  atkPercent_25Evo: {
    name: "25ATK%",
    type: PetSkillType.evolvedStat,
    iconId: 79
  },
  eva_50Evo: {
    name: "50EVA",
    type: PetSkillType.evolvedStat,
    iconId: 80
  },
  hp_130Evo: {
    name: "130HP",
    type: PetSkillType.evolvedStat,
    iconId: 81
  },
  spd_30Evo: {
    name: "30SPD",
    type: PetSkillType.evolvedStat,
    iconId: 82
  },
  infect: {
    name: "Infect (Active)",
    type: PetSkillType.active,
    iconId: 91,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.sick.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  needle: {
    name: "Energy (Active)",
    type: PetSkillType.active,
    iconId: 92,
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
    name: "Thunder (Active)",
    type: PetSkillType.active,
    iconId: 93,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.thunderGod.name,
      target: SkillTarget.enemy,
      removeThunderGod: true
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  force: {
    name: "Force (Active)",
    type: PetSkillType.active,
    iconId: 94,
    damage: {
      atkMultiplier: 1.8
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  ignite: {
    name: "Fire (Active)",
    type: PetSkillType.active,
    iconId: 95,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.ignited.name,
      target: SkillTarget.enemy,
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  barbarian: {
    name: "Barbarian (Active)",
    type: PetSkillType.active,
    iconId: 96,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.barbarism.name,
      target: SkillTarget.self,
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 7,
  },
  wine: {
    name: "Wine (Passive)",
    type: PetSkillType.passive,
    iconId: 101,
    effect: {
      status: Status.wine.name,
      target: SkillTarget.enemy,
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  shieldWall: {
    name: "Shield Wall (Passive)",
    type: PetSkillType.passive,
    iconId: 102,
    effect: {
      status: Status.shieldWall.name,
      target: SkillTarget.self,
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  meditation: {
    name: "Meditation (Passive)",
    type: PetSkillType.passive,
    iconId: 103,
    effect: {
      gainPercentSp: 15
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  cleanse: {
    name: "Cleanse (Passive)",
    type: PetSkillType.passive,
    iconId: 104,
    effect: {
      removeRandomDebuff: true
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  healing: {
    name: "Healing (Passive)",
    type: PetSkillType.passive,
    iconId: 105,
    effect: {
      gainPercentHp: 10,
      removePoison: true
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  },
  energyShield: {
    name: "Energy Shield (Passive)",
    type: PetSkillType.passive,
    iconId: 106,
    effect: {
      status: Status.energyShield.name,
      target: SkillTarget.self,
    },
    phase: SkillPhase.onPetBlock,
    triggerPercent: 40,
  }
};

export default PetSkills;
