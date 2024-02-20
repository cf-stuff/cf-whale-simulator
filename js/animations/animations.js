import FuryBar from "./FuryBar.js";
import HpBar from "./HpBar.js";
import SpBar from "./SpBar.js";
import TextFloat from "./TextFloat.js";
import Assassinate from "./skills/Assassinate.js";
import FireShield from "./skills/FireShield.js";

export const Layer = {
  BACKGROUND: 0, // bg, totems
  CHARACTERS: 1, // pet, fighter
  STATUS: 2,
  EFFECTS: 3, // most skills
  UI: 4,
  EFFECTS2: 5, // assassinate make screen go black
}

const AnimationDefinitions = {
  HpBar,
  SpBar,
  FuryBar,
  TextFloat,
  Assassinate,
  FireShield
}

export default AnimationDefinitions;
