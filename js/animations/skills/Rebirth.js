import { FighterState } from "../Fighter.js";
import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/wings.png";

export default class Rebirth {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.x = 300;
    this.y = 400;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame < 12) {
      this.sprite.angle = Math.PI / 2;
    } else if (this.frame < 29) {
      this.sprite.angle -= 0.03;
    } else if (this.frame < 32) {
      this.sprite.angle -= Math.PI / 9;
    } else if (this.frame < 47) {
      this.sprite.angle = -Math.PI / 6;
    }  else if (this.frame === 47) {
      this.sprite.angle = 0;
    } else if (this.frame === 81) {
      this.sprite.state = FighterState.idle;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-11 lie down
   * frames 12-28 get up slowly
   * frames 29-31 get up quickly
   * frames 32-46 overshoot
   * frames 47-81 back to idle
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 13 && this.frame < 63) {
        ctx.drawImage(img, this.x - img.width / 2, this.y);
      }
    } else {
      if (this.frame > 13 && this.frame < 63) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.x - img.width / 2 - ctx.canvas.width, this.y);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 81;
  }
}
