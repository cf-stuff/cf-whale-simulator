import { html, useReducer } from "https://unpkg.com/htm/preact/standalone.module.js"
import { initialState, reducer } from "../state.js";
import Display from "./Display.js";
import Form from "./Form.js";
import toPlayer from "../calculator.js";

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const player = toPlayer(state);
  console.log(player);

  return html`
  <div class="row">
    <div class="col-auto">
      <${Display} player=${player} />
    </div>
    <${Form} state=${state} dispatch=${dispatch} />
  </div>
  `;
}

export default Calculator;
