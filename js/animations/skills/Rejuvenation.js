import { Layer } from "../animations.js";

const beam = new Image();
beam.src = "img/display/effects/rejuvbeam.png";

const img = new Image();
img.src = "img/display/effects/rejuv.png";

export default class Rejuvenation {
  constructor(left) {
    this.layer = Layer.EFFECTS;
    this.left = left;
    this.x = 300;
    this.y = 550;
    this.beamY = 50;
    this.beamOpacity = 1.0;
    this.frame = 0;
  }

  update() {
    ++this.frame;
    if (this.frame < 6) {
      this.beamY += 100;
    } else if (this.frame < 13) {
      this.beamOpacity -= 0.16;
    }
  }

  /**
   * notes @ 30 fps
   * frames 1-6 beam down
   * frames 7-12 beam fade out
   * frames 6-30 ground thing
   */
  draw(ctx) {
    if (this.left) {
      if (this.frame < 13) {
        ctx.drawImage(beam, this.x - beam.width / 2, this.beamY - beam.height);
      }
      if (this.frame > 5) {
        ctx.drawImage(img, this.x - img.width / 2, this.y - img.height);
      }
    } else {
      if (this.frame < 13) {
        ctx.scale(-1, 1);
        ctx.drawImage(beam, this.x - ctx.canvas.width - beam.width / 2, this.beamY - beam.height);
        ctx.scale(-1, 1);
      }
      if (this.frame > 5) {
        ctx.scale(-1, 1);
        ctx.drawImage(img, this.x - ctx.canvas.width - img.width / 2, this.y - img.height);
        ctx.scale(-1, 1);
      }
    }
  }

  isFinished() {
    return this.frame > 30;
  }
}
