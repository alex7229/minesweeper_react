import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducerFactory } from "../../factories/reducers/rootReducerFactory";
import BoardContainer from "../containers/BoardContainer";

class App extends React.Component {
  public render() {
    const store = createStore(rootReducerFactory);
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
