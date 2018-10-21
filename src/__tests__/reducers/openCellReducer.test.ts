import {
  IOpenCellAction,
  IToggleCellAction
} from "../../application/actions/actions";
import { calculateCells } from "../../application/logic/board/calculateCells";
import { flagAllMines } from "../../application/logic/board/flagAllMines";
import { generateEmptyField } from "../../application/logic/board/generateEmptyField";
import { getMinDifficulty } from "../../application/logic/misc/getMinDifficulty";
import { isWinCondition } from "../../application/logic/board/isWinCondition";
import { openAllMines } from "../../application/logic/board/openAllMines";
import { openCells } from "../../application/logic/board/openCells";
import { placeMines } from "../../application/logic/board/placeMines";
import {
  IOpenCellReducerState,
  openCellReducer
} from "../../application/reducers/openCellReducer";
import { ICell } from "../../application/reducers/toggleCellReducer";
import { findCellsToOpenFactory } from "../../factories/logic/findCellsToOpenFactory";
import { placeMinesWithDifficultyFactory } from "../../factories/logic/placeMinesWithDifficultyFactory";
import { recalculateMinesAroundFactory } from "../../factories/logic/recalculateMinesAroundFactory";

const defaultState: IOpenCellReducerState = {
  gameStartTimestamp: 3000,
  gameTimeMs: 0,
  seed: "default seed",
  mines: 1,
  isFinished: false,
  field: generateEmptyField(2, 2)
};

const defaultAction: IOpenCellAction = {
  type: "OPEN_CELL",
  payload: { row: 0, column: 0 }
};

const helperFunctions = {
  findCellsToOpen: findCellsToOpenFactory,
  openCells,
  flagAllMines,
  openAllMines,
  isWinCondition,
  calculateCells,
  placeMinesWithDifficulty: placeMinesWithDifficultyFactory,
  getMinDifficulty,
  getTime: jest.fn().mockReturnValue(5000)
};

it("should not change state if action is not open cell", () => {
  const toggleAction: IToggleCellAction = {
    type: "TOGGLE_CELL",
    payload: { row: 2, column: 2 }
  };
  expect(openCellReducer(defaultState, toggleAction, helperFunctions)).toEqual(
    defaultState
  );
});

it("should not change state if cell is out of bounds", () => {
  const action = { ...defaultAction, payload: { row: 100, column: 2 } };
  expect(openCellReducer(defaultState, action, helperFunctions)).toEqual(
    defaultState
  );
});

it("should not open opened cell", () => {
  const emptyField = openCells(defaultState.field, [{ row: 0, column: 0 }]);
  const state = { ...defaultState, field: emptyField };
  expect(openCellReducer(state, defaultAction, helperFunctions)).toEqual(state);
});

it("should not open cells if the game is finished", () => {
  const state = { ...defaultState, isFinished: true };
  expect(openCellReducer(state, defaultAction, helperFunctions)).toEqual(state);
});

it("should open one cell if mine is around", () => {
  const fieldWithMines = recalculateMinesAroundFactory(
    placeMines(defaultState.field, [{ row: 1, column: 1 }])
  );
  const openedFirstCell = openCells(fieldWithMines, [{ row: 0, column: 0 }]);
  const state = { ...defaultState, field: fieldWithMines };
  expect(openCellReducer(state, defaultAction, helperFunctions)).toEqual({
    ...defaultState,
    field: openedFirstCell
  });
});

it("should finish game and open all mines if mine is clicked", () => {
  const field = recalculateMinesAroundFactory(
    placeMines(defaultState.field, [
      { row: 0, column: 0 },
      { row: 0, column: 1 }
    ])
  );
  const openedMinesField = openAllMines(field);
  expect(
    openCellReducer({ ...defaultState, field }, defaultAction, helperFunctions)
  ).toEqual({
    ...defaultState,
    isFinished: true,
    field: openedMinesField,
    // game time => current time (5000) minus start time (3000)
    gameTimeMs: 2000
  });
});

it("should flag all mines if win condition is true", () => {
  const field = recalculateMinesAroundFactory(
    placeMines(defaultState.field, [
      { row: 0, column: 0 },
      { row: 1, column: 1 }
    ])
  );
  const openedOneCell = openCells(field, [{ row: 0, column: 1 }]);
  const openedTwoCells = openCells(openedOneCell, [{ row: 1, column: 0 }]);
  const flaggedMines = flagAllMines(openedTwoCells);
  const action = { ...defaultAction, payload: { row: 1, column: 0 } };
  expect(
    openCellReducer(
      { ...defaultState, field: openedOneCell },
      action,
      helperFunctions
    )
  ).toEqual({
    ...defaultState,
    isFinished: true,
    field: flaggedMines,
    // game time => current time (5000) minus start time (3000)
    gameTimeMs: 2000
  });
});

it("should generate field and open cell", () => {
  const gameOptions = { height: 9, width: 9, mines: 10 };
  // minimum difficulty is 2 for those options
  const state = {
    ...defaultState,
    mines: gameOptions.mines,
    field: generateEmptyField(gameOptions.width, gameOptions.height)
  };
  const fieldWithMines = placeMinesWithDifficultyFactory(
    state.field,
    state.mines,
    defaultAction.payload,
    2
  ).field;
  const fieldWithOpenedCell = openCells(
    fieldWithMines,
    findCellsToOpenFactory(fieldWithMines, defaultAction.payload)
  );
  const placeMinesMock = jest
    .fn()
    .mockReturnValue({ field: fieldWithMines, seed: "some seed" });
  const nextState = openCellReducer(state, defaultAction, {
    ...helperFunctions,
    placeMinesWithDifficulty: placeMinesMock
  });
  expect(nextState).toEqual({
    ...defaultState,
    mines: gameOptions.mines,
    seed: "some seed",
    field: fieldWithOpenedCell
  });
});

it("should return new seed if mines are generated", () => {
  const field = generateEmptyField(10, 10);
  expect(
    openCellReducer(
      { ...defaultState, field, mines: 10 },
      defaultAction,
      helperFunctions
    ).seed
  ).not.toBe(defaultState.seed);
});

it("should not open cell if it is flagged or questionMarked", () => {
  const cell: ICell = {
    row: 0,
    column: 0,
    flag: false,
    questionMark: false,
    open: false,
    isMine: false,
    minesAround: 0
  };
  const flag = { ...cell, flag: true };
  const questionMark = { ...cell, questionMark: true };
  const fieldWithFlag = [[flag, cell], [cell, cell]];
  const fieldWithQuestionMark = [[questionMark, cell], [cell, cell]];
  expect(
    openCellReducer(
      { ...defaultState, field: fieldWithFlag },
      defaultAction,
      helperFunctions
    ).field
  ).toBe(fieldWithFlag);
  expect(
    openCellReducer(
      { ...defaultState, field: fieldWithQuestionMark },
      defaultAction,
      helperFunctions
    ).field
  ).toBe(fieldWithQuestionMark);
});
