import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/barb.png";

const horns = new Image();
horns.src = "img/display/effects/horns.png";

export default class Barbarism {
  constructor(left) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.x = 300;
    this.y = 400;
    this.w = 106;
    this.h = 70;
    this.frame = 0;
    this.imgOpacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame > 68) {
      this.imgOpacity -= 0.1;
      if (this.imgOpacity <= 0) this.imgOpacity = 0;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-10 wind up
   * frames 11-68 cow head
   * frame 14 enter horns
   * frames 69-80 fade out
   * frame 76 is when status is added
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 10) {
        ctx.globalAlpha = this.imgOpacity;
        ctx.drawImage(img, 0, 0, this.w, this.h, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        if (this.frame > 13) {
          ctx.drawImage(horns, 0, 0, 104, 82, this.x - 104 / 2, this.y - 20 - 82 / 2, 104, 82);
        }
        ctx.globalAlpha = 1.0;
      }
    } else {
      if (this.frame > 15) {
        ctx.scale(-1, 1);
        ctx.globalAlpha = this.imgOpacity;
        ctx.drawImage(img, 0, 0, this.w, this.h, this.x + ctx.canvas.width * -1 - this.w / 2, this.y - this.h / 2, this.w, this.h);
        if (this.frame > 13) {
          ctx.drawImage(horns, 0, 0, 104, 82, this.x + ctx.canvas.width * -1 - 104 / 2, this.y - 20 - 82 / 2, 104, 82);
        }
        ctx.globalAlpha = 1.0;
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 80;
  }
}
