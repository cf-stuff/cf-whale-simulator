const img = new Image();
img.src = "img/display/char.png";

export const FighterState = {
  idle: 0,
  attack: 3,
  movingIllusion: 5
}

export default class Fighter {
  constructor(pos, left) {
    this.pos = pos;
    this.left = left;
    this._state = FighterState.idle;
    this.angle = 0;
    this.frames = 0;
    this.opacity = 1.0;
    this.pauseDuration = 0;
  }

  set state(state) {
    this.frames = 0;
    this._state = state;
    if (state === FighterState.idle) {
      this.pos.x = 300;
      this.pos.y = 550;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-17 run up
   * frames 18-36 hit
   * frames 37-45 pause
   * frames 46-57 run
   */
  hitAndRun() {
    if (this.frames < 18) {
      this.pos.x += 15;
    } else if (this.frames < 37) {
      this.angle = Math.PI / 6;
    } else if (this.frames < 46) {
      this.angle = 0;
    } else if (this.frames < 56) {
      this.pos.x -= 21;
    } else {
      this.state = FighterState.idle;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-4 wind up
   * frames 5-13 make a clone left/down right/up while fade out
   * frames 14-15 clones merge back at 90% and 80% opacity
   * frames 16-18 disappear
   * frame  19 reappear at 50% opacity
   * frames 20-21 disappear
   * frame  22 reppear at 100% opacity
   */
  movingIllusion() {
    if (this.frames > 4 && this.frames < 14) {
      this.opacity = 1 - 0.12 * this.frames - 5;
    } else if (this.frames === 14) {
      this.opacity = 0.9;
    } else if (this.frames === 15) {
      this.opacity = 0.8;
    } else if (this.frames === 19) {
      this.opacity = 0.5;
    } else if (this.frames > 20) {
      this.opacity = 1.0;
    }
    if (this.frames > 22) {
      this.state = FighterState.idle;
    }
  }

  update() {
    ++this.frames;
    if (this._state === FighterState.attack) {
      this.hitAndRun();
    } else if (this._state === FighterState.hitPauseRun) {
      this.hitPauseRun();
    } else if (this._state === FighterState.movingIllusion) {
      this.movingIllusion();
    }
  }

  draw(ctx) {
    if (this._state === FighterState.movingIllusion) {
      if (this.frames < 5) {

      } else if (this.frames < 14) {
        const verticalOffset = 2 * this.frames - 4;
        const horizontalOffset = 4 * this.frames - 4;
        ctx.globalAlpha = this.opacity;
        if (this.left) {
          ctx.drawImage(img, this.pos.x - horizontalOffset - img.width / 2, this.pos.y + verticalOffset - img.height);
          ctx.drawImage(img, this.pos.x - img.width / 2, this.pos.y - img.height);
          ctx.drawImage(img, this.pos.x + horizontalOffset - img.width / 2, this.pos.y - verticalOffset - img.height);
        } else {
          ctx.scale(-1, 1);
          ctx.drawImage(img, this.pos.x - horizontalOffset - img.width / 2 + ctx.canvas.width * -1, this.pos.y + verticalOffset - img.height);
          ctx.drawImage(img, this.pos.x - img.width / 2 + ctx.canvas.width * -1, this.pos.y - img.height);
          ctx.drawImage(img, this.pos.x + horizontalOffset - img.width / 2 + ctx.canvas.width * -1, this.pos.y - verticalOffset - img.height);
          ctx.scale(-1, 1);
        }
        ctx.globalAlpha = 1.0;
      } else if (this.frames === 14) {
        const verticalOffset = 8;
        const horizontalOffset = 16;
        ctx.globalAlpha = this.opacity;
        if (this.left) {
          ctx.drawImage(img, this.pos.x - horizontalOffset - img.width / 2, this.pos.y + verticalOffset - img.height);
          ctx.drawImage(img, this.pos.x + horizontalOffset - img.width / 2, this.pos.y - verticalOffset - img.height);
        } else {
          ctx.scale(-1, 1);
          ctx.drawImage(img, this.pos.x - horizontalOffset - img.width / 2 + ctx.canvas.width * -1, this.pos.y + verticalOffset - img.height);
          ctx.drawImage(img, this.pos.x + horizontalOffset - img.width / 2 + ctx.canvas.width * -1, this.pos.y - verticalOffset - img.height);
          ctx.scale(-1, 1);
        }
        ctx.globalAlpha = 1.0;
      } else if (this.frames === 15) {
        const verticalOffset = 4;
        const horizontalOffset = 8;
        ctx.globalAlpha = this.opacity;
        if (this.left) {
          ctx.drawImage(img, this.pos.x - horizontalOffset - img.width / 2, this.pos.y + verticalOffset - img.height);
          ctx.drawImage(img, this.pos.x + horizontalOffset - img.width / 2, this.pos.y - verticalOffset - img.height);
        } else {
          ctx.scale(-1, 1);
          ctx.drawImage(img, this.pos.x - horizontalOffset - img.width / 2 + ctx.canvas.width * -1, this.pos.y + verticalOffset - img.height);
          ctx.drawImage(img, this.pos.x + horizontalOffset - img.width / 2 + ctx.canvas.width * -1, this.pos.y - verticalOffset - img.height);
          ctx.scale(-1, 1);
        }
        ctx.globalAlpha = 1.0;
      } else if (this.frames === 19) {
        ctx.globalAlpha = this.opacity;
        drawAtAngle(ctx, img, this.pos.x - img.width / 2, this.pos.y - img.height, this.angle, this.left);
        ctx.globalAlpha = 1.0;
      } else if (this.frames === 22) {
        drawAtAngle(ctx, img, this.pos.x - img.width / 2, this.pos.y - img.height, this.angle, this.left);
      }
    } else {
      drawAtAngle(ctx, img, this.pos.x - img.width / 2, this.pos.y - img.height, this.angle, this.left);
    }
  }

  isFinished() {
    return this._state === FighterState.idle;
  }
}

function drawAtAngle(ctx, img, x, y, angle, left) {
  if (!left) x = ctx.canvas.width - img.width - x;
  ctx.translate(x, y);
  ctx.translate(img.width / 2, img.height / 2);
  if (!left) ctx.scale(-1, 1);
  ctx.rotate(angle);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
