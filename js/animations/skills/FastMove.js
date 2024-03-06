import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/fastmove.png";

export default class FastMove {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 310;
    this.y = 430;
    this.frame = 0;
    this.scaleX = 1;
    this.opacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame === 44) {
      this.scaleX = 5;
    } else if (this.frame === 56) {
      this.opacity = 0.5;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-31 wind up
   * frames 32-40 tornado 1
   * frames 41-43 transition
   * frames 44-52 tornado 2
   * frames 53-55 transition
   * frames 56-64 torndado 3 (low opacity)
   * frames 65-67 wait
   */
  draw(ctx) {
    if (this.left) {
      if ((this.frame > 31 && this.frame < 41) || (this.frame > 43 && this.frame < 53) || (this.frame > 55 && this.frame < 65)) {
        ctx.globalAlpha = this.opacity;
        draw(ctx, img, this.x - img.width * this.scaleX / 2, this.y, { scaleX: this.scaleX });
        draw(ctx, img, this.x - img.width * this.scaleX / 2, this.y, { flipX: true, scaleX: this.scaleX });
        ctx.globalAlpha = 1.0;
      }
    } else {
      if ((this.frame > 31 && this.frame < 41) || (this.frame > 43 && this.frame < 53) || (this.frame > 55 && this.frame < 65)) {
        ctx.globalAlpha = this.opacity;
        draw(ctx, img, ctx.canvas.width - this.x - img.width * this.scaleX / 2, this.y, { scaleX: this.scaleX });
        draw(ctx, img, ctx.canvas.width - this.x - img.width * this.scaleX / 2, this.y, { flipX: true, scaleX: this.scaleX });
        ctx.globalAlpha = 1.0;
      }
    }
  }

  isFinished() {
    return this.frame > 67;
  }
}

function draw(ctx, img, x, y, { flipX = false, flipY = false, scaleX = 1, scaleY = 1 }) {
  ctx.translate(x, y);
  ctx.scale(scaleX, scaleY);
  if (flipX || flipY) {
    ctx.translate(img.width * (flipX ? 1 : 0), img.height * (flipY ? 1 : 0));
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  }
  ctx.drawImage(img, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
