import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducerContainer } from "../../DIContainers/reducers/rootReducerContainer";
import "../css/app.css";
import BoardContainer from "../reactContainers/BoardContainer";
import StatsContainer from "../reactContainers/StatsContainer";

class App extends React.Component {
  public render() {
    const store = createStore(rootReducerContainer);

    store.dispatch({
      type: "CHANGE_GAME_OPTIONS",
      payload: { type: "mines", value: 1 }
    });

    store.dispatch({
      type: "CHANGE_GAME_OPTIONS",
      payload: { type: "width", value: 4 }
    });
    store.dispatch({
      type: "CHANGE_GAME_OPTIONS",
      payload: { type: "height", value: 4 }
    });

    store.dispatch({ type: "START_GAME", payload: "expert" });
    return (
      <>
        <Provider store={store}>
          <>
            <StatsContainer />
            <BoardContainer />
          </>
        </Provider>
      </>
    );
  }
}

export default App;
