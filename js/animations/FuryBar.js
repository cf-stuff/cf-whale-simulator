import Bar from "./Bar.js";

const img = new Image();
img.src = "img/display/nu-cao2.png";

export default class FuryBar extends Bar {
  constructor(left) {
    super(left, { x: 418, y: 1, w: 65, h: 94, initialPercent: 0 });
  }

  draw(ctx) {
    const h = this.h * this.percent / 100;
    if (this.left) {
      ctx.drawImage(img, 0, this.h - h, this.w, h, this.x, this.y + this.h - h, this.w, h);
    } else {
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, this.h - h, this.w, h, this.x - ctx.canvas.width, this.y + this.h - h, this.w, h);
      ctx.scale(-1, 1);
    }
  }
}
