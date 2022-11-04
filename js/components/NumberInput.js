import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

const NumberInput = ({ id, value, onInput, width }) => {
  return html`<input type="number" id=${id} class="form-control" value=${value} onInput=${onInput} style=${{width}} />`;
}

export default NumberInput;
