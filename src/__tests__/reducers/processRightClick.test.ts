import { ICellPosition, OPEN_CELL, RIGHT_CLICK_CELL } from "../../actions";
import { calculateFlagsCount } from "../../calculateFlagsCount";
import { ICell, processRightClick } from "../../reducers/processRightClick";

const position: ICellPosition = { column: 1, row: 1 };
const cell: ICell = { open: false, flag: false, questionMark: false };

it("should not change state if action type is incorrect", () => {
  const state = {
    field: [[cell, cell], [cell, cell]],
    totalMines: 25
  };
  const nextState = processRightClick(
    state,
    {
      payload: position,
      type: OPEN_CELL
    },
    jest.fn()
  );
  expect(state).toEqual(nextState);
});

it("should not mutate field if position is out of bounds", () => {
  const outOfBoundsPosition: ICellPosition = { column: 25, row: 0 };
  const state = {
    field: [[cell, cell], [cell, cell]],
    totalMines: 40
  };
  const nextState = processRightClick(
    state,
    {
      payload: outOfBoundsPosition,
      type: RIGHT_CLICK_CELL
    },
    jest.fn()
  );
  expect(nextState).toEqual({ ...state, field: [[cell, cell], [cell, cell]] });
});

it("should not change cell if it is already open", () => {
  const openedCell: ICell = { open: true, flag: false, questionMark: false };
  const state = {
    field: [[cell, cell], [cell, openedCell]],
    totalMines: 20
  };
  const nextState = processRightClick(
    state,
    {
      payload: position,
      type: RIGHT_CLICK_CELL
    },
    jest.fn()
  );
  expect(nextState.field).toEqual([[cell, cell], [cell, openedCell]]);
});

it("should set up flag", () => {
  const flagCell: ICell = { open: false, flag: true, questionMark: false };
  const state = {
    field: [[cell, cell], [cell, cell]],
    totalMines: 20
  };
  const nextState = processRightClick(
    state,
    {
      payload: position,
      type: RIGHT_CLICK_CELL
    },
    calculateFlagsCount
  );
  expect(nextState).toEqual({
    ...state,
    field: [[cell, cell], [cell, flagCell]]
  });
});

it("should change flag for question mark and decrement flags count", () => {
  const flagCell: ICell = { open: false, flag: true, questionMark: false };
  const questionMarkCell: ICell = {
    flag: false,
    open: false,
    questionMark: true
  };
  const state = {
    field: [[cell, cell], [cell, flagCell]],
    totalMines: 20
  };
  const nextState = processRightClick(
    state,
    {
      payload: position,
      type: RIGHT_CLICK_CELL
    },
    calculateFlagsCount
  );
  expect(nextState).toEqual({
    ...state,
    field: [[cell, cell], [cell, questionMarkCell]]
  });
});

it("should remove question mark", () => {
  const questionMarkCell: ICell = {
    flag: false,
    open: false,
    questionMark: true
  };
  const state = {
    field: [[cell, cell], [cell, questionMarkCell]],

    totalMines: 20
  };
  const nextState = processRightClick(
    state,
    {
      payload: position,
      type: RIGHT_CLICK_CELL
    },
    calculateFlagsCount
  );
  expect(nextState).toEqual({ ...state, field: [[cell, cell], [cell, cell]] });
});

it("should not set flag if amount of flags equals to amount of mines", () => {
  const flagCell: ICell = { open: false, flag: true, questionMark: false };
  const state = {
    field: [[cell, flagCell], [cell, cell]],
    totalMines: 1
  };
  const nextState = processRightClick(
    state,
    {
      payload: position,
      type: RIGHT_CLICK_CELL
    },
    calculateFlagsCount
  );
  expect(nextState).toEqual(state);
});
