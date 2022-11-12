import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js"
import Battle from "./Battle.js";
import Calculator from "./Calculator.js";

const tabs = ["Calculator", "Battle"];

const App = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return html`
  <header class="navbar navbar-expand-sm bg-light">
    <nav class="container-fluid">
      <span class="navbar-brand">CF Whale Simulator</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <div class="navbar-nav">
          ${tabs.map(tab => html`<span class="nav-link${activeTab === tab ? " active" : ""}" onClick=${() => setActiveTab(tab)}>${tab}</span>`)}
        </div>
      </div>
    </nav>
  </header>
  <div class="container-xl">
    ${activeTab === "Calculator" && html`<${Calculator} />`}\
    ${activeTab === "Battle" && html`<${Battle} />`}
  </div>
  `;
}

export default App;
