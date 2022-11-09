import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { GearType } from "../data/categories.js";
import CFDB from "../data/CFDB.js";
import { getImagePath, ImageType } from "../image.js";
import GearStat from "./GearStat.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const Gear = ({ fighterWeaponType, gear, type, setGear }) => {
  const gearInfo = CFDB.getGear(gear.name);
  const gearType = CFDB.getGearType(type);

  const options = CFDB.getGears().filter(gear => gear.type === type)
    .filter(gear => type === GearType.weapon.name ? gear.weaponType === fighterWeaponType : true).map(gear => gear.name);

  const gearStats = [];
  const gearGems = [];
  if (gear.name !== "None") {
    const handleGearStat = position => (stat, value) => {
      gear.stats[position] = { [stat]: value };
      setGear({ ...gear, stats: gear.stats });
    }
    for (let i = 0; i < 4; ++i) {
      const [stat, value] = Object.entries(gear.stats[i] || { "None": 0 })[0];
      gearStats.push(html`<${GearStat} stat=${stat} value=${value} setStat=${handleGearStat(i)} gearLevel=${gearInfo.level} purple=${i === 3} />`);
    }
  }

  return html`
  <div class="col mb-3">
    <${SelectInput} value=${gear.name} options=${options} onChange=${e => setGear({ ...gear, name: e.target.value })} />
    <div class="row">
      <div class="col-auto">
        <img class="item-frame" src=${getImagePath(ImageType.gearType, gearType.iconId)} />
      </div>
      <div class="col">
        <div class="input-group">
          <label class="input-group-text" for="gear-${gearType.name}-enhance">+</label>
          <${NumberInput} id="gear-${gearType.name}-enhance" value=${gear.enhancement} />
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
