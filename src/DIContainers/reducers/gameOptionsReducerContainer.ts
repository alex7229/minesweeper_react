import { AnyAction } from "../../application/actions/actions";
import { IGameConfig } from "../../application/logic/board/inferGameConfig";
import { gameOptionsReducer } from "../../application/reducers/gameOptionsReducer";

export type GameOptionsReducerContainer = (
  state: IGameConfig,
  action: AnyAction
) => IGameConfig;

export const gameOptionsReducerContainer: GameOptionsReducerContainer = (
  state,
  action
) => gameOptionsReducer(state, action);
