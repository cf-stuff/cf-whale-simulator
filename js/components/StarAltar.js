import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import StarAltarStat from "./StarAltarStat.js";

const maxAltar = {};
CFDB.getStarAltar().forEach(stat => maxAltar[stat.stat] = stat.max);


const StarAltar = ({ isActive, altar, setAltar }) => {
  if (!isActive) return html``;
  return html`
  <div class="row">
    <div class="col-auto">
      <button class="btn btn-outline-secondary" onClick=${() => setAltar(maxAltar)}>Max</button>
    </div>
  </div>
  <div class="row row-cols-2">
    ${Object.entries(altar).map(([stat, value]) => html`
    <div class="col">
      <${StarAltarStat} stat=${CFDB.getStatFromName(stat).displayName} value=${value}
      onInput=${e => setAltar({ ...altar, [stat]: e.target.value })} />
    </div>`)}
  </div>
  `;
}

export default StarAltar;
