import { AnyAction } from "../../application/actions/actions";
import {
  gameOptionsReducer,
  IGameOptionsReducerState
} from "../../application/reducers/gameOptionsReducer";

export type GameOptionsReducerContainer = (
  state: IGameOptionsReducerState,
  action: AnyAction
) => IGameOptionsReducerState;

export const gameOptionsReducerContainer: GameOptionsReducerContainer = (
  state,
  action
) => gameOptionsReducer(state, action);
