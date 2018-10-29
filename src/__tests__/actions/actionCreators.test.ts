import {
  changeGameOption,
  hideOverlay,
  openCell,
  startGame,
  toggleCell
} from "../../application/actions/actionCreators";
import { ICellPosition } from "../../application/actions/actions";

const position: ICellPosition = { column: 2, row: 4 };

it("should create open cell action", () => {
  expect(openCell(position)).toEqual({ type: "OPEN_CELL", payload: position });
});

it("should create right click action", () => {
  expect(toggleCell(position)).toEqual({
    payload: position,
    type: "TOGGLE_CELL"
  });
});

it("should create start game action", () => {
  expect(startGame("beginner")).toEqual({
    type: "START_GAME",
    payload: "beginner"
  });
});

it("should create change game options action", () => {
  expect(changeGameOption({ type: "width", value: 55 })).toEqual({
    type: "CHANGE_GAME_OPTIONS",
    payload: { type: "width", value: 55 }
  });
});

it("should create hide overlay action", () => {
  expect(hideOverlay()).toEqual({ type: "HIDE_OVERLAY" });
});
