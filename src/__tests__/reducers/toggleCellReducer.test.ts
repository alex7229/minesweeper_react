import {
  ICellPosition,
  IToggleCellAction
} from "../../application/actions/actions";
import { calculateCells } from "../../application/logic/calculateCells";
import { generateEmptyField } from "../../application/logic/generateEmptyField";
import {
  ICell,
  toggleCellReducer
} from "../../application/reducers/toggleCellReducer";

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
const defaultAction: IToggleCellAction = {
  type: "TOGGLE_CELL",
  payload: position
};

const defaultState = {
  gameStartTimestamp: 1000,
  isFinished: false,
  field: generateEmptyField(2, 2),
  gameTimeMs: 0
};

const helperFunctions = {
  calculateCells: jest.fn().mockReturnValue(2),
  getTime: jest.fn().mockReturnValue(5000),
  isWinCondition: jest.fn().mockReturnValue(false)
};

it("should not change state if action type is incorrect", () => {
  const nextState = toggleCellReducer(
    defaultState,
    {
      payload: position,
      type: "OPEN_CELL"
    },
    helperFunctions
  );
  expect(nextState).toEqual(defaultState);
});

it("should not mutate field if position is out of bounds", () => {
  const outOfBoundsPosition: ICellPosition = { column: 25, row: 0 };
  const nextState = toggleCellReducer(
    defaultState,
    { ...defaultAction, payload: outOfBoundsPosition },
    helperFunctions
  );
  expect(nextState).toEqual(defaultState);
});

it("should not change cell if it is already open", () => {
  const state = {
    ...defaultState,
    field: [[cell, cell], [cell, openedCell]]
  };
  const nextState = toggleCellReducer(state, defaultAction, helperFunctions);
  expect(nextState.field).toEqual([[cell, cell], [cell, openedCell]]);
});

it("should set up flag", () => {
  const state = {
    ...defaultState,
    field: [[cell, cell], [mine, cell]]
  };
  const nextState = toggleCellReducer(state, defaultAction, {
    ...helperFunctions,
    calculateCells
  });
  expect(nextState.field).toEqual([[cell, cell], [mine, flagCell]]);
});

it("should change flag for question mark", () => {
  const state = {
    ...defaultState,
    field: [[cell, cell], [cell, flagCell]]
  };
  const nextState = toggleCellReducer(state, defaultAction, {
    ...helperFunctions,
    calculateCells
  });
  expect(nextState).toEqual({
    ...state,
    field: [[cell, cell], [cell, questionMarkCell]]
  });
});

it("should remove question mark", () => {
  const state = {
    ...defaultState,
    field: [[cell, cell], [cell, questionMarkCell]]
  };
  const nextState = toggleCellReducer(state, defaultAction, {
    ...helperFunctions,
    calculateCells
  });
  expect(nextState).toEqual({ ...state, field: [[cell, cell], [cell, cell]] });
});

it("should not set flag if amount of flags equals to amount of mines", () => {
  const state = {
    ...defaultState,
    field: [[cell, flagCell], [mine, cell]]
  };
  const nextState = toggleCellReducer(state, defaultAction, {
    ...helperFunctions,
    calculateCells
  });
  expect(nextState).toEqual(state);
});

it("should not change field if the game is finished", () => {
  const state = {
    ...defaultState,
    isFinished: true,
    field: [[cell, cell], [mine, cell]]
  };
  expect(
    toggleCellReducer(state, defaultAction, {
      ...helperFunctions,
      calculateCells
    })
  ).toEqual(state);
});

it("should set isFinished and game time if win condition is true", () => {
  const winConditionMock = jest.fn().mockReturnValue(true);
  const state = {
    ...defaultState,
    field: [[cell, cell], [cell, mine]]
  };
  const newState = toggleCellReducer(state, defaultAction, {
    ...helperFunctions,
    calculateCells,
    isWinCondition: winConditionMock
  });
  expect(newState.isFinished).toBe(true);
  // 4000 is 5000 (current time) minus 1000 (start time)
  expect(newState.gameTimeMs).toBe(4000);
});
