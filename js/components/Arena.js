import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import ArenaTitles from "../data/arena.js";
import CFDB from "../data/CFDB.js";
import SelectInput from "./SelectInput.js";

const arenaTitles = CFDB.getArenaTitles();

const Arena = ({ isActive, arenaTitle, setArenaTitle }) => {
  if (!isActive) return html``;
  const titleStats = CFDB.getArenaTitle(arenaTitle).stats;
  return html`
  <div class="row">
    <div class="col-auto">
      <button class="btn btn-outline-secondary" onClick=${() => setArenaTitle(ArenaTitles.grandMaster2.name)}>Max</button>
    </div>
    <div class="col">
    <${SelectInput} value=${arenaTitle} options=${arenaTitles.map(title => title.name)} onChange=${e => setArenaTitle(e.target.value)} includeNone=${false} />
    <p>HP +${titleStats.hpPercent}%<br/>HIT +${titleStats.hit}</p>
    </div>
  </div>
  `;
}

export default Arena;
