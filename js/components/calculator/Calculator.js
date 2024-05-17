import { html, useReducer, useState } from "../../lib/preact.standalone.module.js"
import { initialState, reducer } from "../../state.js";
import Display from "../Display.js";
import Form from "./Form.js";
import toPlayer from "../../calculator.js";
import Utils from "../../utils.js";

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [bg, setBg] = useState("11");
  console.log(state);

  const player = toPlayer(state);
  console.log(player);

  return html`
  <div class="row calculator">
    <div class="col-auto">
      <${Display} player=${player} bg=${bg} />
    </div>
    <${Form} state=${state} dispatch=${Utils.debounce(dispatch)} bg=${bg} setBg=${setBg} />
  </div>
  `;
}

export default Calculator;
