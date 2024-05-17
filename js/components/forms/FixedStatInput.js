import { html } from "../../lib/preact.standalone.module.js"
import Stats from "../../data/stats.js";
import NumberInput from "./NumberInput.js";

const decimalStats = [Stats.hpPercent.displayName, Stats.atkPercent.displayName, Stats.spd.displayName];

const FixedStatInput = ({ idPrefix, stat, value, onInput }) => {
  const id = `${idPrefix}-${stat}`;
  return html`
    <div class="input-group">
      <label class="input-group-text" for=${id} style="width:5rem;">${stat}</label>
      <${NumberInput} id=${id} value=${value} onInput=${onInput} step=${decimalStats.includes(stat) ? 0.1 : 1} />
    </div>
  `;
}

export default FixedStatInput;
