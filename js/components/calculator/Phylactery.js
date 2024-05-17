import { html } from "../../lib/preact.standalone.module.js"
import CFDB from "../../data/CFDB.js";
import Stats from "../../data/stats.js";
import { getImagePath, ImageType } from "../../image.js";
import Button from "../forms/Button.js";
import Glyph from "./Glyph.js";
import ImageRadio from "../forms/ImageRadio.js";
import NumberInput from "../forms/NumberInput.js";
import SelectInput from "../forms/SelectInput.js";

const info = CFDB.getPhylactery("4B");

const glyphStats = CFDB.getGlyphs().map(glyph => glyph.name);

const Phylactery = ({ phylactery, setPhylactery }) => {
  const handleMax = () => setPhylactery({ plus: 20 });
  const handlePhylacteryStats = position => e => {
    const stats = phylactery.stats;
    stats[position] = e.target.value;
    setPhylactery({ stats });
  }
  const selectedStatcount = { STR: 0, DEX: 0, STA: 0 };
  phylactery.stats.forEach(stat => {
    if (stat !== "None") ++selectedStatcount[stat];
  });
  const statSelect = [];
  for (let i = 0; i < 3; ++i) {
    const options = [Stats.str.displayName, Stats.dex.displayName, Stats.sta.displayName]
      .filter(stat => stat === phylactery.stats[i] || selectedStatcount[stat] < 2);
    statSelect.push(html`
    <div class="col">
      <div class="input-group">
        <${SelectInput} value=${phylactery.stats[i] || "None"} options=${options} onChange=${handlePhylacteryStats(i)} />
        <span class="input-group-text phy-stat-amount">${info.initialBmv + info.bmvPerPlus[phylactery.plus]}</span>
      </div>
    </div>`);
  }

  const setGlyph = position => glyph => {
    phylactery.glyphs[position] = glyph;
    setPhylactery({ glyphs: phylactery.glyphs });
  }
  const setSkill = e => setPhylactery({ skill: e.target.value });

  const selectedGlyphs = phylactery.glyphs.map(glyph => glyph.stat);
  const glyphs = [];
  for (let i = 0; i < 4; ++i) {
    const glyph = phylactery.glyphs[i] || { stat: "None", plus: 6 };
    const options = glyphStats.map(stat => stat)
      .filter(stat => stat === glyph.stat || !selectedGlyphs.includes(stat));
    glyphs.push(html`<div class="row"><${Glyph} glyph=${glyph} setGlyph=${setGlyph(i)} options=${options} phyPlus=${phylactery.plus} /></div>`);
  }

  return html`
  <div class="row">
    <div class="col-auto">
      <${Button} onClick=${handleMax}>Max</${Button}>
    </div>
    <div class="col">
      <div class="input-group">
        <label class="input-group-text" for="fighter-plus">+</label>
        <${NumberInput} id="fighter-plus" value=${phylactery.plus} onInput=${e => setPhylactery({ plus: e.target.value })} />
      </div>
    </div>
  </div>
  <div class="row">${statSelect}</div>
  ${glyphs}
  <div class="row">
    <div class="image-checkbox-container">
      ${CFDB.getSkills().filter(skill => skill.name !== "Normal Attack").map(skill => html`
      <${ImageRadio} id=${`phy-skill-${skill.iconId}`} value=${skill.name} name="phy-skill" checked=${phylactery.skill === skill.name}
      src=${getImagePath(ImageType.skill, skill.iconId)} onClick=${setSkill} />`)}
    </div>
  </div>
  `;
}

export default Phylactery;
