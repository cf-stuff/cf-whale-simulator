const Phylactery = {
  IIIB: {
    type: "3B",
    initialBmv: 10,
    bmvPerPlus: [0, 1, 2, 4, 6, 9, 12, 15, 19, 23, 27, 31, 36, 41, 46, 52, 58, 64, 71, 78, 85],
    maxAtk: 28,
    minAtk: 28,
    hp: 112,
    initialFuryReversion: 4,
  },
  IVB: {
    type: "4B",
    initialBmv: 12,
    bmvPerPlus: [0, 2, 4, 6, 9, 12, 15, 19, 23, 28, 33, 38, 43, 49, 55, 62, 69, 76, 84, 92, 100],
    maxAtk: 32,
    minAtk: 32,
    hp: 128,
    initialFuryReversion: 5,
  }
};

export default Phylactery;
