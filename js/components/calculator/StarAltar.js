import { html } from "../../lib/preact.standalone.module.js"
import CFDB from "../../data/CFDB.js";
import Button from "../forms/Button.js";
import FixedStatInput from "../forms/FixedStatInput.js";

const maxAltar = {};
CFDB.getStarAltar().forEach(stat => maxAltar[stat.stat] = stat.max);


const StarAltar = ({ altar, setAltar }) => {
  return html`
  <div class="row">
    <div class="col-auto">
      <${Button} onClick=${() => setAltar(maxAltar)}>Max</${Button}>
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
