import { AnyAction } from "../../application/actions/actions";
import { generateEmptyField } from "../../application/logic/board/generateEmptyField";
import {
  IStartGameReducerState,
  startGameReducer
} from "../../application/reducers/startGameReducer";

export type StartGameReducerContainer = (
  state: IStartGameReducerState,
  action: AnyAction
) => IStartGameReducerState;

const helperFunctions = {
  getTime: () => new Date().getTime(),
  generateEmptyField
};

export const startGameReducerContainer: StartGameReducerContainer = (
  state,
  action
) => startGameReducer(state, action, helperFunctions);
