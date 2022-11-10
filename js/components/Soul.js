import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const Soul = ({ options, soul, setSoul }) => {
  return html`
  <div class="input-group">
    <${SelectInput} options=${options} value=${soul.stat} onChange=${e => setSoul({ ...soul, stat: e.target.value })} />
    <${NumberInput} value=${soul.level} onInput=${e => setSoul({ ...soul, level: e.target.value })} />
    <span class="input-group-text soul-stat-amount">${soul.stat !== "None" && CFDB.calculateNexusStat(soul.stat, soul.level)}</span>
  </div>
  `;
}

export default Soul;
