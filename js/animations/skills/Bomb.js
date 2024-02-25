import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/bomb.png";

export default class Bomb {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 320;
    this.y = 500;
    this.vy = 0;
    this.ay = 2.5;
    this.angle = -Math.PI / 3;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame === 10) {
      this.vy = -20;
    }
    if (this.frame > 10 && this.frame < 26) {
      this.angle += Math.PI / 4;
      this.x += 25;
      this.vy += this.ay;
      this.y += this.vy;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-9 wind up
   * frames 10-25 bomb in arc
   * frames 26-27 wait
   * frames 28-48 explosion (nope)
   * frames 49-100 knockback (nope)
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 9 && this.frame < 26) {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    } else {
      if (this.frame > 9 && this.frame < 26) {
        ctx.translate(ctx.canvas.width - this.x, this.y);
        ctx.scale(-1, 1);
        ctx.rotate(this.angle);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  }

  isFinished() {
    return this.frame > 30;
  }
}
