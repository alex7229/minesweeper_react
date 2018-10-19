import * as _ from "lodash";
import * as React from "react";
import { OpenCell, ToggleCell } from "../actions";
import { Field } from "../reducers/toggleCellReducer";
import { Cell } from "./Cell";

interface IBoardProps {
  readonly width: number;
  readonly height: number;
  readonly mines: number;
  readonly field: Field;
  readonly openCell: OpenCell;
  readonly toggleCell: ToggleCell;
}

export const Board = (props: IBoardProps) => {
  const blockSize = 25;
  const height = props.height * blockSize;
  const width = props.width * blockSize;
  const cells = props.field.map(row =>
    row.map(cell => (
      <Cell
        {...cell}
        openCell={props.openCell.bind(null, {
          row: cell.row,
          column: cell.column
        })}
        toggleCell={props.toggleCell.bind(null, {
          row: cell.row,
          column: cell.column
        })}
        key={cell.row.toString() + " - " + cell.column.toString()}
      />
    ))
  );
  const cellsFlatten = _.flatten(cells);
  return <div style={{ width, height }}>{cellsFlatten}</div>;
};
