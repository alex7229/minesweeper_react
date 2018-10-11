import { ICellPosition, RIGHT_CLICK_CELL } from "../../actions";
import { ICell, processRightClick } from "../../reducers/processRightClick";

const position: ICellPosition = { column: 0, row: 0 };

it("should not mutate field if position is out of bounds", () => {
  const outOfBoundsPosition: ICellPosition = { column: 25, row: 0 };
  const cell: ICell = { open: false, flag: false, questionMark: false };
  const state = {
    field: [[cell, cell], [cell, cell]],
    flagsNumber: 25,
    totalMines: 40
  };
  const nextState = processRightClick(state, {
    payload: outOfBoundsPosition,
    type: RIGHT_CLICK_CELL
  });
  expect(nextState).toEqual({ ...state, field: [[cell, cell], [cell, cell]] });
});

it("should not change cell if it is already open", () => {
  const cell: ICell = { open: true, flag: false, questionMark: false };
  const state = {
    field: [[cell]],
    flagsNumber: 10,
    totalMines: 20
  };
  const nextState = processRightClick(state, {
    payload: position,
    type: RIGHT_CLICK_CELL
  });
  expect(nextState.field).toEqual([[cell]]);
});

it("should set up flag first and increment flags count", () => {
  const cell: ICell = { open: false, flag: false, questionMark: false };
  const flagCell: ICell = { open: false, flag: true, questionMark: false };
  const state = {
    field: [[cell]],
    flagsNumber: 10,
    totalMines: 20
  };
  const nextState = processRightClick(state, {
    payload: position,
    type: RIGHT_CLICK_CELL
  });
  expect(nextState).toEqual({ ...state, field: [[flagCell]], flagsNumber: 11 });
});

it("should change flag for question mark and decrement flags count", () => {
  const flagCell: ICell = { open: false, flag: true, questionMark: false };
  const questionMarkCell: ICell = {
    flag: false,
    open: false,
    questionMark: true
  };
  const state = {
    field: [[flagCell]],
    flagsNumber: 10,
    totalMines: 20
  };
  const nextState = processRightClick(state, {
    payload: position,
    type: RIGHT_CLICK_CELL
  });
  expect(nextState).toEqual({
    ...state,
    field: [[questionMarkCell]],
    flagsNumber: 9
  });
});

it("should remove question mark", () => {
  debugger;
  const questionMarkCell: ICell = {
    flag: false,
    open: false,
    questionMark: true
  };
  const emptyCell: ICell = { open: false, flag: false, questionMark: false };
  const state = {
    field: [[questionMarkCell]],
    flagsNumber: 10,
    totalMines: 20
  };
  const nextState = processRightClick(state, {
    payload: position,
    type: RIGHT_CLICK_CELL
  });
  expect(nextState).toEqual({ ...state, field: [[emptyCell]] });
});

it("should not set flag if amount of flags equals to amount of mines", () => {
  const cell: ICell = { open: false, flag: false, questionMark: false };
  const state = {
    field: [[cell]],
    flagsNumber: 10,
    totalMines: 10
  };
  const nextState = processRightClick(state, {
    payload: position,
    type: RIGHT_CLICK_CELL
  });
  expect(nextState).toEqual(state);
});
