import { AnyAction } from "../../actions";
import { calculateFlagsCount } from "../../application/logic/calculateFlagsCount";
import {
  IRightClickState,
  processRightClick
} from "../../reducers/processRightClick";

export type ProcessRightClickFactory = (
  state: IRightClickState,
  action: AnyAction
) => IRightClickState;

export const processRightClickFactory: ProcessRightClickFactory = (
  state,
  action
) => processRightClick(state, action, calculateFlagsCount);
