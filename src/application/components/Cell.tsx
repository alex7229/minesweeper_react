import * as React from "react";
import "../css/cell.css";
import { ICell } from "../reducers/toggleCellReducer";

interface IProps extends ICell {
  openCell: () => void;
  toggleCell: () => void;
}

export const Cell = (props: IProps) => {
  let className = "cell";
  if (!props.open) {
    if (props.flag) {
      className += " flag";
    } else if (props.questionMark) {
      className += " questionMark";
    }
    return (
      <div
        className={className}
        onClick={props.openCell}
        onContextMenu={props.toggleCell}
      />
    );
  }
  let color = "yellow";
  if (props.minesAround === 1) {
    color = "blue";
  } else if (props.minesAround === 2) {
    color = "green";
  } else if (props.minesAround === 3) {
    color = "red";
  }
  if (props.open) {
    className += " open";
  }
  if (props.isMine) {
    className += " mine";
  } else if (props.minesAround === 0) {
    className += " noMinesAround";
  }
  if (props.isMine || props.minesAround === 0) {
    return <div className={className} style={{ color }} />;
  }
  return (
    <div className={className} style={{ color }}>
      {props.minesAround}
    </div>
  );
};
