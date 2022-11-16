import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

const Button = ({ isActive = false, children, onClick, width }) => {
  return html`<button class="btn btn-outline-secondary${isActive ? " active" : ""}" onClick=${onClick} style=${{width}}>${children}</button>`;
}

export default Button;
