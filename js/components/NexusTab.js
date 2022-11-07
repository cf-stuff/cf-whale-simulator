import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import NexusElement from "./NexusElement.js";

const NexusTab = ({ isActive, nexus, setNexus }) => {
  if (!isActive) return html``;

  const setSoul = (soul, position) => {
    nexus[position] = soul;
    setNexus(nexus);
  }

  const selectedStats = nexus.map(soul => soul.stat);
  return html`
  <div class="row">
    <div class="col">
      ${nexus.map((soul, i) => html`<${NexusElement} position=${i} soul=${soul} setSoul=${setSoul}
      options=${CFDB.getNexusStats().map(stat => stat.name).filter(stat => !selectedStats.filter(selected => selected !== soul.stat).includes(stat))} />`)}
    </div>
  </div>
  `;
}

export default NexusTab;
