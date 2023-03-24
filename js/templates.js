import ArenaTitle from "./data/arena.js";
import { SkillType } from "./data/categories.js";
import Fighters from "./data/fighters.js";
import FighterSkills from "./data/fighterSkills.js";
import { Gears } from "./data/gears.js";
import Gems from "./data/gems.js";
import Pets from "./data/pets.js";
import PetSkills from "./data/petSkills.js";
import Skills from "./data/skills.js";
import Stats from "./data/stats.js";
import Totems from "./data/totems.js";
import Utils from "./utils.js";

const Builds = {};
const Players = {};

export const getBuildNames = () => Object.values(Object.values(Builds).map(build => build.name));

export const getBuild = name => {
  const build = Object.values(Builds).find(build => build.name === name);
  return Utils.deepClone(build);
}

export const getPlayer = name => {
  const player = Object.values(Players).find(player => player.name === name);
  return Utils.deepClone(player);
}

const maxAltar = {
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
  minAtk: 50,
  maxAtk: 50
}

const maxTotemStats = {
  hit: 120,
  brk: 120,
  crt: 120,
  atkPercent: 12,
  hpPercent: 12,
  res: 120,
  def: 120,
  eva: 120
}

Builds.brkTank = {
  name: "Sample BRK Tank",
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
    stats: [FighterSkills.atkPercent.name, FighterSkills.spd.name, FighterSkills.fury.name],
    resets: [FighterSkills.bloodFrenzy.name, FighterSkills.thunderclapQuake.name],
    healing: FighterSkills.shieldWall.name
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
      PetSkills.spd_20Evo.name, PetSkills.barbarian.name, PetSkills.energyShield.name
    ],
  },
  gears: [
    {
      name: Gears.tyrantCallousSword.name,
      enhancement: 10,
      stats: [{ res: 135 }, { def: 125 }, { hit: 120 }, { brk: 150 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.topaz.name, plus: 9 }, { name: Gems.topaz.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyHelmet.name,
      enhancement: 10,
      stats: [{ res: 135 }, { def: 125 }, { hit: 120 }, { brk: 150 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyNecklace.name,
      enhancement: 10,
      stats: [{ res: 135 }, { def: 125 }, { hit: 120 }, { brk: 150 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantAgileBoots.name,
      enhancement: 10,
      stats: [{ res: 135 }, { def: 125 }, { hit: 120 }, { brk: 150 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantAgileArmor.name,
      enhancement: 10,
      stats: [{ sta: 137 }, { def: 130 }, { hit: 124 }, { brk: 156 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantCallousGloves.name,
      enhancement: 10,
      stats: [{ sta: 137 }, { def: 130 }, { hit: 124 }, { brk: 156 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantCallousLeggings.name,
      enhancement: 10,
      stats: [{ res: 140 }, { def: 130 }, { hit: 124 }, { brk: 156 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.viperRing.name,
      enhancement: 10,
      stats: [{ sta: 127 }, { def: 110 }, { hit: 108 }, { brk: 132 }],
      gems: [{ name: Gems.topaz.name, plus: 8 }, { name: Gems.emerald.name, plus: 8 }]
    }
  ],
  phylactery: {
    plus: 20,
    skill: Skills.movingIllusion.name,
    stats: [Stats.sta.displayName, Stats.sta.displayName, Stats.dex.displayName],
    glyphs: [
      {
        stat: Stats.brk.displayName,
        plus: 6
      },
      {
        stat: Stats.def.displayName,
        plus: 6
      },
      {
        stat: Stats.hit.displayName,
        plus: 6
      },
      {
        stat: Stats.res.displayName,
        plus: 6
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
  altar: maxAltar,
  totem: {
    name: Totems.white.name,
    level: 64,
    stats: maxTotemStats
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

Builds.evader = {
  name: "Sample Evader",
  level: 100,
  fighter: {
    name: Fighters.cc.name,
    plus: 21,
    evolved: true,
    potentials: {
      str: 360,
      dex: 360,
      sta: 360
    },
    stats: [FighterSkills.eva.name, FighterSkills.brk.name, FighterSkills.atkPercent.name],
    resets: [FighterSkills.bloodFrenzy.name, FighterSkills.thunderclapQuake.name],
    healing: FighterSkills.shieldWall.name
  },
  pet: {
    name: Pets.rekachu.name,
    plus: 21,
    evolved: true,
    skills: [
      PetSkills.block.name, PetSkills.rekachuSpecialSkill.name, PetSkills.eva_50.name,
      PetSkills.brk_100.name, PetSkills.brk_50.name, PetSkills.def_60.name,
      PetSkills.hit_100.name, PetSkills.hit_50.name, PetSkills.res_100.name,
      PetSkills.rekachuSpecialStat.name, PetSkills.spd_10.name, PetSkills.eva_25.name
    ],
    evoSkills: [
      PetSkills.brk_50Evo.name, PetSkills.eva_50Evo.name, PetSkills.hpPercent_25Evo.name,
      PetSkills.atkPercent_25Evo.name, PetSkills.barbarian.name, PetSkills.energyShield.name
    ],
  },
  gears: [
    {
      name: Gears.tyrantAgileStaff.name,
      enhancement: 10,
      stats: [{ dex: 132 }, { def: 125 }, { hit: 120 }, { eva: 150 }],
      gems: [{ name: Gems.sapphire.name, plus: 9 }, { name: Gems.sapphire.name, plus: 9 }, { name: Gems.sapphire.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyHelmet.name,
      enhancement: 10,
      stats: [{ dex: 132 }, { def: 125 }, { hit: 120 }, { eva: 150 }],
      gems: [{ name: Gems.sapphire.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyNecklace.name,
      enhancement: 10,
      stats: [{ dex: 132 }, { brk: 125 }, { hit: 120 }, { eva: 150 }],
      gems: [{ name: Gems.sapphire.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.pantheraBoots.name,
      enhancement: 10,
      stats: [{ dex: 112 }, { brk: 105 }, { hit: 104 }, { eva: 126 }],
      gems: [{ name: Gems.sapphire.name, plus: 8 }, { name: Gems.emerald.name, plus: 8 }]
    },
    {
      name: Gears.tyrantAgileArmor.name,
      enhancement: 10,
      stats: [{ dex: 137 }, { def: 130 }, { hit: 124 }, { eva: 156 }],
      gems: [{ name: Gems.sapphire.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantAgileGloves.name,
      enhancement: 10,
      stats: [{ dex: 137 }, { def: 130 }, { hit: 124 }, { eva: 156 }],
      gems: [{ name: Gems.sapphire.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantAgileLeggings.name,
      enhancement: 10,
      stats: [{ dex: 137 }, { def: 130 }, { hit: 124 }, { eva: 156 }],
      gems: [{ name: Gems.sapphire.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantAgileRing.name,
      enhancement: 10,
      stats: [{ dex: 137 }, { def: 130 }, { hit: 124 }, { eva: 156 }],
      gems: [{ name: Gems.sapphire.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    }
  ],
  phylactery: {
    plus: 20,
    skill: Skills.thunderboltBoxing.name,
    stats: [Stats.dex.displayName, Stats.dex.displayName, Stats.sta.displayName],
    glyphs: [
      {
        stat: Stats.brk.displayName,
        plus: 6
      },
      {
        stat: Stats.def.displayName,
        plus: 6
      },
      {
        stat: Stats.hit.displayName,
        plus: 6
      },
      {
        stat: Stats.eva.displayName,
        plus: 6
      },
    ]
  },
  nexus: [
    {
      stat: Stats.sta.displayName,
      level: 12
    },
    {
      stat: Stats.dex.displayName,
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
      stat: Stats.eva.displayName,
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
      stat: Stats.maxAtk.displayName,
      level: 12
    },
  ],
  altar: maxAltar,
  totem: {
    name: Totems.white.name,
    level: 64,
    stats: maxTotemStats
  },
  skills: [
    Skills.lightningBall.name, Skills.bloodSacrifice.name, Skills.thunderclapQuake.name,
    Skills.magicStealing.name, Skills.shieldWall.name, Skills.cleanse.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.ninjutsu.name, SkillType.cursedSealJutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.fire.name, SkillType.genjutsu.name],
  arenaTitle: ArenaTitle.grandMaster2.name
};

Builds.tank = {
  name: "Sample Tank",
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
    stats: [FighterSkills.def.name, FighterSkills.hpPercent.name, FighterSkills.fury.name],
    resets: [FighterSkills.rejuvenation.name, FighterSkills.energyShield.name],
    healing: FighterSkills.pray.name
  },
  pet: {
    name: Pets.riceball.name,
    plus: 21,
    evolved: true,
    skills: [
      PetSkills.block.name, PetSkills.riceballSpecialSkill.name, PetSkills.def_30.name,
      PetSkills.def_60.name, PetSkills.hit_100.name, PetSkills.hit_50.name,
      PetSkills.res_100.name, PetSkills.res_50.name, PetSkills.hpPercent_10.name,
      PetSkills.hpPercent_5.name, PetSkills.hp_60.name, PetSkills.riceballSpecialStat.name
    ],
    evoSkills: [
      PetSkills.def_50Evo.name, PetSkills.hpPercent_25Evo.name, PetSkills.spd_30Evo.name,
      PetSkills.hp_130Evo.name, PetSkills.ignite.name, PetSkills.energyShield.name
    ],
  },
  gears: [
    {
      name: Gears.tyrantCallousSword.name,
      enhancement: 10,
      stats: [{ hp: 185 }, { sta: 132 }, { hit: 120 }, { def: 150 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.topaz.name, plus: 9 }, { name: Gems.topaz.name, plus: 9 }]
    },
    {
      name: Gears.tyrantCallousHelmet.name,
      enhancement: 10,
      stats: [{ res: 135 }, { sta: 132 }, { hp: 185 }, { def: 150 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantCallousNecklace.name,
      enhancement: 10,
      stats: [{ res: 135 }, { sta: 132 }, { hit: 120 }, { def: 150 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantCallousBoots.name,
      enhancement: 10,
      stats: [{ res: 135 }, { sta: 132 }, { hp: 185 }, { def: 150 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantCallousArmor.name,
      enhancement: 10,
      stats: [{ hp: 194 }, { sta: 137 }, { hit: 124 }, { def: 156 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantCallousGloves.name,
      enhancement: 10,
      stats: [{ hp: 194 }, { sta: 137 }, { hit: 124 }, { def: 156 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantCallousLeggings.name,
      enhancement: 10,
      stats: [{ res: 140 }, { sta: 137 }, { hp: 194 }, { def: 156 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    },
    {
      name: Gears.tyrantCallousRing.name,
      enhancement: 10,
      stats: [{ res: 140 }, { sta: 110 }, { hp: 194 }, { def: 156 }],
      gems: [{ name: Gems.topaz.name, plus: 9 }, { name: Gems.emerald.name, plus: 9 }]
    }
  ],
  phylactery: {
    plus: 20,
    skill: Skills.movingIllusion.name,
    stats: [Stats.sta.displayName, Stats.sta.displayName, Stats.dex.displayName],
    glyphs: [
      {
        stat: Stats.brk.displayName,
        plus: 6
      },
      {
        stat: Stats.def.displayName,
        plus: 6
      },
      {
        stat: Stats.hit.displayName,
        plus: 6
      },
      {
        stat: Stats.res.displayName,
        plus: 6
      },
    ]
  },
  nexus: [
    {
      stat: Stats.sta.displayName,
      level: 12
    },
    {
      stat: Stats.dex.displayName,
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
  altar: maxAltar,
  totem: {
    name: Totems.green.name,
    level: 64,
    stats: maxTotemStats
  },
  skills: [
    Skills.arrivalOfThunderGod.name, Skills.poisonousFog.name, Skills.energyShield.name,
    Skills.drawPower.name, Skills.rejuvenation.name, Skills.earthStyleWall.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.ninjutsu.name, SkillType.cursedSealJutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.thunder.name, SkillType.genjutsu.name],
  arenaTitle: ArenaTitle.grandMaster2.name
};

Builds.hybrid = {
  name: "Sample Hybrid",
  level: 100,
  fighter: {
    name: Fighters.stryker.name,
    plus: 21,
    evolved: true,
    potentials: {
      str: 360,
      dex: 360,
      sta: 360
    },
    stats: [FighterSkills.crt.name, FighterSkills.atkPercent.name, FighterSkills.spd.name],
    resets: [FighterSkills.bloodFrenzy.name, FighterSkills.goldenShield.name],
    healing: FighterSkills.pray.name
  },
  pet: {
    name: Pets.bat.name,
    plus: 21,
    evolved: true,
    skills: [
      PetSkills.block.name, PetSkills.batSpecialSkill.name, PetSkills.batSpecialStat.name,
      PetSkills.crt_100.name, PetSkills.crt_50.name, PetSkills.brk_100.name,
      PetSkills.brk_50.name, PetSkills.def_60.name, PetSkills.def_30.name,
      PetSkills.hit_100.name, PetSkills.hit_50.name, PetSkills.hpPercent_10.name
    ],
    evoSkills: [
      PetSkills.barbarian.name, PetSkills.energyShield.name, PetSkills.spd_30Evo.name,
      PetSkills.crt_50Evo.name, PetSkills.brk_50Evo.name, PetSkills.hpPercent_25Evo.name
    ]
  },
  gears: [
    {
      name: Gears.tyrantBloodthirstySword.name,
      enhancement: 10,
      stats: [{ brk: 125 }, { def: 125 }, { hit: 120 }, { crt: 144 }],
      gems: [{ name: Gems.ruby.name, plus: 9 }, { name: Gems.ruby.name, plus: 9 }, { name: Gems.ruby.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyHelmet.name,
      enhancement: 10,
      stats: [{ brk: 125 }, { def: 125 }, { hit: 120 }, { crt: 144 }],
      gems: [{ name: Gems.ruby.name, plus: 9 }, { name: Gems.garnet.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyLeggings.name,
      enhancement: 10,
      stats: [{ brk: 130 }, { def: 130 }, { hit: 124 }, { crt: 149 }],
      gems: [{ name: Gems.ruby.name, plus: 9 }, { name: Gems.garnet.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyRing.name,
      enhancement: 10,
      stats: [{ brk: 130 }, { def: 130 }, { hit: 124 }, { crt: 149 }],
      gems: [{ name: Gems.ruby.name, plus: 9 }, { name: Gems.garnet.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyArmor.name,
      enhancement: 10,
      stats: [{ brk: 130 }, { def: 130 }, { hit: 124 }, { crt: 149 }],
      gems: [{ name: Gems.ruby.name, plus: 9 }, { name: Gems.garnet.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyGloves.name,
      enhancement: 10,
      stats: [{ brk: 130 }, { def: 130 }, { hit: 124 }, { crt: 149 }],
      gems: [{ name: Gems.ruby.name, plus: 9 }, { name: Gems.garnet.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyNecklace.name,
      enhancement: 10,
      stats: [{ brk: 125 }, { def: 125 }, { hit: 120 }, { crt: 144 }],
      gems: [{ name: Gems.ruby.name, plus: 9 }, { name: Gems.garnet.name, plus: 9 }]
    },
    {
      name: Gears.tyrantBloodthirstyBoots.name,
      enhancement: 10,
      stats: [{ brk: 125 }, { def: 125 }, { hit: 120 }, { crt: 144 }],
      gems: [{ name: Gems.ruby.name, plus: 9 }, { name: Gems.garnet.name, plus: 9 }]
    }
  ],
  phylactery: {
    plus: 20,
    skill: Skills.bloodFrenzy.name,
    stats: [Stats.str.displayName, Stats.str.displayName, Stats.sta.displayName],
    glyphs: [
      {
        stat: Stats.def.displayName,
        plus: 6
      },
      {
        stat: Stats.brk.displayName,
        plus: 6
      },
      {
        stat: Stats.crt.displayName,
        plus: 6
      },
      {
        stat: Stats.hit.displayName,
        plus: 6
      }
    ]
  },
  nexus: [
    {
      stat: Stats.maxAtk.displayName,
      level: 12
    },
    {
      stat: Stats.brk.displayName,
      level: 12
    },
    {
      stat: Stats.crt.displayName,
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
      stat: Stats.spd.displayName,
      level: 12
    },
    {
      stat: Stats.sta.displayName,
      level: 12
    },
    {
      stat: Stats.hp.displayName,
      level: 12
    }
  ],
  altar: maxAltar,
  totem: {
    name: Totems.white.name,
    level: 64,
    stats: maxTotemStats
  },
  skills: [
    Skills.assassinate.name, Skills.bloodSacrifice.name, Skills.movingIllusion.name,
    Skills.fireShield.name, Skills.goldenShield.name, Skills.rebirth.name
  ],
  expertise: [
    SkillType.water.name, SkillType.fire.name, SkillType.earth.name, SkillType.thunder.name, SkillType.wind.name,
    SkillType.ninjutsu.name, SkillType.cursedSealJutsu.name, SkillType.genjutsu.name, SkillType.healing.name
  ],
  resistance: [SkillType.thunder.name, SkillType.genjutsu.name],
  arenaTitle: ArenaTitle.grandMaster2.name
}

