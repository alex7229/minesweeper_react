import { AnyAction } from "../../application/actions/actions";
import { validateGameOptions } from "../../application/logic/validators/validateGameOptions";
import {
  gameOptionsReducer,
  IGameOptionsState
} from "../../application/reducers/gameOptionsReducer";

export type GameOptionsReducerContainer = (
  state: IGameOptionsState,
  action: AnyAction
) => IGameOptionsState;

export const gameOptionsReducerContainer: GameOptionsReducerContainer = (
  state,
  action
) => gameOptionsReducer(state, action, validateGameOptions);
