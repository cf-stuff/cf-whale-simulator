import { html } from "../../lib/preact.standalone.module.js"
import CFDB from "../../data/CFDB.js";
import { getImagePath, ImageType } from "../../image.js";
import NumberInput from "../forms/NumberInput.js";
import SelectInput from "../forms/SelectInput.js";

const GearGem = ({ options, gem, setGem }) => {
  const id = CFDB.getGem(gem.name)?.iconId;
  return html`
  <div class="input-group">
    <span class="input-group-text">
      ${id ? html`<img class="icon" src=${getImagePath(ImageType.item, `${id}_${gem.plus + 1}`)} />`
      : html`<span class="icon" />`}
    </span>
    <${SelectInput} value=${gem.name} options=${options} onChange=${e => setGem({ ...gem, name: e.target.value })} />
    <span class="input-group-text">+</span>
    <${NumberInput} value=${gem.plus} onInput=${e => setGem({ ...gem, plus: e.target.value })} style=${{maxWidth: "4rem"}} />
  </div>
  `;
}

export default GearGem;
