import { AnyAction } from "../../application/actions";
import { validateGameOptions } from "../../application/logic/validateGameOptions";
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
