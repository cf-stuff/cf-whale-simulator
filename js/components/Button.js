import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

const Button = ({ isActive = false, children, onClick }) => {
  return html`<button class="btn btn-outline-secondary${isActive ? " active" : ""}" onClick=${onClick}>${children}</button>`;
}

export default Button;
