import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import NexusElement from "./NexusElement.js";

const Nexus = ({ isActive, nexus, setNexus }) => {
  if (!isActive) return html``;

  const selectedStats = nexus.map(soul => soul.stat);
  const nexusStats = CFDB.getNexusStats();

  const setSoul = (soul, position) => {
    nexus[position] = soul;
    setNexus(nexus);
  }

  const nexusElements = [];
  for (let i = 0; i < 8; ++i) {
    const soul = nexus[i] || { stat: "None", level: 12 };
    const options = nexusStats.map(stat => stat.name)
      .filter(stat => !selectedStats.filter(selected => selected !== soul.stat).includes(stat));
    nexusElements.push(html`<${NexusElement} position=${i} soul=${soul} setSoul=${setSoul}
    options=${options} />`);
  }

  return html`
  <div class="row">
    <div class="col">
      ${nexusElements}
    </div>
  </div>
  `;
}

export default Nexus;
