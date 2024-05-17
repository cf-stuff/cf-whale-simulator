import { html } from "../../lib/preact.standalone.module.js"
import ArenaTitles from "../../data/arena.js";
import CFDB from "../../data/CFDB.js";
import { getImagePath, ImageType } from "../../image.js";
import Button from "../forms/Button.js";
import SelectInput from "../forms/SelectInput.js";

const arenaTitles = CFDB.getArenaTitles();
ImageType
const Arena = ({ arenaTitle, setArenaTitle }) => {
  const titleInfo = CFDB.getArenaTitle(arenaTitle);
  const titleStats = titleInfo.stats;
  return html`
  <div class="row">
    <div class="col-auto">
      <${Button} onClick=${() => setArenaTitle(ArenaTitles.grandMaster2.name)}>Max</${Button}>
    </div>
    <div class="col">
      <${SelectInput} value=${arenaTitle} options=${arenaTitles.map(title => title.name)} onChange=${e => setArenaTitle(e.target.value)} includeNone=${false} />
      <p>HP +${titleStats.hpPercent}%<br/>HIT +${titleStats.hit}</p>
    </div>
    <div class="col-auto">
      <img src=${getImagePath(ImageType.arena, titleInfo.id)} style="margin-top: -8px;" />
    </div>
  </div>
  `;
}

export default Arena;
