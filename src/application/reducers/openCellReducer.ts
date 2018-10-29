import { FindCellsToOpenContainer } from "../../DIContainers/logic/board/findCellsToOpenContainer";
import { PlaceMinesWithDifficultyContainer } from "../../DIContainers/logic/board/placeMinesWithDifficultyContainer";
import { AnyAction } from "../actions/actions";
import { CalculateCells } from "../logic/board/calculateCells";
import { FlagAllMines } from "../logic/board/flagAllMines";
import { IsWinCondition } from "../logic/board/isWinCondition";
import { OpenAllMines } from "../logic/board/openAllMines";
import { OpenCells } from "../logic/board/openCells";
import { GetMinDifficulty } from "../logic/misc/getMinDifficulty";
import { Field } from "./toggleCellReducer";

export interface IOpenCellReducerState {
  readonly seed: string;
  readonly mines: number;
  readonly isFinished: boolean;
  readonly field: Field;
  readonly gameStartTimestamp: number;
  readonly gameTimeMs: number;
  readonly winOverlay: boolean;
}

export type OpenCellReducer = (
  state: IOpenCellReducerState,
  action: AnyAction,
  functions: {
    findCellsToOpen: FindCellsToOpenContainer;
    openCells: OpenCells;
    flagAllMines: FlagAllMines;
    openAllMines: OpenAllMines;
    isWinCondition: IsWinCondition;
    calculateCells: CalculateCells;
    placeMinesWithDifficulty: PlaceMinesWithDifficultyContainer;
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
  if (
    !currentCell ||
    currentCell.open ||
    currentCell.flag ||
    currentCell.questionMark
  ) {
    return state;
  }
  const minesNumber = functions.calculateCells(field, "mine");
  const currentTime = functions.getTime();
  const gameStartTimestamp =
    minesNumber === 0 ? currentTime : state.gameStartTimestamp;
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
  const gameTimeMs = currentTime - gameStartTimestamp;
  if (currentCell.isMine) {
    return {
      ...state,
      gameStartTimestamp,
      gameTimeMs,
      seed: nextSeed,
      field: functions.openAllMines(field, action.payload),
      isFinished: true
    };
  }
  const cellsToOpen = functions.findCellsToOpen(field, action.payload);
  const openedField = functions.openCells(field, cellsToOpen);
  if (functions.isWinCondition(openedField)) {
    return {
      ...state,
      winOverlay: true,
      gameStartTimestamp,
      seed: nextSeed,
      field: functions.flagAllMines(openedField),
      isFinished: true,
      gameTimeMs
    };
  }
  return { ...state, seed: nextSeed, field: openedField, gameStartTimestamp };
};
