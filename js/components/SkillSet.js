import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js"
import { getImagePath, ImageType } from "../image.js";

const SkillSet = ({setNumber, skills}) => {
  return html`
  <div class="skillset">
    <div class="skill-container skills">
      <div class="skill-frame phy-container text-center">
        ${skills[0] !== 0 && html`<img class="skill" src=${getImagePath(ImageType.skill, skills[0])} />`}
        <img class="phy-indicator" src=${getImagePath(ImageType.skillSlot, "phyIndicator")} />
      </div>
      <div style="width:75px" class="text-center"><img src=${getImagePath(ImageType.skillSlot, `set${setNumber}`)} /></div>
      <div style="width:75px"></div>
    </div>
    <div class="skill-container skills pt-3">
      ${skills.slice(1).map(skill => html`<div class="skill-frame text-center">
      ${skill !== 0 && html`<img class="skill" src=${getImagePath(ImageType.skill, skill)} />`}
      </div>`)}
    </div>
  </div>
  `;
}

export default SkillSet;
