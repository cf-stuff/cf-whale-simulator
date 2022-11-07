import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

const SelectInput = ({ value, onChange, options }) => {
  return html`
  <select class="form-select" value=${value} onChange=${onChange}>
    <option value="None">-</option>
    ${options.map(option => html`<option value=${option}>${option}</option>`)}
  </select>
  `;
}

export default SelectInput;
