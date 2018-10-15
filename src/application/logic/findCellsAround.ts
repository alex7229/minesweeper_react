import { ICellPosition } from "../actions";
import { Field, ICell, Row } from "../reducers/rightClickReducer";

export type FindCellsAround = (field: Field, position: ICellPosition) => Row;

export const findCellsAround: FindCellsAround = (field, position) => {
  const cells: ICell[] = [];
  for (let row = position.row - 1; row <= position.row + 1; row++) {
    for (
      let column = position.column - 1;
      column <= position.column + 1;
      column++
    ) {
      if (row === position.row && column === position.column) {
        continue;
      }
      const cell = field[row] && field[row][column];
      if (cell) {
        cells.push(cell);
      }
    }
  }
  return cells;
};
