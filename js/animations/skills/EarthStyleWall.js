import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/esw.png";

export default class EarthStyleWall {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 350;
    this.y = 400;
    this.frame = 0;
  }

  update() {
    ++this.frame;
  }

  /**
   * notes @ 30 fps
   * frames 1-8 wind up
   * frames 9-24 theatrics
   * frames 25-26 wait
   * frames 27-55 side shield
   * frames 56-62 shield go up
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 26 && this.frame < 56) {
        ctx.drawImage(img, this.x, this.y);
      }
    } else {
      if (this.frame > 26 && this.frame < 56) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.x - ctx.canvas.width, this.y);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 62;
  }
}
