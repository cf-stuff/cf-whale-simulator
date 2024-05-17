import { html, useState } from "../../lib/preact.standalone.module.js"
import { PetSkillType } from "../../data/categories.js";
import CFDB from "../../data/CFDB.js";
import Pets from "../../data/pets.js";
import { getImagePath, ImageType } from "../../image.js";
import Utils from "../../utils.js";
import Button from "../forms/Button.js";
import EvolvedPet from "./EvolvedPet.js";
import ImageCheckbox from "../forms/ImageCheckbox.js";
import NumberInput from "../forms/NumberInput.js";
import SelectInput from "../forms/SelectInput.js";

const getPetSkillLimit = plus => {
  if (plus === 0) return 3;
  if (plus % 3 === 0) return getPetSkillLimit(plus - 3) + 1;
  return getPetSkillLimit(plus - 1);
}

const Pet = ({ pet, setPet }) => {
  const [int, setInt] = useState(false);
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
      const path = getImagePath(ImageType.petSkill, skill.iconId, int);
      if ((id.startsWith("petskill_27") && !id.endsWith(`_${petIconId}`))
        || (id.startsWith("petskill_28") && !id.endsWith(`_${petIconId}`))) {
        return;
      }
      petSkillSelect.push(html`<${ImageCheckbox} id=${id} value=${skill.name} name="pet-skill"
      checked=${pet.skills.includes(skill.name)} disabled=${skillLimitReached} src=${path} onClick=${handleSkills} />`);
    });

  return html`
  <div class="row">
    <div class="col-auto">
      <${Button} onClick=${handleMax}>Max</${Button}>
    </div>
    <div class="col">
      <${SelectInput} value=${pet.name} onChange=${handlePetChange}
      options=${Object.values(Pets).map(x => x.name)} />
    </div>
    <div class="col-auto">
      <div class="input-group">
        <label class="input-group-text" for="pet-plus">+</label>
        <${NumberInput} id="pet-plus" value=${pet.plus} style=${{ width: "4rem" }} onInput=${e => setPet({ plus: e.target.value })} />
        <label class="input-group-text" for="pet-evolved">Evolved</label>
        <div class="input-group-text">
          <input type="checkbox" id="pet-evolved" checked=${pet.evolved} onClick=${() => setPet({ evolved: !pet.evolved })} />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="int-icons" checked=${int} onClick=${e => setInt(e.target.checked)} />
        <label class="form-check-label" for="int-icons">International icons</label>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="image-checkbox-container">
      ${petSkillSelect}
    </div>
  </div>
  <${EvolvedPet} pet=${pet} setPet=${setPet} int=${int} />
  `;
}

export default Pet;
