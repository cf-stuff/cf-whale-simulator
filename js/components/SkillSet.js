import { html } from "../lib/preact.standalone.module.js";
import { getImagePath, ImageType } from "../image.js";

const SkillSet = ({ skillsetNumber, skills, setSkill, selectedSkill }) => {
  const handleDragStart = position => e => {
    e.dataTransfer.setData("id", skills[position]);
  }
  return html`
  <div class="skillset">
    <div class="skill-container skills">
      <div class="skill-frame phy-container text-center" onclick=${() => setSkill(0, selectedSkill)}
      ondragover=${e => e.preventDefault()} ondrop=${e => setSkill(0, e.dataTransfer.getData("id"))}>
        ${skills[0] !== 0 && html`<img class="skill" draggable ondragstart=${handleDragStart(0)} src=${getImagePath(ImageType.skill, skills[0])} />`}
      </div>
      <div style="width:75px" class="text-center"><img class="skillset-number" src=${getImagePath(ImageType.skillSlot, `set${skillsetNumber}`)} /></div>
      <div style="width:75px"></div>
    </div>
    <div class="skill-container skills pt-3">
      ${skills.slice(1).map((skill, i) => html`<div class="skill-frame text-center" onclick=${() => setSkill(i + 1, selectedSkill)}
      ondragover=${e => e.preventDefault()} ondrop=${e => setSkill(i + 1, e.dataTransfer.getData("id"))}>
      ${skill !== 0 && html`<img class="skill" draggable ondragstart=${handleDragStart(i + 1)} src=${getImagePath(ImageType.skill, skill)} />`}
      </div>`)}
    </div>
  </div>
  `;
}

export default SkillSet;
