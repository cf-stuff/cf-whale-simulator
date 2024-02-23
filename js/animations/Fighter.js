const img = new Image();
img.src = "img/display/char.png";

export const FighterState = {
  idle: 0,
  attack: 3
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

  update() {
    ++this.frames;
    if (this._state === FighterState.attack) {
      this.hitAndRun();
    } else if (this._state === FighterState.hitPauseRun) {
      this.hitPauseRun();
    }
  }

  draw(ctx) {
    ctx.globalAlpha = this.opacity;
    drawAtAngle(ctx, img, this.pos.x - img.width / 2, this.pos.y - img.height, this.angle, this.left);
    ctx.globalAlpha = 1.0;
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
