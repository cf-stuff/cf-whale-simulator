import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/firemeteorite.png";

export default class FireMeteorite {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
    this.x = 300;
    this.y = 300;
    this.opacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame < 7) {
    } else if (this.frame < 12) {
      this.sprite.pos.y -= 40;
    } else if (this.frame < 21) {
    } else if (this.frame < 33) {
      this.y += 15;
      this.x += 30;
      if (this.frame === 25) this.opacity = 0.8;
      if (this.frame === 26) this.opacity = 0.3;
      if (this.frame === 27) this.opacity = 0.4;
      if (this.frame === 28) this.opacity = 0.5;
      if (this.frame === 29) this.opacity = 0.7;
      if (this.frame === 30) this.opacity = 0.9;
      if (this.frame === 31) this.opacity = 1.0;
    } else if (this.frame < 38) {
    } else if (this.frame < 45) {
      this.sprite.pos.y += 28;
    } else {
      this.sprite.pos.y = 550;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-6 wind up
   * frames 7-11 jump
   * frames 12-19 wait
   * frames 20-32 fire ball
   * frames 33-37 boom
   * frames 38-44 land
   * frames 45-57 wait
   */
  draw(ctx) {
    if (this.frame > 19 && this.frame < 38) {
      if (this.left) {
        ctx.translate(this.x, this.y);
      } else {
        ctx.translate(ctx.canvas.width - this.x, this.y);
        ctx.scale(-1, 1);
      }
      ctx.rotate(Math.PI / 6);
      ctx.scale(2, 2);
      ctx.globalAlpha = this.opacity;
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.globalAlpha = 1.0;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

  isFinished() {
    return this.frame > 57;
  }
}
