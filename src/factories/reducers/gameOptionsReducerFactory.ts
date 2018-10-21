import { AnyAction } from "../../application/actions/actions";
import { validateGameOptions } from "../../application/logic/validators/validateGameOptions";
import {
  gameOptionsReducer,
  IGameOptionsState
} from "../../application/reducers/gameOptionsReducer";

export type GameOptionsReducerFactory = (
  state: IGameOptionsState,
  action: AnyAction
) => IGameOptionsState;

export const gameOptionsReducerFactory: GameOptionsReducerFactory = (
  state,
  action
) => gameOptionsReducer(state, action, validateGameOptions);
