export interface ICellPosition {
  readonly column: number;
  readonly row: number;
}

export interface IOpenCellAction {
  readonly payload: ICellPosition;
  readonly type: "OPEN_CELL";
}

export interface IToggleCellAction {
  readonly payload: ICellPosition;
  readonly type: "TOGGLE_CELL";
}

export type StartGamePayload = "beginner" | "advanced" | "expert" | "custom";
export interface IStartGameAction {
  readonly type: "START_GAME";
  readonly payload: StartGamePayload;
}

export interface IGameOptionPayload {
  readonly type: "width" | "height" | "mines";
  readonly value: number;
}
export interface IChangeGameOptionsAction {
  readonly payload: IGameOptionPayload;
  readonly type: "CHANGE_GAME_OPTIONS";
}

export type AnyAction =
  | IToggleCellAction
  | IOpenCellAction
  | IStartGameAction
  | IChangeGameOptionsAction;
