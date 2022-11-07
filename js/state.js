import CFDB from "./data/CFDB.js";
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
  resistance: "resistance"
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
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.name:
      return { ...state, name: action.payload.substr(0, 13) };
    case ActionType.level:
      return { ...state, level: Utils.clamp(action.payload, 1, 100) };
    case ActionType.fighter:
      const fighter = state.fighter;
      Object.entries(action.payload).forEach(([key, value]) => fighter[key] = value);
      fighter.plus = Utils.clamp(fighter.plus, fighter.evolved ? 1 : 0, fighter.evolved ? 21 : 34);
      fighter.potentials.str = Utils.clamp(fighter.potentials.str, 0, 360);
      fighter.potentials.dex = Utils.clamp(fighter.potentials.dex, 0, 360);
      fighter.potentials.sta = Utils.clamp(fighter.potentials.sta, 0, 360);
      return { ...state, fighter };
    case ActionType.pet:
      const pet = state.pet;
      Object.entries(action.payload).forEach(([key, value]) => pet[key] = value);
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
    case ActionType.nexus:
      const nexusStats = CFDB.getNexusStats().map(stat => stat.name);
      const nexus = action.payload.filter(soul => soul && nexusStats.includes(soul.stat));
      nexus.forEach(soul => soul.level = Utils.clamp(soul.level, 1, 12));
      return { ...state, nexus };
    case ActionType.altar:
      const altar = action.payload;
      CFDB.getStarAltar().forEach(stat => altar[stat.stat] = Utils.clamp(altar[stat.stat], 0, stat.max));
      return { ...state, altar };
  }
}
