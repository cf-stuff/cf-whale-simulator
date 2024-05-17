import { html } from "../../lib/preact.standalone.module.js"

const ImageRadio = ({ id, value, name, src, checked, disabled, onClick, draggable, ondragstart, style }) => {
  return html`
  <div class="image-checkbox" style=${style}>
    <input id=${id} class="form-check-input" type="radio" name=${name} value=${value}
    checked=${checked} disabled=${!checked && disabled} onClick=${onClick} />
    <label class="form-check-label" for=${id} title=${value}><img src=${src} draggable=${draggable} ondragstart=${ondragstart} /></label>
  </div>`;
}

export default ImageRadio;
