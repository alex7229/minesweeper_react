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

export class Board extends React.Component<{}, IBoardProps> {
  public props: IBoardProps;

  constructor(props: IBoardProps) {
    super(props);
    this.props = props;
  }
  public render() {
    const blockSize = 25;
    const height = this.props.height * blockSize;
    const width = this.props.width * blockSize;
    const cells = this.props.field.map(row =>
      row.map(cell => (
        <Cell
          {...cell}
          openCell={this.props.openCell.bind(null, {
            row: cell.row,
            column: cell.column
          })}
          toggleCell={this.props.toggleCell.bind(null, {
            row: cell.row,
            column: cell.column
          })}
          key={cell.row.toString() + " - " + cell.column.toString()}
        />
      ))
    );
    const cellsFlatten = _.flatten(cells);
    return <div style={{ width, height }}>{cellsFlatten}</div>;
  }
}
