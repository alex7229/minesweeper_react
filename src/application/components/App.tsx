import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducerContainer } from "../../DIContainers/reducers/rootReducerContainer";
import "../css/app.css";
import BoardContainer from "../reactContainers/BoardContainer";
import ButtonsContainer from "../reactContainers/ButtonsContainer";
import StatsContainer from "../reactContainers/StatsContainer";
import WinOverlayContainer from "../reactContainers/WinOverlayContainer";

class App extends React.Component {
  public render() {
    const store = createStore(rootReducerContainer);

    store.dispatch({ type: "START_GAME", payload: "expert" });

    return (
      <>
        <Provider store={store}>
          <>
            <ButtonsContainer />
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
