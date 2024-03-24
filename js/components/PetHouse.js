import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js"
import Pets from "../data/pets.js";
import SelectInput from "./forms/SelectInput.js";
import { ImageType, getImagePath } from "../image.js";
import CFDB from "../data/CFDB.js";
import Button from "./forms/Button.js";
import Utils from "../utils.js";

const petPassives = CFDB.getPetPassives().map(x => x.iconId);
const petActives = CFDB.getPetActives().map(x => x.iconId);

const DOLLARS_PER_LOCK = 1 / 5.0625;

const PetHouse = () => {
  const [int, setInt] = useState(false);
  const [continuousLock, setContinuousLock] = useState(true);
  const [pet, setPet] = useState("None");
  const [normalSkills, setNormalSkills] = useState(Array(3).fill(0));
  const [normalLocked, setNormalLocked] = useState(Array(12).fill(false));
  const [evoSkills, setEvoSkills] = useState([]);
  const [evoLocked, setEvoLocked] = useState(Array(6).fill(false));
  const [locksUsed, setLocksUsed] = useState(0);
  const [moneySpent, setMoneySpent] = useState(0);
  const [timesTrained, setTimesTrained] = useState(0);

  let petInfo;
  if (pet !== "None") petInfo = CFDB.getPet(pet);

  const normalSkillElements = [];
  for (let i = 0; i < 12; ++i) {
    if (i >= normalSkills.length) {
      normalSkillElements.push(html`<div class="pet-skill-frame unused"></div>`);
      continue;
    }
    const skill = normalSkills[i];
    if (skill === 0) {
      normalSkillElements.push(html`<div class="pet-skill-frame"></div>`);
    } else {
      const locked = normalLocked[i];
      const path = getImagePath(ImageType.petSkill, skill, int);
      normalSkillElements.push(html`<div class="pet-skill-frame ${locked ? "locked " : ""}text-center">
        <img src=${path} onClick=${() => {
          normalLocked[i] = !normalLocked[i];
          setNormalLocked([...normalLocked]);
        }} />
      </div>`);
    }
  }

  const evoSkillElements = [];
  for (let i = 0; i < 6; ++i) {
    if (i >= evoSkills.length) {
      evoSkillElements.push(html`<div class="pet-skill-frame unused"></div>`);
      continue;
    }
    const skill = evoSkills[i];
    if (skill === 0) {
      evoSkillElements.push(html`<div class="pet-skill-frame"></div>`);
    } else {
      const locked = evoLocked[i];
      const path = getImagePath(ImageType.petSkill, skill, int);
      evoSkillElements.push(html`<div class="pet-skill-frame ${locked ? "locked " : ""}text-center">
        <img src=${path} onClick=${() => {
          evoLocked[i] = !evoLocked[i];
          setEvoLocked([...evoLocked]);
        }} />
      </div>`);
    }
  }

  const getRandomSkillIndex = (skills, locked) => {
    const zeroIndices = skills.reduce((acc, cur, index) => {
      if (cur === 0) acc.push(index);
      return acc;
    }, []);
    if (zeroIndices.length > 0) return Utils.randomElement(zeroIndices);
    const unlockedIndicies = skills.reduce((acc, _, i) => {
      if (!locked[i]) acc.push(i);
      return acc;
    }, []);
    return unlockedIndicies.length > 0 ? Utils.randomElement(unlockedIndicies) : -1;
  }

  const rollNormalSkill = () => {
    const randomIndex = getRandomSkillIndex(normalSkills, normalLocked);
    if (randomIndex < 0) return;
    const eligiblePetSkills = [
      ...Array(26).fill().map((_, i) => i + 1),
      `27_${petInfo.iconId}`,
      `28_${petInfo.iconId}`
    ].filter(x => !normalSkills.includes(x));
    const randomSkill = Utils.randomElement(eligiblePetSkills);
    const prevSkill = normalSkills[randomIndex];
    normalSkills[randomIndex] = randomSkill;
    setNormalSkills([...normalSkills]);
    setTimesTrained(prev => prev + 1);
    if (prevSkill !== 0) {
      let locksToAdd = 1;
      let totalLocks = 0;
      normalLocked.forEach(x => {
        if (x) {
          totalLocks += locksToAdd;
          locksToAdd += 1;
        }
      });
      setLocksUsed(prev => prev + totalLocks);
      setMoneySpent(prev => prev + totalLocks * DOLLARS_PER_LOCK);
      if (!continuousLock) {
        setNormalLocked(Array(12).fill(false));
      }
    }
  }

  const rollEvoSkill = () => {
    const randomIndex = getRandomSkillIndex(evoSkills, evoLocked);
    const skillAtIndex = evoSkills[randomIndex];
    if (randomIndex < 0) return;
    const eligiblePetSkills = [
      ...Array(12).fill().map((_, i) => i + 31).filter(x => !evoSkills.includes(x)),
      ...Array(12).fill().map((_, i) => i + 51).filter(x => !evoSkills.includes(x)),
      ...Array(12).fill().map((_, i) => i + 71).filter(x => !evoSkills.includes(x)),
    ];
    if (evoSkills.length >= 4 && (petPassives.every(x => !evoSkills.includes(x)) || petPassives.includes(skillAtIndex))) {
      const passives = petPassives.filter(x => !evoSkills.includes(x));
      eligiblePetSkills.push(...passives);
    }
    if (evoSkills.length >= 6 && (petActives.every(x => !evoSkills.includes(x)) || petActives.includes(skillAtIndex))) {
      const actives = petActives.filter(x => !evoSkills.includes(x));
      eligiblePetSkills.push(...actives);
    }
    const randomSkill = Utils.randomElement(eligiblePetSkills);
    const prevSkill = evoSkills[randomIndex];
    evoSkills[randomIndex] = randomSkill;
    setEvoSkills([...evoSkills]);
    setTimesTrained(prev => prev + 1);
    if (prevSkill !== 0) {
      let locksToAdd = 13;
      let totalLocks = 0;
      evoLocked.forEach(x => {
        if (x) {
          totalLocks += locksToAdd;
          locksToAdd += 1;
        }
      });
      setLocksUsed(prev => prev + totalLocks);
      setMoneySpent(prev => prev + totalLocks * DOLLARS_PER_LOCK);
      if (!continuousLock) {
        setEvoLocked(Array(6).fill(false));
      }
    }
  }

  const changePet = name => {
    setPet(name);
    setNormalSkills(Array(3).fill(0));
    setNormalLocked(Array(12).fill(false));
    setEvoSkills([]);
    setEvoLocked(Array(6).fill(false));
    setLocksUsed(0);
    setMoneySpent(0);
  }

  const unlockNextSlot = () => {
    if (pet === "None") return;
    if (normalSkills.length < 12) {
      setNormalSkills(prev => [...prev, 0]);
    } else if (evoSkills.length < 6) {
      setEvoSkills(prev => [...prev, 0]);
    }
  }

  const unlockAllNormal = () => {
    if (pet === "None" || normalSkills.length >= 12) return;
    while (normalSkills.length < 12) {
      normalSkills.push(0);
    }
    setNormalSkills([...normalSkills]);
  }

  const unlockAllEvo = () => {
    if (pet === "None" || evoSkills.length >= 6) return;
    unlockAllNormal();
    while (evoSkills.length < 6) {
      evoSkills.push(0);
    }
    setEvoSkills([...evoSkills]);
  }

  return html`
  <div class="row pt-3">
    <div class="col-auto">
      <${SelectInput} value=${pet} onChange=${e => changePet(e.target.value)}
        options=${Object.values(Pets).map(x => x.name)} />
    </div>
    <div class="col-auto">
      <${Button} onClick=${() => unlockNextSlot()}>Unlock Next</${Button}>
    </div>
    <div class="col-auto">
      <${Button} onClick=${() => unlockAllNormal()}>Unlock All Normal</${Button}>
    </div>
    <div class="col-auto">
      <${Button} onClick=${() => unlockAllEvo()}>Unlock All Evo</${Button}>
    </div>
    <div class="col-auto">
      <${Button} onClick=${() => changePet(pet)}>Reset</${Button}>
    </div>
  </div>
  ${pet !== "None" && html`
  <div class="row pt-3">
    <div class="col-auto">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="int-icons" checked=${int} onClick=${e => setInt(e.target.checked)} />
        <label class="form-check-label" for="int-icons">International icons</label>
      </div>
    </div>
    <div class="col-auto">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="continuous-lock" checked=${continuousLock} onClick=${e => setContinuousLock(e.target.checked)} />
        <label class="form-check-label" for="continuous-lock">Continuous lock</label>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-auto">
      <img src=${getImagePath(ImageType.pet, evoSkills.length > 0 ? petInfo.evoIconId : petInfo.iconId)} />
    </div>
    <div class="col-auto">
      <span>Locks Used: ${locksUsed}</span>
      <br/>
      <span>Money Spent: \$${moneySpent.toFixed(2)}</span>
    </div>
    <div class="col-auto">
      <span>Times Trained: ${timesTrained}</span>
    </div>
  </div>
  <div class="row pt-3">
    <div class="col-auto">
      <div class="pet-skillset skill-container pet-skills">
        ${normalSkillElements}
      </div>
    </div>
    <div class="col">
      <${Button} onClick=${() => rollNormalSkill()}>Train</${Button}>
    </div>
  </div>
  <div class="row pt-3">
    <div class="col-auto">
      <div class="pet-skillset skill-container pet-skills">
      ${evoSkillElements}
      </div>
    </div>
    <div class="col">
    <${Button} onClick=${() => rollEvoSkill()}>Train</${Button}>
    </div>
  </div>
  `}
  `;
}

export default PetHouse;
