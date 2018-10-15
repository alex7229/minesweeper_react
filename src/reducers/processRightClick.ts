import { AnyAction, RIGHT_CLICK_CELL } from "../actions";
import { CalculateFlagsCount } from "../application/logic/calculateFlagsCount";

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
  readonly totalMines: number;
}

type ProcessRightClick = (
  state: IRightClickState,
  action: AnyAction,
  calculateFlagsCount: CalculateFlagsCount
) => IRightClickState;

export const processRightClick: ProcessRightClick = (
  state,
  action,
  calculateFlagsCount
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
  const flagsCount = calculateFlagsCount(state.field);
  const shouldPlaceFlag =
    state.field[row][column].flag === false &&
    state.field[row][column].questionMark === false;
  if (flagsCount === state.totalMines && shouldPlaceFlag) {
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
