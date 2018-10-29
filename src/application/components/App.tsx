import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducerContainer } from "../../DIContainers/reducers/rootReducerContainer";
import "../css/app.css";
import BoardContainer from "../reactContainers/BoardContainer";
import StatsContainer from "../reactContainers/StatsContainer";
import WinOverlayContainer from "../reactContainers/WinOverlayContainer";
import { Buttons } from "./Buttons";

class App extends React.Component {
  public render() {
    const store = createStore(rootReducerContainer);

    store.dispatch({
      type: "CHANGE_GAME_OPTIONS",
      payload: { type: "mines", value: 1 }
    });

    store.dispatch({
      type: "CHANGE_GAME_OPTIONS",
      payload: { type: "width", value: 10 }
    });
    store.dispatch({
      type: "CHANGE_GAME_OPTIONS",
      payload: { type: "height", value: 10 }
    });

    store.dispatch({ type: "START_GAME", payload: "custom" });

    return (
      <>
        <Provider store={store}>
          <>
            <Buttons />
            <StatsContainer />
            <BoardContainer />
            <WinOverlayContainer />
          </>
        </Provider>
      </>
    );
  }
}

export default App;

// todo: remove recursion from 'find cells to open"
// todo: fix the bug when changing one option field doesn't change anything
// todo: for example field 9 by 9 and 80 mines. If change width to 4 -> it would not change it
// todo: desired behaviour: reduce mines count to 1 when changing width or height
// todo: doesn't satisfy cells/mines ratio
