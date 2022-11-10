import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const GearGem = ({ options, gem, setGem }) => {
  return html`
  <div class="input-group">
    <${SelectInput} value=${gem.name} options=${options} onChange=${e => setGem({ ...gem, name: e.target.value })} />
    <span class="input-group-text">+</span>
    <${NumberInput} value=${gem.plus} onInput=${e => setGem({ ...gem, plus: e.target.value })} />
  </div>
  `;
}

export default GearGem;
