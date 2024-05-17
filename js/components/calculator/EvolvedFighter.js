import { html } from "../../lib/preact.standalone.module.js"
import { FighterSkillType } from "../../data/categories.js";
import CFDB from "../../data/CFDB.js";
import { getImagePath, ImageType } from "../../image.js";
import Utils from "../../utils.js";
import ImageCheckbox from "../forms/ImageCheckbox.js";
import ImageRadio from "../forms/ImageRadio.js";
import NumberInput from "../forms/NumberInput.js";

const EvolvedFighter = ({ fighter, setFighter }) => {
  if (!fighter.evolved) return html``;

  const fighterStatSelect = [];
  const fighterResetSelect = [];
  const fighterHealingSelect = [];

  const handlePotentials = e => setFighter({
    potentials: {
      ...fighter.potentials,
      [e.target.id.split("-")[1]]: e.target.value
    }
  });
  const handleStats = e => {
    const stats = fighter.stats;
    if (e.target.checked) stats.push(e.target.value);
    else Utils.removeElement(stats, e.target.value);
    setFighter({ stats });
  }
  const handleResets = e => {
    const resets = fighter.resets;
    if (e.target.checked) resets.push(e.target.value);
    else Utils.removeElement(resets, e.target.value);
    setFighter({ resets });
  }
  const handleHealing = e => setFighter({ healing: e.target.value });

  const statLimitReached = Object.values(fighter.stats).filter(x => x).length >= 3;
  const resetLimitReached = Object.values(fighter.resets).filter(x => x).length >= 2;

  CFDB.getFighterSkills().forEach(skill => {
    const id = `coatSkill_${skill.iconIds[2]}`;
    const path = getImagePath(ImageType.fighterSkill, skill.iconIds[2]);
    if (skill.type === FighterSkillType.stat) {
      fighterStatSelect.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="fighter-stat"
      checked=${fighter.stats.includes(skill.name)} disabled=${statLimitReached} src=${path} onClick=${handleStats} />`);
    } else if (skill.type === FighterSkillType.reset) {
      fighterResetSelect.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="fighter-reset"
      checked=${fighter.resets.includes(skill.name)} disabled=${resetLimitReached} src=${path} onClick=${handleResets} />`);
    } else if (skill.type === FighterSkillType.healing) {
      fighterHealingSelect.push(html`<${ImageRadio} id=${id} value=${skill.name} name="fighter-healing"
      checked=${fighter.healing === skill.name} src=${path} onClick=${handleHealing} />`);
    }
  });

  return html`
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col">
          <div class="input-group">
            <label class="input-group-text" for="potential-str">STR</label>
            <${NumberInput} id="potential-str" value=${fighter.potentials.str}
            onInput=${handlePotentials} />
          </div>
        </div>
        <div class="col">
          <div class="input-group">
            <label class="input-group-text" for="potential-dex">DEX</label>
            <${NumberInput} id="potential-dex" value=${fighter.potentials.dex}
            onInput=${handlePotentials} />
          </div>
        </div>
        <div class="col">
          <div class="input-group">
            <label class="input-group-text" for="potential-sta">STA</label>
            <${NumberInput} id="potential-sta" value=${fighter.potentials.sta}
            onInput=${handlePotentials} />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="image-checkbox-container">
          ${fighterStatSelect}
        </div>
      </div>
      <div class="row">
        <div class="image-checkbox-container">
          ${fighterResetSelect}
        </div>
      </div>
      <div class="row">
        <div class="image-checkbox-container">
          ${fighterHealingSelect}
        </div>
      </div>
    </div>
  </div>
  `;
}

export default EvolvedFighter;
