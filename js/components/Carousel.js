import { html, useState } from "../lib/preact.standalone.module.js";

const Carousel = ({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  if (activeSlide > images.length - 1) setActiveSlide(images.length - 1);

  return html`
  <div class="carousel slide" data-bs-ride="false">
    <div class="carousel-indicators">
      ${images.map((_, i) => html`<button type="button" data-bs-target="" onClick=${() => setActiveSlide(i)}
      class=${activeSlide === i && "active"}></button>`)}
    </div>
    <div class="carousel-inner">
      ${images.map((image, i) => html`
      <div class="carousel-item ${activeSlide === i ? " active" : ""}">
        ${image}
      </div>
      `)}
    </div>
    <button class="carousel-control-prev" type="button" onClick=${() => setActiveSlide((activeSlide + images.length - 1) % images.length)}>
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" onClick=${() => setActiveSlide((activeSlide + 1) % images.length)}>
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `;
}

export default Carousel;
