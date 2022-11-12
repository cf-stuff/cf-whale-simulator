import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import FixedStatInput from "./FixedStatInput.js";

const maxAltar = {};
CFDB.getStarAltar().forEach(stat => maxAltar[stat.stat] = stat.max);


const StarAltar = ({ altar, setAltar }) => {
  return html`
  <div class="row">
    <div class="col-auto">
      <button class="btn btn-outline-secondary" onClick=${() => setAltar(maxAltar)}>Max</button>
    </div>
  </div>
  <div class="row row-cols-2">
    ${Object.entries(altar).map(([stat, value]) => html`
    <div class="col">
      <${FixedStatInput} idPrefix="altar" stat=${CFDB.getStatFromName(stat).displayName} value=${value}
      onInput=${e => setAltar({ [stat]: e.target.value })} />
    </div>`)}
  </div>
  `;
}

export default StarAltar;
