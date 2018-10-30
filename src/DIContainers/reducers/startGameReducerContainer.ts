import { AnyAction } from "../../application/actions/actions";
import { generateEmptyField } from "../../application/logic/board/generateEmptyField";
import {
  IStartGameReducerState,
  startGameReducer
} from "../../application/reducers/startGameReducer";
import { validateGameOptionsContainer } from "../logic/validators/validateGameOptionsContainer";

export type StartGameReducerContainer = (
  state: IStartGameReducerState,
  action: AnyAction
) => IStartGameReducerState;

const helperFunctions = {
  getTime: () => new Date().getTime(),
  generateEmptyField,
  validateGameOptions: validateGameOptionsContainer
};

export const startGameReducerContainer: StartGameReducerContainer = (
  state,
  action
) => startGameReducer(state, action, helperFunctions);
