import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import NumberInput from "./NumberInput.js";

const FixedStatInput = ({ idPrefix, stat, value, onInput }) => {
  const id = `${idPrefix}-${stat}`;
  return html`
    <div class="input-group">
      <label class="input-group-text" for=${id} style="width:5rem;">${stat}</label>
      <${NumberInput} id=${id} value=${value} onInput=${onInput} />
    </div>
  `;
}

export default FixedStatInput;
