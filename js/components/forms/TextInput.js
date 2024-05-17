import { html } from "../../lib/preact.standalone.module.js"

const TextInput = ({ id, value, onInput }) => {
  return html`<input type="text" id=${id} class="form-control" value=${value} onInput=${onInput} />`;
}

export default TextInput;
