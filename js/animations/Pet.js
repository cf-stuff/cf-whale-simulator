import CFDB from "../data/CFDB.js";
import { ImageType, getImage, getImagePath } from "../image.js";

export const PetState = {
  idle: 0,
  attack: 1,
  block: 2
}

export default class Pet {
  constructor(pet, left) {
    const petInfo = CFDB.getPet(pet.name);
    this.img = getImage(getImagePath(ImageType.pet, pet.evolved ? petInfo.evoIconId : petInfo.iconId));
    this.pos = { x: 200, y: 500 };
    this.left = left;
    this._state = PetState.idle;
    this.angle = 0;
    this.frames = 0;
    this.pivot = "center";
  }

  set state(state) {
    this.frames = 0;
    this._state = state;
    if (state === PetState.idle) {
      this.pos.x = 200;
      this.pos.y = 500;
      this.angle = 0;
      this.pivot = "center";
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-13 run up
   * frames 14-31 play rough
   * frame  32 n/a
   * frames 33-45 run back
   */
  hitAndRun() {
    if (this.frames < 14) {
      this.pos.x += 38;
    } else if (this.frames > 32 && this.frames < 45) {
      this.pos.x -= 38;
    } else if (this.frames === 46) {
      this.state = PetState.idle;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-9 run up
   * frames 10-39 hold
   */
  block() {
    if (this.frames < 10) {
      this.pos.x += 10;
    } else if (this.frames < 40) {
      this.angle = Math.PI / 6;
    }
    if (this.frames === 40) {
      this.state = PetState.idle;
    }
  }

  update() {
    ++this.frames;
    if (this._state === PetState.attack) {
      this.hitAndRun();
    } else if (this._state === PetState.block) {
      this.block();
    }
  }

  draw(ctx) {
    drawAtAngle(ctx, this.img, this.pos.x, this.pos.y, this.angle, this.pivot, this.left);
  }

  isFinished() {
    return this._state === PetState.idle;
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
