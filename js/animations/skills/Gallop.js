import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/gallop.png";

export default class Gallop {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 300;
    this.y = 550;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame === 1) {
    } else if (this.frame === 2) {
      this.y -= 50;
    } else if (this.frame < 8) {
      this.y -= 3;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-7 big arrow
   * frames 8-30 assorted other arrows
   */
  draw(ctx) {
    if (this.frame < 8) {
      if (this.left) {
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x - img.width, this.y - img.height * 2, img.width * 2, img.height * 2);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x - img.width - ctx.canvas.width, this.y - img.height * 2, img.width * 2, img.height * 2);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 30;
  }
}
