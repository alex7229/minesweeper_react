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
    const leftClick = (event: React.MouseEvent<HTMLDivElement>) => {
      // enzyme doesn't not send event hence the condition
      if (event) {
        event.preventDefault();
      }
      props.openCell();
    };
    const rightClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event) {
        event.preventDefault();
      }
      props.toggleCell();
    };
    return (
      <div
        className={className}
        onClick={leftClick}
        onContextMenu={rightClick}
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
  if (props.isMine && props.isMineActive) {
    className += " active_mine";
  } else if (props.isMine) {
    className += " mine";
  } else if (props.minesAround === 0) {
    className += " noMinesAround";
  }
  const preventDefaultAction = (event: React.MouseEvent<HTMLDivElement>) => {
    // enzyme doesn't not send event hence the condition
    if (event) {
      event.preventDefault();
    }
    return true;
  };
  return (
    <div
      onClick={preventDefaultAction}
      onContextMenu={preventDefaultAction}
      className={className}
      style={{ color }}
    >
      {props.isMine || props.minesAround === 0 ? null : props.minesAround}
    </div>
  );
};
