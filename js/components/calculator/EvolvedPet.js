import { html } from "../../lib/preact.standalone.module.js"
import { PetSkillType } from "../../data/categories.js";
import CFDB from "../../data/CFDB.js";
import { getImagePath, ImageType } from "../../image.js";
import Utils from "../../utils.js";
import ImageCheckbox from "../forms/ImageCheckbox.js";

const getPetSkillLimit = plus => {
  if (plus >= 21) return 6;
  if (plus >= 18) return 5;
  if (plus >= 15) return 4;
  if (plus >= 12) return 3;
  if (plus >= 6) return 2;
  return 1;
}

const EvolvedPet = ({ pet, setPet, int }) => {
  if (!pet.evolved) return html``;

  const stats = [];
  const passives = [];
  const actives = [];

  const handleStats = e => {
    const evoSkills = pet.evoSkills;
    if (e.target.checked) evoSkills.push(e.target.value);
    else Utils.removeElement(evoSkills, e.target.value);
    setPet({ evoSkills });
  }

  const skillLimitReached = pet.evoSkills.length >= getPetSkillLimit(pet.plus);
  const passiveChosen = Utils.includesAny(CFDB.getPetPassives().map(skill => skill.name), pet.evoSkills);
  const activeChosen = Utils.includesAny(CFDB.getPetActives().map(skill => skill.name), pet.evoSkills);

  CFDB.getPetSkills().forEach(skill => {
    const id = `petskill_${skill.iconId}`;
    const path = getImagePath(ImageType.petSkill, skill.iconId, int);
    if (skill.type === PetSkillType.evolvedStat) {
      stats.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="e-pet-skill"
        checked=${pet.evoSkills.includes(skill.name)} disabled=${skillLimitReached} src=${path} onClick=${handleStats} />`);
    } else if (pet.plus >= 15 && skill.type === PetSkillType.passive) {
      passives.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="pet-passive"
        checked=${pet.evoSkills.includes(skill.name)} disabled=${skillLimitReached || passiveChosen} src=${path} onClick=${handleStats} />`);
    } else if (skill.type === PetSkillType.active) {
      actives.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="pet-active"
        checked=${pet.evoSkills.includes(skill.name)} disabled=${skillLimitReached || activeChosen} src=${path} onClick=${handleStats} />`);
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
