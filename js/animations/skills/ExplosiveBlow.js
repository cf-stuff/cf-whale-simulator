import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/explosiveblow.png";

const beam = new Image();
beam.src = "img/display/effects/explosivebeam.png";

export default class ExplosiveBlow {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 350;
    this.y = 500;
    this.frame = 0;
    this.opacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame > 40 && this.frame < 51) {
      this.opacity -= 0.1;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-14 wind up
   * frames 15-40 kirby
   * frames 41-50 boom
   * frames 51-52 wait
   * frames 53-59 wind down
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 40 && this.frame < 51) {
        if (this.frame > 41) {
          const h = beam.height * 0.8 - 0.1 * this.frame - 41;
          ctx.drawImage(beam, 0, 0, beam.width, beam.height, this.x + 20, this.y - h / 2, this.x * 5, h);
        }
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x, this.y - img.height * 1.5, img.width * 3, img.height * 3);
        ctx.globalAlpha = 1.0;
      }
    } else {
      if (this.frame > 40 && this.frame < 51) {
        if (this.frame > 41) {
          const h = beam.height * 0.8 - 0.1 * this.frame - 42;
          ctx.scale(-1, 1);
          ctx.drawImage(beam, 0, 0, beam.width, beam.height, this.x + 20 - ctx.canvas.width, this.y - h / 2, this.x * 5, h);
          ctx.scale(-1, 1);
        }
        ctx.globalAlpha = this.opacity;
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x - ctx.canvas.width, this.y - img.height * 1.5, img.width * 3, img.height * 3);
        ctx.scale(-1, 1);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  isFinished() {
    return this.frame > 59;
  }
}
