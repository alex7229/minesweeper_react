import { IRightCLickCellAction } from "../actions";

export interface ICell {
  readonly open: boolean;
  readonly flag: boolean;
  readonly questionMark: boolean;
}

export type Field = ICell[][];

interface IState {
  readonly field: Field;
  readonly flagsNumber: number;
  readonly totalMines: number;
}

export const processRightClick = (
  state: IState,
  action: IRightCLickCellAction
): IState => {
  const { row, column } = action.payload;
  if (
    !state.field[row] ||
    !state.field[row][column] ||
    state.field[row][column].open
  ) {
    return state;
  }
  let flagsNumber = state.flagsNumber;
  const newField = state.field.map((currentRow, rowIndex) => {
    if (rowIndex !== row) {
      return currentRow;
    }
    return currentRow.map((currentCell, columnIndex) => {
      if (columnIndex !== column) {
        return currentCell;
      }
      if (currentCell.flag) {
        flagsNumber--;
        return { ...currentCell, flag: false, questionMark: true };
      }
      if (currentCell.questionMark) {
        return { ...currentCell, questionMark: false };
      }
      if (flagsNumber === state.totalMines) {
        return currentCell;
      }
      flagsNumber++;
      return { ...currentCell, flag: true };
    });
  });
  return { ...state, field: newField, flagsNumber };
};
