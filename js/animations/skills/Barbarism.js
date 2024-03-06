import { Layer } from "../animations.js";

const cowFace = new Image();
cowFace.src = "img/display/effects/barb.png";

const horns = new Image();
horns.src = "img/display/effects/horns.png";

export default class Barbarism {
  constructor(left) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.x = 300;
    this.y = 400;
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
   * frame  14 enter horns
   * frames 69-80 fade out
   * frame  76 is when status is added
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 10) {
        ctx.globalAlpha = this.imgOpacity;
        ctx.drawImage(cowFace, this.x - cowFace.width / 2, this.y);
        if (this.frame > 13) {
          ctx.drawImage(horns, this.x - horns.width / 2, this.y - horns.height / 4);
        }
        ctx.globalAlpha = 1.0;
      }
    } else {
      if (this.frame > 15) {
        ctx.scale(-1, 1);
        ctx.globalAlpha = this.imgOpacity;
        ctx.drawImage(cowFace, this.x - ctx.canvas.width - cowFace.width / 2, this.y);
        if (this.frame > 13) {
          ctx.drawImage(horns, this.x - ctx.canvas.width - horns.width / 2, this.y - horns.height / 4);
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
