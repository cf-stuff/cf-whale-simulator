import { html, useState } from "../lib/preact.standalone.module.js";
import Button from "./forms/Button.js";
import SelectInput from "./forms/SelectInput.js";
import { getBuild, getBuildNames } from "../templates.js";
import { getSavedKeys, load, remove, save } from "../storage.js";
import { initialState } from "../state.js";
import Utils from "../utils.js";

const BuildLoader = ({ build, setBuild }) => {
  const [selectedBuild, setSelectedBuild] = useState("None");

  const loadBuild = () => {
    if (selectedBuild === "None") {
      setBuild(Utils.deepClone(initialState));
    } else {
      const newBuild = load(selectedBuild) || getBuild(selectedBuild);
      setBuild(newBuild);
    }
  }
  const saveBuild = () => {
    if (build.fighter.name === "None") return;
    save(build);
    setSelectedBuild(build.name)
  };
  const removeBuild = () => {
    remove(selectedBuild);
    setSelectedBuild("None");
  };

  const options = getSavedKeys();
  options.push(...getBuildNames().filter(name => !options.includes(name)));

  return html`
  <div class="row">
    <div class="col-auto">
      <${SelectInput} value=${selectedBuild} options=${options}
      onChange=${e => setSelectedBuild(e.target.value)} />
    </div>
    <div class="col-auto">
      <${Button} onClick=${loadBuild}>Load</${Button}>
    </div>
    <div class="col-auto">
      <${Button} onClick=${saveBuild}>Save</${Button}>
    </div>
    <div class="col-auto">
      <${Button} onClick=${removeBuild}>Remove</${Button}>
    </div>
  </div>
  `
}

export default BuildLoader;
