import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/char.png";

export default class Counterattack {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame === 1) {
      this.sprite.angle = -Math.PI / 6;
    } else if (this.frame === 17) {
      this.sprite.angle = 0;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-9 wind up
   * frames 10-16 swing
   * frames 17-26 wind down
   */
  draw(ctx) {
  }

  isFinished() {
    return this.frame > 26;
  }
}
