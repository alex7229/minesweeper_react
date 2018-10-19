import { AnyAction } from "../../application/actions/actions";
import { generateEmptyField } from "../../application/logic/generateEmptyField";
import {
  IStartGameReducerState,
  startGameReducer
} from "../../application/reducers/startGameReducer";

export type StartGameReducerFactory = (
  state: IStartGameReducerState,
  action: AnyAction
) => IStartGameReducerState;

const helperFunctions = {
  getTime: () => new Date().getTime(),
  generateEmptyField
};

export const startGameReducerFactory: StartGameReducerFactory = (
  state,
  action
) => startGameReducer(state, action, helperFunctions);
