import { AnyAction, RIGHT_CLICK_CELL } from "../actions";
import { CalculateCells } from "../application/logic/calculateCells";

export interface ICell {
  readonly column: number;
  readonly row: number;
  readonly open: boolean;
  readonly isMine: boolean;
  readonly flag: boolean;
  readonly questionMark: boolean;
  readonly minesAround: number;
}

export type Row = ReadonlyArray<ICell>;
export type Field = ReadonlyArray<Row>;

export interface IRightClickState {
  readonly field: Field;
}

type RightClickReducer = (
  state: IRightClickState,
  action: AnyAction,
  calculateCells: CalculateCells
) => IRightClickState;

export const rightClickReducer: RightClickReducer = (
  state,
  action,
  calculateCells
) => {
  if (action.type !== RIGHT_CLICK_CELL) {
    return state;
  }
  const { row, column } = action.payload;
  if (
    !state.field[row] ||
    !state.field[row][column] ||
    state.field[row][column].open
  ) {
    return state;
  }
  const flagsCount = calculateCells(state.field, "flag");
  const totalMines = calculateCells(state.field, "mine");
  const shouldPlaceFlag =
    state.field[row][column].flag === false &&
    state.field[row][column].questionMark === false;
  if (flagsCount === totalMines && shouldPlaceFlag) {
    return state;
  }
  const newField = state.field.map((currentRow, rowIndex) => {
    if (rowIndex !== row) {
      return currentRow;
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
  return { ...state, field: newField };
};
