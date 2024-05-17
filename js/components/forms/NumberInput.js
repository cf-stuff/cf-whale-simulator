import { html } from "../../lib/preact.standalone.module.js"

const NumberInput = ({ id, value, onInput, style, step = 1 }) => {
  return html`<input type="number" id=${id} class="form-control"
  value=${value} onInput=${onInput} step=${step} style=${style} />`;
}

export default NumberInput;
