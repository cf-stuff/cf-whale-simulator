import Bar from "./Bar.js";

const img = new Image();
img.src = "img/display/BLOOD-BLUE.png";

export default class SpBar extends Bar {
  constructor(left) {
    super(left, { x: 234, y: 65, w: 187, h: 19, initialPercent: 100 });
  }

  draw(ctx) {
    const w = this.w * this.percent / 100;
    if (this.left) {
      ctx.drawImage(img, 0, 0, w, this.h, this.x, this.y, w, this.h);
    } else {
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, w, this.h, this.x - ctx.canvas.width, this.y, w, this.h);
      ctx.scale(-1, 1);
    }
  }
}
