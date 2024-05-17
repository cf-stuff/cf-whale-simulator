import { html, useRef } from "../../lib/preact.standalone.module.js"
import toPlayer from "../../calculator.js";
import LZString from "../../lib/lz-string.min.js";
import { submitPaste } from "../../pastee.js";
import Button from "../forms/Button.js";
import { randomBuild } from "../../build.js";
import SelectInput from "../forms/SelectInput.js";

const NUMBER_OF_BACKGROUNDS = 14;

const Other = ({ state, setState, bg, setBg }) => {
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
    await navigator.clipboard.writeText(url);
    alert(`Copied url to clipboard: ${url}\nNote: link lasts 2 weeks`);
  }
  const setRandomBuild = () => {
    setState(randomBuild());
  }
  const player = toPlayer(state);
  const secondsPerAttack = Math.ceil(10000 / player.stats.spd) / 10;
  return html`
  <div class="row">
    <div class="col">
      <span>STR: ${player.stats.str}, DEX: ${player.stats.dex}, STA: ${player.stats.sta}</span>
    </div>
    <div class="col-auto">
      <div class="input-group">
        <span class="input-group-text">Background</span>
        <${SelectInput} value=${bg} options=${Array(NUMBER_OF_BACKGROUNDS).fill().map((_, i) => i + 1)}
        onChange=${e => setBg(e.target.value)} includeNone=${false}/>
      </div>
    </div>
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
  <div class="row">
    <div class="col-auto">
      <${Button} onClick=${() => setRandomBuild()}>Ultimate Bravery</${Button}>
    </div>
  </div>
  `;
}

export default Other;
