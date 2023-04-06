import ArenaTitles from "./data/arena.js";
import CFDB from "./data/CFDB.js";
import Totems from "./data/totems.js";
import Utils from "./utils.js";

export const ActionType = {
  name: "name",
  level: "level",
  fighter: "fighter",
  pet: "pet",
  gear: "gear",
  phy: "phy",
  nexus: "nexus",
  altar: "altar",
  totem: "totem",
  arena: "arena",
  skills: "skills",
  expertise: "expertise",
  resistance: "resistance",
  import: "import"
}

export const initialState = {
  name: "CF Calculator",
  level: 100,
  fighter: {
    name: "None",
    plus: 0,
    evolved: false,
    potentials: { str: 0, dex: 0, sta: 0 },
    stats: [],
    resets: [],
    healing: undefined
  },
  pet: {
    name: "None",
    plus: 0,
    evolved: false,
    skills: [],
    evoSkills: []
  },
  gears: [],
  phylactery: {
    plus: 0,
    skill: undefined,
    stats: [],
    glyphs: []
  },
  nexus: [],
  altar: {
    str: 0,
    dex: 0,
    sta: 0,
    atkPercent: 0,
    def: 0,
    eva: 0,
    hpPercent: 0,
    hp: 0,
    crt: 0,
    spd: 0,
    brk: 0,
    hit: 0,
    res: 0,
    minAtk: 0,
    maxAtk: 0
  },
  totem: {
    name: Totems.black.name,
    level: 1,
    stats: {
      hit: 0,
      brk: 0,
      crt: 0,
      atkPercent: 0,
      hpPercent: 0,
      res: 0,
      def: 0,
      eva: 0
    }
  },
  skills: [],
  expertise: [],
  resistance: [],
  arenaTitle: ArenaTitles.newbie.name
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.name:
      return { ...state, name: action.payload.substr(0, 17) };
    case ActionType.level:
      return { ...state, level: Utils.clamp(action.payload, 1, 100) };
    case ActionType.fighter:
      const fighter = { ...state.fighter, ...action.payload }
      fighter.plus = Utils.clamp(fighter.plus, fighter.evolved ? 1 : 0, fighter.evolved ? 21 : 34);
      fighter.potentials.str = Utils.clamp(fighter.potentials.str, 0, 360);
      fighter.potentials.dex = Utils.clamp(fighter.potentials.dex, 0, 360);
      fighter.potentials.sta = Utils.clamp(fighter.potentials.sta, 0, 360);
      return { ...state, fighter };
    case ActionType.pet:
      const pet = { ...state.pet, ...action.payload };
      pet.plus = Utils.clamp(pet.plus, pet.evolved ? 1 : 0, pet.evolved ? 21 : 27);
      const petInfo = CFDB.getPet(pet.name);
      for (let i = pet.skills.length - 1; i >= 0; --i) {
        const skill = pet.skills[i];
        if (skill.includes("Special")) {
          const skillInfo = CFDB.getPetSkill(skill);
          if (petInfo && !skillInfo.iconId.endsWith(`_${petInfo.iconId}`)) {
            Utils.removeElement(pet.skills, skill);
            const newIconId = `${skillInfo.iconId.substring(0, 2)}_${petInfo.iconId}`;
            pet.skills.push(CFDB.getPetSkillByIconId(newIconId).name);
          }
        }
      }
      if (pet.evolved) {
        if (pet.plus < 21) CFDB.getPetActives().forEach(skill => Utils.removeElement(pet.evoSkills, skill.name));
        if (pet.plus < 15) CFDB.getPetPassives().forEach(skill => Utils.removeElement(pet.evoSkills, skill.name));
      }
      return { ...state, pet };
    case ActionType.gear:
      const gears = action.payload.filter(gear => gear && gear.name !== "None");
      gears.forEach(gear => {

        const gearInfo = CFDB.getGear(gear.name);
        gear.enhancement = Utils.clamp(gear.enhancement, 0, 10);
        gear.stats.forEach((stat, i) => {
          if (!stat) return;
          const statName = Object.keys(stat)[0];
          const max = CFDB.getGearMaxValue(gearInfo.level, statName, i === 3);
          stat[statName] = Utils.clamp(stat[statName], 0, max);
        });
        gear.gems.forEach(gem => {
          if (!gem) return;
          gem.plus = Utils.clamp(gem.plus, 0, CFDB.getGemMaxLevel(gearInfo));
        });
      });
      return { ...state, gears };
    case ActionType.phy:
      const phylactery = { ...state.phylactery, ...action.payload };
      phylactery.plus = Utils.clamp(phylactery.plus, 0, 20);
      phylactery.stats = phylactery.stats.filter(stat => stat && stat !== "None");
      phylactery.glyphs = phylactery.glyphs.filter(glyph => glyph && glyph.stat !== "None");
      phylactery.glyphs.forEach(glyph => glyph.plus = Utils.clamp(glyph.plus, 1, 6));
      return { ...state, phylactery };
    case ActionType.nexus:
      const nexusStats = CFDB.getNexusStats().map(stat => stat.name);
      const nexus = action.payload.filter(soul => soul && nexusStats.includes(soul.stat));
      nexus.forEach(soul => soul.level = Utils.clamp(soul.level, 1, 12));
      return { ...state, nexus };
    case ActionType.altar:
      const altar = { ...state.altar, ...action.payload };
      CFDB.getStarAltar().forEach(stat => altar[stat.stat] = Utils.clamp(altar[stat.stat], 0, stat.max));
      return { ...state, altar };
    case ActionType.totem:
      const totem = { ...state.totem, ...action.payload };
      totem.level = Utils.clamp(totem.level, 1, 64);
      Object.entries(totem.stats).forEach(([stat, value]) => totem.stats[stat] = Utils.clamp(value, 0, stat.includes("Percent") ? 12 : 120));
      return { ...state, totem }
    case ActionType.skills:
      const skills = action.payload;
      if (skills.length > 6) skills.length = 6;
      return { ...state, skills };
    case ActionType.expertise:
      const expertise = action.payload;
      if (expertise.length > 9) expertise.length = 9;
      return { ...state, expertise };
    case ActionType.resistance:
      const resistance = action.payload;
      if (resistance.length > 2) resistance.length = 2;
      return { ...state, resistance };
    case ActionType.arena:
      return { ...state, arenaTitle: action.payload }
    case ActionType.import:
      return action.payload;
    default:
      return state;
  }
}
