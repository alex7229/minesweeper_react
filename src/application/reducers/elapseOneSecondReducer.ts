import { AnyAction } from "../actions";

export interface IElapseOneSecondReducerState {
  readonly gameTimeMs: number;
}

export type ElapseOneSecondReducer = (
  state: IElapseOneSecondReducerState,
  action: AnyAction
) => IElapseOneSecondReducerState;

export const elapseOneSecondReducer: ElapseOneSecondReducer = (
  state,
  action
) => {
  if (action.type !== "ELAPSE_ONE_SECOND") {
    return state;
  }
  return { ...state, gameTimeMs: state.gameTimeMs + 1000 };
};
