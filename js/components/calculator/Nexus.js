import { html } from "../../lib/preact.standalone.module.js"
import CFDB from "../../data/CFDB.js";
import NexusSoul from "./Soul.js";

const Nexus = ({ nexus, setNexus }) => {
  const selectedSouls = nexus.map(soul => soul.stat);
  const nexusStats = CFDB.getNexusStats();

  const setSoul = position => soul => {
    nexus[position] = soul;
    setNexus(nexus);
  }

  const nexusElements = [];
  for (let i = 0; i < 8; ++i) {
    const soul = nexus[i] || { stat: "None", level: 12 };
    const options = nexusStats.map(stat => stat.name)
      .filter(stat => stat === soul.stat || !selectedSouls.includes(stat));
    nexusElements.push(html`<div class="row"><${NexusSoul} soul=${soul} setSoul=${setSoul(i)} options=${options} /></div>`);
  }

  return html`${nexusElements}`;
}

export default Nexus;
