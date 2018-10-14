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
export const startGame = () => ({
  type: START_GAME
});

export const CHANGE_WIDTH_OPTION = "CHANGE_WIDTH_OPTION";
export const changeWidthOption = (width: number) => ({
  type: CHANGE_WIDTH_OPTION,
  payload: width
});

export const CHANGE_HEIGHT_OPTION = "CHANGE_HEIGHT_OPTION";
export const changeHeightOption = (width: number) => ({
  type: CHANGE_HEIGHT_OPTION,
  payload: width
});

export const CHANGE_MINES_OPTION = "CHANGE_MINES_OPTION";
export const changeMinesOption = (width: number) => ({
  type: CHANGE_MINES_OPTION,
  payload: width
});
