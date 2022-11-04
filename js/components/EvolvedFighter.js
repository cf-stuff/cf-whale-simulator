import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { FighterSkillIconType, FIGHTER_SKILL_ICONS } from "../formInfo.js";
import ImageCheckbox from "./ImageCheckbox.js";
import ImageRadio from "./ImageRadio.js";
import NumberInput from "./NumberInput.js";

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
  const handleStats = e => setFighter({
    stats: {
      ...fighter.stats, [e.target.value]: e.target.checked
    }
  });
  const handleResets = e => setFighter({
    resets: {
      ...fighter.resets, [e.target.value]: e.target.checked
    }
  });
  const handleHealing = e => setFighter({ healing: e.target.value });

  const disableStats = Object.values(fighter.stats).filter(x => x).length >= 3;
  const disableResets = Object.values(fighter.resets).filter(x => x).length >= 2;

  Object.values(FIGHTER_SKILL_ICONS).forEach(skill => {
    const id = `coatSkill_${skill.iconIds[2]}`;
    const url = `img/coatSkillIcon/coatskill_icon${skill.iconIds[2]}.png`;
    if (skill.type === FighterSkillIconType.stat) {
      fighterStatSelect.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="fighter-stat"
      checked=${fighter.stats[skill.name] ? true : false} disabled=${disableStats} src=${url} onClick=${handleStats} />`);
    } else if (skill.type === FighterSkillIconType.reset) {
      fighterResetSelect.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="fighter-reset"
      checked=${fighter.resets[skill.name] ? true : false} disabled=${disableResets} src=${url} onClick=${handleResets} />`);
    } else if (skill.type === FighterSkillIconType.healing) {
      fighterHealingSelect.push(html`<${ImageRadio} id=${id} value=${skill.name} name="fighter-healing"
      checked=${fighter.healing === skill.name ? true : false} src=${url} onClick=${handleHealing} />`);
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
