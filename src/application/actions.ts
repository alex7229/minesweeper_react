export interface ICellPosition {
  readonly column: number;
  readonly row: number;
}

export interface IGameOptions {
  readonly height: number;
  readonly mines: number;
  readonly width: number;
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

export const openCell = (position: ICellPosition): IOpenCellAction => ({
  payload: position,
  type: OPEN_CELL
});

export const toggleCell = (position: ICellPosition): IToggleCellAction => ({
  payload: position,
  type: TOGGLE_CELL
});

export const startGame = (payload: StartGamePayload) => ({
  type: START_GAME,
  payload
});

export const changeGameOption = (payload: IGameOptionPayload) => ({
  type: CHANGE_GAME_OPTIONS,
  payload
});

export const elapseOneSecond = () => ({ type: ELAPSE_ONE_SECOND });

export type AnyAction =
  | IToggleCellAction
  | IOpenCellAction
  | IStartGameAction
  | IChangeGameOptionsAction
  | IElapseOneSecondAction;
