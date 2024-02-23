const img = new Image();
img.src = "img/display/BLOOD-RED.png";

export default class Bar {
  constructor(left, {x, y, w, h, initialPercent}) {
    this.left = left;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.percent = initialPercent;
    this.targetPercent = initialPercent;
    this.jumpAmount = 1;
  }

  setTarget(percent) {
    this.targetPercent = percent;
    const distance = Math.abs(this.targetPercent - this.percent);
    this.jumpAmount = distance > 15 ? distance / 15 : 1;
  }

  update() {
    if (this.percent < this.targetPercent) {
      this.percent += this.jumpAmount;
      if (this.percent > this.targetPercent) {
        this.percent = this.targetPercent;
      }
    } else if (this.percent > this.targetPercent) {
      this.percent -= this.jumpAmount;
      if (this.percent < this.targetPercent) {
        this.percent = this.targetPercent;
      }
    }
  }

  isFinished() {
    return false;
  }
}
