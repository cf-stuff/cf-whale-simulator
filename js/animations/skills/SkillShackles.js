import { Layer } from "../animations.js";

const upper = new Image();
upper.src = "img/display/effects/shackles.png";

const lower = new Image();
lower.src = "img/display/effects/chains.png";

export default class SkillShackles {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.x = 724;
    this.y = 550;
    this.frame = 0;
    this.opacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame < 18) {
      this.sprite.pos.x += 17;
    } else if (this.frame < 110) {
    } else if (this.frame < 114) {
      this.opacity -= 0.3;
    } else if (this.frame < 130) {
      this.sprite.pos.x -= 17;
    } else if (this.frame === 130) {
      this.sprite.pos.x = 300;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-17 run up
   * frames 18-39 wait
   * frame  40 enter upper chains
   * frame  88 enter lower chains
   * frames 110-113 upper chains get smaller and fade out
   * frames 114-130 run back
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 87) {
        ctx.scale(-1, 1);
        ctx.drawImage(lower, 300 - lower.width / 2 - ctx.canvas.width, this.y - lower.height);
        ctx.scale(-1, 1);
      }
      if (this.frame > 39 && this.frame < 114) {
        ctx.drawImage(upper, this.x - upper.width / 2, this.y - upper.height);
      }
    } else {
      if (this.frame > 87) {
        ctx.drawImage(lower, 300 - lower.width / 2, this.y - lower.height);
      }
      if (this.frame > 39 && this.frame < 114) {
        ctx.scale(-1, 1);
        ctx.drawImage(upper, this.x - upper.width / 2 - ctx.canvas.width, this.y - upper.height);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 130;
  }
}
