import { html, useState, useEffect } from "https://unpkg.com/htm/preact/standalone.module.js"
import { FighterSkillIconType, FIGHTER_SKILL_ICONS } from "../formInfo.js";
import ImageCheckbox from "./ImageCheckbox.js";
import ImageRadio from "./ImageRadio.js";
import NumberInput from "./NumberInput.js";

const EvolvedFighter = ({ fighter, setPotentials, setSkills }) => {
  const [stats, setStats] = useState({});
  const [resets, setResets] = useState({});
  const [healing, setHealing] = useState();

  const fighterStatSelect = [];
  const fighterResetSelect = [];
  const fighterHealingSelect = [];

  const disableStats = Object.values(stats).filter(x => x).length >= 3;
  const disableResets = Object.values(resets).filter(x => x).length >= 2;

  useEffect(() => {
    const selectedStats = Object.entries(stats).filter(entry => entry[1]).map(entry => entry[0]);
    if (selectedStats.length > 3) selectedStats.length = 3;
    const selectedResets = Object.entries(resets).filter(entry => entry[1]).map(entry => entry[0]);
    if (selectedResets.length > 2) selectedResets.length = 2;
    const skills = selectedStats;
    if (selectedResets.length > 0) {
      skills.push(selectedResets[0]);
      if (healing) {
        skills.push(healing);
        if (selectedResets.length > 1) {
          skills.push(selectedResets[1]);
        }
      }
    }
    setSkills(skills);
  }, [stats, resets, healing]);

  const handleStats = e => setStats({ ...stats, [e.target.value]: e.target.checked });
  const handleResets = e => setResets({ ...resets, [e.target.value]: e.target.checked });

  Object.values(FIGHTER_SKILL_ICONS).forEach(skill => {
    const id = `coatSkill_${skill.iconIds[2]}`;
    const url = `img/coatSkillIcon/coatskill_icon${skill.iconIds[2]}.png`;
    if (skill.type === FighterSkillIconType.stat) {
      fighterStatSelect.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="fighter-stat"
      checked=${stats[skill.name]} disabled=${disableStats} src=${url} onClick=${handleStats} />`);
    } else if (skill.type === FighterSkillIconType.reset) {
      fighterResetSelect.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="fighter-reset"
      checked=${resets[skill.name]} disabled=${disableResets} src=${url} onClick=${handleResets} />`);
    } else if (skill.type === FighterSkillIconType.healing) {
      fighterHealingSelect.push(html`<${ImageRadio} id=${id} value=${skill.name} name="fighter-healing"
      checked=${healing === skill.name} src=${url} onClick=${e => setHealing(e.target.value)} />`);
    }
  });

  if (!fighter.evolved) return html``;
  return html`
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col">
          <div class="input-group">
            <label class="input-group-text" for="potential-str">STR</label>
            <${NumberInput} id="potential-str" value=${fighter.potentials.str}
            onInput=${e => setPotentials({ ...fighter.potentials, str: e.target.value })} />
          </div>
        </div>
        <div class="col">
          <div class="input-group">
            <label class="input-group-text" for="potential-dex">DEX</label>
            <${NumberInput} id="potential-dex" value=${fighter.potentials.dex}
            onInput=${e => setPotentials({ ...fighter.potentials, dex: e.target.value })} />
          </div>
        </div>
        <div class="col">
          <div class="input-group">
            <label class="input-group-text" for="potential-sta">STA</label>
            <${NumberInput} id="potential-sta" value=${fighter.potentials.sta}
            onInput=${e => handlePotentials({ ...fighter.potentials, sta: e.target.value })} />
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
