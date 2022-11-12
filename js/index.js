import { html, render } from "https://unpkg.com/htm/preact/standalone.module.js";
import App from "./components/App.js";
import CFDB from "./data/CFDB.js";
import { getImagePath, ImageType, preload } from "./image.js";

render(html`<${App} />`, document.body);

CFDB.getSkillTypes().forEach(type => preload(getImagePath(ImageType.skillType, type.iconId)));
CFDB.getSkills().filter(skill => skill.name !== "Normal Attack")
  .forEach(skill => preload(getImagePath(ImageType.skill, skill.iconId)));
CFDB.getFighterSkills().forEach(skill => preload(getImagePath(ImageType.fighterSkill, skill.iconIds[2])));
CFDB.getPetSkills().forEach(skill => preload(getImagePath(ImageType.petSkill, skill.iconId)));
CFDB.getTotems().forEach(totem => preload(getImagePath(ImageType.totem, totem.iconId)));
preload("img/display/skill-frame.png");
preload("img/display/skill-evo-frame.png");
