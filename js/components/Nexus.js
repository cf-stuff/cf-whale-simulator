import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import Soul from "./Soul.js";

const Nexus = ({ isActive, nexus, setNexus }) => {
  if (!isActive) return html``;

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
    nexusElements.push(html`<div class="row"><${Soul} soul=${soul} setSoul=${setSoul(i)} options=${options} /></div>`);
  }

  return html`${nexusElements}`;
}

export default Nexus;
