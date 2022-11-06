import { SkillPhase, SkillTarget } from "./categories.js";
import Status from "./status.js";

const Totems = {
  black: {
    name: "Sword Fury Totem",
    iconId: 1,
    effect: {
      status: Status.furious.name,
      target: SkillTarget.self,
    },
    effectIncreasePerLevel: 0.5,
    phase: SkillPhase.beforeFight,
    triggerPercent: 100
  },
  purple: {
    name: "Positive Thorn Shield Totem",
    iconId: 2,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.rooted.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  blue: {
    name: "Positive Cleanse Totem",
    iconId: 3,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      removeRandomDebuff: true
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  green: {
    name: "Positive Seal Totem",
    iconId: 4,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.silenced.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  yellow: {
    name: "Time Vortex Totem",
    iconId: 5,
    effect: {
      status: Status.tenacious.name,
      target: SkillTarget.both
    },
    undodgeable: true,
    effectIncreasePerLevel: 0.3,
    phase: SkillPhase.beforeFight,
    triggerPercent: 100,
  },
  orange: {
    name: "Positive Dizzy Totem",
    iconId: 6,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.dizzy.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  red: {
    name: "Positive Burn Totem",
    iconId: 7,
    damage: {
      atkMultiplier: 0.5
    },
    effect: {
      status: Status.ignited.name,
      target: SkillTarget.enemy
    },
    phase: SkillPhase.petAttack,
    triggerPercent: 2,
    triggerPercentPerLevel: 0.1
  },
  white: {
    name: "Lightning Attack Totem",
    iconId: 8,
    effect: {
      status: Status.shocked.name,
      target: SkillTarget.enemy
    },
    undodgeable: true,
    effectIncreasePerLevel: 0.5,
    phase: SkillPhase.beforeFight,
    triggerPercent: 100
  },
};

export default Totems;
