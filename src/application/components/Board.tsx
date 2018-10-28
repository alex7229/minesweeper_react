import * as _ from "lodash";
import * as React from "react";
import { OpenCell, ToggleCell } from "../actions/actionCreators";
import { Field } from "../reducers/toggleCellReducer";
import { Cell } from "./Cell";

interface IBoardProps {
  readonly field: Field;
  readonly openCell: OpenCell;
  readonly toggleCell: ToggleCell;
}

export const Board = (props: IBoardProps) => {
  const cells = props.field.map((row, index) => {
    const regularCells = row.map(cell => (
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
    ));
    regularCells.push(<div className="clear" key={"clear_" + index} />);
    return regularCells;
  });
  const cellsFlatten = _.flatten(cells);
  const width = props.field[0].length;
  return <div style={{ minWidth: `${width}rem` }}>{cellsFlatten}</div>;
};
