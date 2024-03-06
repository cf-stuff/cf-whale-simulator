import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/net.png";

export default class InescapableNet {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 320;
    this.y = 500;
    this.vy = 0;
    this.ay = 1.6;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame === 12) {
      this.vy = -20;
    }
    if (this.frame > 12 && this.frame < 34) {
      this.angle += Math.PI / 4;
      this.x += 20;
      this.vy += this.ay;
      this.y += this.vy;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-11 wind up
   * frames 12-34 net arc while flashing
   * frames 34-40 lands while flashing
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 11 && this.frame % 3 !== 2) {
        ctx.drawImage(img, this.x - img.width / 2, this.y - img.height / 2);
      }
    } else {
      if (this.frame > 11 && this.frame % 3 !== 2) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.x - ctx.canvas.width - img.width / 2, this.y - img.height / 2);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 40;
  }
}
