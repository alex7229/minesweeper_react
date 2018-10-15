import { generateEmptyField } from "../../application/logic/generateEmptyField";
import { Field, ICell } from "../../application/reducers/toggleCellReducer";

const cell: ICell = {
  column: 0,
  row: 0,
  open: false,
  flag: false,
  questionMark: false,
  minesAround: 0,
  isMine: false
};

it("should generate 1 by 1 field", () => {
  expect(generateEmptyField(1, 1)).toEqual([[cell]]);
});

it("should generate 3 by 2 field", () => {
  const topLeft = { ...cell, column: 0, row: 0 };
  const topMiddle = { ...cell, column: 1, row: 0 };
  const topRight = { ...cell, column: 2, row: 0 };
  const bottomLeft = { ...cell, column: 0, row: 1 };
  const bottomMiddle = { ...cell, column: 1, row: 1 };
  const bottomRight = { ...cell, column: 2, row: 1 };
  const field: Field = [
    [topLeft, topMiddle, topRight],
    [bottomLeft, bottomMiddle, bottomRight]
  ];
  expect(generateEmptyField(3, 2)).toEqual(field);
});
