import { html, useState, useEffect, useRef } from "../lib/preact.standalone.module.js";
import toPlayer from "../calculator.js";
import { getBuild, getBuildNames, getPlayer, getPlayerNames } from "../templates.js";
import { simulateBattle } from "../battle.js";
import Button from "./forms/Button.js";
import SelectInput from "./forms/SelectInput.js";
import { getSavedKeys, load } from "../storage.js";
import Display from "./Display.js";
import Carousel from "./Carousel.js";
import Utils from "../utils.js";

const opponents = getPlayerNames().map(name => getPlayer(name));
const weights = opponents.map(o => Number(o.name.substring(o.name.indexOf("(") + 1, o.name.indexOf("%"))) / 100);
const backgroundColours = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];

const Grade = () => {
  const [stage, setStage] = useState(0);
  const [build, setBuild] = useState("None");
  const [currentOpponent, setCurrentOpponent] = useState(0);
  const [scores, setScores] = useState([]);
  const [progress, setProgress] = useState(0);
  const winratesRef = useRef(null);
  const weightedScoresRef = useRef(null);

  const options = getSavedKeys();
  options.push(...getBuildNames().filter(name => !options.includes(name)));

  const buildToPlayer = name => {
    const newBuild = load(name) || getBuild(name);
    return toPlayer(newBuild);
  }

  const player = build !== "None" && buildToPlayer(build);

  const handleSubmit = () => {
    if (build === "None") return;
    setStage(1);
    setProgress(0);
    setScores([]);
    setCurrentOpponent(0);
  }

  const reset = () => {
    setStage(0);
    scroll({ top: 0, left: 0, behavior: "instant" });
  }

  useEffect(() => {
    if (stage !== 1 || currentOpponent >= opponents.length) return;
    const percentPerOpponent = 100 / opponents.length;
    const o = opponents[currentOpponent];
    console.log(`${player.name} VS ${o.name}`);
    const winsOnLeft = handleBattle([player], [o], 200);
    const winsOnRight = handleBattle([o], [player], 200);
    const wins = [winsOnLeft[0] + winsOnRight[1], winsOnLeft[1] + winsOnRight[0]];
    console.log(`Score: ${wins[0] / (wins[0] + wins[1])}`);
    setProgress(progress + percentPerOpponent);
    setCurrentOpponent(currentOpponent + 1);
    const weightedScore = (wins[0] / (wins[0] + wins[1])) * weights[currentOpponent];
    setScores(scores => {
      scores[currentOpponent] = weightedScore;
      return scores;
    });
    if (currentOpponent === opponents.length - 1) {
      setStage(2);
    }
  }, [stage, currentOpponent]);

  useEffect(() => {
    if (stage === 2) {
      new Chart(winratesRef.current, {
        type: "bar",
        data: {
          labels: opponents.map(opponent => opponent.name),
          datasets: [{
            data: scores.map((score, i) => Math.round(score * 1000 / weights[i]) / 10),
            backgroundColor: backgroundColours
          }]
        },
        options: {
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Record vs Builds (%)"
            }
          },
          scales: {
            y: {
              max: 100
            }
          }
        }
      });
      new Chart(weightedScoresRef.current, {
        type: "bar",
        data: {
          labels: [""],
          datasets: opponents.map((opponent, i) => ({
            label: opponent.name,
            data: [scores[i] * 100],
            backgroundColor: backgroundColours[i % 7]
          }))
        },
        options: {
          indexAxis: "y",
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Weighted Scores (%)"
            }
          },
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true
            }
          }
        }
      });
    }
  }, [stage]);

  const handleBattle = (left, right, rounds) => {
    const wins = [0, 0];
    for (let i = 0; i < rounds; ++i) {
      const battleSim = simulateBattle(left, right);
      wins[battleSim.winner] += 1;
    }
    return wins;
  }

  const getGrade = score => {
    if (score >= 90) return "SS";
    if (score >= 80) return "S";
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 40) return "D";
    return "F";
  }

  if (stage === 2) {
    const score = Math.round(Utils.sum(scores) * 1000) / 10;
    return html`
    <div class="row grade-display">
      <div class="col-auto">
        <${Display} player=${player} />
      </div>
      <div class="col">
        <h2 class="text-center">Total: ${score}% ${getGrade(score)}</h2>
        <canvas ref=${weightedScoresRef} class="report" style=${{ maxHeight: "100px" }} />
        <canvas ref=${winratesRef} class="report" />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
      <${Button} onClick=${() => reset()}>Back</${Button}>
      </div>
    </div>
    `;
  }

  return html`
  <div class="row grade-display pt-3 justify-content-between">
    <div class="col-sm-6 order-sm-1 pb-3">
      <div class="row">
        <div class="col">
          <${SelectInput} value=${build} options=${options} onChange=${e => setBuild(e.target.value)} disabled=${stage === 1}/>
        </div>
        <div class="col-auto">
          <${Button} onClick=${handleSubmit} disabled=${stage === 1}>
            ${stage === 1 ? html`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${Math.round(progress)}%` : "Submit"}
          </${Button}>
        </div>
      </div>
    </div>
    <div class="col-sm-6 order-sm-3">
      <${Display} player=${player} />
    </div>
    <div class="col-sm-6 order-sm-2">
      <h2 class="text-center">Opponents</h2>
    </div>
    <div class="col-sm-6 col-xl-auto order-sm-4">
      <${Carousel} id="opponents" images=${opponents.map(player => html`<${Display} player=${player} />`)} />
    </div>
  </div>
  `;
}

export default Grade;
