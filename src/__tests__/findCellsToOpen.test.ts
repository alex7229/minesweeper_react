import * as _ from "lodash";
import { ICellPosition } from "../actions";
import { findCellsAround } from "../findCellsAround";
import { findCellsToOpen } from "../findCellsToOpen";
import { generateEmptyField } from "../generateEmptyField";
import { placeMines } from "../placeMines";
import { recalculateMinesAround } from "../recalculateMinesAround";
import { Field, ICell } from "../reducers/processRightClick";

const emptyCell: ICell = {
  column: 0,
  row: 0,
  flag: false,
  isMine: false,
  minesAround: 0,
  questionMark: false,
  open: false
};

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
  const fieldWithMines = recalculateMinesAround(
    placeMines(field, [{ row: 0, column: 0 }]),
    findCellsAround
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
  const fieldWithMines = recalculateMinesAround(
    placeMines(field, mines),
    findCellsAround
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
