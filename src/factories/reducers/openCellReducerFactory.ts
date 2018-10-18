import { AnyAction } from "../../application/actions";
import { calculateCells } from "../../application/logic/calculateCells";
import { flagAllMines } from "../../application/logic/flagAllMines";
import { getMinDifficulty } from "../../application/logic/getMinDifficulty";
import { isWinCondition } from "../../application/logic/isWinCondition";
import { openAllMines } from "../../application/logic/openAllMines";
import { openCells } from "../../application/logic/openCells";
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
