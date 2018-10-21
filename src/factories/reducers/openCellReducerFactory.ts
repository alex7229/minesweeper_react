import { AnyAction } from "../../application/actions/actions";
import { calculateCells } from "../../application/logic/board/calculateCells";
import { flagAllMines } from "../../application/logic/board/flagAllMines";
import { getMinDifficulty } from "../../application/logic/misc/getMinDifficulty";
import { isWinCondition } from "../../application/logic/board/isWinCondition";
import { openAllMines } from "../../application/logic/board/openAllMines";
import { openCells } from "../../application/logic/board/openCells";
import {
  IOpenCellReducerState,
  openCellReducer
} from "../../application/reducers/openCellReducer";
import { findCellsToOpenFactory } from "../logic/findCellsToOpenFactory";
import { placeMinesWithDifficultyFactory } from "../logic/placeMinesWithDifficultyFactory";

export type OpenCellReducerFactory = (
  state: IOpenCellReducerState,
  action: AnyAction
) => IOpenCellReducerState;

const helperFunctions = {
  findCellsToOpen: findCellsToOpenFactory,
  openCells,
  flagAllMines,
  openAllMines,
  isWinCondition,
  calculateCells,
  placeMinesWithDifficulty: placeMinesWithDifficultyFactory,
  getMinDifficulty,
  getTime: () => new Date().getTime()
};

export const openCellReducerFactory: OpenCellReducerFactory = (state, action) =>
  openCellReducer(state, action, helperFunctions);
