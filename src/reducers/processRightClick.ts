import { IRightCLickCellAction } from "../actions";

export interface ICell {
  readonly open: boolean;
  readonly flag: boolean;
  readonly questionMark: boolean;
}

export type Field = ICell[][];

export const processRightClick = (
  state: Field,
  action: IRightCLickCellAction
) => {
  const { row, column } = action.payload;
  if (!state[row] || !state[row][column] || state[row][column].open) {
    return state;
  }
  return state.map((currentRow, rowIndex) => {
    if (rowIndex !== row) {
      return row;
    }
    return currentRow.map((currentCell, columnIndex) => {
      if (columnIndex !== column) {
        return currentCell;
      }
      if (currentCell.flag) {
        return { ...currentCell, flag: false, questionMark: true };
      }
      if (currentCell.questionMark) {
        return { ...currentCell, questionMark: false };
      }
      return { ...currentCell, flag: true };
    });
  });
};
