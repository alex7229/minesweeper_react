import {
  CHANGE_GAME_OPTIONS,
  changeGameOption,
  ICellPosition,
  OPEN_CELL,
  openCell,
  RIGHT_CLICK_CELL,
  rightClickCell,
  START_GAME,
  startGame
} from "../application/actions";

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
  expect(startGame()).toEqual({
    type: START_GAME
  });
});

it("should create change game options action", () => {
  expect(changeGameOption({ type: "width", value: 55 })).toEqual({
    type: CHANGE_GAME_OPTIONS,
    payload: { type: "width", value: 55 }
  });
});
