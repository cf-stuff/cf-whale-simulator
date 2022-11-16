import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import NumberInput from "./NumberInput.js";
import FixedStatInput from "./FixedStatInput.js";
import { getImagePath, ImageType } from "../image.js";
import ImageRadio from "./ImageRadio.js";
import Button from "./Button.js";

const maxStats = {
  hit: 120,
  brk: 120,
  crt: 120,
  atkPercent: 12,
  hpPercent: 12,
  res: 120,
  def: 120,
  eva: 120
}

const Totem = ({ totem, setTotem }) => {
  const totemSelect = CFDB.getTotems().map(totemType => {
    const id = `totem${totemType.iconId}`;
    const src = getImagePath(ImageType.totem, totemType.iconId);
    return html`<${ImageRadio} id=${id} value=${totemType.name} name="totem" src=${src}
    checked=${totem.name === totemType.name} onClick=${e => setTotem({ name: e.target.value })} />`
  });
  return html`
  <div class="row">
    <div class="col-auto">
      <${Button} class="btn btn-outline-secondary" onClick=${() => setTotem({ level: 64, stats: maxStats })}>Max</${Button}>
    </div>
    <div class="col">
      <div class="input-group">
        <label class="input-group-text" for="totem-level">Level</label>
        <${NumberInput} id="totem-level" value=${totem.level} onInput=${e => setTotem({ level: e.target.value })} />
      </div>
    </div>
  </div>
  <div class="row row-cols-2">
    ${Object.entries(totem.stats).map(([stat, value]) => html`
    <div class="col">
      <${FixedStatInput} idPrefix="totem" stat=${CFDB.getStatFromName(stat).displayName} value=${value}
      onInput=${e => setTotem({ stats: { ...totem.stats, [stat]: e.target.value } })} />
    </div>`)}
  </div>
  <div class="row">
    <div class="image-checkbox-container">
      ${totemSelect}
    </div>
  </div>
  `;
}

export default Totem;
