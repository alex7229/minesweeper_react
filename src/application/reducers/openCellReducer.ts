import { FindCellsToOpenFactory } from "../../factories/logic/findCellsToOpenFactory";
import { AnyAction } from "../actions";
import { FlagAllMines } from "../logic/flagAllMines";
import { IsWinCondition } from "../logic/isWinCondition";
import { OpenAllMines } from "../logic/openAllMines";
import { OpenCells } from "../logic/openCells";
import { Field } from "./toggleCellReducer";

export interface IGameState {
  readonly isFinished: boolean;
  readonly field: Field;
}

export type OpenCellReducer = (
  state: IGameState,
  action: AnyAction,
  functions: {
    findCellsToOpen: FindCellsToOpenFactory;
    openCells: OpenCells;
    flagAllMines: FlagAllMines;
    openAllMines: OpenAllMines;
    isWinCondition: IsWinCondition;
  }
) => IGameState;

export const openCellReducer: OpenCellReducer = (state, action, functions) => {
  if (action.type !== "OPEN_CELL" || state.isFinished) {
    return state;
  }
  const { row, column } = action.payload;
  const currentCell = state.field[row] && state.field[row][column];
  if (!currentCell || currentCell.open) {
    return state;
  }
  if (currentCell.isMine) {
    return { field: functions.openAllMines(state.field), isFinished: true };
  }
  const cellsToOpen = functions.findCellsToOpen(state.field, action.payload);
  const openedField = functions.openCells(state.field, cellsToOpen);
  if (functions.isWinCondition(openedField)) {
    return { field: functions.flagAllMines(openedField), isFinished: true };
  }
  return { ...state, field: openedField };
};
