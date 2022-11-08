import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const Glyph = ({ glyph, setGlyph, options, phyPlus }) => {
  const calculateStatAmount = () => {
    if (glyph.stat === "None") return "";
    let bonusStatMultiplier = 0;
    if (phyPlus >= 18) bonusStatMultiplier = 1.2;
    else if (phyPlus >= 14) bonusStatMultiplier = 0.8;
    else if (phyPlus >= 8) bonusStatMultiplier = 0.4;
    const base = glyph.plus * 4;
    return `+${base} (+${Math.floor(base * bonusStatMultiplier)})`;
  }

  return html`
    <div class="input-group">
      <${SelectInput} value=${glyph.stat} options=${options} onChange=${e => setGlyph({ stat: e.target.value, plus: glyph.plus })} />
      <span class="input-group-text">+</span>
      <${NumberInput} value=${glyph.plus} onInput=${e => setGlyph({ stat: glyph.stat, plus: e.target.vlue })} />
      <span class="input-group-text glyph-stat-amount">${calculateStatAmount()}</span>
    </div>
  `;
}

export default Glyph;
