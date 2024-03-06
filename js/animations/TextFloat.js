import { Layer } from "./animations.js";

export default class TextFloat {
  constructor(text, startX, startY, gradientTop, gradientBot, textAlign = "center") {
    this.layer = Layer.UI;    
    this.text = text;
    this.x = startX;
    this.y = startY;
    this.opacity = 1.0;
    this.gradientTop = gradientTop;
    this.gradientBot = gradientBot;
    this.textAlign = textAlign;
  }

  update() {
    this.y -= 3;
    this.opacity -= 0.01;
    if (this.imgOpacity <= 0) this.imgOpacity = 0;
  }

  draw(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0, this.gradientTop);
    gradient.addColorStop(1, this.gradientBot);

    if (this.textAlign) ctx.textAlign = this.textAlign;
    ctx.globalAlpha = this.opacity;
    ctx.font = "bold 50px arial";
    ctx.fillStyle = gradient;
    ctx.fillText(this.text, this.x, this.y);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeText(this.text, this.x, this.y);
    ctx.globalAlpha = 1.0;
    if (this.textAlign) ctx.textAlign = "left";
  }

  isFinished() {
    return this.opacity <= 0.5;
  }
}
