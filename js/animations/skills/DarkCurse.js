import { Layer } from "../animations.js";

const img = new Image();
img.src = "img/display/effects/curse.png";

export default class DarkCurse {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
    this.x = 724;
    this.y = 600;
  }

  update() {
    ++this.frame;
    if (this.frame < 5) {
      this.sprite.opacity -= 0.2;
    } else if (this.frame === 5) {
      this.sprite.pos.x = 600;
    } else if (this.frame < 10) {
      this.sprite.opacity += 0.2;
    } else if (this.frame < 16) {
      this.sprite.opacity = 1.0;
    } else if (this.frame < 44) {
      this.y -= 10;
      this.x += 1;
    } else if (this.frame < 68) {
    } else if (this.frame < 85) {
      this.sprite.pos.x -= 20;
    } else if (this.frame === 85) {
      this.sprite.pos.x = 300;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-4 wind up + fade out
   * frames 5-9 teleport + fade in
   * frames 10-15 wind up
   * frames 16-43 ghost from ground
   * frames 44-67 wait
   * frames 68-85 run back
   */
  draw(ctx) {
    if (this.frame > 15 && this.frame < 44) {
      if (this.left) {
        ctx.drawImage(img, this.x - img.width / 2, this.y - img.height);
      } else {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.x - img.width / 2 - ctx.canvas.width, this.y - img.height);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 85;
  }
}
