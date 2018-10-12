import { ICellPosition } from "./Cell";
import { Field } from "./reducers/processRightClick";

export type FindCellsAround = (
  field: Field,
  position: ICellPosition
) => ReadonlyArray<ICellPosition>;

export const findCellsAround: FindCellsAround = (field, position) => {
  const positions: ICellPosition[] = [];
  for (let row = position.row - 1; row <= position.row + 1; row++) {
    for (
      let column = position.column - 1;
      column <= position.column + 1;
      column++
    ) {
      if (row === position.row && column === position.column) {
        continue;
      }
      if (field[row] && field[row][column]) {
        positions.push({ row, column });
      }
    }
  }
  return positions;
};
