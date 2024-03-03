import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/lightningball.png";

export default class LightningBall {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame < 14) {
      this.sprite.pos.x += 7;
      this.sprite.pos.y -= 21;
    } else if (this.frame < 17) {
      this.sprite.angle = Math.PI / 6
      this.sprite.pos.x += 75;
      this.sprite.pos.y += 75;
    } else if (this.frame < 30) {
    } else if (this.frame < 46) {
      this.sprite.pos.x -= 2;
      this.sprite.pos.y += 3;
    } else if (this.frame < 69) {
      this.sprite.angle = 0;
    } else if (this.frame < 83) {
      this.sprite.pos.x -= 20;
    } else {
      this.sprite.pos.x = 300;
      this.sprite.pos.y = 550;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-13 diagonal jump
   * frames 14-16 face punch
   * frames 17-30 impact
   * frames 31-45 land back on ground
   * frames 46-68 wait
   * frames 69-83 run back
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame < 31) {
        ctx.drawImage(img, this.sprite.pos.x, this.sprite.pos.y - img.height / 2);
      }
    } else {
      if (this.frame < 31) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.sprite.pos.x - ctx.canvas.width, this.sprite.pos.y - img.height / 2);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 83;
  }
}
