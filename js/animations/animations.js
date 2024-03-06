import Fighter from "./Fighter.js";
import FuryBar from "./FuryBar.js";
import HpBar from "./HpBar.js";
import Pet from "./Pet.js";
import SpBar from "./SpBar.js";
import TextFloat from "./TextFloat.js";
import Assassinate from "./skills/Assassinate.js";
import Bacteria from "./skills/Bacteria.js";
import Barbarism from "./skills/Barbarism.js";
import BloodFrenzy from "./skills/BloodFrenzy.js";
import Bomb from "./skills/Bomb.js";
import Cleanse from "./skills/Cleanse.js";
import Counterattack from "./skills/Counterattack.js";
import DarkCurse from "./skills/DarkCurse.js";
import DrawPower from "./skills/DrawPower.js";
import EarthStyleWall from "./skills/EarthStyleWall.js";
import ExplosiveBlow from "./skills/ExplosiveBlow.js";
import FastMove from "./skills/FastMove.js";
import FireMeteorite from "./skills/FireMeteorite.js";
import FireShield from "./skills/FireShield.js";
import FreezingSkill from "./skills/FreezingSkill.js";
import FuryBurst from "./skills/FuryBurst.js";
import Gallop from "./skills/Gallop.js";
import GhoulBlock from "./skills/GhoulBlock.js";
import GoldenShield from "./skills/GoldenShield.js";
import HeavyHammer from "./skills/HeavyHammer.js";
import InescapableNet from "./skills/InescapableNet.js";
import LightningBall from "./skills/LightningBall.js";
import MovingIllusion from "./skills/MovingIllusion.js";
import PoisonousFog from "./skills/PoisonousFog.js";
import Rebirth from "./skills/Rebirth.js";
import Rejuvenation from "./skills/Rejuvenation.js";
import SkillShackles from "./skills/SkillShackles.js";
import StormBoxing from "./skills/StormBoxing.js";
import ThornShield from "./skills/ThornShield.js";
import ThunderboltBoxing from "./skills/ThunderboltBoxing.js";
import ThunderclapQuake from "./skills/ThunderclapQuake.js";
import TimeBomb from "./skills/TimeBomb.js";
import Violence from "./skills/Violence.js";
import Wine from "./skills/Wine.js";

export const Layer = {
  BACKGROUND: 0, // bg, totems
  CHARACTERS: 1, // pet, fighter, status
  EFFECTS: 2, // most skills
  UI: 3,
  EFFECTS2: 4, // assassinate make screen go black
}

const AnimationDefinitions = {
  Fighter,
  Pet,
  HpBar,
  SpBar,
  FuryBar,
  TextFloat,
  FuryBurst,
  Bacteria,
  FreezingSkill,
  Cleanse,
  FireMeteorite,
  FireShield,
  BloodFrenzy,
  GoldenShield,
  InescapableNet,
  ThunderclapQuake,
  ThornShield,
  LightningBall,
  ThunderboltBoxing,
  StormBoxing,
  FastMove,
  Violence,
  HeavyHammer,
  ExplosiveBlow,
  Gallop,
  Counterattack,
  Bomb,
  PoisonousFog,
  TimeBomb,
  Wine,
  GhoulBlock,
  SkillShackles,
  EarthStyleWall,
  Barbarism,
  Assassinate,
  DarkCurse,
  MovingIllusion,
  DrawPower,
  Rejuvenation,
  Rebirth
}

export default AnimationDefinitions;
