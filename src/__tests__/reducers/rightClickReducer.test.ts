import { ICellPosition, OPEN_CELL, RIGHT_CLICK_CELL } from "../../actions";
import { calculateCells } from "../../application/logic/calculateCells";
import { ICell, rightClickReducer } from "../../reducers/rightClickReducer";

const position: ICellPosition = { column: 1, row: 1 };
const cell: ICell = {
  row: 0,
  column: 0,
  flag: false,
  isMine: false,
  minesAround: 0,
  open: false,
  questionMark: false
};
const openedCell: ICell = { ...cell, open: true };
const flagCell: ICell = { ...cell, flag: true };
const questionMarkCell: ICell = {
  ...cell,
  questionMark: true
};
const mine = { ...cell, isMine: true };

it("should not change state if action type is incorrect", () => {
  const state = {
    field: [[cell, cell], [cell, cell]]
  };
  const nextState = rightClickReducer(
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
    field: [[cell, cell], [cell, cell]]
  };
  const nextState = rightClickReducer(
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
  const state = {
    field: [[cell, cell], [cell, openedCell]]
  };
  const nextState = rightClickReducer(
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
  const state = {
    field: [[cell, cell], [mine, cell]]
  };
  const nextState = rightClickReducer(
    state,
    {
      payload: position,
      type: RIGHT_CLICK_CELL
    },
    calculateCells
  );
  expect(nextState.field).toEqual([[cell, cell], [mine, flagCell]]);
});

it("should change flag for question mark and decrement flags count", () => {
  const state = {
    field: [[cell, cell], [cell, flagCell]]
  };
  const nextState = rightClickReducer(
    state,
    {
      payload: position,
      type: RIGHT_CLICK_CELL
    },
    calculateCells
  );
  expect(nextState).toEqual({
    ...state,
    field: [[cell, cell], [cell, questionMarkCell]]
  });
});

it("should remove question mark", () => {
  const state = {
    field: [[cell, cell], [cell, questionMarkCell]]
  };
  const nextState = rightClickReducer(
    state,
    {
      payload: position,
      type: RIGHT_CLICK_CELL
    },
    calculateCells
  );
  expect(nextState).toEqual({ ...state, field: [[cell, cell], [cell, cell]] });
});

it("should not set flag if amount of flags equals to amount of mines", () => {
  const state = {
    field: [[cell, flagCell], [mine, cell]]
  };
  const nextState = rightClickReducer(
    state,
    {
      payload: position,
      type: RIGHT_CLICK_CELL
    },
    calculateCells
  );
  expect(nextState).toEqual(state);
});
