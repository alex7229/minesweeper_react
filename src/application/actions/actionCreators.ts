import { Dispatch } from "redux";
import {
  AnyAction,
  ICellPosition,
  IChangeGameOptionsAction,
  IElapseOneSecondAction,
  IGameOptionPayload,
  IOpenCellAction,
  IStartGameAction,
  IToggleCellAction,
  StartGamePayload
} from "./actions";

export type OpenCell = (position: ICellPosition) => IOpenCellAction;
export const openCell: OpenCell = position => ({
  payload: position,
  type: "OPEN_CELL"
});

export type ToggleCell = (position: ICellPosition) => IToggleCellAction;
export const toggleCell: ToggleCell = position => ({
  payload: position,
  type: "TOGGLE_CELL"
});

export type StartGame = (payload: StartGamePayload) => IStartGameAction;
export const startGame: StartGame = payload => ({
  type: "START_GAME",
  payload
});

export type ChangeGameOption = (
  payload: IGameOptionPayload
) => IChangeGameOptionsAction;
export const changeGameOption: ChangeGameOption = payload => ({
  type: "CHANGE_GAME_OPTIONS",
  payload
});

export type ElapseOneSecond = () => IElapseOneSecondAction;
export const elapseOneSecond: ElapseOneSecond = () => ({
  type: "ELAPSE_ONE_SECOND"
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
