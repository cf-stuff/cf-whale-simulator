import { Layer } from "../animations.js";

const ball = new Image();
ball.src = "img/display/effects/poisonball.png";

const fog = new Image();
fog.src = "img/display/effects/poisonfog.png";

export default class PoisonousFog {
  constructor(left, sprite) {
    this.layer = Layer.EFFECTS
    this.left = left;
    this.sprite = sprite;
    this.frame = 0;
    this.ballOffsetX = -80;
    this.ballOffsetY = -50;
    this.ballOpacity = 0;
    this.fogOpacity = 1.0;
  }

  update() {
    ++this.frame;
    if (this.frame < 5) {
      this.sprite.opacity -= 0.2;
    } else if (this.frame === 5) {
      this.sprite.pos.x = 550;
    } else if (this.frame < 10) {
      this.sprite.opacity += 0.2;
    } else if (this.frame < 12) {
      this.sprite.opacity = 1.0;
    } else if (this.frame < 14) {
      this.ballOpacity += 0.14;
    } else if (this.frame < 21) {
      this.ballOpacity = 1.0;
      this.ballOffsetX += 20;
      this.ballOffsetY -= 5;
      this.sprite.pos.y -= 15;
    } else if (this.frame < 24) {
      this.ballOffsetX -= 15;
      this.ballOffsetY -= 15;
    } else if (this.frame < 29) {
      this.sprite.angle = Math.PI / 6;
      this.ballOffsetX += 12;
      this.ballOffsetY += 32;
    } else if (this.frame < 34) {
    } else if (this.frame < 49) {
      if (this.sprite.pos.y < 550) this.sprite.pos.y += 15;
      else this.sprite.angle = 0;
    } else if (this.frame < 59) {
      this.fogOpacity -= 0.1;
    } else if (this.frame < 66) {
    } else if (this.frame < 82) {
      this.sprite.pos.x -= 15;
    } else if (this.frame === 82) {
      this.sprite.pos.x = 300;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-4 wind up + fade out
   * frames 5-9 teleport + fade in
   * frames 10-13 wind up
   * frames 14-20 ball fade in
   * frames 21-23 pass to other hand
   * frames 24-28 lift above head
   * frames 29-33 dunk
   * frames 34-49 fog
   * frames 50-58 fog fade out
   * frames 59-65 wait
   * frames 66-82 run back
   */
  draw(ctx) {
    if (this.frame > 13 && this.frame < 34) {
      if (this.left) {
        ctx.globalAlpha = this.ballOpacity;
        ctx.drawImage(ball, this.sprite.pos.x + this.ballOffsetX, this.sprite.pos.y + this.ballOffsetY);
        ctx.globalAlpha = 1.0;
      } else {
        ctx.globalAlpha = this.ballOpacity;
        ctx.scale(-1, 1);
        ctx.drawImage(ball, this.sprite.pos.x + this.ballOffsetX - ctx.canvas.width, this.sprite.pos.y + this.ballOffsetY);
        ctx.scale(-1, 1);
        ctx.globalAlpha = 1.0;
      }
    } else if (this.frame > 33 && this.frame < 59) {
      if (this.left) {
        ctx.globalAlpha = this.fogOpacity;
        ctx.drawImage(fog, 724 - fog.width / 2, 550 - fog.height);
        ctx.globalAlpha = 1.0;
      } else {
        ctx.globalAlpha = this.fogOpacity;
        ctx.scale(-1, 1);
        ctx.drawImage(fog, 724 - fog.width / 2 - ctx.canvas.width, 550 - fog.height);
        ctx.scale(-1, 1);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  isFinished() {
    return this.frame > 82;
  }
}
