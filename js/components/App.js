import { html, useReducer } from "https://unpkg.com/htm/preact/standalone.module.js"
import { initialState, reducer } from "../state.js";
import Display from "./Display.js";
import Form from "./Form.js";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const formToPlayer = () => {
    return {
      name: "test",
      level: 100,
      fighter: {
        name: "None"
      }
    }
  }
  return html`
  <div class="container-xl">
    <div class="row">
      <div class="col-auto">
        <${Display} player=${formToPlayer()} />
      </div>
      <${Form} state=${state} dispatch=${dispatch} />
    </div>
  </div>
  `;
}

export default App;
