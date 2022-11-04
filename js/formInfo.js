import { EVOLVED_FIGHTER_SKILL, EVOLVED_PET_SKILL, PET_SKILL, WeaponType } from "./config.js"

export const BuildStat = {
  str: "STR",
  dex: "DEX",
  sta: "STA",
  brk: "BRK",
  def: "DEF",
  hit: "HIT",
  eva: "EVA",
  res: "RES",
  crt: "CRT",
  atkPercent: "ATK%",
  minAtk: "Min ATK",
  maxAtk: "Max ATK",
  hpPercent: "HP%",
  hp: "HP",
  spd: "SPD",
  spPercent: "SP%",
  sp: "SP",
  furyReversion: "Fury Reversion"
}

export const BuildStatReverse = {
  "STR": "str",
  "DEX": "dex",
  "STA": "sta",
  "BRK": "brk",
  "DEF": "def",
  "HIT": "hit",
  "EVA": "eva",
  "RES": "res",
  "CRT": "crt",
  "ATK%": "atkPercent",
  "Min ATK": "minAtk",
  "Max ATK": "maxAtk",
  "HP%": "hpPercent",
  "HP": "hp",
  "SPD": "spd",
  "SP%": "spPercent",
  "SP": "sp",
  "Fury Reversion": "furyReversion"
}

export const GlyphStat = {
  def: BuildStat.def,
  brk: BuildStat.brk,
  crt: BuildStat.crt,
  eva: BuildStat.eva,
  hit: BuildStat.hit,
  res: BuildStat.res
}

export const FighterSkillIconType = {
  stat: "stat",
  reset: "reset",
  healing: "healing"
}

export const PetSkillIconType = {
  stat: "stat",
  skill: "skill",
  passive: "passive",
  active: "active"
}

export const Phylactery = {
  initialBMV: 12,
  bmvStats: [0, 2, 4, 6, 8, 11, 14, 18, 22, 27, 32, 37, 43, 49, 55, 62, 69, 76, 84, 92, 100]
}

export const GearType = {
  weapon: {
    name: "Weapon",
    iconId: 0
  },
  helmet: {
    name: "Head",
    iconId: 2
  },
  necklace: {
    name: "Necklace",
    iconId: 3
  },
  shoes: {
    name: "Shoes",
    iconId: 4
  },
  chest: {
    name: "Chest",
    iconId: 1
  },
  gloves: {
    name: "Gloves",
    iconId: 5
  },
  pants: {
    name: "Pants",
    iconId: 6
  },
  ring: {
    name: "Ring",
    iconId: 7
  },
}

export const GemType = {
  normal: "normal",
  fusion: "fusion"
}

export const GEM = {
  sapphire: {
    name: "Sapphire",
    iconId: 14,
    type: GemType.normal,
    statsPerLevel: {
      dex: 7
    }
  },
  topaz: {
    name: "Topaz",
    iconId: 15,
    type: GemType.normal,
    statsPerLevel: {
      sta: 7
    }
  },
  ruby: {
    name: "Ruby",
    iconId: 16,
    type: GemType.normal,
    statsPerLevel: {
      str: 7
    }
  },
  amethyst: {
    name: "Amethyst",
    iconId: 17,
    type: GemType.fusion,
    statsPerLevel: {
      str: 5,
      dex: 5
    }
  },
  garnet: {
    name: "Garnet",
    iconId: 18,
    type: GemType.fusion,
    statsPerLevel: {
      str: 5,
      sta: 5
    }
  },
  emerald: {
    name: "Emerald",
    iconId: 19,
    type: GemType.fusion,
    statsPerLevel: {
      dex: 5,
      sta: 5
    }
  }
}

export const FIGHTER_SKILL_ICONS = {
  energyShield: {
    name: EVOLVED_FIGHTER_SKILL.energyShield.name,
    type: FighterSkillIconType.reset,
    iconIds: [1, 10, 19]
  },
  bloodFrenzy: {
    name: EVOLVED_FIGHTER_SKILL.bloodFrenzy.name,
    type: FighterSkillIconType.reset,
    iconIds: [2, 11, 20]
  },
  goldenshield: {
    name: EVOLVED_FIGHTER_SKILL.goldenShield.name,
    type: FighterSkillIconType.reset,
    iconIds: [3, 12, 21]
  },
  thunderclapQuake: {
    name: EVOLVED_FIGHTER_SKILL.thunderclapQuake.name,
    type: FighterSkillIconType.reset,
    iconIds: [4, 13, 22]
  },
  thornShield: {
    name: EVOLVED_FIGHTER_SKILL.thornShield.name,
    type: FighterSkillIconType.reset,
    iconIds: [5, 14, 23]
  },
  heavyHammer: {
    name: EVOLVED_FIGHTER_SKILL.heavyHammer.name,
    type: FighterSkillIconType.reset,
    iconIds: [6, 15, 24]
  },
  rejuvenation: {
    name: EVOLVED_FIGHTER_SKILL.rejuvenation.name,
    type: FighterSkillIconType.reset,
    iconIds: [7, 16, 25]
  },
  ghoulBlock: {
    name: EVOLVED_FIGHTER_SKILL.ghoulBlock.name,
    type: FighterSkillIconType.reset,
    iconIds: [8, 17, 26]
  },
  skillShackles: {
    name: EVOLVED_FIGHTER_SKILL.skillShackles.name,
    type: FighterSkillIconType.reset,
    iconIds: [9, 18, 27]
  },
  pray: {
    name: EVOLVED_FIGHTER_SKILL.pray.name,
    type: FighterSkillIconType.healing,
    iconIds: [28, 33, 38]
  },
  wine: {
    name: EVOLVED_FIGHTER_SKILL.wine.name,
    type: FighterSkillIconType.healing,
    iconIds: [29, 34, 39]
  },
  shieldWall: {
    name: EVOLVED_FIGHTER_SKILL.shieldWall.name,
    type: FighterSkillIconType.healing,
    iconIds: [30, 35, 40]
  },
  fireShield: {
    name: EVOLVED_FIGHTER_SKILL.fireShield.name,
    type: FighterSkillIconType.healing,
    iconIds: [31, 36, 41]
  },
  counterattack: {
    name: EVOLVED_FIGHTER_SKILL.counterattack.name,
    type: FighterSkillIconType.healing,
    iconIds: [32, 37, 42]
  },
  def: {
    name: BuildStat.def,
    type: FighterSkillIconType.stat,
    iconIds: [43, 56, 69],
    values: [20, 30, 50]
  },
  brk: {
    name: BuildStat.brk,
    type: FighterSkillIconType.stat,
    iconIds: [44, 57, 70],
    values: [20, 30, 50]
  },
  res: {
    name: BuildStat.res,
    type: FighterSkillIconType.stat,
    iconIds: [45, 58, 71],
    values: [20, 30, 50]
  },
  crt: {
    name: BuildStat.crt,
    type: FighterSkillIconType.stat,
    iconIds: [46, 59, 72],
    values: [20, 30, 50]
  },
  hpPercent: {
    name: BuildStat.hpPercent,
    type: FighterSkillIconType.stat,
    iconIds: [47, 60, 73],
    values: [10, 15, 25]
  },
  maxAtk: {
    name: BuildStat.maxAtk,
    type: FighterSkillIconType.stat,
    iconIds: [48, 61, 74],
    values: [20, 30, 50]
  },
  hit: {
    name: BuildStat.hit,
    type: FighterSkillIconType.stat,
    iconIds: [49, 62, 75],
    values: [20, 30, 50]
  },
  sp: {
    name: BuildStat.sp,
    type: FighterSkillIconType.stat,
    iconIds: [50, 63, 76],
    values: [10, 20, 30]
  },
  atkPercent: {
    name: BuildStat.atkPercent,
    type: FighterSkillIconType.stat,
    iconIds: [51, 64, 77],
    values: [10, 15, 25]
  },
  eva: {
    name: BuildStat.eva,
    type: FighterSkillIconType.stat,
    iconIds: [52, 65, 78],
    values: [20, 30, 50]
  },
  hp: {
    name: BuildStat.hp,
    type: FighterSkillIconType.stat,
    iconIds: [53, 66, 79],
    values: [50, 80, 130]
  },
  spd: {
    name: BuildStat.spd,
    type: FighterSkillIconType.stat,
    iconIds: [54, 67, 80],
    values: [10, 20, 30]
  },
  fury: {
    name: BuildStat.furyReversion,
    type: FighterSkillIconType.stat,
    iconIds: [55, 68, 81],
    values: [2, 3, 5]
  }
}

export const PET_SKILL_ICONS = {
  def_30: {
    name: "30DEF",
    type: PetSkillIconType.stat,
    iconId: 1
  },
  def_60: {
    name: "60DEF",
    type: PetSkillIconType.stat,
    iconId: 2
  },
  brk_50: {
    name: "50BRK",
    type: PetSkillIconType.stat,
    iconId: 3
  },
  brk_100: {
    name: "100BRK",
    type: PetSkillIconType.stat,
    iconId: 4
  },
  res_50: {
    name: "50RES",
    type: PetSkillIconType.stat,
    iconId: 5
  },
  res_100: {
    name: "100RES",
    type: PetSkillIconType.stat,
    iconId: 6
  },
  crt_50: {
    name: "50CRT",
    type: PetSkillIconType.stat,
    iconId: 7
  },
  crt_100: {
    name: "100CRT",
    type: PetSkillIconType.stat,
    iconId: 8
  },
  hpPercent_5: {
    name: "5HP%",
    type: PetSkillIconType.stat,
    iconId: 9
  },
  hpPercent_10: {
    name: "10HP%",
    type: PetSkillIconType.stat,
    iconId: 10
  },
  maxAtk_10: {
    name: "10Max ATK",
    type: PetSkillIconType.stat,
    iconId: 11
  },
  maxAtk_20: {
    name: "20Max ATK",
    type: PetSkillIconType.stat,
    iconId: 12
  },
  hit_50: {
    name: "50HIT",
    type: PetSkillIconType.stat,
    iconId: 13
  },
  hit_100: {
    name: "100HIT",
    type: PetSkillIconType.stat,
    iconId: 14
  },
  sp_10: {
    name: "10SP",
    type: PetSkillIconType.stat,
    iconId: 15
  },
  sp_20: {
    name: "20SP",
    type: PetSkillIconType.stat,
    iconId: 16
  },
  atkPercent_5: {
    name: "5ATK%",
    type: PetSkillIconType.stat,
    iconId: 17
  },
  atkPercent_10: {
    name: "10ATK%",
    type: PetSkillIconType.stat,
    iconId: 18
  },
  eva_25: {
    name: "25EVA",
    type: PetSkillIconType.stat,
    iconId: 19
  },
  eva_50: {
    name: "50EVA",
    type: PetSkillIconType.stat,
    iconId: 20
  },
  hp_30: {
    name: "30HP",
    type: PetSkillIconType.stat,
    iconId: 21
  },
  hp_60: {
    name: "60HP",
    type: PetSkillIconType.stat,
    iconId: 22
  },
  spd_5: {
    name: "5SPD",
    type: PetSkillIconType.stat,
    iconId: 23
  },
  spd_10: {
    name: "10SPD",
    type: PetSkillIconType.stat,
    iconId: 24
  },
  scratch: {
    name: PET_SKILL.scratch.name,
    type: PetSkillIconType.skill,
    iconId: 25
  },
  block: {
    name: PET_SKILL.block.name,
    type: PetSkillIconType.skill,
    iconId: 26
  },
  foxSpecialStat: {
    name: "50EVA",
    type: PetSkillIconType.stat,
    iconId: "27_1"
  },
  dogSpecialStat: {
    name: "150BRK",
    type: PetSkillIconType.stat,
    iconId: "27_2"
  },
  riceballSpecialStat: {
    name: "60HP",
    type: PetSkillIconType.stat,
    iconId: "27_3"
  },
  slimeSpecialStat: {
    name: "150RES",
    type: PetSkillIconType.stat,
    iconId: "27_4"
  },
  penguinSpecialStat: {
    name: "60DEF",
    type: PetSkillIconType.stat,
    iconId: "27_5"
  },
  batSpecialStat: {
    name: "150CRT",
    type: PetSkillIconType.stat,
    iconId: "27_6"
  },
  toadSpecialStat: {
    name: "10SPD",
    type: PetSkillIconType.stat,
    iconId: "27_7"
  },
  tigerSpecialStat: {
    name: "50EVA",
    type: PetSkillIconType.stat,
    iconId: "27_8"
  },
  cocoSpecialStat: {
    name: "150HIT",
    type: PetSkillIconType.stat,
    iconId: "27_9"
  },
  unicornSpecialStat: {
    name: "150HIT",
    type: PetSkillIconType.stat,
    iconId: "27_10"
  },
  dragonSpecialStat: {
    name: "150BRK",
    type: PetSkillIconType.stat,
    iconId: "27_11"
  },
  fenrirSpecialStat: {
    name: "150CRT",
    type: PetSkillIconType.stat,
    iconId: "27_12"
  },
  sleipnirSpecialStat: {
    name: "150BRK",
    type: PetSkillIconType.stat,
    iconId: "27_13"
  },
  rekachuSpecialStat: {
    name: "50EVA",
    type: PetSkillIconType.stat,
    iconId: "27_15"
  },
  whitefoxSpecialStat: {
    name: "10SPD",
    type: PetSkillIconType.stat,
    iconId: "27_17"
  },
  foxSpecialSkill: {
    name: PET_SKILL.dizzy.name,
    type: PetSkillIconType.skill,
    iconId: "28_1"
  },
  dogSpecialSkill: {
    name: PET_SKILL.seal.name,
    type: PetSkillIconType.skill,
    iconId: "28_2"
  },
  riceballSpecialSkill: {
    name: PET_SKILL.healing.name,
    type: PetSkillIconType.skill,
    iconId: "28_3"
  },
  slimeSpecialSkill: {
    name: PET_SKILL.poison.name,
    type: PetSkillIconType.skill,
    iconId: "28_4"
  },
  penguinSpecialSkill: {
    name: PET_SKILL.freezing.name,
    type: PetSkillIconType.skill,
    iconId: "28_5"
  },
  batSpecialSkill: {
    name: PET_SKILL.bloodsucking.name,
    type: PetSkillIconType.skill,
    iconId: "28_6"
  },
  toadSpecialSkill: {
    name: PET_SKILL.weakening.name,
    type: PetSkillIconType.skill,
    iconId: "28_7"
  },
  tigerSpecialSkill: {
    name: PET_SKILL.cleanse.name,
    type: PetSkillIconType.skill,
    iconId: "28_8"
  },
  cocoSpecialSkill: {
    name: PET_SKILL.thorns.name,
    type: PetSkillIconType.skill,
    iconId: "28_9"
  },
  unicornSpecialSkill: {
    name: PET_SKILL.shieldwall.name,
    type: PetSkillIconType.skill,
    iconId: "28_10"
  },
  dragonSpecialSkill: {
    name: PET_SKILL.barbarian.name,
    type: PetSkillIconType.skill,
    iconId: "28_11"
  },
  fenrirSpecialSkill: {
    name: PET_SKILL.dizzy.name,
    type: PetSkillIconType.skill,
    iconId: "28_12"
  },
  sleipnirSpecialSkill: {
    name: PET_SKILL.freezing.name,
    type: PetSkillIconType.skill,
    iconId: "28_13"
  },
  rekachuSpecialSkill: {
    name: PET_SKILL.seal.name,
    type: PetSkillIconType.skill,
    iconId: "28_15"
  },
  whitefoxSpecialSkill: {
    name: PET_SKILL.thorns.name,
    type: PetSkillIconType.skill,
    iconId: "28_17"
  }
}

export const EVOLVED_PET_SKILL_ICONS = {
  DEF_20: {
    name: "20DEF",
    type: PetSkillIconType.stat,
    iconId: 31
  },
  brk_20: {
    name: "20BRK",
    type: PetSkillIconType.stat,
    iconId: 32
  },
  res_20: {
    name: "20RES",
    type: PetSkillIconType.stat,
    iconId: 33
  },
  crt_20: {
    name: "20CRT",
    type: PetSkillIconType.stat,
    iconId: 34
  },
  hpPercent_10: {
    name: "10HP%",
    type: PetSkillIconType.stat,
    iconId: 35
  },
  maxAtk_20: {
    name: "20Max ATK",
    type: PetSkillIconType.stat,
    iconId: 36
  },
  hit_20: {
    name: "20HIT",
    type: PetSkillIconType.stat,
    iconId: 37
  },
  sp_10: {
    name: "10SP",
    type: PetSkillIconType.stat,
    iconId: 38
  },
  atkPercent_10: {
    name: "10ATK%",
    type: PetSkillIconType.stat,
    iconId: 39
  },
  eva_20: {
    name: "20EVA",
    type: PetSkillIconType.stat,
    iconId: 40
  },
  hp_50: {
    name: "50HP",
    type: PetSkillIconType.stat,
    iconId: 41
  },
  spd_10: {
    name: "10SPD",
    type: PetSkillIconType.stat,
    iconId: 42
  },
  def_30: {
    name: "30DEF",
    type: PetSkillIconType.stat,
    iconId: 51
  },
  brk_30: {
    name: "30BRK",
    type: PetSkillIconType.stat,
    iconId: 52
  },
  res_30: {
    name: "30RES",
    type: PetSkillIconType.stat,
    iconId: 53
  },
  crt_30: {
    name: "30CRT",
    type: PetSkillIconType.stat,
    iconId: 54
  },
  hpPercent_15: {
    name: "15HP%",
    type: PetSkillIconType.stat,
    iconId: 55
  },
  maxAtk_30: {
    name: "30Max ATK",
    type: PetSkillIconType.stat,
    iconId: 56
  },
  hit_30: {
    name: "30HIT",
    type: PetSkillIconType.stat,
    iconId: 57
  },
  sp_20: {
    name: "20SP",
    type: PetSkillIconType.stat,
    iconId: 58
  },
  atkPercent_15: {
    name: "15ATK%",
    type: PetSkillIconType.stat,
    iconId: 59
  },
  eva_30: {
    name: "30EVA",
    type: PetSkillIconType.stat,
    iconId: 60
  },
  hp_80: {
    name: "80HP",
    type: PetSkillIconType.stat,
    iconId: 61
  },
  spd_20: {
    name: "20SPD",
    type: PetSkillIconType.stat,
    iconId: 62
  },
  def_50: {
    name: "50DEF",
    type: PetSkillIconType.stat,
    iconId: 71
  },
  brk_50: {
    name: "50BRK",
    type: PetSkillIconType.stat,
    iconId: 72
  },
  res_50: {
    name: "50RES",
    type: PetSkillIconType.stat,
    iconId: 73
  },
  crt_50: {
    name: "50CRT",
    type: PetSkillIconType.stat,
    iconId: 74
  },
  hpPercent_25: {
    name: "25HP%",
    type: PetSkillIconType.stat,
    iconId: 75
  },
  maxAtk_50: {
    name: "50Max ATK",
    type: PetSkillIconType.stat,
    iconId: 76
  },
  hit_50: {
    name: "50HIT",
    type: PetSkillIconType.stat,
    iconId: 77
  },
  sp_30: {
    name: "30SP",
    type: PetSkillIconType.stat,
    iconId: 78
  },
  atkPercent_25: {
    name: "25ATK%",
    type: PetSkillIconType.stat,
    iconId: 79
  },
  eva_50: {
    name: "50EVA",
    type: PetSkillIconType.stat,
    iconId: 80
  },
  hp_130: {
    name: "130HP",
    type: PetSkillIconType.stat,
    iconId: 81
  },
  spd_30: {
    name: "30SPD",
    type: PetSkillIconType.stat,
    iconId: 82
  },
  infect: {
    name: EVOLVED_PET_SKILL.infect.name,
    type: PetSkillIconType.active,
    iconId: 91
  },
  needle: {
    name: EVOLVED_PET_SKILL.needle.name,
    type: PetSkillIconType.active,
    iconId: 92
  },
  thunder: {
    name: EVOLVED_PET_SKILL.thunder.name,
    type: PetSkillIconType.active,
    iconId: 93
  },
  force: {
    name: EVOLVED_PET_SKILL.force.name,
    type: PetSkillIconType.active,
    iconId: 94
  },
  ignite: {
    name: EVOLVED_PET_SKILL.ignite.name,
    type: PetSkillIconType.active,
    iconId: 95
  },
  barbarian: {
    name: EVOLVED_PET_SKILL.barbarian.name,
    type: PetSkillIconType.active,
    iconId: 96
  },
  wine: {
    name: EVOLVED_PET_SKILL.wine.name,
    type: PetSkillIconType.passive,
    iconId: 101
  },
  shieldWall: {
    name: EVOLVED_PET_SKILL.shieldWall.name,
    type: PetSkillIconType.passive,
    iconId: 102
  },
  meditation: {
    name: EVOLVED_PET_SKILL.meditation.name,
    type: PetSkillIconType.passive,
    iconId: 103
  },
  cleanse: {
    name: EVOLVED_PET_SKILL.cleanse.name,
    type: PetSkillIconType.passive,
    iconId: 104
  },
  healing: {
    name: EVOLVED_PET_SKILL.healing.name,
    type: PetSkillIconType.passive,
    iconId: 105
  },
  energyShield: {
    name: EVOLVED_PET_SKILL.energyShield.name,
    type: PetSkillIconType.passive,
    iconId: 106
  }
}

export const GEAR = {
  eagleHelmet: {
    name: "Eagle Helmet",
    iconId: 441,
    level: 83,
    type: GearType.helmet.name,
    stats: {
      def: 42,
      hit: 108
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  mammothNecklace: {
    name: "Mammoth Necklace",
    iconId: 442,
    level: 84,
    type: GearType.necklace.name,
    stats: {
      def: 42,
      crt: 108
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  pantheraBoots: {
    name: "Panthera Boots",
    iconId: 443,
    level: 85,
    type: GearType.shoes.name,
    stats: {
      def: 42,
      eva: 110
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  testudoShield: {
    name: "Testudo Shield",
    iconId: 444,
    level: 87,
    type: GearType.chest.name,
    stats: {
      def: 208
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  ursaGloves: {
    name: "Ursa Gloves",
    iconId: 445,
    level: 88,
    type: GearType.gloves.name,
    stats: {
      def: 44,
      atkPercent: 6.3
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  limaxLeggings: {
    name: "Limax Leggings",
    iconId: 446,
    level: 89,
    type: GearType.pants.name,
    stats: {
      def: 44,
      res: 120
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  viperRing: {
    name: "Viper Ring",
    iconId: 447,
    level: 90,
    type: GearType.ring.name,
    stats: {
      def: 44,
      brk: 110
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  tyrantBloodthirstyHelmet: {
    name: "Tyrant Bloodthirsty Helmet",
    iconId: 741,
    level: 93,
    type: GearType.helmet.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileHelmet: {
    name: "Tyrant Agile Helmet",
    iconId: 741,
    level: 93,
    type: GearType.helmet.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousHelmet: {
    name: "Tyrant Callous Helmet",
    iconId: 741,
    level: 93,
    type: GearType.helmet.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyNecklace: {
    name: "Tyrant Bloodthirsty Necklace",
    iconId: 742,
    level: 94,
    type: GearType.necklace.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileNecklace: {
    name: "Tyrant Agile Necklace",
    iconId: 742,
    level: 94,
    type: GearType.necklace.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousNecklace: {
    name: "Tyrant Callous Necklace",
    iconId: 742,
    level: 94,
    type: GearType.necklace.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyBoots: {
    name: "Tyrant Bloodthirsty Boots",
    iconId: 743,
    level: 95,
    type: GearType.shoes.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileBoots: {
    name: "Tyrant Agile Boots",
    iconId: 743,
    level: 95,
    type: GearType.shoes.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousBoots: {
    name: "Tyrant Callous Boots",
    iconId: 743,
    level: 95,
    type: GearType.shoes.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyArmor: {
    name: "Tyrant Bloodthirsty Armor",
    iconId: 744,
    level: 97,
    type: GearType.chest.name,
    stats: {
      def: 114
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileArmor: {
    name: "Tyrant Agile Armor",
    iconId: 744,
    level: 97,
    type: GearType.chest.name,
    stats: {
      def: 114
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousArmor: {
    name: "Tyrant Callous Armor",
    iconId: 744,
    level: 97,
    type: GearType.chest.name,
    stats: {
      def: 114
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyGloves: {
    name: "Tyrant Bloodthirsty Gloves",
    iconId: 745,
    level: 99,
    type: GearType.gloves.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileGloves: {
    name: "Tyrant Agile Gloves",
    iconId: 745,
    level: 99,
    type: GearType.gloves.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousGloves: {
    name: "Tyrant Callous Gloves",
    iconId: 745,
    level: 99,
    type: GearType.gloves.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyLeggings: {
    name: "Tyrant Bloodthirsty Leggings",
    iconId: 746,
    level: 99,
    type: GearType.pants.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileLeggings: {
    name: "Tyrant Agile Leggings",
    iconId: 746,
    level: 99,
    type: GearType.pants.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousLeggings: {
    name: "Tyrant Callous Leggings",
    iconId: 746,
    level: 99,
    type: GearType.pants.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyRing: {
    name: "Tyrant Bloodthirsty Ring",
    iconId: 747,
    level: 100,
    type: GearType.ring.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileRing: {
    name: "Tyrant Agile Ring",
    iconId: 747,
    level: 100,
    type: GearType.ring.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousRing: {
    name: "Tyrant Callous Ring",
    iconId: 747,
    level: 100,
    type: GearType.ring.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyFists: {
    name: "Tyrant Bloodthirsty Fists",
    iconId: 1075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.gloves,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileFists: {
    name: "Tyrant Agile Fists",
    iconId: 1075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.gloves,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousFists: {
    name: "Tyrant Callous Fists",
    iconId: 1075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.gloves,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstyStaff: {
    name: "Tyrant Bloodthirsty Staff",
    iconId: 2075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.staff,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileStaff: {
    name: "Tyrant Agile Staff",
    iconId: 2075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.staff,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousStaff: {
    name: "Tyrant Callous Staff",
    iconId: 2075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.staff,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstyAxe: {
    name: "Tyrant Bloodthirsty Axe",
    iconId: 3075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.heavyWeapon,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileAxe: {
    name: "Tyrant Agile Axe",
    iconId: 3075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.heavyWeapon,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousAxe: {
    name: "Tyrant Callous Axe",
    iconId: 3075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.heavyWeapon,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstySword: {
    name: "Tyrant Bloodthirsty Sword",
    iconId: 4075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.sword,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileSword: {
    name: "Tyrant Agile Sword",
    iconId: 4075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.sword,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousSword: {
    name: "Tyrant Callous Sword",
    iconId: 4075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.sword,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstyDagger: {
    name: "Tyrant Bloodthirsty Dagger",
    iconId: 5075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.dagger,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileDagger: {
    name: "Tyrant Agile Dagger",
    iconId: 5075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.dagger,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousDagger: {
    name: "Tyrant Callous Dagger",
    iconId: 5075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.dagger,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstyRod: {
    name: "Tyrant Bloodthirsty Rod",
    iconId: 6075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.cudgel,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileRod: {
    name: "Tyrant Agile Rod",
    iconId: 6075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.cudgel,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousRod: {
    name: "Tyrant Callous Rod",
    iconId: 6075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.cudgel,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  }
}

export const GEAR_SUIT_BONUS = [
  {
    name: "Tyrant Bloodthirsty",
    two: {
      brk: 78
    },
    four: {
      atkPercent: 3.4
    },
    seven: {
      crt: 105
    }
  },
  {
    name: "Tyrant Agile",
    two: {
      hit: 76
    },
    four: {
      eva: 60
    },
    seven: {
      spd: 6.1
    },
  },
  {
    name: "Tyrant Callous",
    two: {
      hp: 115
    },
    four: {
      res: 65
    },
    seven: {
      def: 108
    }
  }
]

export const GEAR_MAX_VALUES = {
  white81: {
    str: 112,
    dex: 112,
    sta: 112,
    brk: 105,
    def: 105,
    eva: 105,
    crt: 104,
    hit: 104,
    res: 115,
    hp: 149,
    sp: 9,
    hpPercent: 6.1,
    spPercent: 6.1,
    spd: 6.1,
    atkPercent: 6.1,
    minAtk: 17,
    maxAtk: 17
  },
  purple81: {
    str: 135,
    dex: 135,
    sta: 135,
    brk: 126,
    def: 126,
    eva: 126,
    crt: 125,
    hit: 125,
    res: 138,
    hp: 179,
    sp: 10,
    hpPercent: 7.4,
    spPercent: 7.4,
    spd: 7.4,
    atkPercent: 7.4,
    minAtk: 21,
    maxAtk: 21
  },
  white86: {
    str: 117,
    dex: 117,
    sta: 117,
    brk: 110,
    def: 110,
    eva: 110,
    crt: 108,
    hit: 108,
    res: 120,
    hp: 158,
    sp: 10,
    hpPercent: 6.3,
    spPercent: 6.3,
    spd: 6.3,
    atkPercent: 6.3,
    minAtk: 18,
    maxAtk: 18
  },
  purple86: {
    str: 141,
    dex: 141,
    sta: 141,
    brk: 132,
    def: 132,
    eva: 132,
    crt: 130,
    hit: 130,
    res: 144,
    hp: 190,
    sp: 12,
    hpPercent: 7.6,
    spPercent: 7.6,
    spd: 7.6,
    atkPercent: 7.6,
    minAtk: 22,
    maxAtk: 22
  },
  // tyrants
  white91: {
    str: 132,
    dex: 132,
    sta: 132,
    brk: 125,
    def: 125,
    eva: 125,
    crt: 120,
    hit: 120,
    res: 135,
    hp: 185,
    sp: 13,
    hpPercent: 6.9,
    spPercent: 6.9,
    spd: 6.9,
    atkPercent: 6.9,
    minAtk: 21,
    maxAtk: 21
  },
  purple91: {
    str: 159,
    dex: 159,
    sta: 159,
    brk: 150,
    def: 150,
    eva: 150,
    crt: 144,
    hit: 144,
    res: 162,
    hp: 222,
    sp: 18,
    hpPercent: 8.2,
    spPercent: 8.2,
    spd: 8.2,
    atkPercent: 8.2,
    minAtk: 25,
    maxAtk: 25
  },
  white96: {
    str: 137,
    dex: 137,
    sta: 137,
    brk: 130,
    def: 130,
    eva: 130,
    crt: 124,
    hit: 124,
    res: 140,
    hp: 194,
    sp: 14,
    hpPercent: 7.1,
    spPercent: 7.1,
    spd: 7.1,
    atkPercent: 7.1,
    minAtk: 22,
    maxAtk: 22
  },
  purple96: {
    str: 165,
    dex: 165,
    sta: 165,
    brk: 156,
    def: 156,
    eva: 156,
    crt: 149,
    hit: 149,
    res: 168,
    hp: 233,
    sp: 20,
    hpPercent: 8.4,
    spPercent: 8.4,
    spd: 8.4,
    atkPercent: 8.4,
    minAtk: 26,
    maxAtk: 26
  }
}

export const NEXUS_STATS = {
  str: {
    name: BuildStat.str,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  dex: {
    name: BuildStat.dex,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  sta: {
    name: BuildStat.sta,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  hp: {
    name: BuildStat.hp,
    startingAmount: 100,
    amountPerLevel: 50,
    amountPerLevelAfter7: 100,
  },
  sp: {
    name: BuildStat.sp,
    startingAmount: 10,
    amountPerLevel: 5,
    amountPerLevelAfter7: 10,
  },
  spd: {
    name: BuildStat.spd,
    startingAmount: 10,
    amountPerLevel: 5,
    amountPerLevelAfter7: 10,
  },
  minAtk: {
    name: BuildStat.minAtk,
    startingAmount: 25,
    amountPerLevel: 12.5, // rounds up
    amountPerLevelAfter7: 25,
  },
  maxAtk: {
    name: BuildStat.maxAtk,
    startingAmount: 25,
    amountPerLevel: 12.5,
    amountPerLevelAfter7: 25,
  },
  brk: {
    name: BuildStat.brk,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  def: {
    name: BuildStat.def,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  hit: {
    name: BuildStat.hit,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  eva: {
    name: BuildStat.eva,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  crt: {
    name: BuildStat.crt,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  res: {
    name: BuildStat.res,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  }
}

export const ARENA_TITLE = {
  newbie: {
    name: "Newbie",
    stats: {
      hpPercent: 0,
      hit: 0
    }
  },
  rookie: {
    name: "Rookie",
    stats: {
      hpPercent: 1,
      hit: 10
    }
  },
  veteran: {
    name: "Veteran",
    stats: {
      hpPercent: 2,
      hit: 20
    }
  },
  expert: {
    name: "Expert",
    stats: {
      hpPercent: 3,
      hit: 30
    }
  },
  master1: {
    name: "Master I",
    stats: {
      hpPercent: 4,
      hit: 40
    }
  },
  master2: {
    name: "Master II",
    stats: {
      hpPercent: 5,
      hit: 50
    }
  },
  grandMaster1: {
    name: "Grand Master I",
    stats: {
      hpPercent: 6,
      hit: 60
    }
  },
  grandMaster2: {
    name: "Grand Master II",
    stats: {
      hpPercent: 7,
      hit: 70
    }
  }
}
