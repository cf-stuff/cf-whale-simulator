import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/bell.png";

export default class GoldenShield {
  constructor(left) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.x = 300;
    this.y = 100;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame > 13 && this.frame < 23) {
      this.y += 50;
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
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x - img.width, this.y - img.height * 1.8, img.width * 2, img.height * 2);
      }
    } else {
      if (this.frame > 13) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x - ctx.canvas.width - img.width, this.y - img.height * 1.8, img.width * 2, img.height * 2);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 38;
  }
}
