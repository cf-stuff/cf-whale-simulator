const img = new Image();
img.src = "img/display/char.png";

export const FighterState = {
  idle: 0,
  attack: 1,
  die: 2,
  dodge: 3,
  parry: 4
}

export default class Fighter {
  constructor(left) {
    this.pos = {
      x: 300, // mid
      y: 550 // bot
    };
    this.left = left;
    this._state = FighterState.idle;
    this.angle = 0;
    this.frames = 0;
    this.opacity = 1.0;
    this.pivot = "center";
  }

  set state(state) {
    this.frames = 0;
    this._state = state;
    if (state === FighterState.idle) {
      this.pos.x = 300;
      this.pos.y = 550;
      this.angle = 0;
      this.opacity = 1.0;
      this.pivot = "center";
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
   * frames 1-14 stand
   * frames 15-20 fall down
   * frames 21-47 lie down
   */
  die() {
    if (this.frames === 1) {
      this.pivot = "bottom";
    } else if (this.frames < 15) {
    } else if (this.frames < 21) {
      this.angle += Math.PI / 12;
    } else if (this.frames === 21) {
      this.angle = Math.PI / 2;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-3 wind up
   * frames 4-8 opacity decrease, clone move left
   * frames 9-16 wait
   */
  dodge() {
    if (this.frames === 1) {
      this.clone = new Fighter(this.left);
    }
    if (this.frames > 3 && this.frames < 9) {
      this.opacity -= 0.1;
      this.clone.pos.x -= 15;
    } else if (this.frames === 17) {
      this.state = FighterState.idle;
      delete this.clone;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-3 into parry position
   * frames 4-11 hold
   */
  parry() {
    if (this.frames < 4) {
      this.angle += Math.PI / 18;
    } else if (this.frames === 12) {
      this.state = FighterState.idle;
    }
  }

  update() {
    ++this.frames;
    if (this._state === FighterState.attack) {
      this.hitAndRun();
    } else if (this._state === FighterState.die) {
      this.die();
    } else if (this._state === FighterState.dodge) {
      this.dodge();
    } else if (this._state === FighterState.parry) {
      this.parry();
    }
  }

  draw(ctx) {
    ctx.globalAlpha = this.opacity;
    drawAtAngle(ctx, img, this.pos.x - img.width / 2, this.pos.y - img.height, this.angle, this.pivot, this.left);
    ctx.globalAlpha = 1.0;
    if (this.clone) {
      this.clone.draw(ctx);
    }
  }

  isFinished() {
    return this._state === FighterState.idle;
  }
}

function drawAtAngle(ctx, img, x, y, angle, pivot, left) {
  const pivotX = img.width / 2;
  const pivotY = pivot === "center" ? img.height / 2 : img.height * 3 / 4;
  if (!left) x = ctx.canvas.width - img.width - x;
  ctx.translate(x + pivotX, y + pivotY);
  if (!left) ctx.scale(-1, 1);
  ctx.rotate(angle);
  ctx.drawImage(img, -pivotX, -pivotY);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
