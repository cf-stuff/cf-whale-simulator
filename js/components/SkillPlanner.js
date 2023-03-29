import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import { getImagePath, ImageType } from "../image.js";
import SkillSet from "./SkillSet.js";

const SkillPlanner = () => {
  const [set1, setSet1] = useState([1, 0, 2, 0, 0, 0, 0]);
  const [set2, setSet2] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [set3, setSet3] = useState([0, 0, 0, 0, 0, 0, 0]);
  return html`
  <div class="row pt-3">
    <div class="skill-container">
    ${CFDB.getSkills().filter(skill => skill.name !== "Normal Attack").map(skill => html`
    <img class="skill" src=${getImagePath(ImageType.skill, skill.iconId)} />`)}
    </div>
  </div>
  <div class="row">
    <div class="col-md pt-3"><${SkillSet} setNumber=1 skills=${set1} /></div>
    <div class="col-md pt-3"><${SkillSet} setNumber=2 skills=${set2} /></div>
    <div class="col-md pt-3"><${SkillSet} setNumber=3 skills=${set3} /></div>
  </div>
  `;
}

export default SkillPlanner;
