import { Layer } from "../animations.js";

const projectile = new Image();
projectile.src = "img/display/effects/bacteria.png";

const impact = new Image();
impact.src = "img/display/effects/bacteriaimpact.png";

export default class Bacteria {
  constructor(left) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.x = 400;
    this.y = 470;
    this.frame = 0;
    this.impactOpacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame < 12) {

    } else if (this.frame < 21) {
      this.x += 27;
    } else if (this.frame < 34) {
    } else if (this.frame < 41) {
      this.impactOpacity -= 0.1;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-11 wind up
   * frames 12-20 projectile
   * frames 21-40 impact
   * frames 41-45 wait
   */
  draw(ctx) {
    if (this.frame > 11 && this.frame < 21) {
      if (this.left) {
        ctx.drawImage(projectile, this.x - projectile.width / 2, this.y - projectile.height / 2);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(projectile, this.x - projectile.width / 2 - ctx.canvas.width, this.y - projectile.height / 2);
        ctx.scale(-1, 1);
      }
    }
    if (this.frame > 20 && this.frame < 41) {
      if (this.left) {
        ctx.globalAlpha = this.impactOpacity;
        ctx.drawImage(impact, 0, 0, impact.width, impact.height, 700 - impact.width * 1.5 / 2, 550 - impact.height * 1.5, impact.width * 1.5, impact.height * 1.5);
        ctx.globalAlpha = 1.0;
      } else {
        ctx.globalAlpha = this.impactOpacity;
        ctx.scale(-1, 1);
        ctx.drawImage(impact, 0, 0, impact.width, impact.height, 700 - impact.width * 1.5 / 2 - ctx.canvas.width, 550 - impact.height * 1.5, impact.width * 1.5, impact.height * 1.5);
        ctx.scale(-1, 1);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  isFinished() {
    return this.frame > 45;
  }
}
