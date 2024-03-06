import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/fireshield.png";

export default class FireShield {
  constructor(left) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.x = 300;
    this.y = 550;
    this.w = 189;
    this.h = 73;
    this.frame = 0;
    this.imgOpacity = 1.0;
    this.scale = 1;
  }

  update() {
    ++this.frame;
    if (this.frame > 16) {
      this.scale += 0.2;
    }
    if (this.frame > 26) {
      this.imgOpacity -= 0.1;
      if (this.imgOpacity <= 0) this.imgOpacity = 0;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-15 wind up
   * frames 16-37 fire 1 grows up to 5x
   * frames 26-37 fire 1 fade out
   * 
   * 2 more fires start at frames 25 and 31
   * full animation takes 55 frames
   * 
   * lazy version: play another fire shield at frames 10 and 16, or just play 1 animation
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 15) {
        ctx.globalAlpha = this.imgOpacity;
        const w = this.w * this.scale;
        const h = this.h * this.scale;
        ctx.drawImage(img, 0, 0, this.w, this.h, this.x - w / 2, this.y - h / 2, w, h);
        ctx.globalAlpha = 1.0;
      }
    } else {
      if (this.frame > 15) {
        ctx.scale(-1, 1);
        ctx.globalAlpha = this.imgOpacity;
        const w = this.w * this.scale;
        const h = this.h * this.scale;
        ctx.drawImage(img, 0, 0, this.w, this.h, this.x - ctx.canvas.width - w / 2, this.y - h / 2, w, h);
        ctx.globalAlpha = 1.0;
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 37;
  }
}
