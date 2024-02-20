const img = new Image();
img.src = "img/display/BLOOD-BLUE.png";

export default class SpBar {
  constructor(left) {
    this.left = left;
    this.x = 234;
    this.y = 65;
    this.w = 187;
    this.h = 19;
    this.percent = 100;
    this.targetPercent = 100;
  }

  setTarget(percent) {
    this.targetPercent = percent;
  }

  update() {
    if (this.percent < this.targetPercent) {
      ++this.percent;
    } else if (this.percent > this.targetPercent) {
      --this.percent;
    }
  }

  draw(ctx) {
    const w = this.w * this.percent / 100;
    if (this.left) {
      ctx.drawImage(img, 0, 0, w, this.h, this.x, this.y, w, this.h);
    } else {
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, w, this.h, this.x + ctx.canvas.width * -1, this.y, w, this.h);
      ctx.scale(-1, 1);
    }
  }

  isFinished() {
    return false;
  }
}
