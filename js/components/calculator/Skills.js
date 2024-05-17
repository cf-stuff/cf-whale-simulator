import { html } from "../../lib/preact.standalone.module.js"
import CFDB from "../../data/CFDB.js";
import ImageCheckbox from "../forms/ImageCheckbox.js";
import { getImagePath, ImageType } from "../../image.js";
import Utils from "../../utils.js";

const Skills = ({ skills, setSkills, expertise, setExpertise, resistance, setResistance }) => {
  const handleSkillChange = e => {
    if (e.target.checked) skills.push(e.target.value);
    else Utils.removeElement(skills, e.target.value);
    setSkills(skills);
  }
  const handleExpertiseChange = e => {
    if (e.target.checked) expertise.push(e.target.value);
    else Utils.removeElement(expertise, e.target.value);
    setExpertise(expertise);
  }
  const handleResistanceChange = e => {
    if (e.target.checked) resistance.push(e.target.value);
    else Utils.removeElement(resistance, e.target.value);
    setResistance(resistance);
  }
  return html`
  <div class="row">
    <div class="image-checkbox-container">
      ${CFDB.getSkills().filter(skill => skill.name !== "Normal Attack").map(skill => html`
        <${ImageCheckbox} id=${`skill-${skill.iconId}`} value=${skill.name} name="skill" checked=${skills.includes(skill.name)}
        disabled=${skills.length >= 6} src=${getImagePath(ImageType.skill, skill.iconId)} onClick=${handleSkillChange} />`)}
    </div>
    <span class="text-muted">(go to Phylactery for 7th skill)</span>
  </div>
  <div class="row">
    <h3>PRO</h3>
    <div class="image-checkbox-container">
      ${CFDB.getSkillTypes().map(skillType => html`
        <${ImageCheckbox} id=${`pro-${skillType.iconId}`} value=${skillType.name} name="pro" checked=${expertise.includes(skillType.name)}
        disabled=${expertise.length >= 9} src=${getImagePath(ImageType.skillType, skillType.iconId)} onClick=${handleExpertiseChange} />`)}
    </div>
  </div>
  <div class="row">
    <h3>RES</h3>
    <div class="image-checkbox-container">
      ${CFDB.getSkillTypes().map(skillType => html`
        <${ImageCheckbox} id=${`res-${skillType.iconId}`} value=${skillType.name} name="res" checked=${resistance.includes(skillType.name)}
        disabled=${resistance.length >= 2} src=${getImagePath(ImageType.skillType, skillType.iconId)} onClick=${handleResistanceChange} />`)}
    </div>
  </div>
  `;
}

export default Skills;
