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
  ironMan: {
    name: "Iron Man",
    evoName: "Iron Man",
    iconId: 82,
    weaponType: WeaponType.gloves,
    isv: [38, 38, 24],
    growthRate: [1.9, 1.9, 1.2],
    bmv: [8, 8, 20],
    mastery: SkillType.taijutsu.name
  },
  hel: {
    name: "Hel",
    evoName: "Hel",
    iconId: 85,
    weaponType: WeaponType.dagger,
    isv: [25, 40, 25],
    growthRate: [1.6, 2, 1.6],
    bmv: [15, 7, 15],
    mastery: SkillType.fire.name
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
  metalx: {
    name: "MetalX",
    evoName: "E·MetalX",
    iconId: 68,
    weaponType: WeaponType.gloves,
    isv: [36, 25, 29],
    growthRate: [1.8, 1.5, 1.7],
    bmv: [9, 15, 10],
    mastery: SkillType.wind.name
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
    isv: [34, 38, 24],
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
  zeus: {
    name: "Zeus",
    evoName: "E·Zeus",
    iconId: 71,
    weaponType: WeaponType.gloves,
    isv: [36, 29, 25],
    growthRate: [1.8, 1.7, 1.5],
    bmv: [9, 12, 16],
    mastery: SkillType.water.name
  },
  hades: {
    name: "Hades",
    evoName: "E·Hades",
    iconId: 69,
    weaponType: WeaponType.gloves,
    isv: [36, 25, 29],
    growthRate: [1.8, 1.5, 1.7],
    bmv: [9, 16, 12],
    mastery: SkillType.fire.name
  },
  deathKnight: {
    name: "Death Knight",
    evoName: "E·Death Knight",
    iconId: 64,
    weaponType: WeaponType.heavyWeapon,
    isv: [30, 35, 25],
    growthRate: [1.6, 1.9, 1.5],
    bmv: [11, 8, 15],
    mastery: SkillType.wind.name
  },
  wanderer: {
    name: "Wanderer",
    evoName: "E·Wanderer",
    iconId: 67,
    weaponType: WeaponType.sword,
    isv: [25, 35, 30],
    growthRate: [1.4, 1.9, 1.7],
    bmv: [17, 8, 12],
    mastery: SkillType.thunder.name
  },
  shinigami: {
    name: "Shinigami",
    evoName: "E·Shinigami",
    iconId: 66,
    weaponType: WeaponType.sword,
    isv: [32, 22, 36],
    growthRate: [1.7, 1.4, 1.9],
    bmv: [12, 17, 8],
    mastery: SkillType.cursedSealJutsu.name
  },
  thor: {
    name: "Thor",
    evoName: "E·Thor",
    iconId: 65,
    weaponType: WeaponType.sword,
    isv: [25, 31, 34],
    growthRate: [1.4, 1.7, 1.9],
    bmv: [17, 12, 8],
    mastery: SkillType.healing.name
  },
  evilGuanYu: {
    name: "Evil Guan Yu",
    evoName: "E·Evil Guan Yu",
    iconId: 60,
    weaponType: WeaponType.cudgel,
    isv: [34, 31, 25],
    growthRate: [1.9, 1.7, 1.4],
    bmv: [8, 12, 17],
    mastery: SkillType.taijutsu.name
  },
  void: {
    name: "Void",
    evoName: "E·Void",
    iconId: 58,
    weaponType: WeaponType.dagger,
    isv: [33, 27, 30],
    growthRate: [1.8, 1.5, 1.7],
    bmv: [8, 17, 12],
    mastery: SkillType.genjutsu.name
  },
  altira: {
    name: "Altira",
    evoName: "E·Altira",
    iconId: 61,
    weaponType: WeaponType.sword,
    isv: [30, 40, 20],
    growthRate: [1.6, 1.9, 1.5],
    bmv: [11, 8, 18],
    mastery: SkillType.genjutsu.name
  },
  badger: {
    name: "Badger",
    evoName: "E·Badger",
    iconId: 63,
    weaponType: WeaponType.gloves,
    isv: [26, 35, 29],
    growthRate: [1.5, 1.8, 1.7],
    bmv: [17, 8, 12],
    mastery: SkillType.fire.name
  },
  merv: {
    name: "Merv",
    evoName: "E·Merv",
    iconId: 59,
    weaponType: WeaponType.staff,
    isv: [33, 21, 36],
    growthRate: [1.75, 1.35, 1.9],
    bmv: [11, 18, 8],
    mastery: SkillType.fire.name
  },
  fleshy: {
    name: "Fleshy",
    evoName: "E·Fleshy",
    iconId: 62,
    weaponType: WeaponType.gloves,
    isv: [25, 32, 33],
    growthRate: [1.4, 1.8, 1.8],
    bmv: [17, 12, 8],
    mastery: SkillType.taijutsu.name
  },
  simaYi: {
    name: "Sima Yi",
    evoName: "E·Sima Yi",
    iconId: 51,
    weaponType: WeaponType.dagger,
    isv: [33, 26, 30],
    growthRate: [1.8, 1.45, 1.75],
    bmv: [8, 18, 11],
    mastery: SkillType.fire.name
  },
  toadmeister: {
    name: "Toadmeister",
    evoName: "E·Toadmeister",
    iconId: 53,
    weaponType: WeaponType.sword,
    isv: [30, 37, 22],
    growthRate: [1.65, 1.85, 1.45],
    bmv: [11, 9, 17],
    mastery: SkillType.thunder.name
  },
  llamar: {
    name: "Llamar",
    evoName: "E·Llamar",
    iconId: 56,
    weaponType: WeaponType.cudgel,
    isv: [25, 35, 29],
    growthRate: [1.45, 1.85, 1.65],
    bmv: [18, 8, 11],
    mastery: SkillType.genjutsu.name
  },
  chrome: {
    name: "Chrome",
    evoName: "E·Chrome",
    iconId: 54,
    weaponType: WeaponType.gloves,
    isv: [34, 19, 36],
    growthRate: [1.75, 1.35, 1.85],
    bmv: [11, 18, 8],
    mastery: SkillType.healing.name
  },
  freya: {
    name: "Freya",
    evoName: "E·Freya",
    iconId: 52,
    weaponType: WeaponType.heavyWeapon,
    isv: [24, 32, 33],
    growthRate: [1.35, 1.75, 1.85],
    bmv: [18, 11, 8],
    mastery: SkillType.healing.name
  },
  jupiter: {
    name: "Jupiter",
    evoName: "E·Jupiter",
    iconId: 55,
    weaponType: WeaponType.staff,
    isv: [35, 31, 23],
    growthRate: [1.8, 1.75, 1.4],
    bmv: [8, 12, 17],
    mastery: SkillType.ninjutsu.name
  },
  killua: {
    name: "Killua",
    evoName: "Killua",
    iconId: 81,
    weaponType: WeaponType.dagger,
    isv: [40, 25, 25],
    growthRate: [2, 1.6, 1.6],
    bmv: [7, 15, 15],
    mastery: SkillType.thunder.name
  },
};

export default Fighters;
