import { ICellPosition } from "../Cell";
import { findCellsAround } from "../findCellsAround";
import { Field, ICell } from "../reducers/processRightClick";

const cell: ICell = {
  flag: false,
  isMine: false,
  minesAround: 0,
  open: false,
  questionMark: false
};

const field: Field = [
  [cell, cell, cell],
  [cell, cell, cell],
  [cell, cell, cell]
];

it("should find all cells in the middle", () => {
  const position: ICellPosition = { column: 1, row: 1 };
  const cellsAround: ICellPosition[] = [
    { column: 0, row: 0 },
    { column: 1, row: 0 },
    { column: 2, row: 0 },
    { column: 0, row: 1 },
    { column: 2, row: 1 },
    { column: 0, row: 2 },
    { column: 1, row: 2 },
    { column: 2, row: 2 }
  ];
  expect(findCellsAround(field, position)).toEqual(cellsAround);
});

it("should find all cells in the bottom right corner", () => {
  const position: ICellPosition = { column: 2, row: 2 };
  const cellsAround: ICellPosition[] = [
    { column: 1, row: 1 },
    { column: 2, row: 1 },
    { column: 1, row: 2 }
  ];
  expect(findCellsAround(field, position)).toEqual(cellsAround);
});

it("should find all cells on the left border", () => {
  const position: ICellPosition = { column: 0, row: 1 };
  const cellsAround: ICellPosition[] = [
    { column: 0, row: 0 },
    { column: 1, row: 0 },
    { column: 1, row: 1 },
    { column: 0, row: 2 },
    { column: 1, row: 2 }
  ];
  expect(findCellsAround(field, position)).toEqual(cellsAround);
});
