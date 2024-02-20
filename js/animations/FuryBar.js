const img = new Image();
img.src = "img/display/nu-cao2.png";

export default class FuryBar {
  constructor(left) {
    this.left = left;
    this.x = 418;
    this.y = 1;
    this.w = 65;
    this.h = 94;
    this.percent = 0;
    this.targetPercent = 0;
  }

  setTarget(percent) {
    this.targetPercent = percent;
  }

  update() {
    if (this.percent < this.targetPercent) {
      ++this.percent;
    } else if (this.percent > this.targetPercent) {
      this.percent -= 3;
    }
  }

  draw(ctx) {
    const h = this.h * this.percent / 100;
    if (this.left) {
      ctx.drawImage(img, 0, this.h - h, this.w, h, this.x, this.y + this.h - h, this.w, h);
    } else {
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, this.h - h, this.w, h, this.x + ctx.canvas.width * -1, this.y + this.h - h, this.w, h);
      ctx.scale(-1, 1);
    }
  }

  isFinished() {
    return false;
  }
}
