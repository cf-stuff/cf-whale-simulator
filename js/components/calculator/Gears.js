import { html } from "../../lib/preact.standalone.module.js"
import CFDB from "../../data/CFDB.js";
import Gear from "./Gear.js";

const Gears = ({ fighterWeaponType, gears, setGears }) => {
  const setGear = position => gear => {
    if (position >= 0) gears[position] = gear;
    else gears.push(gear);
    setGears(gears);
  }

  const gearComponents = CFDB.getGearTypes().map(gearType => {
    const gearIndex = gears.findIndex(x => CFDB.getGear(x.name).type === gearType.name);
    const gear = gears[gearIndex] || { name: "None", enhancement: 10, stats: [], gems: [] };
    return html`<${Gear} fighterWeaponType=${fighterWeaponType} gear=${gear} type=${gearType.name} setGear=${setGear(gearIndex)} />`;
  });

  return html`
  <div class="row row-cols-1 row-cols-sm-2">
    ${gearComponents}
  </div>
  `;
}

export default Gears;
