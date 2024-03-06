import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/cleanse.png";

export default class Cleanse {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 300;
    this.y = 450;
    this.frame = 0;
  }

  update() {
    ++this.frame;
  }

  /**
   * notes @ 30 fps
   * frames 1-5 wind up
   * frames 6-9 sparkle fade out
   * frames 10-34 fancy effects
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 9) {
        ctx.drawImage(img, this.x - img.width / 2, this.y);
      }
    } else {
      if (this.frame > 9) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.x - img.width / 2 - ctx.canvas.width, this.y);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 34;
  }
}
