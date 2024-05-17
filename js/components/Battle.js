import { html, useState, useRef, useCallback } from "../lib/preact.standalone.module.js";
import toPlayer from "../calculator.js";
import { getBuild, getBuildNames } from "../templates.js";
import { simulateBattle } from "../battle.js";
import Button from "./forms/Button.js";
import SelectInput from "./forms/SelectInput.js";
import { getSavedKeys, load } from "../storage.js";
import Display from "./Display.js";
import Carousel from "./Carousel.js";
import { ImageType, getImagePath } from "../image.js";
import Replay from "./Replay.js";
import ReplayLog from "./ReplayLog.js";

const Battle = () => {
  const [left, setLeft] = useState(Array(4).fill("None"));
  const [right, setRight] = useState(Array(4).fill("None"));
  const [battle, setBattle] = useState();
  const [leftWins, setLeftWins] = useState(0);
  const [rightWins, setRightWins] = useState(0);
  const [logHeight, setLogHeight] = useState(0);
  const [showReplay, setShowReplay] = useState(false);
  const [play, setPlay] = useState(false);
  const [restart, setRestart] = useState(0);
  const [delay, setDelay] = useState(17);
  const scoreRef = useRef(null);
  const heightRef = useCallback(node => {
    if (node !== null) {
      const resizeObserver = new ResizeObserver(() => {
        if (!scoreRef.current) return;
        setLogHeight(node.clientHeight - scoreRef.current.clientHeight);
      });
      resizeObserver.observe(node);
    }
  }, []);

  const options = getSavedKeys();
  options.push(...getBuildNames().filter(name => !options.includes(name)));

  const getPlayer = name => {
    const newBuild = load(name) || getBuild(name);
    return toPlayer(newBuild);
  }

  const leftPlayers = left.filter(name => name !== "None").map(name => getPlayer(name));
  const rightPlayers = right.filter(name => name !== "None").map(name => getPlayer(name));

  const handleSelect = (side, position) => e => {
    if (side === "left") {
      left[position] = e.target.value;
      setLeft([...left]);
    } else {
      right[position] = e.target.value;
      setRight([...right]);
    }
    setLeftWins(0);
    setRightWins(0);
    setShowReplay(false);
    setPlay(false);
  }

  const handleBattle = (rounds, batches = 1) => {
    if (leftPlayers.length === 0 || rightPlayers.length === 0) return;
    let battleSim;
    for (let i = 0; i < rounds; ++i) {
      battleSim = simulateBattle(leftPlayers, rightPlayers);
      battleSim.winner === 0 ? setLeftWins(wins => wins + 1) : setRightWins(wins => wins + 1);
    }
    if (--batches > 0) {
      setTimeout(() => handleBattle(rounds, batches), 0);
    } else if (batches === 0) {
      if (battleSim) {
        setBattle(battleSim);
        setShowReplay(true);
        setPlay(true);
      }
    }
  }

  const togglePlay = () => {
    if (!showReplay) return;
    setPlay(prev => !prev);
  }

  const restartReplay = () => {
    if (!showReplay) return;
    setRestart(prev => prev + 1);
    setPlay(true);
  }

  return html`
  <div class="row pt-3">
    <div class="col">
      ${left.map((name, i) => html`<${SelectInput} value=${name} options=${options} onChange=${handleSelect("left", i)} />`)}
    </div>
    <div class="col-auto">
      <div class="row">
        <${Button} onClick=${() => handleBattle(1)}>VS</${Button}>
      </div>
      <div class="row">
        <${Button} onClick=${() => handleBattle(10)}>VS 10</${Button}>
      </div>
      <div class="row">
        <${Button} onClick=${() => handleBattle(100)}>VS 100</${Button}>
      </div>
      <div class="row">
        <${Button} onClick=${() => handleBattle(100, 10)}>VS 1000</${Button}>
      </div>
    </div>
    <div class="col">
      ${right.map((name, i) => html`<${SelectInput} value=${name} options=${options} onChange=${handleSelect("right", i)} />`)}
    </div>
  </div>
  <div class="row battle-display">
    <div class="col-md-8 order-2 order-md-1">
      <div class="row g-0" ref=${heightRef}>
        ${showReplay ? html`
        <${Replay} logs=${battle.logs} play=${play} restart=${restart} delay=${delay} />
        ` : html`
        <div class="col-md-6 col-sm-12">
          ${leftPlayers.length > 0 && html`<${Carousel} id="left-display" images=${leftPlayers.map(player => html`<${Display} player=${player} />`)} />`}
        </div>
        <div class="col-md-6 col-sm-12">
          ${rightPlayers.length > 0 && html`<${Carousel} id="right-display" images=${rightPlayers.map(player => html`<${Display} player=${player} left=${false} />`)} />`}
        </div>
        `}
      </div>
    </div>
    <div class="col-md order-1 order-md-2">
      <div class="row" ref=${scoreRef}>
        <div class="col-auto">
          <img class="img-btn" src=${getImagePath(ImageType.replayBtn, "redo")} style=${{ height: "51px" }} onClick=${() => restartReplay()} />
        </div>
        <div class="col-auto">
          <img class="img-btn" src=${getImagePath(ImageType.replayBtn, play ? "pause" : "play")} style=${{ height: "51px" }} onClick=${() => togglePlay()} />
        </div>
        <div class="col-auto">
          <span class="text-center h2">${leftWins}-${rightWins}</span>
        </div>
        <div class="col">
          <input type="range" min="8" max="33" value=${41 - delay} onChange=${e => setDelay(41 - e.target.value)} />
        </div>
      </div>
      <div class="row">
        ${showReplay && html`
        <div class="col logs" style=${{ height: `${logHeight}px` }}>
          <${ReplayLog} logs=${battle.logs} />
        </div>
        `}
      </div>
    </div>
  </div>
  <div class="row">
    <span>Note: Due to the nature of this game, it is impossible to 100% accurately depict certain behaviours 
    (for example crit chance, dodge chance, bomb throwback chance, aotg switch chance). The best we can do is approximate them, so take the battle results with a grain a salt.</span>
  </div>
  `;
}

export default Battle;
