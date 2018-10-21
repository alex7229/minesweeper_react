import { AnyAction } from "../../application/actions/actions";
import { calculateCells } from "../../application/logic/board/calculateCells";
import { isWinCondition } from "../../application/logic/board/isWinCondition";
import {
  IToggleCellReducerState,
  toggleCellReducer
} from "../../application/reducers/toggleCellReducer";

export type ToggleCellReducerFactory = (
  state: IToggleCellReducerState,
  action: AnyAction
) => IToggleCellReducerState;

const helperFunctions = {
  calculateCells,
  getTime: () => new Date().getTime(),
  isWinCondition
};

export const toggleCellReducerFactory: ToggleCellReducerFactory = (
  state,
  action
) => toggleCellReducer(state, action, helperFunctions);
