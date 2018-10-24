import * as _ from "lodash";
import { ICellPosition } from "../../../application/actions/actions";
import { findCellsAround } from "../../../application/logic/board/findCellsAround";
import { findCellsToOpen } from "../../../application/logic/board/findCellsToOpen";
import { generateEmptyField } from "../../../application/logic/board/generateEmptyField";
import { placeMines } from "../../../application/logic/board/placeMines";
import { Field } from "../../../application/reducers/toggleCellReducer";
import { recalculateMinesAroundContainer } from "../../../DIContainers/logic/board/recalculateMinesAroundContainer";
import { testEmptyCell } from "./generateEmptyField.test";

const emptyCell = { ...testEmptyCell };

const mine = { ...emptyCell, isMine: true };
const openedCell = { ...emptyCell, open: true };

const defaultPosition: ICellPosition = { column: 1, row: 1 };

it("should throw if current cell is mine", () => {
  const field: Field = [[emptyCell, emptyCell], [emptyCell, mine]];
  expect(() =>
    findCellsToOpen(field, defaultPosition, findCellsAround)
  ).toThrow();
});

it("should throw if current cell is opened", () => {
  const field: Field = [[emptyCell, emptyCell], [emptyCell, openedCell]];
  expect(() =>
    findCellsToOpen(field, defaultPosition, findCellsAround)
  ).toThrow();
});

it("should throw if current cell is  out of bounds", () => {
  const field: Field = [[emptyCell]];
  expect(() =>
    findCellsToOpen(field, { row: 23, column: 17 }, findCellsAround)
  ).toThrow();
});

it("should return only one cell if it is around mine", () => {
  const field = generateEmptyField(2, 2);
  const fieldWithMines = recalculateMinesAroundContainer(
    placeMines(field, [{ row: 0, column: 0 }])
  );
  expect(
    findCellsToOpen(fieldWithMines, { row: 0, column: 1 }, findCellsAround)
  ).toEqual([fieldWithMines[0][1]]);
});

it("should return all cells if field is empty", () => {
  const field = generateEmptyField(2, 2);
  const emptyCells = [field[0][0], field[0][1], field[1][0], field[1][1]];
  const foundCellsUnsorted = findCellsToOpen(
    field,
    defaultPosition,
    findCellsAround
  );
  const foundCellsSorted = _.orderBy(foundCellsUnsorted, ["row", "column"]);
  expect(foundCellsSorted).toEqual(emptyCells);
});

it("should return complex grid from 5 by 3 field", () => {
  const field = generateEmptyField(5, 3);
  const mines = [{ row: 0, column: 1 }, { row: 2, column: 2 }];
  const topRightPosition = { row: 0, column: 4 };
  const fieldWithMines = recalculateMinesAroundContainer(
    placeMines(field, mines)
  );
  // closed, mine,   open,  open,  start
  // closed, closed, open,  open,  open
  // closed, closed, mine,  open,  open
  const emptyCells = [
    fieldWithMines[0][2],
    fieldWithMines[0][3],
    fieldWithMines[0][4],
    fieldWithMines[1][2],
    fieldWithMines[1][3],
    fieldWithMines[1][4],
    fieldWithMines[2][3],
    fieldWithMines[2][4]
  ];
  const openCellsUnsorted = findCellsToOpen(
    fieldWithMines,
    topRightPosition,
    findCellsAround
  );
  const openCellsSorted = _.orderBy(openCellsUnsorted, ["row", "column"]);
  expect(openCellsSorted).toEqual(emptyCells);
});

it("should not try to open opened cell", () => {
  const field = generateEmptyField(3, 2);
  // @ts-ignore
  field[0][0].open = true;
  const cellsToOpen = findCellsToOpen(
    field,
    { row: 0, column: 1 },
    findCellsAround
  );
  const cellsToOpenSorted = _.orderBy(cellsToOpen, ["row", "column"]);
  expect(cellsToOpenSorted).toEqual([
    field[0][1],
    field[0][2],
    field[1][0],
    field[1][1],
    field[1][2]
  ]);
});
