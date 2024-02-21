import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/bell.png";

export default class GoldenShield {
  constructor(left) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.x = 250;
    this.y = -74;
    this.w = 146;
    this.h = 148;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame > 13 && this.frame < 23) {
      this.y += 45;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-13 wind up
   * frames 14-22 falls from sky
   * frames 23-38 beyblade (not doing that lol)
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 13) {
        ctx.drawImage(img, 0, 0, this.w, this.h, this.x - this.w / 2, this.y - this.h / 2, this.w * 2, this.h * 2);
      }
    } else {
      if (this.frame > 13) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, this.w, this.h, this.x + ctx.canvas.width * -1 - this.w / 2, this.y - this.h / 2, this.w * 2, this.h * 2);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 38;
  }
}
