import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducerContainer } from "../../DIContainers/reducers/rootReducerContainer";
import BoardContainer from "../reactContainers/BoardContainer";

class App extends React.Component {
  public render() {
    const store = createStore(rootReducerContainer);
    store.dispatch({ type: "START_GAME", payload: "expert" });
    return (
      <>
        <Provider store={store}>
          <BoardContainer />
        </Provider>
      </>
    );
  }
}

export default App;
