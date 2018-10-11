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

export type AnyAction = IRightCLickCellAction | IOpenCellAction;

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
export const startGame = (gameOptions: IGameOptions) => ({
  payload: gameOptions,
  type: START_GAME
});
