import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/stormboxing.png";

export default class StormBoxing {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
    this.offsetX = 0;
  }

  update() {
    ++this.frame;
    if (this.frame < 5) {
      this.sprite.opacity -= 0.2;
    } else if (this.frame === 5) {
      this.sprite.pos.x = 600;
    } else if (this.frame < 10) {
      this.sprite.opacity += 0.2;
    } else if (this.frame < 20) {
      this.sprite.opacity = 1.0;
    } else if (this.frame < 34) {
      this.offsetX += 7;
    } else if (this.frame < 52) {
    } else if (this.frame < 67) {
      this.sprite.pos.x -= 20;
    } else if (this.frame === 67) {
      this.sprite.pos.x = 300;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-4 wind up + fade out
   * frames 5-9 teleport + fade in
   * frames 10-17 wind up
   * frames 18-19 woosh
   * frames 20-33 wind
   * frames 34-51 wait
   * frames 52-67 run back
   */
  draw(ctx) {
    if (this.frame > 20 && this.frame < 33) {
      const x = this.sprite.pos.x + this.offsetX;
      const y = this.sprite.pos.y - img.height * 1.4;
      if (this.left) {
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * 1.5, img.height * 1.5);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, img.width, img.height, x - ctx.canvas.width, y, img.width * 1.5, img.height * 1.5);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 67;
  }
}
