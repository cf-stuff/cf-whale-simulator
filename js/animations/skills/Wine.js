import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/winebottle.png";

export default class Wine {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
    this.offsetX = 40;
    this.offsetY = -80;
    this.angle = Math.PI / 4;
  }

  update() {
    ++this.frame;
    if (this.frame < 14) {
      this.sprite.pos.x += 19;
    } else if (this.frame < 19) {
      this.sprite.pos.x += 5;
    } else if (this.frame < 29) {
      this.angle -= Math.PI / 12;
    } else if (this.frame < 41) {
    } else if (this.frame < 52) {
    } else if (this.frame < 67) {
      this.sprite.pos.x -= 17;
    } else if (this.frame === 67) {
      this.sprite.pos.x = 300;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-13 run up
   * frames 14-18 run up with bottle
   * frames 19-40 drink
   * frames 41-51 prep
   * frames 52-67 spit (skipping to run back)
   * frames 68-79 wait
   * frames 80-96 run back
   */
  draw(ctx) {
    if (this.frame > 13 && this.frame < 41) {
      const x = this.sprite.pos.x + this.offsetX;
      const y = this.sprite.pos.y + this.offsetY;
      if (this.left) {
        ctx.translate(x, y);
        ctx.rotate(this.angle);
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width / 2, img.height / 2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        ctx.translate(ctx.canvas.width - x, y);
        ctx.scale(-1, 1);
        ctx.rotate(this.angle);
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width / 2, img.height / 2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  }

  isFinished() {
    return this.frame > 67;
  }
}
