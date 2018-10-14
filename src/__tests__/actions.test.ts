import {
  CHANGE_HEIGHT_OPTION,
  CHANGE_MINES_OPTION,
  CHANGE_WIDTH_OPTION,
  changeHeightOption,
  changeMinesOption,
  changeWidthOption,
  ICellPosition,
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
  expect(startGame()).toEqual({
    type: START_GAME
  });
});

it("should create change width option action", () => {
  expect(changeWidthOption(23)).toEqual({
    type: CHANGE_WIDTH_OPTION,
    payload: 23
  });
});

it("should create change height option action", () => {
  expect(changeHeightOption(23)).toEqual({
    type: CHANGE_HEIGHT_OPTION,
    payload: 23
  });
});

it("should create change mines option action", () => {
  expect(changeMinesOption(23)).toEqual({
    type: CHANGE_MINES_OPTION,
    payload: 23
  });
});
