import {
  ICellPosition,
  IChangeGameOptionsAction,
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
