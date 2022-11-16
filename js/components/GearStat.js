import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import Button from "./Button.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const GearStat = ({ options, stat, value, setStat, gearLevel, purple = false }) => {
  const getMax = stat => stat === "None" ? 0 : CFDB.getGearMaxValue(gearLevel, stat, purple);
  const maxStat = getMax(stat);

  const handleSelect = e => {
    const statName = e.target.value === "None" ? "None" : CFDB.getStatFromDisplayName(e.target.value).name;
    setStat(statName, getMax(statName));
  }
  return html`
  <div class="input-group${purple ? " purple-stat" : ""}">
    <${SelectInput} value=${stat === "None" ? "None" : CFDB.getStatFromName(stat).displayName} options=${options} onChange=${handleSelect} />
    <${NumberInput} value=${value} onInput=${e => setStat(stat, e.target.value)} />
    <${Button} onClick=${() => setStat(stat, maxStat)} width="6rem">(Max${maxStat === 0 ? "" : ` ${maxStat}`})</${Button}>
  </div>
  `;
}

export default GearStat;
