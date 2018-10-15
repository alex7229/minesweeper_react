import { AnyAction } from "../../actions";
import { calculateFlagsCount } from "../../application/logic/calculateFlagsCount";
import {
  IRightClickState,
  rightClickReducer
} from "../../reducers/rightClickReducer";

export type RightClickReducerFactory = (
  state: IRightClickState,
  action: AnyAction
) => IRightClickState;

export const rightClickReducerFactory: RightClickReducerFactory = (
  state,
  action
) => rightClickReducer(state, action, calculateFlagsCount);
