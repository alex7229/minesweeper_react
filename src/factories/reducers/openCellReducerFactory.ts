import { AnyAction } from "../../application/actions";
import { flagAllMines } from "../../application/logic/flagAllMines";
import { isWinCondition } from "../../application/logic/isWinCondition";
import { openAllMines } from "../../application/logic/openAllMines";
import { openCells } from "../../application/logic/openCells";
import {
  IGameState,
  openCellReducer
} from "../../application/reducers/openCellReducer";
import { findCellsToOpenFactory } from "../logic/findCellsToOpenFactory";

export type OpenCellReducerFactory = (
  state: IGameState,
  action: AnyAction
) => IGameState;

const helperFunctions = {
  findCellsToOpen: findCellsToOpenFactory,
  openCells,
  flagAllMines,
  openAllMines,
  isWinCondition
};

export const openCellReducerFactory: OpenCellReducerFactory = (state, action) =>
  openCellReducer(state, action, helperFunctions);
