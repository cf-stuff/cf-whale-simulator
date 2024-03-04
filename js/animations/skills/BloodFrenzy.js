import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/bloodfrenzy.png";

const flame = new Image();
flame.src = "img/display/effects/bloodfrenzy2.png";

export default class BloodFrenzy {
  constructor(left) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.x = 300;
    this.y = 550;
    this.frame = 0;
    this.flameOpacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame > 15) {
      this.flameOpacity -= 0.1;
      if (this.flameOpacity <= 0) this.flameOpacity = 0;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-10 wind up
   * frames 11-29 ground thing
   * frames 11-13 flame 0.5x height
   * frames 14 flame 1x height
   * frames 15 flame 2x height
   * frames 16-18 flame fade out
   * frames 30-31 wind down
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 10 && this.frame < 30) {
        ctx.drawImage(img, this.x - img.width / 2, this.y - img.height * 0.75);
      }
      if (this.frame > 10 && this.frame < 14) {
        ctx.drawImage(flame, 0, 0, flame.width, flame.height, this.x - flame.width / 2, this.y - flame.height / 2, flame.width, flame.height / 2);
      } else if (this.frame === 14) {
        ctx.drawImage(flame, this.x - flame.width / 2, this.y - flame.height);
      } else if (this.frame > 14) {
        ctx.globalAlpha = this.flameOpacity;
        ctx.drawImage(flame, 0, 0, flame.width, flame.height, this.x - flame.width / 2, this.y - flame.height * 2, flame.width, flame.height * 2);
        ctx.globalAlpha = 1.0;
      }
    } else {
      ctx.scale(-1, 1);
      if (this.frame > 10 && this.frame < 30) {
        ctx.drawImage(img, this.x - ctx.canvas.width - img.width / 2, this.y - img.height * 0.75);
      }
      if (this.frame > 10 && this.frame < 14) {
        ctx.drawImage(flame, 0, 0, flame.width, flame.height, this.x - ctx.canvas.width - flame.width / 2, this.y - flame.height / 2, flame.width, flame.height / 2);
      } else if (this.frame === 14) {
        ctx.drawImage(flame, this.x - ctx.canvas.width - flame.width / 2, this.y - flame.height);
      } else if (this.frame > 14) {
        ctx.globalAlpha = this.flameOpacity;
        ctx.drawImage(flame, 0, 0, flame.width, flame.height, this.x - ctx.canvas.width - flame.width / 2, this.y - flame.height * 2, flame.width, flame.height * 2);
        ctx.globalAlpha = 1.0;
      }
      ctx.scale(-1, 1);
    }
  }

  isFinished() {
    return this.frame > 31;
  }
}
