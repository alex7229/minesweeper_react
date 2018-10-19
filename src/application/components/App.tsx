import * as React from "react";
import { ICell } from "../reducers/toggleCellReducer";
import { Cell } from "./Cell";

const props: ICell = {
  flag: false,
  open: false,
  row: 0,
  column: 0,
  isMine: true,
  minesAround: 5,
  questionMark: false
};

// tslint:disable-next-line
const handleLeftClick = () => console.log("left click");
// tslint:disable-next-line
const handleRightClick = () => console.log("right click");

class App extends React.Component {
  public render() {
    return (
      <Cell
        {...props}
        toggleCell={handleRightClick}
        openCell={handleLeftClick}
      />
    );
  }
}

export default App;
