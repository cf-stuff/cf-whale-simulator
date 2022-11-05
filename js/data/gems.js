import { GemType } from "./categories.js";

const Gems = {
  sapphire: {
    name: "Sapphire",
    iconId: 14,
    type: GemType.normal,
    statsPerLevel: {
      dex: 7
    }
  },
  topaz: {
    name: "Topaz",
    iconId: 15,
    type: GemType.normal,
    statsPerLevel: {
      sta: 7
    }
  },
  ruby: {
    name: "Ruby",
    iconId: 16,
    type: GemType.normal,
    statsPerLevel: {
      str: 7
    }
  },
  amethyst: {
    name: "Amethyst",
    iconId: 17,
    type: GemType.fusion,
    statsPerLevel: {
      str: 5,
      dex: 5
    }
  },
  garnet: {
    name: "Garnet",
    iconId: 18,
    type: GemType.fusion,
    statsPerLevel: {
      str: 5,
      sta: 5
    }
  },
  emerald: {
    name: "Emerald",
    iconId: 19,
    type: GemType.fusion,
    statsPerLevel: {
      dex: 5,
      sta: 5
    }
  }
};

export default Gems;
