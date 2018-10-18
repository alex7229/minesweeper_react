import { AnyAction } from "../actions";
import { Field } from "./toggleCellReducer";

export interface IStartGameReducerState {
  readonly width: number;
  readonly height: number;
  readonly gameStartTimestamp: number;
  readonly field: Field;
  readonly seed: string;
}

export type StartGameReducer = (
  state: IStartGameReducerState,
  action: AnyAction,
  functions: {
    getTime: () => number;
  }
) => IStartGameReducerState;

export const startGameReducer: StartGameReducer = (
  state,
  action,
  functions
) => {
  if (action.type !== "START_GAME") {
    return state;
  }
  // should generate random seed
  return { ...state, gameStartTimestamp: functions.getTime() };
};
