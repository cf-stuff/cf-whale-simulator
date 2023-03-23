import { html, useRef } from "https://unpkg.com/htm/preact/standalone.module.js"
import toPlayer from "../calculator.js";
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
  const player = toPlayer(state);
  const secondsPerAttack = Math.ceil(10000 / player.stats.spd) / 10;
  return html`
  <div class="row">
    <span>STR: ${player.stats.str}, DEX: ${player.stats.dex}, STA: ${player.stats.sta}</span>
  </div>
  <div class="row">
    <span>SPD TIER: <b>${Math.ceil(1000 / secondsPerAttack)}</b><br/>SECONDS/ATTACK: <b>${secondsPerAttack}</b></span>
  </div>
  <div class="row">
    <div class="col-auto">
      <${Button} onClick=${() => importFromTextArea()}>Import</${Button}>
    </div>
    <div class="col-auto">
      <${Button} onClick=${() => exportCode()}>Generate Paste</${Button}>
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
