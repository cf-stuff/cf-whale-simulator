import { Layer } from "../animations.js";

const thorns = new Image();
thorns.src = "img/display/effects/thorns.png";

export default class ThornShield {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 300;
    this.y = 550;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame > 13 && this.frame < 35) {
      this.x += 18;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-13 wind up
   * frames 14-34 thorns travel
   * frames 35-52 constrict
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 13) {
        ctx.drawImage(thorns, this.x, this.y - thorns.height);
      }
    } else {
      if (this.frame > 13) {
        ctx.scale(-1, 1);
        ctx.drawImage(thorns, this.x + ctx.canvas.width, this.y - thorns.height / 2);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 52;
  }
}
