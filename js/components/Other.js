import { html, useRef } from "https://unpkg.com/htm/preact/standalone.module.js"
import LZString from "../lib/lz-string.min.js";
import { submitPaste } from "../pastee.js";
import Button from "./Button.js";

const Other = ({ state, setState }) => {
  const textArea = useRef(null);
  const code = LZString.compressToBase64(JSON.stringify(state));
  const importFromTextArea = () => {
    try {
      const json = JSON.parse(LZString.decompressFromBase64(textArea.current.value));
      if (json == null) {
        alert("Invalid code");
        return;
      }
      setState(json);
    } catch (error) {
      console.warn(error);
    }
  }
  const exportCode = async () => {
    const url = await submitPaste(state.name, textArea.current.value);
    navigator.clipboard.writeText(url);
    alert(`Copied url to clipboard: ${url}`);
  }
  return html`
  <div class="row">
    <div class="col-auto">
      <${Button} onClick=${() => importFromTextArea()}>Import</${Button}>
    </div>
    <div class="col-auto">
      <${Button} onClick=${() => exportCode()}>Export</${Button}>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <textarea class="form-control" rows="10" ref=${textArea} onClick="${() => textArea.current.select()}">${code}</textarea>
    </div>
  </div>
  `;
}

export default Other;
