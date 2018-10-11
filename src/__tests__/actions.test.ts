import {
  ICellPosition,
  IGameOptions,
  OPEN_CELL,
  openCell,
  RIGHT_CLICK_CELL,
  rightClickCell,
  START_GAME,
  startGame
} from "../actions";

const position: ICellPosition = { column: 2, row: 4 };

it("should create open cell action", () => {
  expect(openCell(position)).toEqual({ type: OPEN_CELL, payload: position });
});

it("should create right click action", () => {
  expect(rightClickCell(position)).toEqual({
    payload: position,
    type: RIGHT_CLICK_CELL
  });
});

it("should create start game action", () => {
  const gameOptions: IGameOptions = {
    height: 2,
    mines: 6,
    width: 11
  };
  expect(startGame(gameOptions)).toEqual({
    payload: gameOptions,
    type: START_GAME
  });
});
