import { html, useState, useEffect } from "https://unpkg.com/htm/preact/standalone.module.js"
import { createCanvas } from "../display.js";

const Display = ({ player }) => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    let url;
    const createPlayerImage = async () => {
      const canvas = await createCanvas(player);
      const blob = await new Promise(resolve => canvas.toBlob(resolve));
      url = URL.createObjectURL(blob);
      setSrc(url);
    }
    createPlayerImage();
    return () => URL.revokeObjectURL(url);
  }, [player]);
  return html`<img class="display" src=${src} />`;
}

export default Display;
