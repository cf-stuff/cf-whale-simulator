import { html, useState, useEffect } from "../lib/preact.standalone.module.js";
import { createProfile } from "../display.js";

const Display = ({ player, bg = 11, left = true }) => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const createPlayerImage = async () => {
      const canvas = await createProfile(player, { bg, left });
      setSrc(canvas.toDataURL());
    }
    createPlayerImage();
  }, [JSON.stringify(player), bg]);
  return html`<img class="display" src=${src} />`;
}

export default Display;
