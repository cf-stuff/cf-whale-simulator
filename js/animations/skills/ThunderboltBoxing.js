import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/lightningball.png";

export default class ThunderboltBoxing {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
    this.offsetX = -50;
  }

  update() {
    ++this.frame;
    if (this.frame < 5) {
      this.sprite.opacity -= 0.2;
    } else if (this.frame === 5) {
      this.sprite.pos.x = 600;
    } else if (this.frame < 10) {
      this.sprite.opacity += 0.2;
    } else if (this.frame < 12) {
      this.sprite.opacity = 1.0;
    } else if (this.frame < 19) {
    } else if (this.frame < 24) {
      this.offsetX += 30;
    } else if (this.frame < 47) {
    } else if (this.frame < 62) {
      this.sprite.pos.x -= 20;
    } else if (this.frame === 62) {
      this.sprite.pos.x = 300;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-4 wind up + fade out
   * frames 5-9 teleport + fade in
   * frames 10-11 wind up
   * frames 12-18 ball appears
   * frames 19-23 ball flies
   * frames 24-46 wait
   * frames 47-62 run back
   */
  draw(ctx) {
    if (this.frame > 12 && this.frame < 23) {
      if (this.left) {
        ctx.drawImage(img, this.sprite.pos.x + this.offsetX, this.sprite.pos.y - img.height);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.sprite.pos.x + this.offsetX - ctx.canvas.width, this.sprite.pos.y - img.height);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 62;
  }
}
