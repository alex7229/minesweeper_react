import { FindCellsToOpenFactory } from "../../factories/logic/findCellsToOpenFactory";
import { PlaceMinesWithDifficultyFactory } from "../../factories/logic/placeMinesWithDifficultyFactory";
import { AnyAction } from "../actions";
import { CalculateCells } from "../logic/calculateCells";
import { FlagAllMines } from "../logic/flagAllMines";
import { GetMinDifficulty } from "../logic/getMinDifficulty";
import { IsWinCondition } from "../logic/isWinCondition";
import { OpenAllMines } from "../logic/openAllMines";
import { OpenCells } from "../logic/openCells";
import { Field } from "./toggleCellReducer";

export interface IOpenCellReducerState {
  readonly seed: string;
  readonly mines: number;
  readonly isFinished: boolean;
  readonly field: Field;
  readonly gameStartTimestamp: number;
  readonly gameTimeMs: number;
}

export type OpenCellReducer = (
  state: IOpenCellReducerState,
  action: AnyAction,
  functions: {
    findCellsToOpen: FindCellsToOpenFactory;
    openCells: OpenCells;
    flagAllMines: FlagAllMines;
    openAllMines: OpenAllMines;
    isWinCondition: IsWinCondition;
    calculateCells: CalculateCells;
    placeMinesWithDifficulty: PlaceMinesWithDifficultyFactory;
    getMinDifficulty: GetMinDifficulty;
    getTime: () => number;
  }
) => IOpenCellReducerState;

export const openCellReducer: OpenCellReducer = (state, action, functions) => {
  if (action.type !== "OPEN_CELL" || state.isFinished) {
    return state;
  }
  const { row, column } = action.payload;
  let field = state.field;
  let nextSeed = state.seed;
  const currentCell = field[row] && field[row][column];
  if (!currentCell || currentCell.open) {
    return state;
  }
  const minesNumber = functions.calculateCells(field, "mine");
  if (minesNumber === 0) {
    const difficulty = functions.getMinDifficulty(field, state.mines);
    const result = functions.placeMinesWithDifficulty(
      field,
      state.mines,
      action.payload,
      difficulty
    );
    field = result.field;
    nextSeed = result.seed;
  }
  const gameTimeMs = functions.getTime() - state.gameStartTimestamp;
  if (currentCell.isMine) {
    return {
      ...state,
      gameTimeMs,
      seed: nextSeed,
      field: functions.openAllMines(field),
      isFinished: true
    };
  }
  const cellsToOpen = functions.findCellsToOpen(field, action.payload);
  const openedField = functions.openCells(field, cellsToOpen);
  if (functions.isWinCondition(openedField)) {
    return {
      ...state,
      seed: nextSeed,
      field: functions.flagAllMines(openedField),
      isFinished: true,
      gameTimeMs
    };
  }
  return { ...state, seed: nextSeed, field: openedField };
};
