import { ICellPosition } from "../../Cell";
import { findCellsAround } from "../../misc/findCellsAround";
import { generateEmptyField } from "../../misc/generateEmptyField";
import { ICell, Row } from "../../reducers/processRightClick";

const cell: ICell = {
  column: 0,
  row: 0,
  flag: false,
  isMine: false,
  minesAround: 0,
  open: false,
  questionMark: false
};

const field = generateEmptyField(3, 3);

it("should find all cells in the middle", () => {
  const position: ICellPosition = { column: 1, row: 1 };
  const cellsAround: Row = [
    { ...cell, column: 0, row: 0 },
    { ...cell, column: 1, row: 0 },
    { ...cell, column: 2, row: 0 },
    { ...cell, column: 0, row: 1 },
    { ...cell, column: 2, row: 1 },
    { ...cell, column: 0, row: 2 },
    { ...cell, column: 1, row: 2 },
    { ...cell, column: 2, row: 2 }
  ];
  expect(findCellsAround(field, position)).toEqual(cellsAround);
});

it("should find all cells in the bottom right corner", () => {
  const position: ICellPosition = { column: 2, row: 2 };
  const cellsAround: Row = [
    { ...cell, column: 1, row: 1 },
    { ...cell, column: 2, row: 1 },
    { ...cell, column: 1, row: 2 }
  ];
  expect(findCellsAround(field, position)).toEqual(cellsAround);
});

it("should find all cells on the left border", () => {
  const position: ICellPosition = { column: 0, row: 1 };
  const cellsAround: Row = [
    { ...cell, column: 0, row: 0 },
    { ...cell, column: 1, row: 0 },
    { ...cell, column: 1, row: 1 },
    { ...cell, column: 0, row: 2 },
    { ...cell, column: 1, row: 2 }
  ];
  expect(findCellsAround(field, position)).toEqual(cellsAround);
});
