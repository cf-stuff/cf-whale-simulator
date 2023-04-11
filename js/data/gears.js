import { GearType, WeaponType } from "./categories.js";
import Fighters from "./fighters.js";

export const Gears = {
  eagleHelmet: {
    name: "Eagle Helmet",
    iconId: 441,
    level: 83,
    type: GearType.helmet.name,
    stats: {
      def: 42,
      hit: 108
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  mammothNecklace: {
    name: "Mammoth Necklace",
    iconId: 442,
    level: 84,
    type: GearType.necklace.name,
    stats: {
      def: 42,
      crt: 108
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  pantheraBoots: {
    name: "Panthera Boots",
    iconId: 443,
    level: 85,
    type: GearType.shoes.name,
    stats: {
      def: 42,
      eva: 110
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  testudoShield: {
    name: "Testudo Shield",
    iconId: 444,
    level: 87,
    type: GearType.chest.name,
    stats: {
      def: 208
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  ursaGloves: {
    name: "Ursa Gloves",
    iconId: 445,
    level: 88,
    type: GearType.gloves.name,
    stats: {
      def: 44,
      atkPercent: 6.3
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  limaxLeggings: {
    name: "Limax Leggings",
    iconId: 446,
    level: 89,
    type: GearType.pants.name,
    stats: {
      def: 44,
      res: 120
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  viperRing: {
    name: "Viper Ring",
    iconId: 447,
    level: 90,
    type: GearType.ring.name,
    stats: {
      def: 44,
      brk: 110
    },
    statsPerEnhance: {
      hp: 20
    }
  },
  tyrantBloodthirstyHelmet: {
    name: "Tyrant Bloodthirsty Helmet",
    iconId: 741,
    level: 93,
    type: GearType.helmet.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileHelmet: {
    name: "Tyrant Agile Helmet",
    iconId: 741,
    level: 93,
    type: GearType.helmet.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousHelmet: {
    name: "Tyrant Callous Helmet",
    iconId: 741,
    level: 93,
    type: GearType.helmet.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyNecklace: {
    name: "Tyrant Bloodthirsty Necklace",
    iconId: 742,
    level: 94,
    type: GearType.necklace.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileNecklace: {
    name: "Tyrant Agile Necklace",
    iconId: 742,
    level: 94,
    type: GearType.necklace.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousNecklace: {
    name: "Tyrant Callous Necklace",
    iconId: 742,
    level: 94,
    type: GearType.necklace.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyBoots: {
    name: "Tyrant Bloodthirsty Boots",
    iconId: 743,
    level: 95,
    type: GearType.shoes.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileBoots: {
    name: "Tyrant Agile Boots",
    iconId: 743,
    level: 95,
    type: GearType.shoes.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousBoots: {
    name: "Tyrant Callous Boots",
    iconId: 743,
    level: 95,
    type: GearType.shoes.name,
    stats: {
      def: 50
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyArmor: {
    name: "Tyrant Bloodthirsty Armor",
    iconId: 744,
    level: 97,
    type: GearType.chest.name,
    stats: {
      def: 114
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileArmor: {
    name: "Tyrant Agile Armor",
    iconId: 744,
    level: 97,
    type: GearType.chest.name,
    stats: {
      def: 114
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousArmor: {
    name: "Tyrant Callous Armor",
    iconId: 744,
    level: 97,
    type: GearType.chest.name,
    stats: {
      def: 114
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyGloves: {
    name: "Tyrant Bloodthirsty Gloves",
    iconId: 745,
    level: 99,
    type: GearType.gloves.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileGloves: {
    name: "Tyrant Agile Gloves",
    iconId: 745,
    level: 99,
    type: GearType.gloves.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousGloves: {
    name: "Tyrant Callous Gloves",
    iconId: 745,
    level: 99,
    type: GearType.gloves.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyLeggings: {
    name: "Tyrant Bloodthirsty Leggings",
    iconId: 746,
    level: 99,
    type: GearType.pants.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileLeggings: {
    name: "Tyrant Agile Leggings",
    iconId: 746,
    level: 99,
    type: GearType.pants.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousLeggings: {
    name: "Tyrant Callous Leggings",
    iconId: 746,
    level: 99,
    type: GearType.pants.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyRing: {
    name: "Tyrant Bloodthirsty Ring",
    iconId: 747,
    level: 100,
    type: GearType.ring.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantAgileRing: {
    name: "Tyrant Agile Ring",
    iconId: 747,
    level: 100,
    type: GearType.ring.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantCallousRing: {
    name: "Tyrant Callous Ring",
    iconId: 747,
    level: 100,
    type: GearType.ring.name,
    stats: {
      def: 52
    },
    statsPerEnhance: {
      hp: 22
    }
  },
  tyrantBloodthirstyFists: {
    name: "Tyrant Bloodthirsty Fists",
    iconId: 1075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.gloves,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileFists: {
    name: "Tyrant Agile Fists",
    iconId: 1075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.gloves,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousFists: {
    name: "Tyrant Callous Fists",
    iconId: 1075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.gloves,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstyStaff: {
    name: "Tyrant Bloodthirsty Staff",
    iconId: 2075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.staff,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileStaff: {
    name: "Tyrant Agile Staff",
    iconId: 2075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.staff,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousStaff: {
    name: "Tyrant Callous Staff",
    iconId: 2075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.staff,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstyAxe: {
    name: "Tyrant Bloodthirsty Axe",
    iconId: 3075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.heavyWeapon,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileAxe: {
    name: "Tyrant Agile Axe",
    iconId: 3075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.heavyWeapon,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousAxe: {
    name: "Tyrant Callous Axe",
    iconId: 3075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.heavyWeapon,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstySword: {
    name: "Tyrant Bloodthirsty Sword",
    iconId: 4075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.sword,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileSword: {
    name: "Tyrant Agile Sword",
    iconId: 4075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.sword,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousSword: {
    name: "Tyrant Callous Sword",
    iconId: 4075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.sword,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstyDagger: {
    name: "Tyrant Bloodthirsty Dagger",
    iconId: 5075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.dagger,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileDagger: {
    name: "Tyrant Agile Dagger",
    iconId: 5075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.dagger,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousDagger: {
    name: "Tyrant Callous Dagger",
    iconId: 5075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.dagger,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantBloodthirstyRod: {
    name: "Tyrant Bloodthirsty Rod",
    iconId: 6075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.cudgel,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      str: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantAgileRod: {
    name: "Tyrant Agile Rod",
    iconId: 6075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.cudgel,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      dex: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  tyrantCallousRod: {
    name: "Tyrant Callous Rod",
    iconId: 6075,
    level: 91,
    type: GearType.weapon.name,
    weaponType: WeaponType.cudgel,
    stats: {
      minAtk: 317,
      maxAtk: 408,
      sta: 100
    },
    statsPerEnhance: {
      minAtk: 22,
      maxAtk: 22
    }
  },
  goldenSquid: {
    name: "Golden Squid",
    iconId: 6086,
    level: 86,
    type: GearType.weapon.name,
    weaponType: WeaponType.cudgel,
    stats: {
      minAtk: 269,
      maxAtk: 348,
    },
    statsPerEnhance: {
      minAtk: 20,
      maxAtk: 20
    },
    exclusiveStat: {
      fighter: Fighters.llamar.name,
      stat: { eva: 80 }
    }
  },
  giantPhantasm: {
    name: "Giant Phantasm",
    iconId: 1086,
    level: 86,
    type: GearType.weapon.name,
    weaponType: WeaponType.gloves,
    stats: {
      minAtk: 269,
      maxAtk: 348,
    },
    statsPerEnhance: {
      minAtk: 20,
      maxAtk: 20
    },
    exclusiveStat: {
      fighter: Fighters.chrome.name,
      stat: { def: 80 }
    }
  },
  noctisKatana: {
    name: "Noctis Katana",
    iconId: 4086,
    level: 86,
    type: GearType.weapon.name,
    weaponType: WeaponType.sword,
    stats: {
      minAtk: 269,
      maxAtk: 348,
    },
    statsPerEnhance: {
      minAtk: 20,
      maxAtk: 20
    },
    exclusiveStat: {
      fighter: Fighters.toadmeister.name,
      stat: { crt: 80 }
    }
  }
};

export const GearSuits = {
  tyrantBloodthirsty: {
    name: "Tyrant Bloodthirsty",
    twoPieceBonus: {
      brk: 78
    },
    fourPieceBonus: {
      atkPercent: 3.4
    },
    sevenPieceBonus: {
      crt: 105
    }
  },
  tyrantAgile: {
    name: "Tyrant Agile",
    twoPieceBonus: {
      hit: 76
    },
    fourPieceBonus: {
      eva: 60
    },
    sevenPieceBonus: {
      spd: 6.1
    },
  },
  tyrantCallous: {
    name: "Tyrant Callous",
    twoPieceBonus: {
      hp: 115
    },
    fourPieceBonus: {
      res: 65
    },
    sevenPieceBonus: {
      def: 108
    }
  }
};

export const GearMaxValues = {
  white81: {
    str: 112,
    dex: 112,
    sta: 112,
    brk: 105,
    def: 105,
    eva: 105,
    crt: 104,
    hit: 104,
    res: 115,
    hp: 149,
    sp: 9,
    hpPercent: 6.1,
    spPercent: 6.1,
    spd: 6.1,
    atkPercent: 6.1,
    minAtk: 17,
    maxAtk: 17
  },
  purple81: {
    str: 135,
    dex: 135,
    sta: 135,
    brk: 126,
    def: 126,
    eva: 126,
    crt: 125,
    hit: 125,
    res: 138,
    hp: 179,
    sp: 10,
    hpPercent: 7.4,
    spPercent: 7.4,
    spd: 7.4,
    atkPercent: 7.4,
    minAtk: 21,
    maxAtk: 21
  },
  white86: {
    str: 117,
    dex: 117,
    sta: 117,
    brk: 110,
    def: 110,
    eva: 110,
    crt: 108,
    hit: 108,
    res: 120,
    hp: 158,
    sp: 10,
    hpPercent: 6.3,
    spPercent: 6.3,
    spd: 6.3,
    atkPercent: 6.3,
    minAtk: 18,
    maxAtk: 18
  },
  purple86: {
    str: 141,
    dex: 141,
    sta: 141,
    brk: 132,
    def: 132,
    eva: 132,
    crt: 130,
    hit: 130,
    res: 144,
    hp: 190,
    sp: 12,
    hpPercent: 7.6,
    spPercent: 7.6,
    spd: 7.6,
    atkPercent: 7.6,
    minAtk: 22,
    maxAtk: 22
  },
  // tyrants
  white91: {
    str: 132,
    dex: 132,
    sta: 132,
    brk: 125,
    def: 125,
    eva: 125,
    crt: 120,
    hit: 120,
    res: 135,
    hp: 185,
    sp: 13,
    hpPercent: 6.9,
    spPercent: 6.9,
    spd: 6.9,
    atkPercent: 6.9,
    minAtk: 21,
    maxAtk: 21
  },
  purple91: {
    str: 159,
    dex: 159,
    sta: 159,
    brk: 150,
    def: 150,
    eva: 150,
    crt: 144,
    hit: 144,
    res: 162,
    hp: 222,
    sp: 18,
    hpPercent: 8.2,
    spPercent: 8.2,
    spd: 8.2,
    atkPercent: 8.2,
    minAtk: 25,
    maxAtk: 25
  },
  white96: {
    str: 137,
    dex: 137,
    sta: 137,
    brk: 130,
    def: 130,
    eva: 130,
    crt: 124,
    hit: 124,
    res: 140,
    hp: 194,
    sp: 14,
    hpPercent: 7.1,
    spPercent: 7.1,
    spd: 7.1,
    atkPercent: 7.1,
    minAtk: 22,
    maxAtk: 22
  },
  purple96: {
    str: 165,
    dex: 165,
    sta: 165,
    brk: 156,
    def: 156,
    eva: 156,
    crt: 149,
    hit: 149,
    res: 168,
    hp: 233,
    sp: 20,
    hpPercent: 8.4,
    spPercent: 8.4,
    spd: 8.4,
    atkPercent: 8.4,
    minAtk: 26,
    maxAtk: 26
  }
};
