import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { PET } from "../config.js";
import { PET_SKILL_ICONS } from "../formInfo.js";
import ImageCheckbox from "./ImageCheckbox.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const PetTab = ({ isActive, pet, setPet }) => {
  if (!isActive) return html``;
  const petSkillSelect = [];

  const handleMax = () => setPet({
    evolved: true,
    plus: 21
  });
  const handlePetChange = e => {
    const newPetIconId = Object.values(PET).find(x => x.name === e.target.value)?.iconId;
    const skills = pet.skills
    let specialStatSelected = false;
    let specialSkillSelected = false;
    Object.keys(skills).forEach(x => {
      if (x.startsWith("petskill_27")) {
        specialStatSelected = true;
        skills[x] = false;
      } else if ( x.startsWith("petskill_28")) {
        specialSkillSelected = true;
        skills[x] = false;
      }
    });
    if (specialStatSelected) skills[`petskill_27_${newPetIconId}`] = true;
    if (specialSkillSelected) skills[`petskill_28_${newPetIconId}`] = true;
    setPet({
      name: e.target.value,
      skills
    });
  }
  const handleSkills = e => setPet({
    skills: {
      ...pet.skills,
      [e.target.id]: e.target.checked
    }
  });
  const petIconId = Object.values(PET).find(x => x.name === pet.name)?.iconId;
  const disableSkills = Object.values(pet.skills).filter(x => x).length >= 12;
  Object.values(PET_SKILL_ICONS).forEach(skill => {
    const id = `petskill_${skill.iconId}`;
    const url = `img/petskillIcon/petskill_icon_${skill.iconId}.png`;
    if ((id.startsWith("petskill_27") && !id.endsWith(`_${petIconId}`))
      || (id.startsWith("petskill_28") && !id.endsWith(`_${petIconId}`))) {
      return;
    }
    petSkillSelect.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="pet-skill"
    checked=${pet.skills[id] ? true : false} disabled=${disableSkills} src=${url} onClick=${handleSkills} />`);
  });

  return html`
  <div class="row">
    <div class="col-auto">
      <button class="btn btn-outline-secondary" onClick=${handleMax}>Max</button>
    </div>
    <div class="col">
      <${SelectInput} value=${pet.name} onChange=${handlePetChange}
      options=${Object.values(PET).map(x => x.name)} />
    </div>
    <div class="col-auto">
      <div class="input-group">
        <label class="input-group-text" for="pet-plus">+</label>
        <${NumberInput} id="pet-plus" value=${pet.plus} width="4rem" onInput=${e => setPet({ plus: e.target.value })} />
        <label class="input-group-text" for="pet-evolved">Evolved</label>
        <div class="input-group-text">
          <input type="checkbox" id="pet-evolved" checked=${pet.evolved} onClick=${() => setPet({ evolved: !pet.evolved })} />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="image-checkbox-container">
      ${petSkillSelect}
    </div>
  </div>
  `;
}

export default PetTab;
