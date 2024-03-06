import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/quake.png";

export default class ThunderclapQuake {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame < 7) {
    } else if (this.frame < 12) {
      this.sprite.pos.y -= 40;
    } else if (this.frame < 17) {
      this.sprite.angle += Math.PI / 30;
    } else if (this.frame < 23) {
    } else if (this.frame < 27) {
      this.sprite.pos.y += 50;
    } else if (this.frame < 50) {
      this.sprite.pos.y = 550;
    } else if (this.frame < 56) {
      this.sprite.angle -= Math.PI / 36;
    } else {
      this.sprite.angle = 0;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-6 wind up
   * frames 7-11 jump
   * frames 12-16 tilt to pi/6
   * frames 17-22 wait
   * frames 23-26 ground pound
   * frames 27-49 wait
   * frames 50-55 back to neutral
   * frames 56-63 wait
   */
  draw(ctx) {
    if (this.frame > 27 && this.frame < 35) {
      if (this.left) {
        ctx.drawImage(img, this.sprite.pos.x - img.width / 2, this.sprite.pos.y);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.sprite.pos.x - img.width / 2 - ctx.canvas.width, this.sprite.pos.y);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 63;
  }
}
