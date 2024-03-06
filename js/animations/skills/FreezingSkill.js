import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/ice.png";

export default class FreezingSkill {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.x = 300;
    this.y = 550;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame < 18) {
      this.sprite.pos.x += 18;
    } else if (this.frame < 114) {
    } else if (this.frame < 129) {
      this.sprite.pos.x -= 20;
    } else {
      this.sprite.pos.x = 300;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-17 run up
   * frames 18-34 wind up
   * frames 35-113 wait
   * frames 114-130 run back
   */
  draw(ctx) {
    if (this.frame > 34) {
      if (this.left) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.x - img.width / 2 - ctx.canvas.width, this.y - img.height);
        ctx.scale(-1, 1);
      } else {
        ctx.drawImage(img, this.x - img.width / 2, this.y - img.height);
      }
    }
  }

  isFinished() {
    return this.frame > 130;
  }
}
