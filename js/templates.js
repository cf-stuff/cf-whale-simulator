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

export const getPlayerNames = () => Object.values(Object.values(Players).map(player => player.name));

export const getPlayer = name => {
  const player = Object.values(Players).find(player => player.name === name);
  return Utils.deepClone(player);
}

export const maxAltar = {
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

export const maxTotemStats = {
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

Players.bellTank = {
  "name": "Bell Tank (16%)",
  "level": 100,
  "fighter": {
      "name": "Madara",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Rejuventation Reset",
          "Pray",
          "Golden Shield Reset"
      ]
  },
  "pet": {
      "name": "Psychic Dog",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Seal (Psychic Dog Special)",
          "Fire (Active)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Callous Sword",
  "stats": {
      "str": 1411,
      "dex": 1623,
      "sta": 4057,
      "brk": 382,
      "def": 2774,
      "hit": 1788,
      "eva": 438,
      "res": 2012,
      "crt": 330,
      "atkPercent": 32,
      "minAtk": 1421,
      "maxAtk": 1627,
      "hpPercent": 79,
      "hp": 44176,
      "spd": 348,
      "spPercent": 0,
      "sp": 819,
      "furyReversion": 30
  },
  "skills": [
      "Arrival of Thunder God",
      "Poisonous Fog",
      "Draw Power",
      "Rejuvenation",
      "Earth-Style Wall",
      "Golden Shield"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Cursed Seal Jutsu",
      "Genjutsu",
      "Healing"
  ],
  "resistance": [
      "Genjutsu",
      "Healing"
  ],
  "phylactery": {
      "skill": "Moving Illusion",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.bubbleTank = {
  "name": "Bubble Tank (8%)",
  "level": 100,
  "fighter": {
      "name": "Madara",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Rejuventation Reset",
          "Pray",
          "Energy Shield Reset"
      ]
  },
  "pet": {
      "name": "Psychic Dog",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Seal (Psychic Dog Special)",
          "Fire (Active)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Callous Sword",
  "stats": {
      "str": 1061,
      "dex": 1973,
      "sta": 4057,
      "brk": 382,
      "def": 2774,
      "hit": 1420,
      "eva": 461,
      "res": 2012,
      "crt": 330,
      "atkPercent": 32,
      "minAtk": 1275,
      "maxAtk": 1459,
      "hpPercent": 94,
      "hp": 49479,
      "spd": 371,
      "spPercent": 0,
      "sp": 789,
      "furyReversion": 30
  },
  "skills": [
      "Arrival of Thunder God",
      "Poisonous Fog",
      "Energy Shield",
      "Draw Power",
      "Rejuvenation",
      "Earth-Style Wall"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Cursed Seal Jutsu",
      "Genjutsu",
      "Healing"
  ],
  "resistance": [
      "Genjutsu",
      "Healing"
  ],
  "phylactery": {
      "skill": "Moving Illusion",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.brkTank = {
  "name": "BRK Tank (11%)",
  "level": 100,
  "fighter": {
      "name": "Susanoo",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Blood Frenzy Reset",
          "Shield Wall Burst",
          "Golden Shield Reset"
      ]
  },
  "pet": {
      "name": "Sleipnir",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Freezing (Sleipnir Special)",
          "Barbarian (Active)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Callous Axe",
  "stats": {
      "str": 1020,
      "dex": 1565,
      "sta": 3620,
      "brk": 2620,
      "def": 2304,
      "hit": 2088,
      "eva": 472,
      "res": 942,
      "crt": 330,
      "atkPercent": 92,
      "minAtk": 1583,
      "maxAtk": 2391,
      "hpPercent": 64,
      "hp": 31188,
      "spd": 422,
      "spPercent": 0,
      "sp": 642,
      "furyReversion": 25
  },
  "skills": [
      "Blood Frenzy",
      "Golden Shield",
      "Thunderclap Quake",
      "Thunderbolt Boxing",
      "Draw Power",
      "Blood Sacrifice"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Cursed Seal Jutsu",
      "Genjutsu",
      "Healing"
  ],
  "resistance": [
      "Genjutsu",
      "Healing"
  ],
  "phylactery": {
      "skill": "Moving Illusion",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.brkFire = {
  "name": "BRK Fire (22%)",
  "level": 100,
  "fighter": {
      "name": "Stryker",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Golden Shield Reset",
          "Shield Wall Burst",
          "Blood Frenzy Reset"
      ]
  },
  "pet": {
      "name": "Sleipnir",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Freezing (Sleipnir Special)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Bloodthirsty Sword",
  "stats": {
      "str": 2807,
      "dex": 1020,
      "sta": 2725,
      "brk": 2620,
      "def": 2304,
      "hit": 2088,
      "eva": 398,
      "res": 1012,
      "crt": 330,
      "atkPercent": 67,
      "minAtk": 3257,
      "maxAtk": 5152,
      "hpPercent": 74,
      "hp": 21315,
      "spd": 348,
      "spPercent": 0,
      "sp": 347,
      "furyReversion": 30
  },
  "skills": [
      "Assassinate",
      "Rebirth",
      "Fire Shield",
      "Barbarism",
      "Moving Illusion",
      "Golden Shield"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Cursed Seal Jutsu",
      "Genjutsu",
      "Healing"
  ],
  "resistance": [
      "Thunder",
      "Genjutsu"
  ],
  "phylactery": {
      "skill": "Blood Frenzy",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.brkStun = {
  "name": "BRK Stun (11%)",
  "level": 100,
  "fighter": {
      "name": "Lion Dancer",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Blood Frenzy Reset",
          "Shield Wall Burst",
          "Golden Shield Reset"
      ]
  },
  "pet": {
      "name": "Sleipnir",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Freezing (Sleipnir Special)",
          "Barbarian (Active)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Bloodthirsty Fists",
  "stats": {
      "str": 3062,
      "dex": 1373,
      "sta": 2673,
      "brk": 2620,
      "def": 2304,
      "hit": 2088,
      "eva": 467,
      "res": 482,
      "crt": 330,
      "atkPercent": 67,
      "minAtk": 2976,
      "maxAtk": 4471,
      "hpPercent": 74,
      "hp": 22327,
      "spd": 417,
      "spPercent": 0,
      "sp": 367,
      "furyReversion": 30
  },
  "skills": [
      "Thunderbolt Boxing",
      "Golden Shield",
      "Blood Frenzy",
      "Assassinate",
      "Rebirth",
      "Fire Shield"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Genjutsu",
      "Healing",
      "Cursed Seal Jutsu"
  ],
  "resistance": [
      "Thunder",
      "Genjutsu"
  ],
  "phylactery": {
      "skill": "Moving Illusion",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.hybridHH = {
  "name": "Hybrid HH (8%)",
  "level": 100,
  "fighter": {
      "name": "Stryker",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Blood Frenzy Reset",
          "Shield Wall Burst",
          "Golden Shield Reset"
      ]
  },
  "pet": {
      "name": "Vampire Bat",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Bloodsucking (Vampire Bat Special)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Bloodthirsty Sword",
  "stats": {
      "str": 2529,
      "dex": 1020,
      "sta": 2049,
      "brk": 2130,
      "def": 2362,
      "hit": 2028,
      "eva": 398,
      "res": 330,
      "crt": 2509,
      "atkPercent": 60.4,
      "minAtk": 2997,
      "maxAtk": 4503,
      "hpPercent": 74,
      "hp": 17884,
      "spd": 338,
      "spPercent": 0,
      "sp": 286,
      "furyReversion": 30
  },
  "skills": [
      "Assassinate",
      "Moving Illusion",
      "Fire Shield",
      "Golden Shield",
      "Rebirth",
      "Barbarism"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Cursed Seal Jutsu",
      "Genjutsu",
      "Healing"
  ],
  "resistance": [
      "Thunder",
      "Genjutsu"
  ],
  "phylactery": {
      "skill": "Blood Frenzy",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.evaH = {
  "name": "EVA H (5%)",
  "level": 100,
  "fighter": {
      "name": "Hel",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Blood Frenzy Reset",
          "Shield Wall Burst",
          "Thunderclap Quake Reset"
      ]
  },
  "pet": {
      "name": "Rekachu",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Seal (Rekachu Special)",
          "Barbarian (Active)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Agile Dagger",
  "stats": {
      "str": 1061,
      "dex": 4052,
      "sta": 1968,
      "brk": 330,
      "def": 2334,
      "hit": 2088,
      "eva": 3035,
      "res": 382,
      "crt": 330,
      "atkPercent": 97,
      "minAtk": 1684,
      "maxAtk": 2530,
      "hpPercent": 99,
      "hp": 16707,
      "spd": 788,
      "spPercent": 0,
      "sp": 231,
      "furyReversion": 25
  },
  "skills": [
      "Magic Stealing",
      "Blood Sacrifice",
      "Lightning Ball",
      "Thunderclap Quake",
      "Shield Wall",
      "Cleanse"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Cursed Seal Jutsu",
      "Genjutsu",
      "Healing"
  ],
  "resistance": [
      "Thunder",
      "Genjutsu"
  ],
  "phylactery": {
      "skill": "Thunderbolt Boxing",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.evaC = {
  "name": "EVA C (12%)",
  "level": 100,
  "fighter": {
      "name": "C.C",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Blood Frenzy Reset",
          "Shield Wall Burst",
          "Thunderclap Quake Reset"
      ]
  },
  "pet": {
      "name": "Rekachu",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Seal (Rekachu Special)",
          "Barbarian (Active)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Agile Staff",
  "stats": {
      "str": 1032,
      "dex": 4023,
      "sta": 2031,
      "brk": 330,
      "def": 2304,
      "hit": 2088,
      "eva": 2929,
      "res": 482,
      "crt": 330,
      "atkPercent": 107,
      "minAtk": 1707,
      "maxAtk": 2565,
      "hpPercent": 99,
      "hp": 19890,
      "spd": 722,
      "spPercent": 0,
      "sp": 303,
      "furyReversion": 25
  },
  "skills": [
      "Lightning Ball",
      "Blood Sacrifice",
      "Thunderclap Quake",
      "Magic Stealing",
      "Shield Wall",
      "Cleanse"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Cursed Seal Jutsu",
      "Genjutsu",
      "Healing"
  ],
  "resistance": [
      "Thunder",
      "Genjutsu"
  ],
  "phylactery": {
      "skill": "Thunderbolt Boxing",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.brkSpdster = {
  "name": "BRK Spdster (5%)",
  "level": 100,
  "fighter": {
      "name": "Nami",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Thunderclap Quake Reset",
          "Shield Wall Burst",
          "Blood Frenzy Reset"
      ]
  },
  "pet": {
      "name": "Sleipnir",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Freezing (Sleipnir Special)",
          "Barbarian (Active)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Agile Rod",
  "stats": {
      "str": 2017,
      "dex": 4023,
      "sta": 1046,
      "brk": 2620,
      "def": 2304,
      "hit": 2088,
      "eva": 832,
      "res": 482,
      "crt": 330,
      "atkPercent": 92,
      "minAtk": 2476,
      "maxAtk": 3720,
      "hpPercent": 114,
      "hp": 14125,
      "spd": 722,
      "spPercent": 0,
      "sp": 165,
      "furyReversion": 25
  },
  "skills": [
      "Blood Frenzy",
      "Rebirth",
      "Thunderclap Quake",
      "Assassinate",
      "Magic Stealing",
      "Moving Illusion"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Cursed Seal Jutsu",
      "Genjutsu",
      "Healing"
  ],
  "resistance": [
      "Thunder",
      "Genjutsu"
  ],
  "phylactery": {
      "skill": "Thunderbolt Boxing",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.hybridSpdster = {
  "name": "Hybrid Spd (1%)",
  "level": 100,
  "fighter": {
      "name": "Hanuman",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Blood Frenzy Reset",
          "Shield Wall Burst",
          "Thunderclap Quake Reset"
      ]
  },
  "pet": {
      "name": "Fenrir",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Stun (Fenrir Special)",
          "Barbarian (Active)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Agile Rod",
  "stats": {
      "str": 1020,
      "dex": 3206,
      "sta": 2007,
      "brk": 1750,
      "def": 2112,
      "hit": 2028,
      "eva": 730,
      "res": 330,
      "crt": 2509,
      "atkPercent": 95.4,
      "minAtk": 1630,
      "maxAtk": 2448,
      "hpPercent": 39,
      "hp": 15947,
      "spd": 670,
      "spPercent": 0,
      "sp": 282,
      "furyReversion": 25
  },
  "skills": [
      "Assassinate",
      "Thunderclap Quake",
      "Blood Frenzy",
      "Magic Stealing",
      "Rebirth",
      "Thunderbolt Boxing"
  ],
  "expertise": [
      "Water",
      "Fire",
      "Earth",
      "Thunder",
      "Wind",
      "Ninjutsu",
      "Cursed Seal Jutsu",
      "Genjutsu",
      "Healing"
  ],
  "resistance": [
      "Thunder",
      "Genjutsu"
  ],
  "phylactery": {
      "skill": "Moving Illusion",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}

Players.reflect = {
  "name": "Reflect (1%)",
  "level": 100,
  "fighter": {
      "name": "Cloud",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Golden Shield Reset",
          "Shield Wall Burst",
          "Energy Shield Reset"
      ]
  },
  "pet": {
      "name": "Sleipnir",
      "plus": 21,
      "evolved": true,
      "skills": [
          "Defense",
          "Freezing (Sleipnir Special)",
          "Energy Shield (Passive)"
      ]
  },
  "weapon": "Tyrant Callous Axe",
  "stats": {
      "str": 2004,
      "dex": 1018,
      "sta": 4035,
      "brk": 2570,
      "def": 794,
      "hit": 528,
      "eva": 393,
      "res": 330,
      "crt": 1992,
      "atkPercent": 97,
      "minAtk": 3238,
      "maxAtk": 3659,
      "hpPercent": 99,
      "hp": 45997,
      "spd": 183,
      "spPercent": 0,
      "sp": 744,
      "furyReversion": 30
  },
  "skills": [
      "Anit-damage Chop",
      "Golden Shield",
      "Counterattack",
      "Energy Shield",
      "Earth-Style Wall",
      "Barbarism"
  ],
  "expertise": [
      "Water",
      "Earth",
      "Thunder",
      "Wind",
      "Taijutsu",
      "Genjutsu",
      "Healing",
      "Ninjutsu",
      "Cursed Seal Jutsu"
  ],
  "resistance": [
      "Genjutsu",
      "Healing"
  ],
  "phylactery": {
      "skill": "Rebirth",
      "extraTriggerPercent": 3
  },
  "totem": {
      "name": "Lightning Attack Totem",
      "level": 64
  }
}
