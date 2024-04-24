import { PetSkillType, SkillPhase, SkillTarget } from "./categories.js";
import Status from "./status.js";

const PetSkills = {
  def_30: {
    name: "30DEF",
    type: PetSkillType.stat,
    iconId: 1,
    stat: { def: 30 }
  },
  def_60: {
    name: "60DEF",
    type: PetSkillType.stat,
    iconId: 2,
    stat: { def: 60 }
  },
  brk_50: {
    name: "50BRK",
    type: PetSkillType.stat,
    iconId: 3,
    stat: { brk: 50 }
  },
  brk_100: {
    name: "100BRK",
    type: PetSkillType.stat,
    iconId: 4,
    stat: { brk: 100 }
  },
  res_50: {
    name: "50RES",
    type: PetSkillType.stat,
    iconId: 5,
    stat: { res: 50 }
  },
  res_100: {
    name: "100RES",
    type: PetSkillType.stat,
    iconId: 6,
    stat: { res: 100 }
  },
  crt_50: {
    name: "50CRT",
    type: PetSkillType.stat,
    iconId: 7,
    stat: { crt: 50 }
  },
  crt_100: {
    name: "100CRT",
    type: PetSkillType.stat,
    iconId: 8,
    stat: { crt: 100 }
  },
  hpPercent_5: {
    name: "5HP%",
    type: PetSkillType.stat,
    iconId: 9,
    stat: { hpPercent: 5 }
  },
  hpPercent_10: {
    name: "10HP%",
    type: PetSkillType.stat,
    iconId: 10,
    stat: { hpPercent: 10 }
  },
  maxAtk_10: {
    name: "10Max ATK",
    type: PetSkillType.stat,
    iconId: 11,
    stat: { maxAtk: 10 }
  },
  maxAtk_20: {
    name: "20Max ATK",
    type: PetSkillType.stat,
    iconId: 12,
    stat: { maxAtk: 20 }
  },
  hit_50: {
    name: "50HIT",
    type: PetSkillType.stat,
    iconId: 13,
    stat: { hit: 50 }
  },
  hit_100: {
    name: "100HIT",
    type: PetSkillType.stat,
    iconId: 14,
    stat: { hit: 100 }
  },
  sp_10: {
    name: "10SP",
    type: PetSkillType.stat,
    iconId: 15,
    stat: { sp: 10 }
  },
  sp_20: {
    name: "20SP",
    type: PetSkillType.stat,
    iconId: 16,
    stat: { sp: 20 }
  },
  atkPercent_5: {
    name: "5ATK%",
    type: PetSkillType.stat,
    iconId: 17,
    stat: { atkPercent: 5 }
  },
  atkPercent_10: {
    name: "10ATK%",
    type: PetSkillType.stat,
    iconId: 18,
    stat: { atkPercent: 10 }
  },
  eva_25: {
    name: "25EVA",
    type: PetSkillType.stat,
    iconId: 19,
    stat: { eva: 25 }
  },
  eva_50: {
    name: "50EVA",
    type: PetSkillType.stat,
    iconId: 20,
    stat: { eva: 50 }
  },
  hp_30: {
    name: "30HP",
    type: PetSkillType.stat,
    iconId: 21,
    stat: { hp: 30 }
  },
  hp_60: {
    name: "60HP",
    type: PetSkillType.stat,
    iconId: 22,
    stat: { hp: 60 }
  },
  spd_5: {
    name: "5SPD",
    type: PetSkillType.stat,
    iconId: 23,
    stat: { spd: 5 }
  },
  spd_10: {
    name: "10SPD",
    type: PetSkillType.stat,
    iconId: 24,
    stat: { spd: 10 }
  },
  scratch: {
    name: "Scratch",
    type: PetSkillType.skill,
    iconId: 25,
    damage: {
      atkMultiplier: 0.5
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10
  },
  block: {
    name: "Defense",
    type: PetSkillType.skill,
    iconId: 26,
    effect: {
      blockAttack: true
    },
    phase: SkillPhase.duringAllEnemyAttacks,
    triggerPercent: 10,
  },
  foxSpecialStat: {
    name: "50EVA (Gale Fox Special)",
    type: PetSkillType.stat,
    iconId: "27_1",
    stat: { eva: 50 }
  },
  dogSpecialStat: {
    name: "150BRK (Psychic Dog Special)",
    type: PetSkillType.stat,
    iconId: "27_2",
    stat: { brk: 150 }
  },
  riceballSpecialStat: {
    name: "60HP (Rice Ball Special)",
    type: PetSkillType.stat,
    iconId: "27_3",
    stat: { hp: 60 }
  },
  slimeSpecialStat: {
    name: "150RES (Slime Special)",
    type: PetSkillType.stat,
    iconId: "27_4",
    stat: { res: 150 }
  },
  penguinSpecialStat: {
    name: "60DEF (Penguin Special)",
    type: PetSkillType.stat,
    iconId: "27_5",
    stat: { def: 60 }
  },
  batSpecialStat: {
    name: "150CRT (Vampire Bat Special)",
    type: PetSkillType.stat,
    iconId: "27_6",
    stat: { crt: 150 }
  },
  toadSpecialStat: {
    name: "10SPD (Toad King Special)",
    type: PetSkillType.stat,
    iconId: "27_7",
    stat: { spd: 10 }
  },
  tigerSpecialStat: {
    name: "50EVA (Ghost Tiger Special)",
    type: PetSkillType.stat,
    iconId: "27_8",
    stat: { eva: 50 }
  },
  cocoSpecialStat: {
    name: "150HIT (Coco Special)",
    type: PetSkillType.stat,
    iconId: "27_9",
    stat: { hit: 150 }
  },
  unicornSpecialStat: {
    name: "150HIT (Unicorn Special)",
    type: PetSkillType.stat,
    iconId: "27_10",
    stat: { hit: 150 }
  },
  dragonSpecialStat: {
    name: "150BRK (Black Dragon Special)",
    type: PetSkillType.stat,
    iconId: "27_11",
    stat: { brk: 150 }
  },
  fenrirSpecialStat: {
    name: "150CRT (Fenrir Special)",
    type: PetSkillType.stat,
    iconId: "27_12",
    stat: { crt: 150 }
  },
  sleipnirSpecialStat: {
    name: "150BRK (Sleipnir Special)",
    type: PetSkillType.stat,
    iconId: "27_13",
    stat: { brk: 150 }
  },
  rekachuSpecialStat: {
    name: "50EVA (Rekachu Special)",
    type: PetSkillType.stat,
    iconId: "27_15",
    stat: { eva: 50 }
  },
  snowFoxSpecialStat: {
    name: "10SPD (Snow Fox Special)",
    type: PetSkillType.stat,
    iconId: "27_17",
    stat: { spd: 10 }
  },
  moleSpecialStat: {
    name: "150EVA (Mole Special)",
    type: PetSkillType.stat,
    iconId: "27_69",
    stat: { eva: 150 }
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
      target: SkillTarget.enemy,
      applyAfterFury: true
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
      target: SkillTarget.enemy,
      applyAfterFury: true
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
  moleSpecialSkill: {
    name: "Burrow (Mole Special)",
    type: PetSkillType.skill,
    iconId: "28_69",
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.goldenShield.name,
      target: SkillTarget.self
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 10,
  },
  def_20Evo: {
    name: "20DEF (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 31,
    stat: { def: 20 }
  },
  brk_20Evo: {
    name: "20BRK (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 32,
    stat: { brk: 20 }
  },
  res_20Evo: {
    name: "20RES (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 33,
    stat: { res: 20 }
  },
  crt_20Evo: {
    name: "20CRT (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 34,
    stat: { crt: 20 }
  },
  hpPercent_10Evo: {
    name: "10HP% (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 35,
    stat: { hpPercent: 10 }
  },
  maxAtk_20Evo: {
    name: "20Max ATK (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 36,
    stat: { maxAtk: 20 }
  },
  hit_20Evo: {
    name: "20HIT (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 37,
    stat: { hit: 20 }
  },
  sp_10Evo: {
    name: "10SP (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 38,
    stat: { sp: 10 }
  },
  atkPercent_10Evo: {
    name: "10ATK% (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 39,
    stat: { atkPercent: 10 }
  },
  eva_20Evo: {
    name: "20EVA (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 40,
    stat: { eva: 20 }
  },
  hp_50Evo: {
    name: "50HP (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 41,
    stat: { hp: 50 }
  },
  spd_10Evo: {
    name: "10SPD (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 42,
    stat: { spd: 10 }
  },
  def_30Evo: {
    name: "30DEF (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 51,
    stat: { def: 30 }
  },
  brk_30Evo: {
    name: "30BRK (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 52,
    stat: { brk: 30 }
  },
  res_30Evo: {
    name: "30RES (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 53,
    stat: { res: 30 }
  },
  crt_30Evo: {
    name: "30CRT (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 54,
    stat: { crt: 30 }
  },
  hpPercent_15Evo: {
    name: "15HP% (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 55,
    stat: { hpPercent: 15 }
  },
  maxAtk_30Evo: {
    name: "30Max ATK (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 56,
    stat: { maxAtk: 30 }
  },
  hit_30Evo: {
    name: "30HIT (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 57,
    stat: { hit: 30 }
  },
  sp_20Evo: {
    name: "20SP (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 58,
    stat: { sp: 20 }
  },
  atkPercent_15Evo: {
    name: "15ATK% (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 59,
    stat: { atkPercent: 15 }
  },
  eva_30Evo: {
    name: "30EVA (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 60,
    stat: { eva: 30 }
  },
  hp_80Evo: {
    name: "80HP (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 61,
    stat: { hp: 80 }
  },
  spd_20Evo: {
    name: "20SPD (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 62,
    stat: { spd: 20 }
  },
  def_50Evo: {
    name: "50DEF (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 71,
    stat: { def: 50 }
  },
  brk_50Evo: {
    name: "50BRK (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 72,
    stat: { brk: 50 }
  },
  res_50Evo: {
    name: "50RES (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 73,
    stat: { res: 50 }
  },
  crt_50Evo: {
    name: "50CRT (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 74,
    stat: { crt: 50 }
  },
  hpPercent_25Evo: {
    name: "25HP% (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 75,
    stat: { hpPercent: 25 }
  },
  maxAtk_50Evo: {
    name: "50Max ATK (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 76,
    stat: { maxAtk: 50 }
  },
  hit_50Evo: {
    name: "50HIT (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 77,
    stat: { hit: 50 }
  },
  sp_30Evo: {
    name: "30SP (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 78,
    stat: { sp: 30 }
  },
  atkPercent_25Evo: {
    name: "25ATK% (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 79,
    stat: { atkPercent: 25 }
  },
  eva_50Evo: {
    name: "50EVA (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 80,
    stat: { eva: 50 }
  },
  hp_130Evo: {
    name: "130HP (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 81,
    stat: { hp: 130 }
  },
  spd_30Evo: {
    name: "30SPD (Evolved)",
    type: PetSkillType.evolvedStat,
    iconId: 82,
    stat: { spd: 30 }
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
