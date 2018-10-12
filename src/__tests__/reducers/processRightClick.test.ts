import { ICellPosition, OPEN_CELL, RIGHT_CLICK_CELL } from "../../actions";
import { calculateFlagsCount } from "../../calculateFlagsCount";
import { ICell, processRightClick } from "../../reducers/processRightClick";

const position: ICellPosition = { column: 1, row: 1 };
const cell: ICell = {
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
