import ArenaTitle from "./data/arena.js";
import { SkillType } from "./data/categories";
import Fighters from "./data/fighters.js";
import FighterSkills from "./data/fighterSkills.js";
import { Gears } from "./data/gears.js";
import Gems from "./data/gems.js";
import Pets from "./data/pets.js";
import PetSkills from "./data/petSkills.js";
import Skills from "./data/skills.js";
import Stats from "./data/stats.js";
import Totems from "./data/totems.js";

export const Builds = {};
export const Players = {};

Builds.brkTank = {
  name: "BrkTankPreset",
  level: 100,
  fighter: {
    name: Fighters.madara.name,
    plus: 21,
    evolved: true,
    potentials: {
      str: 360,
      dex: 360,
      sta: 360
    },
    skills: [
      FighterSkills.atkPercent.name, FighterSkills.spd.name, FighterSkills.fury.name,
      FighterSkills.bloodFrenzy.name, FighterSkills.pray.name, FighterSkills.thunderclapQuake.name
    ]
  },
  pet: {
    name: Pets.sleipnir.name,
    plus: 21,
    evolved: true,
    skills: [
      PetSkills.block.name, PetSkills.sleipnirSpecialSkill.name, PetSkills.sleipnirSpecialStat.name,
      PetSkills.brk_100.name, PetSkills.brk_50.name, PetSkills.def_60.name,
      PetSkills.hit_100.name, PetSkills.hit_50.name, PetSkills.res_100.name,
      PetSkills.res_50.name, PetSkills.atkPercent_10.name, PetSkills.spd_10.name
    ],
    evoSkills: [
      PetSkills.atkPercent_25Evo.name, PetSkills.hpPercent_25Evo.name, PetSkills.spd_30Evo.name,
      PetSkills.spd_20Evo.name, PetSkills.barbarian.name, PetSkills.energyShield.name],
  },
  gears: {
    weapon: {
      name: Gears.tyrantCallousSword.name,
      enhancement: 10,
      stats: {
        res: 135,
        def: 125,
        hit: 120,
        brk: 150
      },
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.topaz.name, plus: 9 }, { name: Gems.topaz.name, plus: 9 }]
    },
    helmet: {
      name: Gears.tyrantBloodthirstyHelmet.name,
      enhancement: 10,
      stats: {
        res: 135,
        def: 125,
        hit: 120,
        brk: 150
      },
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    necklace: {
      name: Gears.tyrantBloodthirstyNecklace.name,
      enhancement: 10,
      stats: {
        res: 135,
        def: 125,
        hit: 120,
        brk: 150
      },
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    shoes: {
      name: Gears.tyrantAgileBoots.name,
      enhancement: 10,
      stats: {
        res: 135,
        def: 125,
        hit: 120,
        brk: 150
      },
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    chest: {
      name: Gears.tyrantAgileArmor.name,
      enhancement: 10,
      stats: {
        sta: 137,
        def: 130,
        hit: 124,
        brk: 156
      },
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    gloves: {
      name: Gears.tyrantCallousGloves.name,
      enhancement: 10,
      stats: {
        sta: 137,
        def: 130,
        hit: 124,
        brk: 156
      },
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    pants: {
      name: Gears.tyrantCallousLeggings.name,
      enhancement: 10,
      stats: {
        res: 140,
        def: 130,
        hit: 124,
        brk: 156
      },
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    ring: {
      name: Gears.viperRing.name,
      enhancement: 10,
      stats: {
        sta: 127,
        def: 110,
        hit: 108,
        brk: 132
      },
      gems: [{ name: Gems.topaz.name, plus: 8 }, { name: Gems.emerald.name, plus: 8 }]
    }
  },
  phylactery: {
    level: 20,
    skill: Skills.movingIllusion.name,
    stats: [Stats.sta.displayName, Stats.sta.displayName, Stats.sta.displayName],
    glyphs: [
      {
        stat: Stats.brk.displayName,
        level: 6
      },
      {
        stat: Stats.def.displayName,
        level: 6
      },
      {
        stat: Stats.hit.displayName,
        level: 6
      },
      {
        stat: Stats.res.displayName,
        level: 6
      },
    ]
  },
  nexus: [
    {
      stat: Stats.sta.displayName,
      level: 12
    },
    {
      stat: Stats.brk.displayName,
      level: 12
    },
    {
      stat: Stats.def.displayName,
      level: 12
    },
    {
      stat: Stats.hit.displayName,
      level: 12
    },
    {
      stat: Stats.res.displayName,
      level: 12
    },
    {
      stat: Stats.hp.displayName,
      level: 12
    },
    {
      stat: Stats.spd.displayName,
      level: 12
    },
    {
      stat: Stats.sp.displayName,
      level: 12
    },
  ],
  altar: {
    str: 240,
    dex: 240,
    sta: 240,
    atkPercent: 20,
    def: 200,
    eva: 200,
    hpPercent: 20,
    hp: 200,
    crt: 200,
    spd: 20,
    brk: 200,
    hit: 200,
    res: 200,
    minAtk: 40,
    maxAtk: 40
  },
  totem: {
    name: Totems.white.name,
    level: 64,
    stats: {
      hit: 120,
      brk: 120,
      crt: 120,
      atkPercent: 12,
      hpPercent: 12,
      res: 120,
      def: 120,
      eva: 120
    }
  },
  skills: [
    Skills.bloodFrenzy.name, Skills.thunderclapQuake.name, Skills.thunderboltBoxing.name,
    Skills.drawPower.name, Skills.goldenShield.name, Skills.bloodSacrifice.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.ninjutsu.name, SkillType.cursedSealJutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.healing.name, SkillType.genjutsu.name],
  arenaTitle: ArenaTitle.grandMaster2.name
};

Players.trashEvader = {
  name: "Dingus",
  level: 100,
  fighter: {
    name: Fighters.cc.name,
    plus: 21,
    evolved: true,
    skills: [FighterSkills.thunderclapQuake.name, FighterSkills.pray.name, FighterSkills.bloodFrenzy.name]
  },
  pet: {
    name: Pets.riceball.name,
    plus: 21,
    evolved: true,
    skills: [PetSkills.block.name, PetSkills.healing.name],
    evoSkills: [PetSkills.energyShield.name, PetSkills.needle.name]
  },
  weapon: Gears.tyrantAgileStaff.name,
  stats: {
    hp: 17193,
    sp: 280,
    minAtk: 1035,
    maxAtk: 1195,
    spd: 735,
    hit: 1982,
    eva: 2764,
    brk: 176,
    def: 2199,
    crt: 170,
    res: 866,
    furyReversion: 25,
  },
  skills: [
    Skills.bloodFrenzy.name, Skills.woundInfection.name, Skills.thunderclapQuake.name,
    Skills.magicStealing.name, Skills.shieldWall.name, Skills.cleanse.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.taijutsu.name, SkillType.ninjutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.fire.name, SkillType.genjutsu.name],
  phylactery: {
    skill: Skills.thunderboltBoxing.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: Totems.purple.name,
    level: 64
  }
};

Players.tank = {
  name: "Tank Template",
  level: 100,
  fighter: {
    name: Fighters.madara.name,
    plus: 21,
    evolved: true,
    skills: [FighterSkills.rejuvenation.name, FighterSkills.pray.name, FighterSkills.energyShield.name]
  },
  pet: {
    name: Pets.riceball.name,
    plus: 21,
    evolved: true,
    skills: [PetSkills.block.name, PetSkills.healing.name],
    evoSkills: [PetSkills.energyShield.name, PetSkills.ignite.name]
  },
  weapon: "Tyrant Callous Sword",
  stats: {
    hp: 51116,
    sp: 756,
    minAtk: 1377,
    maxAtk: 1589,
    spd: 363,
    hit: 1517,
    eva: 381,
    brk: 270,
    def: 2696,
    crt: 300,
    res: 1668,
    furyReversion: 30
  },
  skills: [
    Skills.energyShield.name, Skills.rejuvenation.name, Skills.earthStyleWall.name,
    Skills.drawPower.name, Skills.poisonousFog.name, Skills.arrivalOfThunderGod.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.ninjutsu.name, SkillType.cursedSealJutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.healing.name, SkillType.genjutsu.name],
  phylactery: {
    skill: Skills.movingIllusion.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: Totems.green.name,
    level: 64
  }
};

players.critHybrid = {
  name: "Gumi",
  level: 100,
  fighter: {
    name: Fighters.stryker.name,
    plus: 21,
    evolved: true,
    skills: [FighterSkills.goldenShield.name, FighterSkills.pray.name, FighterSkills.bloodFrenzy.name]
  },
  pet: {
    name: PET.bat.name,
    plus: 21,
    evolved: true,
    skills: [PetSkills.block.name, PetSkills.bloodsucking.name],
    evoSkills: [PetSkills.meditation.name]
  },
  weapon: "Tyrant Bloodthirsty Sword",
  stats: {
    hp: 16706,
    sp: 274,
    minAtk: 2848,
    maxAtk: 4366,
    spd: 327,
    hit: 1943,
    eva: 351,
    brk: 1917,
    def: 2221,
    crt: 2503,
    res: 216,
    furyReversion: 25
  },
  skills: [
    Skills.fireShield.name, Skills.goldenShield.name, Skills.bloodSacrifice.name,
    Skills.assassinate.name, Skills.movingIllusion.name, Skills.rebirth.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.ninjutsu.name, SkillType.cursedSealJutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.thunder.name, SkillType.genjutsu.name],
  phylactery: {
    skill: Skills.bloodFrenzy.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: Totems.white.name,
    level: 64
  }
};

players.brkTank = {
  name: "Brk Tank Template",
  level: 100,
  fighter: {
    name: Fighters.madara.name,
    plus: 21,
    evolved: true,
    skills: [FighterSkills.bloodFrenzy.name, FighterSkills.shieldWall.name, FighterSkills.thunderclapQuake.name]
  },
  pet: {
    name: PET.sleipnir.name,
    plus: 21,
    evolved: true,
    skills: [PetSkills.block.name, PetSkills.freezing.name],
    evoSkills: [PetSkills.barbarian.name, PetSkills.energyShield.name]
  },
  weapon: "Tyrant Callous Sword",
  stats: {
    hp: 31745,
    sp: 686,
    minAtk: 1589,
    maxAtk: 1819,
    spd: 401,
    hit: 2041,
    eva: 431,
    brk: 2518,
    def: 2298,
    crt: 330,
    res: 1645,
    furyReversion: 25
  },
  skills: [
    Skills.bloodFrenzy.name, Skills.thunderclapQuake.name, Skills.thunderboltBoxing.name,
    Skills.drawPower.name, Skills.goldenShield.name, Skills.bloodSacrifice.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.ninjutsu.name, SkillType.cursedSealJutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.healing.name, SkillType.genjutsu.name],
  phylactery: {
    skill: Skills.movingIllusion.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: Totems.white.name,
    level: 64
  }
};

players.evader = {
  name: "Evader Template",
  level: 100,
  fighter: {
    name: Fighters.cc.name,
    plus: 21,
    evolved: true,
    skills: [FighterSkills.thunderclapQuake.name, FighterSkills.shieldWall.name, FighterSkills.bloodFrenzy.name]
  },
  pet: {
    name: PET.rekachu.name,
    plus: 21,
    evolved: true,
    skills: [PetSkills.block.name, PetSkills.seal.name],
    evoSkills: [PetSkills.energyShield.name, PetSkills.needle.name]
  },
  weapon: "Tyrant Agile Staff",
  stats: {
    hp: 17072,
    sp: 246,
    minAtk: 2308,
    maxAtk: 2554,
    spd: 725,
    hit: 2034,
    eva: 2906,
    brk: 711,
    def: 2131,
    crt: 330,
    res: 430,
    furyReversion: 25,
  },
  skills: [
    Skills.bloodFrenzy.name, Skills.assassinate.name, Skills.thunderclapQuake.name,
    Skills.magicStealing.name, Skills.shieldWall.name, Skills.cleanse.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.taijutsu.name, SkillType.ninjutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.thunder.name, SkillType.genjutsu.name],
  phylactery: {
    skill: Skills.thunderboltBoxing.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: Totems.white.name,
    level: 64
  }
};

players.brkHH = {
  name: "Brk HH Template",
  level: 100,
  fighter: {
    name: Fighters.stryker.name,
    plus: 21,
    evolved: true,
    skills: [FighterSkills.goldenShield.name, FighterSkills.pray.name, FighterSkills.bloodFrenzy.name]
  },
  pet: {
    name: PET.sleipnir.name,
    plus: 21,
    evolved: true,
    skills: [PetSkills.block.name, PetSkills.freezing.name],
    evoSkills: [PetSkills.energyShield.name, PetSkills.barbarian.name]
  },
  weapon: "Tyrant Bloodthirsty Sword",
  stats: {
    hp: 17821,
    sp: 253,
    minAtk: 3273,
    maxAtk: 4917,
    spd: 401,
    hit: 2037,
    eva: 451,
    brk: 2620,
    def: 2274,
    crt: 303,
    res: 1089,
    furyReversion: 25
  },
  skills: [
    Skills.fireShield.name, Skills.goldenShield.name, Skills.bloodSacrifice.name,
    Skills.assassinate.name, Skills.movingIllusion.name, Skills.rebirth.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.ninjutsu.name, SkillType.cursedSealJutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.healing.name, SkillType.genjutsu.name],
  phylactery: {
    skill: Skills.bloodFrenzy.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: Totems.white.name,
    level: 64
  }
};
