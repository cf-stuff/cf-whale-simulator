import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

const SelectInput = ({ value, onChange, options, includeNone = true }) => {
  return html`
  <select class="form-select" value=${value} onChange=${onChange}>
    ${includeNone && html`<option value="None">-</option>`}
    ${options.map(option => html`<option value=${option}>${option}</option>`)}
  </select>
  `;
}

export default SelectInput;
