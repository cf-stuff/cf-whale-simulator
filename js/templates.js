import { EVOLVED_FIGHTER_SKILL, EVOLVED_PET_SKILL, FIGHTER, PET, SKILL, SKILL_TYPE, TOTEM } from "./config.js";
import { ARENA_TITLE, BuildStat, EVOLVED_PET_SKILL_ICONS, FIGHTER_SKILL_ICONS, GEAR, GEM, PET_SKILL_ICONS } from "./formInfo.js";

const BuildTemplate = {};

BuildTemplate.brkTank = {
  name: "BrkTankPreset",
  level: 100,
  fighter: {
    name: FIGHTER.madara.name,
    plus: 21,
    evolved: true,
    potentials: {
      str: 360,
      dex: 360,
      sta: 360
    },
    skills: [
      FIGHTER_SKILL_ICONS.atkPercent.name, FIGHTER_SKILL_ICONS.spd.name, FIGHTER_SKILL_ICONS.fury.name,
      EVOLVED_FIGHTER_SKILL.bloodFrenzy.name, EVOLVED_FIGHTER_SKILL.pray.name, EVOLVED_FIGHTER_SKILL.thunderclapQuake.name
    ]
  },
  pet: {
    name: PET.sleipnir.name,
    plus: 21,
    evolved: true,
    skills: [
      PET_SKILL_ICONS.block.name, PET_SKILL_ICONS.sleipnirSpecialSkill.name, PET_SKILL_ICONS.sleipnirSpecialStat.name,
      PET_SKILL_ICONS.brk_100.name, PET_SKILL_ICONS.brk_50.name, PET_SKILL_ICONS.def_60.name,
      PET_SKILL_ICONS.hit_100.name, PET_SKILL_ICONS.hit_50.name, PET_SKILL_ICONS.res_100.name,
      PET_SKILL_ICONS.res_50.name, PET_SKILL_ICONS.atkPercent_10.name, PET_SKILL_ICONS.spd_10.name
    ],
    evoSkills: [
      EVOLVED_PET_SKILL_ICONS.atkPercent_25.name, EVOLVED_PET_SKILL_ICONS.hpPercent_25.name, EVOLVED_PET_SKILL_ICONS.spd_30.name,
      EVOLVED_PET_SKILL_ICONS.spd_20.name, EVOLVED_PET_SKILL.barbarian.name, EVOLVED_PET_SKILL.energyShield.name],
  },
  gear: [
    {
      name: GEAR.tyrantCallousSword.name,
      enhancement: 10,
      stats: {
        res: 135,
        def: 125,
        hit: 120,
        brk: 150
      },
      gems: [{ name: GEM.topaz.name, level: 10 }, { name: GEM.topaz.name, level: 10 }, { name: GEM.topaz.name, level: 10 }]
    },
    {
      name: GEAR.tyrantBloodthirstyHelmet.name,
      enhancement: 10,
      stats: {
        res: 135,
        def: 125,
        hit: 120,
        brk: 150
      },
      gems: [{ name: GEM.topaz.name, level: 10 }, { name: GEM.emerald.name, level: 10 }]
    },
    {
      name: GEAR.tyrantBloodthirstyNecklace.name,
      enhancement: 10,
      stats: {
        res: 135,
        def: 125,
        hit: 120,
        brk: 150
      },
      gems: [{ name: GEM.topaz.name, level: 10 }, { name: GEM.emerald.name, level: 10 }]
    },
    {
      name: GEAR.tyrantAgileBoots.name,
      enhancement: 10,
      stats: {
        res: 135,
        def: 125,
        hit: 120,
        brk: 150
      },
      gems: [{ name: GEM.topaz.name, level: 10 }, { name: GEM.emerald.name, level: 10 }]
    },
    {
      name: GEAR.tyrantAgileArmor.name,
      enhancement: 10,
      stats: {
        sta: 137,
        def: 130,
        hit: 124,
        brk: 156
      },
      gems: [{ name: GEM.topaz.name, level: 10 }, { name: GEM.emerald.name, level: 10 }]
    },
    {
      name: GEAR.tyrantCallousGloves.name,
      enhancement: 10,
      stats: {
        sta: 137,
        def: 130,
        hit: 124,
        brk: 156
      },
      gems: [{ name: GEM.topaz.name, level: 10 }, { name: GEM.emerald.name, level: 10 }]
    },
    {
      name: GEAR.tyrantCallousLeggings.name,
      enhancement: 10,
      stats: {
        res: 140,
        def: 130,
        hit: 124,
        brk: 156
      },
      gems: [{ name: GEM.topaz.name, level: 10 }, { name: GEM.emerald.name, level: 10 }]
    },
    {
      name: GEAR.viperRing.name,
      enhancement: 10,
      stats: {
        sta: 127,
        def: 110,
        hit: 108,
        brk: 132
      },
      gems: [{ name: GEM.topaz.name, level: 9 }, { name: GEM.emerald.name, level: 9 }]
    }
  ],
  phylactery: {
    level: 20,
    skill: SKILL.movingIllusion.name,
    stats: [BuildStat.sta, BuildStat.sta, BuildStat.dex],
    glyphs: [
      {
        stat: BuildStat.brk,
        level: 6
      },
      {
        stat: BuildStat.def,
        level: 6
      },
      {
        stat: BuildStat.hit,
        level: 6
      },
      {
        stat: BuildStat.res,
        level: 6
      },
    ]
  },
  nexus: [
    {
      stat: BuildStat.sta,
      level: 12
    },
    {
      stat: BuildStat.brk,
      level: 12
    },
    {
      stat: BuildStat.def,
      level: 12
    },
    {
      stat: BuildStat.hit,
      level: 12
    },
    {
      stat: BuildStat.res,
      level: 12
    },
    {
      stat: BuildStat.hp,
      level: 12
    },
    {
      stat: BuildStat.spd,
      level: 12
    },
    {
      stat: BuildStat.sp,
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
    name: TOTEM.white.name,
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
    SKILL.bloodFrenzy.name, SKILL.thunderclapQuake.name, SKILL.thunderboltBoxing.name,
    SKILL.drawPower.name, SKILL.goldenShield.name, SKILL.bloodSacrifice.name
  ],
  expertise: [
    SKILL_TYPE.water.name, SKILL_TYPE.fire.name, SKILL_TYPE.earth.name, SKILL_TYPE.thunder.name, SKILL_TYPE.wind.name,
    SKILL_TYPE.ninjutsu.name, SKILL_TYPE.cursedSealJutsu.name, SKILL_TYPE.genjutsu.name, SKILL_TYPE.healing.name
  ],
  resistance: [SKILL_TYPE.healing.name, SKILL_TYPE.genjutsu.name],
  arenaTitle: ARENA_TITLE.grandMaster2.name
}

export default BuildTemplate;
