import { Layer } from "../animations.js";

const bomb = new Image();
bomb.src = "img/display/effects/timebomb.png";

export default class TimeBomb {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
    this.offsetX = 0;
    this.offsetY = -200;
  }

  update() {
    ++this.frame;
    if (this.frame < 14) {
      this.sprite.pos.x += 21;
    } else if (this.frame < 25) {
    } else if (this.frame < 35) {
      this.sprite.pos.y -= 10;
    } else if (this.frame < 41) {
    } else if (this.frame < 53) {
      this.sprite.pos.y += 8;
      this.offsetX += 11;
      this.offsetY += 13;
    } else if (this.frame < 61) {
      this.sprite.pos.y = 550;
    } else if (this.frame < 75) {
      this.sprite.pos.x -= 19;
    } else if (this.frame === 75) {
      this.sprite.pos.x = 300;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-13 run up
   * frames 14-24 wind up
   * frames 25-34 jump
   * frames 35-40 bomb appears
   * frames 41-52 dunk
   * frames 53-60 wait
   * frames 61-75 run back
   */
  draw(ctx) {
    if (this.frame > 34 && this.frame < 55) {
      if (this.left) {
        ctx.drawImage(bomb, this.sprite.pos.x + this.offsetX - bomb.width / 2, this.sprite.pos.y + this.offsetY - bomb.height / 2);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(bomb, this.sprite.pos.x + this.offsetX - bomb.width / 2 - ctx.canvas.width, this.sprite.pos.y + this.offsetY - bomb.height / 2);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 75;
  }
}
