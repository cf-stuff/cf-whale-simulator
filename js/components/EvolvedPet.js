import { html, useState, useEffect } from "https://unpkg.com/htm/preact/standalone.module.js"

const EvolvedPet = ({pet, setSkills}) => {

  Object.values(EVOLVED_PET_SKILL_ICONS).forEach(skill => {
    const id = `petskill_${skill.iconId}`;
    const url = `img/petskillIcon/petskill_icon_${skill.iconId}.png`;
    if (skill.type === PetSkillIconType.stat) {
      ePetSkillSelect.appendChild(createImageCheckbox(id, skill.name, "e-pet-skill", url));
    } else if (skill.type === PetSkillIconType.passive) {
      const checkbox = createImageCheckbox(id, skill.name, "pet-passive", url);
      checkbox.classList.add("d-none");
      ePetSkillSelect.appendChild(checkbox);
    } else if (skill.type === PetSkillIconType.active) {
      const checkbox = createImageCheckbox(id, skill.name, "pet-active", url);
      checkbox.classList.add("d-none");
      ePetSkillSelect.appendChild(checkbox);
    }
  });
  
  return html`
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
  `;
}

export default EvolvedPet;
