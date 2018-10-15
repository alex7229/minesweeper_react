import { AnyAction } from "../../application/actions";
import { calculateCells } from "../../application/logic/calculateCells";
import {
  IToggleCellState,
  toggleCellReducer
} from "../../application/reducers/toggleCellReducer";

export type ToggleCellReducerFactory = (
  state: IToggleCellState,
  action: AnyAction
) => IToggleCellState;

export const toggleCellReducerFactory: ToggleCellReducerFactory = (
  state,
  action
) => toggleCellReducer(state, action, calculateCells);
