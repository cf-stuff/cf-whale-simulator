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
    stats: {},
    resets: {},
    healing: undefined
  },
  pet: {
    name: "None",
    plus: 0,
    evolved: false,
    skills: {},
    evoSkills: {}
  }
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
      pet.plus = Utils.clamp(pet.plus, pet.evolved ? 1 : 0, pet.evolved ? 21 : 34);
      return { ...state, pet };
  }
}
