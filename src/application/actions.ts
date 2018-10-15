export interface ICellPosition {
  readonly column: number;
  readonly row: number;
}

export interface IGameOptions {
  readonly height: number;
  readonly mines: number;
  readonly width: number;
}

export interface IOpenCellAction {
  readonly payload: ICellPosition;
  readonly type: "OPEN_CELL";
}

export interface IToggleCellAction {
  readonly payload: ICellPosition;
  readonly type: "TOGGLE_CELL";
}

export interface IGameOptionPayload {
  type: "width" | "height" | "mines";
  value: number;
}

export interface IChangeGameOptionsAction {
  readonly payload: {
    type: "width" | "height" | "mines";
    value: number;
  };
  readonly type: "CHANGE_GAME_OPTIONS";
}

export const OPEN_CELL = "OPEN_CELL";
export const openCell = (position: ICellPosition): IOpenCellAction => ({
  payload: position,
  type: OPEN_CELL
});

export const TOGGLE_CELL = "TOGGLE_CELL";
export const toggleCell = (position: ICellPosition): IToggleCellAction => ({
  payload: position,
  type: TOGGLE_CELL
});

export const START_GAME = "START_GAME";
export const startGame = () => ({
  type: START_GAME
});

export const CHANGE_GAME_OPTIONS = "CHANGE_GAME_OPTIONS";
export const changeGameOption = (payload: IGameOptionPayload) => ({
  type: CHANGE_GAME_OPTIONS,
  payload
});

export type AnyAction =
  | IToggleCellAction
  | IOpenCellAction
  | IChangeGameOptionsAction;
