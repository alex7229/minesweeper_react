import { AnyAction } from "../actions/actions";
import { ValidateGameOptions } from "../logic/validators/validateGameOptions";

export interface IGameOptionsState {
  readonly width: number;
  readonly height: number;
  readonly mines: number;
}

export type GameOptionsReducer = (
  state: IGameOptionsState,
  action: AnyAction,
  validateGameOptions: ValidateGameOptions
) => IGameOptionsState;

export const gameOptionsReducer: GameOptionsReducer = (
  state,
  action,
  validateGameOptions
) => {
  if (action.type !== "CHANGE_GAME_OPTIONS") {
    return state;
  }
  if (action.payload.type === "width") {
    const options = { ...state, width: action.payload.value };
    if (validateGameOptions(options)) {
      return options;
    }
  }
  if (action.payload.type === "height") {
    const options = { ...state, height: action.payload.value };
    if (validateGameOptions(options)) {
      return options;
    }
  }
  if (action.payload.type === "mines") {
    const options = { ...state, mines: action.payload.value };
    if (validateGameOptions(options)) {
      return options;
    }
  }
  return state;
};
