import { html, useState, useRef } from "../lib/preact.standalone.module.js";
import CFDB from "../data/CFDB.js";
import { getImagePath, ImageType } from "../image.js";
import SkillSet from "./SkillSet.js";
import Button from "./forms/Button.js";
import ImageRadio from "./forms/ImageRadio.js";
import SelectInput from "./forms/SelectInput.js";
import { getSavedKeys, load } from "../storage.js";
import { getBuild, getBuildNames } from "../templates.js";

const setMap = { "I": 0, "II": 1, "III": 2 };

const SkillPlanner = () => {
  const [skillsets, setSkillsets] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [build, setBuild] = useState("None");
  const loadPosRef = useRef(null);

  const setSkill = skillset => {
    return (position, id) => {
      setSkillsets(skills => {
        const newSkills = skills.map(set => [...set]);
        if (position !== 0) {
          for (let set of newSkills) {
            for (let i = 0; i < set.length; ++i) {
              if (set[i] === Number(id) && i !== 0) set[i] = 0;
            }
          }
        }
        newSkills[skillset][position] = Number(id);
        return newSkills;
      });
    }
  }

  const getStyle = skillId => {
    if (skillsets.some(set => set.filter((_, i) => i !== 0).some(x => x === skillId))) {
      return { opacity: 0.5 };
    }
    return {};
  }

  const getIdFromSkillName = name => CFDB.getSkill(name)?.iconId || 0;

  const options = getSavedKeys();
  options.push(...getBuildNames().filter(name => !options.includes(name)));

  const loadSkillsFromBuild = () => {
    if (build === "None") return;
    const newBuild = load(build) || getBuild(build);
    const skillset = setMap[loadPosRef.current.base.value];
    const newSkills = [getIdFromSkillName(newBuild.phylactery.skill), ...newBuild.skills.map(x => getIdFromSkillName(x))];
    newSkills.forEach((skill, i) => setSkill(skillset)(i, skill));
  }

  return html`
  <div class="row pt-3">
    <div class="image-checkbox-container">
      ${CFDB.getSkills().filter(skill => skill.name !== "Normal Attack").map(skill => html`
      <${ImageRadio} id=${`skill-planner-${skill.iconId}`} value=${skill.name} name="skill-planner-skill" checked=${selectedSkill === skill.iconId}
      src=${getImagePath(ImageType.skill, skill.iconId)} onClick=${() => setSelectedSkill(skill.iconId)} style=${getStyle(skill.iconId)}
      draggable ondragstart=${e => e.dataTransfer.setData("id", skill.iconId)} />`)}
    </div>
  </div>
  <div class="row">
    <div class="col-md pt-3"><${SkillSet} skillsetNumber=1 skills=${skillsets[0]} setSkill=${setSkill(0)} selectedSkill=${selectedSkill} /></div>
    <div class="col-md pt-3"><${SkillSet} skillsetNumber=2 skills=${skillsets[1]} setSkill=${setSkill(1)} selectedSkill=${selectedSkill} /></div>
    <div class="col-md pt-3"><${SkillSet} skillsetNumber=3 skills=${skillsets[2]} setSkill=${setSkill(2)} selectedSkill=${selectedSkill} /></div>
  </div>
  <div class="row pt-3">
    <div class="col-sm">
      <div class="input-group">
        <${SelectInput} value=${build} options=${options} onChange=${e => setBuild(e.target.value)} />
        <${SelectInput} ref=${loadPosRef} options=${["I", "II", "III"]} includeNone=${false} style=${{ maxWidth: "4rem" }} />
      </div>
    </div>
    <div class="col-sm-auto">
      <${Button} onClick=${loadSkillsFromBuild}>Load Skills</${Button}>
    </div>    
  </div>
  `;
}

export default SkillPlanner;
