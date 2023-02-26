import { html, useRef } from "https://unpkg.com/htm/preact/standalone.module.js"
import LZString from "../lib/lz-string.min.js";
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
  const copyCode = () => {
    const copyText = textArea.current;
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Copied to clipboard");
  }
  return html`
  <div class="row">
    <div class="col-auto">
      <${Button} onClick=${() => importFromTextArea()}>Import</${Button}>
    </div>
    <div class="col-auto">
      <${Button} onClick=${() => copyCode()}>Export</${Button}>
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
