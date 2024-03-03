import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/char.png";

export default class MovingIllusion {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
    this.opacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame === 1) {
      this.sprite.opacity = 0;
    } else if (this.frame > 4 && this.frame < 14) {
      this.opacity = 1 - 0.15 * this.frame - 5;
    } else if (this.frame === 14) {
      this.opacity = 0.9;
    } else if (this.frame === 15) {
      this.opacity = 0.8;
    } else if (this.frame === 19) {
      this.opacity = 0.5;
    } else if (this.frame === 20) {
      this.opacity = 1.0;
    } else if (this.frame === 22) {
      this.sprite.opacity = 1.0;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-4 wind up
   * frames 5-13 make a clone left/down right/up while fade out
   * frames 14-15 clones merge back at 90% and 80% opacity
   * frames 16-18 disappear
   * frame  19 reappear at 50% opacity
   * frames 20-21 disappear
   * frame  22 reppear at 100% opacity
   */
  draw(ctx) {
    if (this.frame < 5) {

    } else if (this.frame < 14) {
      const verticalOffset = 2 * this.frame - 4;
      const horizontalOffset = 4 * this.frame - 4;
      ctx.globalAlpha = this.opacity;
      if (this.left) {
        ctx.drawImage(img, this.sprite.pos.x - horizontalOffset - img.width / 2, this.sprite.pos.y + verticalOffset - img.height);
        ctx.drawImage(img, this.sprite.pos.x - img.width / 2, this.sprite.pos.y - img.height);
        ctx.drawImage(img, this.sprite.pos.x + horizontalOffset - img.width / 2, this.sprite.pos.y - verticalOffset - img.height);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.sprite.pos.x - horizontalOffset - img.width / 2 - ctx.canvas.width, this.sprite.pos.y + verticalOffset - img.height);
        ctx.drawImage(img, this.sprite.pos.x - img.width / 2 - ctx.canvas.width, this.sprite.pos.y - img.height);
        ctx.drawImage(img, this.sprite.pos.x + horizontalOffset - img.width / 2 - ctx.canvas.width, this.sprite.pos.y - verticalOffset - img.height);
        ctx.scale(-1, 1);
      }
      ctx.globalAlpha = 1.0;
    } else if (this.frame === 14) {
      const verticalOffset = 8;
      const horizontalOffset = 16;
      ctx.globalAlpha = this.opacity;
      if (this.left) {
        ctx.drawImage(img, this.sprite.pos.x - horizontalOffset - img.width / 2, this.sprite.pos.y + verticalOffset - img.height);
        ctx.drawImage(img, this.sprite.pos.x + horizontalOffset - img.width / 2, this.sprite.pos.y - verticalOffset - img.height);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.sprite.pos.x - horizontalOffset - img.width / 2 - ctx.canvas.width, this.sprite.pos.y + verticalOffset - img.height);
        ctx.drawImage(img, this.sprite.pos.x + horizontalOffset - img.width / 2 - ctx.canvas.width, this.sprite.pos.y - verticalOffset - img.height);
        ctx.scale(-1, 1);
      }
      ctx.globalAlpha = 1.0;
    } else if (this.frame === 15) {
      const verticalOffset = 4;
      const horizontalOffset = 8;
      ctx.globalAlpha = this.opacity;
      if (this.left) {
        ctx.drawImage(img, this.sprite.pos.x - horizontalOffset - img.width / 2, this.sprite.pos.y + verticalOffset - img.height);
        ctx.drawImage(img, this.sprite.pos.x + horizontalOffset - img.width / 2, this.sprite.pos.y - verticalOffset - img.height);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.sprite.pos.x - horizontalOffset - img.width / 2 - ctx.canvas.width, this.sprite.pos.y + verticalOffset - img.height);
        ctx.drawImage(img, this.sprite.pos.x + horizontalOffset - img.width / 2 - ctx.canvas.width, this.sprite.pos.y - verticalOffset - img.height);
        ctx.scale(-1, 1);
      }
      ctx.globalAlpha = 1.0;
    } else if (this.frame === 19) {
      ctx.globalAlpha = this.opacity;
      if (this.left) {
        ctx.drawImage(img, this.sprite.pos.x - img.width / 2, this.sprite.pos.y - img.height);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.sprite.pos.x - ctx.canvas.width - img.width / 2, this.sprite.pos.y - img.height);
        ctx.scale(-1, 1);
      }
      ctx.globalAlpha = 1.0;
    } else if (this.frame === 22) {
      if (this.left) {
        ctx.drawImage(img, this.sprite.pos.x - img.width / 2, this.sprite.pos.y - img.height);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.sprite.pos.x - ctx.canvas.width - img.width / 2, this.sprite.pos.y - img.height);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 22;
  }
}
