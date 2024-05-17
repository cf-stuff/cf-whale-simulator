import { html } from "../../lib/preact.standalone.module.js"
import CFDB from "../../data/CFDB.js";
import NumberInput from "../forms/NumberInput.js";
import FixedStatInput from "../forms/FixedStatInput.js";
import { getImagePath, ImageType } from "../../image.js";
import ImageRadio from "../forms/ImageRadio.js";
import Button from "../forms/Button.js";
import Utils from "../../utils.js";

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

const holyWaterToNextLevel = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
  12000, 14000, 16000, 18000, 20000, 24000, 28000, 32000, 36000, 40000,
  48000, 56000, 64000, 72000, 80000, 96000, 112000, 128000, 144000, 160000,
  192000, 224000, 256000, 288000, 320000, 384000, 448000, 512000, 576000, 640000,
  720000, 800000, 880000, 960000, 1080000, 1200000, 1320000, 1440000, 1560000, 1700000,
  1840000, 1980000, 2120000, 2260000, 2420000, 2580000, 2740000, 2900000, 3060000, 3220000,
  3440000, 3660000, 3880000, 4100000
];

const cumulativeHolyWaterNeeded = holyWaterToNextLevel.map((_, i) => Utils.sum(holyWaterToNextLevel.slice(0, i)));

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
  <div class="row">
    <span>Holy Water needed: ${cumulativeHolyWaterNeeded[totem.level - 1].toLocaleString()}</span>
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
