import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const GearStat = ({ stat, value, setStat, gearLevel, purple = false }) => {
  const options = CFDB.getStats().map(stat => stat.displayName);
  const getMax = stat => stat === "None" ? 0 : CFDB.getGearMaxValue(gearLevel, CFDB.getStatFromDisplayName(stat).name, purple);
  const maxStat = getMax(stat);
  return html`
  <div class="input-group${purple ? " purple-stat" : ""}">
    <${SelectInput} value=${stat} options=${options}
    onChange=${e => setStat(e.target.value, getMax(e.target.value))} />
    <${NumberInput} value=${value} onInput=${e => setStat(stat, e.target.value)} />
    <button class="btn btn-outline-secondary stat-max" onClick=${() => setStat(stat, maxStat)}>(Max${maxStat === 0 ? "" : ` ${maxStat}`})</button>
  </div>
  `;
}

export default GearStat;
