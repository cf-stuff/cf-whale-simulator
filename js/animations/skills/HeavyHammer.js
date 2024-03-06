import { Layer } from "../animations.js";

const front = new Image();
front.src = "img/display/effects/geniefront.png";

const prep = new Image();
prep.src = "img/display/effects/hammerprep.png";

const impact = new Image();
impact.src = "img/display/effects/hammerimpact.png";

export default class HeavyHammer {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 550;
    this.y = 550;
    this.frame = 0;
    this.opacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame > 101) {
      this.opacity -= 0.2;
      if (this.opacity < 0) this.opacity = 0;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-33 wind up
   * frames 34-46 mini hammer
   * frame  65 genie front
   * frame  81 hammer prep
   * frame  84 hammer impact
   * frames 102-106 fade out
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame < 65) {
      } else if (this.frame < 81) {
        ctx.drawImage(front, 0, 0, front.width, front.height, this.x - front.width, this.y - front.height * 2, front.width * 2, front.height * 2);
      } else if (this.frame < 84) {
        ctx.drawImage(prep, 0, 0, prep.width, prep.height, this.x - prep.width, this.y - prep.height * 2, prep.width * 2, prep.height * 2);
      } else {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(impact, 0, 0, impact.width, impact.height, this.x - impact.width, this.y - impact.height * 2, impact.width * 2, impact.height * 2);
        ctx.globalAlpha = 1.0;
      }
    } else {
      ctx.scale(-1, 1);
      if (this.frame < 65) {
      } else if (this.frame < 81) {
        ctx.drawImage(front, 0, 0, front.width, front.height, this.x - ctx.canvas.width - front.width, this.y - front.height * 2, front.width * 2, front.height * 2);
      } else if (this.frame < 84) {
        ctx.drawImage(prep, 0, 0, prep.width, prep.height, this.x - ctx.canvas.width - prep.width, this.y - prep.height * 2, prep.width * 2, prep.height * 2);
      } else {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(impact, 0, 0, impact.width, impact.height, this.x - ctx.canvas.width - impact.width, this.y - impact.height * 2, impact.width * 2, impact.height * 2);
        ctx.globalAlpha = 1.0;
      }
      ctx.scale(-1, 1);
    }
  }

  isFinished() {
    return this.frame > 106;
  }
}
