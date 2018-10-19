import { Dispatch } from "redux";

export interface ICellPosition {
  readonly column: number;
  readonly row: number;
}

export const OPEN_CELL = "OPEN_CELL";
export const TOGGLE_CELL = "TOGGLE_CELL";
export const CHANGE_GAME_OPTIONS = "CHANGE_GAME_OPTIONS";
export const START_GAME = "START_GAME";
export const ELAPSE_ONE_SECOND = "ELAPSE_ONE_SECOND";

export interface IOpenCellAction {
  readonly payload: ICellPosition;
  readonly type: "OPEN_CELL";
}

export interface IToggleCellAction {
  readonly payload: ICellPosition;
  readonly type: "TOGGLE_CELL";
}

export interface IGameOptionPayload {
  readonly type: "width" | "height" | "mines";
  readonly value: number;
}

export type StartGamePayload = "beginner" | "advanced" | "expert" | "custom";

export interface IStartGameAction {
  readonly type: "START_GAME";
  readonly payload: StartGamePayload;
}

export interface IChangeGameOptionsAction {
  readonly payload: IGameOptionPayload;
  readonly type: "CHANGE_GAME_OPTIONS";
}

export interface IElapseOneSecondAction {
  readonly type: "ELAPSE_ONE_SECOND";
}

export type OpenCell = (position: ICellPosition) => IOpenCellAction;
export const openCell: OpenCell = position => ({
  payload: position,
  type: OPEN_CELL
});

export type ToggleCell = (position: ICellPosition) => IToggleCellAction;
export const toggleCell: ToggleCell = position => ({
  payload: position,
  type: TOGGLE_CELL
});

export type StartGame = (payload: StartGamePayload) => IStartGameAction;
export const startGame: StartGame = payload => ({
  type: START_GAME,
  payload
});

export type ChangeGameOption = (
  payload: IGameOptionPayload
) => IChangeGameOptionsAction;
export const changeGameOption: ChangeGameOption = payload => ({
  type: CHANGE_GAME_OPTIONS,
  payload
});

export type ElapseOneSecond = () => IElapseOneSecondAction;
export const elapseOneSecond: ElapseOneSecond = () => ({
  type: ELAPSE_ONE_SECOND
});

export type StartTimer = (
  dispatch: Dispatch<AnyAction>,
  getState: () => { readonly isFinished: boolean }
) => void;
export const startTimer: StartTimer = (dispatch, getState) => {
  const intervalId = setInterval(() => {
    const state = getState();
    if (state.isFinished) {
      clearInterval(intervalId);
      return;
    }
    dispatch({ type: "ELAPSE_ONE_SECOND" });
  }, 1000);
};

export type AnyAction =
  | IToggleCellAction
  | IOpenCellAction
  | IStartGameAction
  | IChangeGameOptionsAction
  | IElapseOneSecondAction;
