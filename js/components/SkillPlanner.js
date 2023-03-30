import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import { getImagePath, ImageType } from "../image.js";
import SkillSet from "./SkillSet.js";

const SkillPlanner = () => {
  const [skillsets, setSkillsets] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]);

  const setSkill = skillset => {
    return (position, id) => {
      const newSkills = skillsets.map(set => [...set]);
      if (position !== 0) {
        for (let set of newSkills) {
          for (let i = 0; i < set.length; ++i) {
            if (set[i] === Number(id) && i !== 0) {
              set[i] = 0;
            }
          }
        }
      }
      newSkills[skillset][position] = Number(id);
      setSkillsets(newSkills);
    }
  }

  return html`
  <div class="row pt-3">
    <div class="skill-container">
    ${CFDB.getSkills().filter(skill => skill.name !== "Normal Attack").map(skill => html`
    <img class="skill" draggable ondragstart=${e => e.dataTransfer.setData("id", skill.iconId)}
    src=${getImagePath(ImageType.skill, skill.iconId)} />`)}
    </div>
  </div>
  <div class="row">
    <div class="col-md pt-3"><${SkillSet} skillsetNumber=1 skills=${skillsets[0]} setSkill=${setSkill(0)} /></div>
    <div class="col-md pt-3"><${SkillSet} skillsetNumber=2 skills=${skillsets[1]} setSkill=${setSkill(1)} /></div>
    <div class="col-md pt-3"><${SkillSet} skillsetNumber=3 skills=${skillsets[2]} setSkill=${setSkill(2)} /></div>
  </div>
  `;
}

export default SkillPlanner;
