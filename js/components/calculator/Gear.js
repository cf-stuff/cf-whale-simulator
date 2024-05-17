import { html } from "../../lib/preact.standalone.module.js"
import { GearType } from "../../data/categories.js";
import CFDB from "../../data/CFDB.js";
import { getImagePath, ImageType } from "../../image.js";
import GearGem from "./GearGem.js";
import GearStat from "./GearStat.js";
import NumberInput from "../forms/NumberInput.js";
import SelectInput from "../forms/SelectInput.js";

const normalGems = CFDB.getNormalGems();
const fusionGems = CFDB.getFusionGems();

const Gear = ({ fighterWeaponType, gear, type, setGear }) => {
  const gearInfo = CFDB.getGear(gear.name);
  const gearType = CFDB.getGearType(type);

  const options = CFDB.getGears(type)
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
      const options = CFDB.getGearStats()
        .filter(statInfo => statInfo.name === stat || !selectedStats.includes(statInfo.name))
        .map(stat => stat.displayName);
      gearStats.push(html`<${GearStat} options=${options} stat=${stat} value=${value} setStat=${handleGearStat(i)} gearLevel=${gearInfo.level} purple=${i === 3} />`);
    }
    const normalGemOptions = normalGems.map(gem => gem.name);
    const fusionGemOptions = fusionGems.map(gem => gem.name);
    const gemMaxLevel = CFDB.getGemMaxLevel(gearInfo);
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
  const getBaseStats = () => {
    const baseStats = Object.entries(gearInfo.stats);
    let baseStatsFormatted = baseStats.map(x => html`<span>${CFDB.getStatFromName(x[0]).displayName}: ${x[1]}</span>`);
    if (gearInfo.exclusiveStat) {
      const exclusiveStat = gearInfo.exclusiveStat;
      const exclusiveStatStat = Object.entries(exclusiveStat.stat);
      const exclusiveStatFormatted = html`<span>${CFDB.getStatFromName(exclusiveStatStat[0][0]).displayName}: ${exclusiveStatStat[0][1]} (${exclusiveStat.fighter} exclusive)</span>`;
      baseStatsFormatted = [...baseStatsFormatted, exclusiveStatFormatted];
    }
    return html`<div class="d-flex flex-column">${baseStatsFormatted}</div>`;
  }
  const baseStats = gear.name === "None" ? "" : getBaseStats();

  return html`
  <div class="col mb-3">
    <div class="input-group">
      <${SelectInput} value=${gear.name} options=${options} onChange=${e => setGear({ ...gear, name: e.target.value })} />
      <label class="input-group-text" for="gear-${gearType.name}-enhance">+</label>
      <${NumberInput} id="gear-${gearType.name}-enhance" value=${gear.enhancement}
      onInput=${e => setGear({ ...gear, enhancement: e.target.value })} style=${{maxWidth: "4rem"}} />
    </div>
    <div class="row">
      <div class="col-auto">
        <img class="item-frame" src=${gearImage} />
      </div>
      <div class="col" style=${{maxHeight: "64px"}}>
        ${baseStats}
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
