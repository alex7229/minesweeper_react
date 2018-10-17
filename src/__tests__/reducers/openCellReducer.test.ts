import { IOpenCellAction, IToggleCellAction } from "../../application/actions";
import { flagAllMines } from "../../application/logic/flagAllMines";
import { generateEmptyField } from "../../application/logic/generateEmptyField";
import { isWinCondition } from "../../application/logic/isWinCondition";
import { openAllMines } from "../../application/logic/openAllMines";
import { openCells } from "../../application/logic/openCells";
import { placeMines } from "../../application/logic/placeMines";
import {
  IOpenCellReducerState,
  openCellReducer
} from "../../application/reducers/openCellReducer";
import { findCellsToOpenFactory } from "../../factories/logic/findCellsToOpenFactory";
import { recalculateMinesAroundFactory } from "../../factories/logic/recalculateMinesAroundFactory";

const defaultState: IOpenCellReducerState = {
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
  isWinCondition
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
  ).toEqual({ isFinished: true, field: openedMinesField });
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
  ).toEqual({ isFinished: true, field: flaggedMines });
});
