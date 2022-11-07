import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import { PetSkillType } from "../data/categories.js";
import CFDB from "../data/CFDB.js";
import Pets from "../data/pets.js";
import Utils from "../utils.js";
import EvolvedPet from "./EvolvedPet.js";
import ImageCheckbox from "./ImageCheckbox.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const getPetSkillLimit = plus => {
  if (plus === 0) return 3;
  if (plus % 3 === 0) return getPetSkillLimit(plus - 3) + 1;
  return getPetSkillLimit(plus - 1);
}

const Pet = ({ isActive, pet, setPet }) => {
  if (!isActive) return html``;
  const petSkillSelect = [];

  const handleMax = () => setPet({
    evolved: true,
    plus: 21
  });
  const handlePetChange = e => {
    setPet({
      name: e.target.value
    });
  }
  const handleSkills = e => {
    const skills = pet.skills;
    if (e.target.checked) skills.push(e.target.value);
    else Utils.removeElement(skills, e.target.value);
    setPet({ skills });
  }
  const petIconId = CFDB.getPet(pet.name)?.iconId;
  const skillLimitReached = Object.values(pet.skills).filter(x => x).length >= getPetSkillLimit(pet.evolved ? 27 : pet.plus);
  CFDB.getPetSkills()
    .filter(skill => Utils.equalsAny(skill.type, PetSkillType.stat, PetSkillType.skill))
    .forEach(skill => {
      const id = `petskill_${skill.iconId}`;
      const url = `img/petskillIcon/petskill_icon_${skill.iconId}.png`;
      if ((id.startsWith("petskill_27") && !id.endsWith(`_${petIconId}`))
        || (id.startsWith("petskill_28") && !id.endsWith(`_${petIconId}`))) {
        return;
      }
      petSkillSelect.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="pet-skill"
      checked=${pet.skills.includes(skill.name)} disabled=${skillLimitReached} src=${url} onClick=${handleSkills} />`);
    });

  return html`
  <div class="row">
    <div class="col-auto">
      <button class="btn btn-outline-secondary" onClick=${handleMax}>Max</button>
    </div>
    <div class="col">
      <${SelectInput} value=${pet.name} onChange=${handlePetChange}
      options=${Object.values(Pets).map(x => x.name)} />
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
  <${EvolvedPet} pet=${pet} setPet=${setPet} />
  `;
}

export default Pet;
