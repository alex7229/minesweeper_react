import { AnyAction } from "../actions/actions";
import { IGameConfig } from "../logic/board/inferGameConfig";

export type GameOptionsReducer = (
  state: IGameConfig,
  action: AnyAction
) => IGameConfig;

export const gameOptionsReducer: GameOptionsReducer = (state, action) => {
  if (action.type !== "CHANGE_GAME_OPTIONS") {
    return state;
  }
  if (action.payload.type === "width") {
    return { ...state, width: action.payload.value };
  }
  if (action.payload.type === "height") {
    return { ...state, height: action.payload.value };
  }
  if (action.payload.type === "mines") {
    return { ...state, mines: action.payload.value };
  }
  return state;
};
