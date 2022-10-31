import { simulateBattle } from "./battle.js";
import { buildToPlayer, formToBuild, initForm } from "./form.js";
import { EVOLVED_FIGHTER_SKILL, EVOLVED_PET_SKILL, FIGHTER, PET, PET_SKILL, SKILL, SKILL_TYPE, TOTEM } from "./config.js";
import { render } from "./display.js";
import BuildTemplate from "./templates.js";

const player1 = {
  name: "Dingus",
  level: 100,
  fighter: {
    name: FIGHTER.cc.name,
    plus: 21,
    mastery: FIGHTER.cc.mastery,
    evolved: true,
    skills: [EVOLVED_FIGHTER_SKILL.thunderclapQuake.name, EVOLVED_FIGHTER_SKILL.pray.name, EVOLVED_FIGHTER_SKILL.bloodFrenzy.name]
  },
  pet: {
    name: PET.riceball.name,
    plus: 21,
    evolved: true,
    skills: [PET_SKILL.block.name, PET_SKILL.healing.name],
    evoSkills: [EVOLVED_PET_SKILL.energyShield.name, EVOLVED_PET_SKILL.needle.name]
  },
  weapon: "Tyrant Agile Staff",
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
    SKILL.bloodFrenzy.name, SKILL.woundInfection.name, SKILL.thunderclapQuake.name,
    SKILL.magicStealing.name, SKILL.shieldWall.name, SKILL.cleanse.name
  ],
  expertise: [
    SKILL_TYPE.water.name, SKILL_TYPE.fire.name, SKILL_TYPE.earth.name, SKILL_TYPE.thunder.name, SKILL_TYPE.wind.name,
    SKILL_TYPE.taijutsu.name, SKILL_TYPE.ninjutsu.name, SKILL_TYPE.genjutsu.name, SKILL_TYPE.healing.name
  ],
  resistance: [SKILL_TYPE.fire.name, SKILL_TYPE.genjutsu.name],
  phylactery: {
    skill: SKILL.thunderboltBoxing.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: TOTEM.purple.name,
    level: 64
  }
};

const tank = {
  name: "Tank Template",
  level: 100,
  fighter: {
    name: FIGHTER.madara.name,
    plus: 21,
    mastery: FIGHTER.madara.mastery,
    evolved: true,
    skills: [EVOLVED_FIGHTER_SKILL.rejuvenation.name, EVOLVED_FIGHTER_SKILL.pray.name, EVOLVED_FIGHTER_SKILL.energyShield.name]
  },
  pet: {
    name: PET.riceball.name,
    plus: 21,
    evolved: true,
    skills: [PET_SKILL.block.name, PET_SKILL.healing.name],
    evoSkills: [EVOLVED_PET_SKILL.energyShield.name, EVOLVED_PET_SKILL.ignite.name]
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
    SKILL.energyShield.name, SKILL.rejuvenation.name, SKILL.earthStyleWall.name,
    SKILL.drawPower.name, SKILL.poisonousFog.name, SKILL.arrivalOfThunderGod.name
  ],
  expertise: [
    SKILL_TYPE.water.name, SKILL_TYPE.fire.name, SKILL_TYPE.earth.name, SKILL_TYPE.thunder.name, SKILL_TYPE.wind.name,
    SKILL_TYPE.ninjutsu.name, SKILL_TYPE.cursedSealJutsu.name, SKILL_TYPE.genjutsu.name, SKILL_TYPE.healing.name
  ],
  resistance: [SKILL_TYPE.healing.name, SKILL_TYPE.genjutsu.name],
  phylactery: {
    skill: SKILL.movingIllusion.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: TOTEM.green.name,
    level: 64
  }
};

const critHybrid = {
  name: "Gumi",
  level: 100,
  fighter: {
    name: FIGHTER.stryker.name,
    plus: 21,
    mastery: FIGHTER.stryker.mastery,
    evolved: true,
    skills: [EVOLVED_FIGHTER_SKILL.goldenShield.name, EVOLVED_FIGHTER_SKILL.pray.name, EVOLVED_FIGHTER_SKILL.bloodFrenzy.name]
  },
  pet: {
    name: PET.bat.name,
    plus: 21,
    evolved: true,
    skills: [PET_SKILL.block.name, PET_SKILL.bloodsucking.name],
    evoSkills: [EVOLVED_PET_SKILL.meditation.name]
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
    SKILL.fireShield.name, SKILL.goldenShield.name, SKILL.bloodSacrifice.name,
    SKILL.assassinate.name, SKILL.movingIllusion.name, SKILL.rebirth.name
  ],
  expertise: [
    SKILL_TYPE.water.name, SKILL_TYPE.fire.name, SKILL_TYPE.earth.name, SKILL_TYPE.thunder.name, SKILL_TYPE.wind.name,
    SKILL_TYPE.ninjutsu.name, SKILL_TYPE.cursedSealJutsu.name, SKILL_TYPE.genjutsu.name, SKILL_TYPE.healing.name
  ],
  resistance: [SKILL_TYPE.thunder.name, SKILL_TYPE.genjutsu.name],
  phylactery: {
    skill: SKILL.bloodFrenzy.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: TOTEM.white.name,
    level: 64
  }
};

const brkTank = {
  name: "Brk Tank Template",
  level: 100,
  fighter: {
    name: FIGHTER.madara.name,
    plus: 21,
    mastery: FIGHTER.madara.mastery,
    evolved: true,
    skills: [EVOLVED_FIGHTER_SKILL.bloodFrenzy.name, EVOLVED_FIGHTER_SKILL.shieldWall.name, EVOLVED_FIGHTER_SKILL.thunderclapQuake.name]
  },
  pet: {
    name: PET.sleipnir.name,
    plus: 21,
    evolved: true,
    skills: [PET_SKILL.block.name, PET_SKILL.freezing.name],
    evoSkills: [EVOLVED_PET_SKILL.barbarian.name, EVOLVED_PET_SKILL.energyShield.name]
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
    SKILL.bloodFrenzy.name, SKILL.thunderclapQuake.name, SKILL.thunderboltBoxing.name,
    SKILL.drawPower.name, SKILL.goldenShield.name, SKILL.bloodSacrifice.name
  ],
  expertise: [
    SKILL_TYPE.water.name, SKILL_TYPE.fire.name, SKILL_TYPE.earth.name, SKILL_TYPE.thunder.name, SKILL_TYPE.wind.name,
    SKILL_TYPE.ninjutsu.name, SKILL_TYPE.cursedSealJutsu.name, SKILL_TYPE.genjutsu.name, SKILL_TYPE.healing.name
  ],
  resistance: [SKILL_TYPE.healing.name, SKILL_TYPE.genjutsu.name],
  phylactery: {
    skill: SKILL.movingIllusion.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: TOTEM.white.name,
    level: 64
  }
};

const evader = {
  name: "Evader Template",
  level: 100,
  fighter: {
    name: FIGHTER.cc.name,
    plus: 21,
    mastery: FIGHTER.cc.mastery,
    evolved: true,
    skills: [EVOLVED_FIGHTER_SKILL.thunderclapQuake.name, EVOLVED_FIGHTER_SKILL.shieldWall.name, EVOLVED_FIGHTER_SKILL.bloodFrenzy.name]
  },
  pet: {
    name: PET.rekachu.name,
    plus: 21,
    evolved: true,
    skills: [PET_SKILL.block.name, PET_SKILL.seal.name],
    evoSkills: [EVOLVED_PET_SKILL.energyShield.name, EVOLVED_PET_SKILL.needle.name]
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
    SKILL.bloodFrenzy.name, SKILL.assassinate.name, SKILL.thunderclapQuake.name,
    SKILL.magicStealing.name, SKILL.shieldWall.name, SKILL.cleanse.name
  ],
  expertise: [
    SKILL_TYPE.water.name, SKILL_TYPE.fire.name, SKILL_TYPE.earth.name, SKILL_TYPE.thunder.name, SKILL_TYPE.wind.name,
    SKILL_TYPE.taijutsu.name, SKILL_TYPE.ninjutsu.name, SKILL_TYPE.genjutsu.name, SKILL_TYPE.healing.name
  ],
  resistance: [SKILL_TYPE.thunder.name, SKILL_TYPE.genjutsu.name],
  phylactery: {
    skill: SKILL.thunderboltBoxing.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: TOTEM.white.name,
    level: 64
  }
};

const brkHH = {
  name: "Brk HH Template",
  level: 100,
  fighter: {
    name: FIGHTER.stryker.name,
    plus: 21,
    mastery: FIGHTER.stryker.mastery,
    evolved: true,
    skills: [EVOLVED_FIGHTER_SKILL.goldenShield.name, EVOLVED_FIGHTER_SKILL.pray.name, EVOLVED_FIGHTER_SKILL.bloodFrenzy.name]
  },
  pet: {
    name: PET.sleipnir.name,
    plus: 21,
    evolved: true,
    skills: [PET_SKILL.block.name, PET_SKILL.freezing.name],
    evoSkills: [EVOLVED_PET_SKILL.energyShield.name, EVOLVED_PET_SKILL.barbarian.name]
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
    SKILL.fireShield.name, SKILL.goldenShield.name, SKILL.bloodSacrifice.name,
    SKILL.assassinate.name, SKILL.movingIllusion.name, SKILL.rebirth.name
  ],
  expertise: [
    SKILL_TYPE.water.name, SKILL_TYPE.fire.name, SKILL_TYPE.earth.name, SKILL_TYPE.thunder.name, SKILL_TYPE.wind.name,
    SKILL_TYPE.ninjutsu.name, SKILL_TYPE.cursedSealJutsu.name, SKILL_TYPE.genjutsu.name, SKILL_TYPE.healing.name
  ],
  resistance: [SKILL_TYPE.healing.name, SKILL_TYPE.genjutsu.name],
  phylactery: {
    skill: SKILL.bloodFrenzy.name,
    extraTriggerPercent: 3
  },
  totem: {
    name: TOTEM.white.name,
    level: 64
  }
};

initForm();
render();

// simulateBattle([brkHH, tank, evader], [brkTank, evader, tank]);
