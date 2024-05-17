import { html } from "../../lib/preact.standalone.module.js"

const ImageCheckbox = ({ id, value, name, src, checked, disabled, onClick }) => {
  return html`
  <div class="image-checkbox">
    <input id=${id} class="form-check-input" type="checkbox" name=${name} value=${value}
    checked=${checked} disabled=${!checked && disabled} onClick=${onClick} />
    <label class="form-check-label" for=${id} title=${value}><img src=${src} /></label>
  </div>`;
}

export default ImageCheckbox;
