import { html } from "../../lib/preact.standalone.module.js";

const Button = ({ isActive = false, children, onClick, width, disabled = false }) => {
  return html`<button class="btn btn-outline-secondary${isActive ? " active" : ""}" 
  onClick=${onClick} style=${{width}} disabled=${disabled}>${children}</button>`;
}

export default Button;
