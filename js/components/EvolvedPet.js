import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { PetSkillType } from "../data/categories.js";
import CFDB from "../data/CFDB.js";
import Utils from "../utils.js";
import ImageCheckbox from "./ImageCheckbox.js";

const getPetSkillLimit = plus => {
  if (plus >= 21) return 6;
  if (plus >= 18) return 5;
  if (plus >= 15) return 4;
  if (plus >= 12) return 3;
  if (plus >= 6) return 2;
  return 1;
}

const EvolvedPet = ({ pet, setPet }) => {
  if (!pet.evolved) return html``;

  const stats = [];
  const passives = [];
  const actives = [];

  const handleStats = e => setPet({
    evoSkills: {
      ...pet.evoSkills, [e.target.value]: e.target.checked
    }
  });

  const selectedSkills = Object.entries(pet.evoSkills).filter(entry => entry[1]).map(entry => entry[0]);
  const skillLimitReached = selectedSkills.length >= getPetSkillLimit(pet.plus);
  const passiveChosen = Utils.includesAny(CFDB.getPetPassives().map(skill => skill.name), selectedSkills);
  const activeChosen = Utils.includesAny(CFDB.getPetActives().map(skill => skill.name), selectedSkills);

  CFDB.getPetSkills().forEach(skill => {
    const id = `petskill_${skill.iconId}`;
    const url = `img/petskillIcon/petskill_icon_${skill.iconId}.png`;
    if (skill.type === PetSkillType.evolvedStat) {
      stats.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="e-pet-skill"
        checked=${pet.evoSkills[skill.name] ? true : false} disabled=${skillLimitReached} src=${url} onClick=${handleStats} />`);
    } else if (pet.plus >= 15 && skill.type === PetSkillType.passive) {
      passives.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="pet-passive"
        checked=${pet.evoSkills[skill.name] ? true : false} disabled=${skillLimitReached || passiveChosen} src=${url} onClick=${handleStats} />`);
    } else if (skill.type === PetSkillType.active) {
      actives.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="pet-active"
        checked=${pet.evoSkills[skill.name] ? true : false} disabled=${skillLimitReached || activeChosen} src=${url} onClick=${handleStats} />`);
    }
  });

  return html`
  <div class="row mb-3">
    <div class="image-checkbox-container">
      ${[...stats, passives, actives]}
    </div>
  </div>
  `;
}

export default EvolvedPet;
