import Stats from "./stats.js";

const Nexus = {
  str: {
    name: Stats.str.displayName,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  dex: {
    name: Stats.dex.displayName,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  sta: {
    name: Stats.sta.displayName,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  hp: {
    name: Stats.hp.displayName,
    startingAmount: 100,
    amountPerLevel: 50,
    amountPerLevelAfter7: 100,
  },
  sp: {
    name: Stats.sp.displayName,
    startingAmount: 10,
    amountPerLevel: 5,
    amountPerLevelAfter7: 10,
  },
  spd: {
    name: Stats.spd.displayName,
    startingAmount: 10,
    amountPerLevel: 5,
    amountPerLevelAfter7: 10,
  },
  minAtk: {
    name: Stats.minAtk.displayName,
    startingAmount: 25,
    amountPerLevel: 12.5, // rounds up
    amountPerLevelAfter7: 25,
  },
  maxAtk: {
    name: Stats.maxAtk.displayName,
    startingAmount: 25,
    amountPerLevel: 12.5,
    amountPerLevelAfter7: 25,
  },
  brk: {
    name: Stats.brk.displayName,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  def: {
    name: Stats.def.displayName,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  hit: {
    name: Stat.hit,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  eva: {
    name: Stat.eva,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  crt: {
    name: Stat.crt,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  },
  res: {
    name: Stat.res,
    startingAmount: 50,
    amountPerLevel: 25,
    amountPerLevelAfter7: 50,
  }
};

export default Nexus;
