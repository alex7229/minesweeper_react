import { AnyAction } from "../actions/actions";

export interface IGameOptionsReducerState {
  readonly widthInput: number;
  readonly heightInput: number;
  readonly minesInput: number;
}

export type GameOptionsReducer = (
  state: IGameOptionsReducerState,
  action: AnyAction
) => IGameOptionsReducerState;

export const gameOptionsReducer: GameOptionsReducer = (state, action) => {
  if (action.type !== "CHANGE_GAME_OPTIONS") {
    return state;
  }
  if (action.payload.type === "width") {
    return { ...state, widthInput: action.payload.value };
  }
  if (action.payload.type === "height") {
    return { ...state, heightInput: action.payload.value };
  }
  if (action.payload.type === "mines") {
    return { ...state, minesInput: action.payload.value };
  }
  return state;
};
