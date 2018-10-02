import * as React from "react";
import "./App.css";
import { Field } from "./Field";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Field rows={16} columns={30} mines={100} />
      </div>
    );
  }
}

export default App;
