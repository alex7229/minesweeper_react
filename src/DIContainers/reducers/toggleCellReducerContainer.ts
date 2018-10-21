import { AnyAction } from "../../application/actions/actions";
import { calculateCells } from "../../application/logic/board/calculateCells";
import { isWinCondition } from "../../application/logic/board/isWinCondition";
import {
  IToggleCellReducerState,
  toggleCellReducer
} from "../../application/reducers/toggleCellReducer";

export type ToggleCellReducerContainer = (
  state: IToggleCellReducerState,
  action: AnyAction
) => IToggleCellReducerState;

const helperFunctions = {
  calculateCells,
  getTime: () => new Date().getTime(),
  isWinCondition
};

export const toggleCellReducerContainer: ToggleCellReducerContainer = (
  state,
  action
) => toggleCellReducer(state, action, helperFunctions);
