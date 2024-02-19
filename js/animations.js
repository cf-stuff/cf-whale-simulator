const Layer = {
  BACKGROUND: 0,
  CHARACTERS: 1,
  EFFECTS: 2,
  UI: 3
}

class Animation1 {
  constructor() {
    this.layer = Layer.CHARACTERS;
    this.x = 0;
    this.y = 0;
    this.dx = 1;
    this.dy = 1;
    this.maxX = 50;
    this.maxY = 50;
  }

  update() {
    if (this.x >= this.maxX) {
      this.y += this.dy;
    } else {
      this.x += this.dx;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  isFinished() {
    return this.y > this.maxY;
  }
}

class Animation2 {
  constructor() {
    this.layer = Layer.EFFECTS;
    this.x = 10;
    this.y = 10;
    this.dx = 1;
    this.maxX = 60;
    this.reverse = false;
  }

  update() {
    if (this.reverse) {
      this.x -= this.dx;
    } else {
      this.x += this.dx;
      if (this.x >= this.maxX) {
        this.reverse = true;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  isFinished() {
    return this.x <= 0;
  }
}

const AnimationDefinitions = {
  animation1: Animation1,
  animation2: Animation2
}

export default AnimationDefinitions;
