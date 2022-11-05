import { SkillType, WeaponType } from "./categories.js";

const Fighters = {
  ainu: {
    name: "Ainu",
    evoName: "Ainu: God of CF",
    iconId: 29,
    weaponType: WeaponType.sword,
    isv: [12, 10, 26],
    growthRate: [0.6, 0.5, 1.27],
    bmv: [19, 29, 6],
    mastery: SkillType.healing.name
  },
  beauty: {
    name: "Beauty",
    evoName: "E·Beauty",
    iconId: 73,
    weaponType: WeaponType.staff,
    isv: [18, 36, 36],
    growthRate: [1.4, 1.8, 1.8],
    bmv: [24, 9, 9],
    mastery: SkillType.wind.name
  },
  evilIvbu: {
    name: "Evil Ivbu",
    evoName: "E·Evil Ivbu",
    iconId: 74,
    weaponType: WeaponType.cudgel,
    isv: [36, 18, 36],
    growthRate: [1.8, 1.4, 1.8],
    bmv: [9, 24, 9],
    mastery: SkillType.fire.name
  },
  rugalz: {
    name: "Rugalz",
    evoName: "E·Rugalz",
    iconId: 89,
    weaponType: WeaponType.gloves,
    isv: [33, 33, 33],
    growthRate: [1.75, 1.75, 1.75],
    bmv: [10, 10, 10],
    mastery: SkillType.taijutsu.name
  },
  lionDancer: {
    name: "Lion Dancer",
    evoName: "Lion Dancer",
    iconId: 207,
    weaponType: WeaponType.gloves,
    isv: [35, 35, 35],
    growthRate: [1.75, 1.75, 1.75],
    bmv: [10, 10, 10],
    mastery: SkillType.genjutsu.name
  },
  pumpkin: {
    name: "Pumpkin",
    evoName: "E·Pumpkin",
    iconId: 88,
    weaponType: WeaponType.staff,
    isv: [30, 38, 23],
    growthRate: [1.5, 1.9, 1.6],
    bmv: [16, 8, 12],
    mastery: SkillType.wind.name
  },
  shifter: {
    name: "Shifter",
    evoName: "E·Shifter",
    iconId: 83,
    weaponType: WeaponType.dagger,
    isv: [30, 24, 36],
    growthRate: [1.7, 1.4, 1.9],
    bmv: [10, 17, 8],
    mastery: SkillType.water.name
  },
  sif: {
    name: "Sif",
    evoName: "E·Sif",
    iconId: 84,
    weaponType: WeaponType.cudgel,
    isv: [30, 26, 34],
    growthRate: [1.65, 1.5, 1.85],
    bmv: [10, 17, 9],
    mastery: SkillType.taijutsu.name
  },
  madara: {
    name: "Madara",
    evoName: "E·Madara",
    iconId: 98,
    weaponType: WeaponType.sword,
    isv: [25, 25, 40],
    growthRate: [1.6, 1.6, 2],
    bmv: [15, 15, 7],
    mastery: SkillType.cursedSealJutsu.name
  },
  cc: {
    name: "C.C",
    evoName: "C.C",
    iconId: 206,
    weaponType: WeaponType.staff,
    isv: [24, 38, 34],
    growthRate: [1.5, 1.9, 1.8],
    bmv: [16, 8, 10],
    mastery: SkillType.thunder.name
  },
  stryker: {
    name: "Stryker",
    evoName: "E·Stryker",
    iconId: 93,
    weaponType: WeaponType.sword,
    isv: [38, 25, 33],
    growthRate: [1.9, 1.45, 1.85],
    bmv: [8, 15, 11],
    mastery: SkillType.fire.name
  },
  nami: {
    name: "Nami",
    evoName: "Nami",
    iconId: 95,
    weaponType: WeaponType.cudgel,
    isv: [34, 28, 24],
    growthRate: [1.75, 1.9, 1.55],
    bmv: [10, 8, 16],
    mastery: SkillType.thunder.name
  },
  onmyouji: {
    name: "Onmyouji",
    evoName: "Onmyouji",
    iconId: 205,
    weaponType: WeaponType.staff,
    isv: [36, 33, 27],
    growthRate: [1.9, 1.8, 1.5],
    bmv: [9, 11, 14],
    mastery: SkillType.water.name
  },
  susanoo: {
    name: "Susanoo",
    evoName: "E·Susanoo",
    iconId: 96,
    weaponType: WeaponType.heavyWeapon,
    isv: [25, 32, 36],
    growthRate: [1.45, 1.75, 1.9],
    bmv: [16, 11, 8],
    mastery: SkillType.healing.name
  },
  cloud: {
    name: "Cloud",
    evoName: "E·Cloud",
    iconId: 203,
    weaponType: WeaponType.heavyWeapon,
    isv: [34, 23, 36],
    growthRate: [1.7, 1.45, 1.95],
    bmv: [11, 16, 8],
    mastery: SkillType.healing.name
  },
  hanuman: {
    name: "Hanuman",
    evoName: "E·Hanuman",
    iconId: 202,
    weaponType: WeaponType.cudgel,
    isv: [25, 36, 32],
    growthRate: [1.45, 1.95, 1.7],
    bmv: [16, 8, 11],
    mastery: SkillType.genjutsu.name
  },
  kaneki: {
    name: "Kaneki",
    evoName: "E·Kaneki",
    iconId: 201,
    weaponType: WeaponType.dagger,
    isv: [36, 34, 23],
    growthRate: [1.9, 1.75, 1.45],
    bmv: [9, 11, 15],
    mastery: SkillType.ninjutsu.name
  },
  erza: {
    name: "Erza",
    evoName: "E·Erza",
    iconId: 97,
    weaponType: WeaponType.sword,
    isv: [38, 25, 30],
    growthRate: [1.95, 1.5, 1.65],
    bmv: [9, 14, 12],
    mastery: SkillType.genjutsu.name
  },
  zhaoYun: {
    name: "Zhao Yun",
    evoName: "E·Zhao Yun",
    iconId: 90,
    weaponType: WeaponType.cudgel,
    isv: [32, 38, 23],
    growthRate: [1.65, 1.9, 1.55],
    bmv: [10, 8, 17],
    mastery: SkillType.genjutsu.name
  },
  muramasa: {
    name: "Muramasa",
    evoName: "E·Muramasa",
    iconId: 79,
    weaponType: WeaponType.sword,
    isv: [34, 30, 26],
    growthRate: [1.85, 1.65, 1.5],
    bmv: [9, 11, 16],
    mastery: SkillType.genjutsu.name
  },
  ares: {
    name: "Ares",
    evoName: "E·Ares",
    iconId: 70,
    weaponType: WeaponType.heavyWeapon,
    isv: [36, 25, 30],
    growthRate: [1.8, 1.55, 1.75],
    bmv: [8, 16, 12],
    mastery: SkillType.taijutsu.name
  },
};

export default Fighters;
