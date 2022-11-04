import { html, useState, useEffect } from "https://unpkg.com/htm/preact/standalone.module.js"
import { createCanvas } from "../display.js";

const Display = ({ player }) => {
  const [src, setSrc] = useState("");
  useEffect(async () => {
    const canvas = await createCanvas(player);
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    setSrc(URL.createObjectURL(blob));
  }, []);
  return html`<img class="display" src=${src} />`;
}

export default Display;
