import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { GearType } from "../data/categories.js";
import CFDB from "../data/CFDB.js";
import Stats from "../data/stats.js";
import { getImagePath, ImageType } from "../image.js";
import GearGem from "./GearGem.js";
import GearStat from "./GearStat.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const normalGems = CFDB.getNormalGems();
const fusionGems = CFDB.getFusionGems();

const Gear = ({ fighterWeaponType, gear, type, setGear }) => {
  const gearInfo = CFDB.getGear(gear.name);
  const gearType = CFDB.getGearType(type);

  const options = CFDB.getGears().filter(gear => gear.type === type)
    .filter(gear => type === GearType.weapon.name ? gear.weaponType === fighterWeaponType : true).map(gear => gear.name);

  const gearImage = gear.name === "None" ? getImagePath(ImageType.gearType, gearType.iconId) : getImagePath(ImageType.gear, gearInfo.iconId);

  const gearStats = [];
  const gearGems = [];
  if (gear.name !== "None") {
    const handleGearStat = position => (stat, value) => {
      gear.stats[position] = (stat === "None") ? null : { [stat]: value };
      setGear({ ...gear, stats: gear.stats });
    }
    const selectedStats = gear.stats.filter(stat => stat).map(stat => Object.keys(stat)[0]);
    for (let i = 0; i < 4; ++i) {
      const [stat, value] = Object.entries(gear.stats[i] || { "None": 0 })[0];
      const options = CFDB.getStats()
        .filter(statInfo => statInfo !== Stats.furyReversion && (statInfo.name === stat || !selectedStats.includes(statInfo.name)))
        .map(stat => stat.displayName);
      gearStats.push(html`<${GearStat} options=${options} stat=${stat} value=${value} setStat=${handleGearStat(i)} gearLevel=${gearInfo.level} purple=${i === 3} />`);
    }
    const normalGemOptions = normalGems.map(gem => gem.name);
    const fusionGemOptions = fusionGems.map(gem => gem.name);
    const gemMaxLevel = Math.floor(gearInfo.level / 10);
    const emptyGem = { name: "None", plus: gemMaxLevel };
    const handleGem = position => gem => {
      gear.gems[position] = (gem.name === "None") ? null : gem;
      setGear({ ...gear, gems: gear.gems });
    }
    if (type === GearType.weapon.name) {
      for (let i = 0; i < 3; ++i) {
        gearGems.push(html`<${GearGem} options=${normalGemOptions} gem=${gear.gems[i] || emptyGem} setGem=${handleGem(i)} />`);
      }
    } else {
      gearGems.push(html`<${GearGem} options=${normalGemOptions} gem=${gear.gems[0] || emptyGem} setGem=${handleGem(0)} />`);
      gearGems.push(html`<${GearGem} options=${fusionGemOptions} gem=${gear.gems[1] || emptyGem} setGem=${handleGem(1)} />`);
    }
  }

  return html`
  <div class="col mb-3">
    <${SelectInput} value=${gear.name} options=${options} onChange=${e => setGear({ ...gear, name: e.target.value })} />
    <div class="row">
      <div class="col-auto">
        <img class="item-frame" src=${gearImage} />
      </div>
      <div class="col">
        <div class="input-group">
          <label class="input-group-text" for="gear-${gearType.name}-enhance">+</label>
          <${NumberInput} id="gear-${gearType.name}-enhance" value=${gear.enhancement} onInput=${e => setGear({ ...gear, enhancement: e.target.value })} />
        </div>
      </div>
    </div>
    ${gear.name !== "None" && html`
    <div class="row row-cols-1">${gearStats}</div>
    <div class="row row-cols-1">${gearGems}</div>
    `}
  </div>
  `;
}

export default Gear;
