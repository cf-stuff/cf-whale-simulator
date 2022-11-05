export const WeaponType = {
  cudgel: "Cudgel",
  dagger: "Dagger",
  sword: "Sword",
  heavyWeapon: "Heavy Weapon",
  staff: "Staff",
  gloves: "Gloves",
};

export const FighterSkillType = {
  stat: "stat",
  reset: "reset",
  healing: "healing"
}

export const PetSkillType = {
  stat: "stat",
  skill: "skill",
  evolvedStat: "evolvedStat",
  passive: "passive",
  active: "active"
}

export const DamageType = {
  attack: "attack",
  dot: "DoT",
  other: "other" // blood frenzy, reflect
}

export const SkillType = {
  water: {
    name: "Water",
    iconId: 1
  },
  fire: {
    name: "Fire",
    iconId: 2
  },
  earth: {
    name: "Earth",
    iconId: 3
  },
  thunder: {
    name: "Thunder",
    iconId: 4
  },
  wind: {
    name: "Wind",
    iconId: 5
  },
  taijutsu: {
    name: "Taijutsu",
    iconId: 6
  },
  ninjutsu: {
    name: "Ninjutsu",
    iconId: 7
  },
  cursedSealJutsu: {
    name: "Cursed Seal Jutsu",
    iconId: 8
  },
  genjutsu: {
    name: "Genjutsu",
    iconId: 9
  },
  healing: {
    name: "Healing",
    iconId: 10
  },
};

export const SkillPhase = {
  beforeFight: "beforeFight",
  beforeYourAttack: "beforeYourAttack",
  beforeEnemyAttack: "beforeEnemyAttack",
  duringYourAttack: "duringYourAttack",
  duringEnemyAttack: "duringEnemyAttack",
  duringAllEnemyAttacks: "duringAllEnemyAttacks",
  afterYourAttack: "afterYourAttack",
  petAttack: "petAttack",
  onPetBlock: "onPetBlock",
  onDebuff: "onDebuff",
  onDeath: "onDeath",
  afterAttacking: "afterAttacking",
  onFuryBurst: "onFuryBurst"
};

export const SkillTarget = {
  self: 0, // numbers useful for XORing
  enemy: 1,
  both: 2
};

export const StatusType = {
  buff: "buff",
  debuff: "debuff",
  other: "other"
};

export const GearType = {
  weapon: {
    name: "Weapon",
    iconId: 0
  },
  helmet: {
    name: "Head",
    iconId: 2
  },
  necklace: {
    name: "Necklace",
    iconId: 3
  },
  shoes: {
    name: "Shoes",
    iconId: 4
  },
  chest: {
    name: "Chest",
    iconId: 1
  },
  gloves: {
    name: "Gloves",
    iconId: 5
  },
  pants: {
    name: "Pants",
    iconId: 6
  },
  ring: {
    name: "Ring",
    iconId: 7
  },
}

export const GemType = {
  normal: "normal",
  fusion: "fusion"
}
