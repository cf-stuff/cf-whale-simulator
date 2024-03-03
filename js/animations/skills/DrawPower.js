import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/needle.png";

export default class DrawPower {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.x = 570;
    this.y = 480;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame > 25 && this.frame < 29) {
      this.x += 30;
    }
    if (this.frame > 36 && this.frame < 63) {
      this.x -= 3;
    }

    if (this.frame < 14) {
      this.sprite.pos.x += 19;
    } else if (this.frame < 55) {
    } else if (this.frame < 68) {
      this.sprite.pos.x -= 19;
    } else {
      this.sprite.pos.x = 300;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-13 run up
   * frames 14-25 needle appears
   * frames 26-28 needle jab
   * frames 29-36 stays in jab position
   * frames 37-62 slowly retracts
   * frames 63-64 stand still
   * frames 65-76 run back
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 13 && this.frame < 63) {
        ctx.drawImage(img, this.x, this.y);
      }
    } else {
      if (this.frame > 13 && this.frame < 63) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.x - ctx.canvas.width, this.y);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 76;
  }
}
