import { AnyAction } from "../../application/actions";
import { calculateCells } from "../../application/logic/calculateCells";
import { IGameState } from "../../application/reducers/openCellReducer";
import { toggleCellReducer } from "../../application/reducers/toggleCellReducer";

export type ToggleCellReducerFactory = (
  state: IGameState,
  action: AnyAction
) => IGameState;

export const toggleCellReducerFactory: ToggleCellReducerFactory = (
  state,
  action
) => toggleCellReducer(state, action, calculateCells);
