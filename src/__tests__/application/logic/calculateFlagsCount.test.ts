import { calculateFlagsCount } from "../../../application/logic/calculateFlagsCount";
import { Field, ICell } from "../../../reducers/processRightClick";

it("should return correct flags number", () => {
  const cell = {
    row: 0,
    column: 0,
    isMine: false,
    minesAround: 0,
    open: false,
    flag: false,
    questionMark: false
  };
  const flagCell: ICell = { ...cell, flag: true };
  const emptyField = [[cell, cell], [cell, cell]];
  const field: Field = [[cell, flagCell], [flagCell, flagCell]];
  expect(calculateFlagsCount(emptyField)).toBe(0);
  expect(calculateFlagsCount(field)).toBe(3);
});
