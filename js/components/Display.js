import { html, useState, useEffect } from "https://unpkg.com/htm/preact/standalone.module.js"
import { createProfile } from "../display.js";

const Display = ({ player, bg = 11, left = true }) => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    let url;
    const createPlayerImage = async () => {
      const canvas = await createProfile(player, { bg, left });
      const blob = await new Promise(resolve => canvas.toBlob(resolve));
      url = URL.createObjectURL(blob);
      setSrc(url);
    }
    createPlayerImage();
    return () => URL.revokeObjectURL(url);
  }, [JSON.stringify(player), bg]);
  return html`<img class="display" src=${src} />`;
}

export default Display;
