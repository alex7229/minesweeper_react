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

export interface IRightCLickCellAction {
  readonly payload: ICellPosition;
  readonly type: "RIGHT_CLICK_CELL";
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

export const RIGHT_CLICK_CELL = "RIGHT_CLICK_CELL";
export const rightClickCell = (
  position: ICellPosition
): IRightCLickCellAction => ({
  payload: position,
  type: RIGHT_CLICK_CELL
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
  | IRightCLickCellAction
  | IOpenCellAction
  | IChangeGameOptionsAction;
