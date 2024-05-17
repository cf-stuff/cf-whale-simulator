import { html, useState } from "../lib/preact.standalone.module.js";
import Battle from "./Battle.js";
import Calculator from "./calculator/Calculator.js";
import Grade from "./Grade.js";
import SkillPlanner from "./SkillPlanner.js";
import PetHouse from "./PetHouse.js";

const tabs = ["Calculator", "Battle", "Grade", "Skill Planner", "Pet House"];

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
    ${activeTab === "Calculator" && html`<${Calculator} />`}
    ${activeTab === "Battle" && html`<${Battle} />`}
    ${activeTab === "Grade" && html`<${Grade} />`}
    ${activeTab === "Skill Planner" && html`<${SkillPlanner} />`}
    ${activeTab === "Pet House" && html`<${PetHouse} />`}
    <hr/>
    Feel free to report any issues<br/>
    LINE ID: derpidgey<br/>
    Discord: CF99#9616
    <hr/>
    <h3>Changelog</h3>
    <p>2024-03-24: 1.8.5 - Updated Iron Man to reflect announced stats</p>
    <p>2024-03-24: 1.8.4 - Added pet house</p>
    <p>2024-03-20: 1.8.3 - Yellow totem now applies to both positive and negative status</p>
    <p>2024-03-18: 1.8.2 - New builds in grading system to reflect current meta; fixed rebirth expertise effect not working</p>
    <p>2024-03-12: 1.8.1 - Fixed strong wine fury burst cleansing itself</p>
    <p>2024-03-07: 1.8.0 - Animated fights; fixed tired not being applied after explosive blow; time bomb stored damage now works properly</p>
    <p>2024-02-16: 1.7.1 - Fixed bug causing rejuv not triggering in most situations</p>
    <p>2023-04-17: 1.7.0 - Implemented shield wall burst and strong wine stat decreases; Rebirth chance down to 80% (90% with mastery)</p>
    <p>2023-04-07: 1.6.1 - Rebirth and pet block no are longer affected by frenzy</p>
    <p>2023-04-05: 1.6.0 - Increased crit probability; adjusted skill proc formula; fixed fire spam not triggering revive</p>
    <p>2023-04-05: 1.5.6 - Updated SP% calculation to be consistent with in game; consume SP for ESW</p>
    <p>2023-04-04: 1.5.5 - Fixed fury gained on every skill activation; skill planner improvements</p>
    <p>2023-04-03: 1.5.4 - Fixed freezing/rebirth and needle/healing burst interactions</p>
    <p>2023-03-31: 1.5.3 - Added skill planner</p>
    <p>2023-03-30: 1.5.2 - Fixed esw damage</p>
    <p>2023-03-28: 1.5.1 - Fixed ice to be more consistent with in game</p>
    <p>2023-03-27: 1.5.0 - Fixed ordering of secondary skill effects and fury burst/rebirth</p>
    <p>2023-03-26: 1.4.0 - Added grading; Implemented bomb throw back</p>
    <p>2023-03-23: 1.3.2 - Display spd tiers and seconds per attack</p>
    <p>2023-03-10: 1.3.1 - Added international pet icons</p>
    <p>2023-02-27: 1.3.0 - Import and export builds via code; Sort saved builds in alphabetical order</p>
    <p>2023-02-18: 1.2.5 - Prevent healing through energy shield</p>
    <p>2023-02-17: 1.2.4 - Update star altar min and max atk from 40 to 50</p>
    <p>2023-01-21: 1.2.3 - Added Hel</p>
    <p>2022-11-16: 1.2.2 - Team battles</p>
    <p>2022-11-14: 1.2.1 - Added all legendary fighters; Don't allow skills to be used while frozen</p>
    <p>2022-11-13: 1.2.0 - Added battling</p>
    <p>2022-11-12: 1.1.0 - Save and load builds locally</p>
    <p>2022-11-11: 1.0.0 - Created calculator</p>
  </div>
  `;
}

export default App;
