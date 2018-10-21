import { AnyAction } from "../../application/actions/actions";
import { calculateCells } from "../../application/logic/board/calculateCells";
import { flagAllMines } from "../../application/logic/board/flagAllMines";
import { isWinCondition } from "../../application/logic/board/isWinCondition";
import { openAllMines } from "../../application/logic/board/openAllMines";
import { openCells } from "../../application/logic/board/openCells";
import { getMinDifficulty } from "../../application/logic/misc/getMinDifficulty";
import {
  IOpenCellReducerState,
  openCellReducer
} from "../../application/reducers/openCellReducer";
import { findCellsToOpenContainer } from "../logic/board/findCellsToOpenContainer";
import { placeMinesWithDifficultyContainer } from "../logic/board/placeMinesWithDifficultyContainer";

export type OpenCellReducerContainer = (
  state: IOpenCellReducerState,
  action: AnyAction
) => IOpenCellReducerState;

const helperFunctions = {
  findCellsToOpen: findCellsToOpenContainer,
  openCells,
  flagAllMines,
  openAllMines,
  isWinCondition,
  calculateCells,
  placeMinesWithDifficulty: placeMinesWithDifficultyContainer,
  getMinDifficulty,
  getTime: () => new Date().getTime()
};

export const openCellReducerContainer: OpenCellReducerContainer = (
  state,
  action
) => openCellReducer(state, action, helperFunctions);
