import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const GearGem = ({ gemType, gem, setGem }) => {
  return html`
  <div class="input-group">
    <${SelectInput} options=${[]} />
    <span class="input-group-text">+</span>
    <${NumberInput} />
  </div>
  `;
}

export default GearGem;
