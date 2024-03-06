import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/mask.png";

export default class GhoulBlock {
  constructor(left) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.x = 300;
    this.y = 470;
    this.frame = 0;
    this.opacity = 0;
    this.scale = 0.6;
  }

  update() {
    ++this.frame;
    if (this.frame < 19) {
    } else if (this.frame < 56) {
      if (this.opacity < 1) {
        this.opacity += 0.04;
        if (this.opacity > 1) this.opacity = 1;
      }
      this.x += 1;
      this.y -= 1;
      if (this.frame > 45) {
        this.scale += 0.02;
        this.x -= 1;
        this.y -= 1;
      }
    } else if (this.frame === 58 || this.frame === 59) {
      this.scale += 0.03;
      this.x -= 8;
      this.y += 4;
    } else if (this.frame === 60) {
      this.x += 8;
      this.y += 8;
    } else if (this.frame < 63) {
      this.scale -= 0.06;
      this.opacity -= 0.3;
      this.x += 50;
      this.y += 5;
    } else if (this.frame < 95) {
    } else if (this.frame === 95) {
      this.scale = 0.3;
      this.x = 250;
      this.y = 440;
    } else if (this.frame < 110) {
      this.scale += 0.03;
      this.y -= 12;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-18 wind up
   * frames 19-56 mask fade in
   * frames 57-62 scary
   * frames 63-94 tricks and flips
   * frames 95-116 mask from behind
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame > 18 && this.frame < 63) {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x, this.y, img.width * this.scale, img.height * this.scale);
        ctx.globalAlpha = 1.0;
      } else if (this.frame > 94) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x - ctx.canvas.width, this.y, img.width * this.scale, img.height * this.scale);
        ctx.scale(-1, 1);
      }
    } else {
      if (this.frame > 18 && this.frame < 63) {
        ctx.scale(-1, 1);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x - ctx.canvas.width, this.y, img.width * this.scale, img.height * this.scale);
        ctx.globalAlpha = 1.0;
        ctx.scale(-1, 1);
      } else if (this.frame > 94) {
        ctx.drawImage(img, 0, 0, img.width, img.height, this.x, this.y, img.width * this.scale, img.height * this.scale);
      }
    }
  }

  isFinished() {
    return this.frame > 116;
  }
}
