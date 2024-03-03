import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/violence.png";

export default class Violence {
  constructor(left) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.frame = 0;
    this.x = 300;
    this.y = 550;
    this.opacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame > 27 && this.frame < 32) {
      this.opacity -= 0.2;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-22 wind up
   * frames 23-27 clap
   * frames 28-31 fade out
   * frames 32-39 electric effects
   * frames 40-46 back to neutral
   */
  draw(ctx) {
    if (this.frame > 22 && this.frame < 32) {
      if (this.left) {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(img, this.x - img.width / 2, this.y - img.height);
        ctx.globalAlpha = 1.0;
      } else {
        ctx.scale(-1, 1);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(img, this.x - img.width / 2 - ctx.canvas.width, this.y - img.height);
        ctx.globalAlpha = 1.0;
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 46;
  }
}
