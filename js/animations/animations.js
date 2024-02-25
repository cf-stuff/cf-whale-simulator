import Fighter from "./Fighter.js";
import FuryBar from "./FuryBar.js";
import HpBar from "./HpBar.js";
import SpBar from "./SpBar.js";
import TextFloat from "./TextFloat.js";
import Assassinate from "./skills/Assassinate.js";
import Barbarism from "./skills/Barbarism.js";
import BloodFrenzy from "./skills/BloodFrenzy.js";
import Counterattack from "./skills/Counterattack.js";
import DrawPower from "./skills/DrawPower.js";
import EarthStyleWall from "./skills/EarthStyleWall.js";
import FireShield from "./skills/FireShield.js";
import GoldenShield from "./skills/GoldenShield.js";
import LightningBall from "./skills/LightningBall.js";
import MovingIllusion from "./skills/MovingIllusion.js";
import PoisonousFog from "./skills/PoisonousFog.js";
import Rebirth from "./skills/Rebirth.js";
import Rejuvenation from "./skills/Rejuvenation.js";
import ThunderboltBoxing from "./skills/ThunderboltBoxing.js";

export const Layer = {
  BACKGROUND: 0, // bg, totems
  CHARACTERS: 1, // pet, fighter
  EFFECTS: 2, // most skills
  UI: 3,
  EFFECTS2: 4, // assassinate make screen go black
}

const AnimationDefinitions = {
  Fighter,
  HpBar,
  SpBar,
  FuryBar,
  TextFloat,
  FireShield,
  BloodFrenzy,
  GoldenShield,
  LightningBall, 
  ThunderboltBoxing,
  Counterattack,
  PoisonousFog,
  Barbarism,
  Assassinate,
  MovingIllusion,
  EarthStyleWall,
  DrawPower,
  Rejuvenation,
  Rebirth
}

export default AnimationDefinitions;
