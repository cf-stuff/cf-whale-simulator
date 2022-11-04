import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

const PetTab = ({ id, value, onInput }) => {
  return html`<input type="text" id=${id} class="form-control" value=${value} onInput=${onInput} />`;
}

export default PetTab;
