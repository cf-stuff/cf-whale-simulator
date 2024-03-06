import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/assassinate.png";

export default class Assassinate {
  constructor(left) {
    this.layer = Layer.EFFECTS2
    this.left = left;
    this.x = 0;
    this.y = 235;
    this.w = 240;
    this.h = 96;
    this.frame = 0;
    this.imgOpacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame > 31) {
      this.imgOpacity -= 0.04;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-23 dash / wind up
   * frames 24-49 black
   * frames 24-31 draw img
   * frames 31-49 fade out img
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 23) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = this.imgOpacity;
        ctx.drawImage(img, 0, 0, this.w, this.h, this.x, this.y, this.w * 4, this.h * 4);
        ctx.globalAlpha = 1.0;
      }
    } else {
      if (this.frame > 23) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = this.imgOpacity;
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, this.w, this.h, this.x - ctx.canvas.width, this.y, this.w * 4, this.h * 4);
        ctx.globalAlpha = 1.0;
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 49;
  }
}
