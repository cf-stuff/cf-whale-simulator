import { html } from "https://unpkg.com/htm/preact/standalone.module.js"

const TabLink = ({ isActive, name, onClick }) => {
  return html`<button class="btn btn-outline-secondary${isActive ? " active" : ""}" onClick=${onClick}>${name}</button>`;
}

export default TabLink;
