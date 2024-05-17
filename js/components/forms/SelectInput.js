import { html } from "../../lib/preact.standalone.module.js"

const SelectInput = ({ value, onChange, options, includeNone = true, style, disabled = false }) => {
  return html`
  <select class="form-select" value=${value} onChange=${onChange} style=${style} disabled=${disabled}>
    ${includeNone && html`<option value="None">-</option>`}
    ${options.map(option => html`<option value=${option}>${option}</option>`)}
  </select>
  `;
}

export default SelectInput;
