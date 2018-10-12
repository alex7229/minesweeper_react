import { calculateFlagsCount } from "../calculateFlagsCount";
import { Field, ICell } from "../reducers/processRightClick";

it("should return correct flags number", () => {
  const cell: ICell = { open: false, flag: false, questionMark: false };
  const flagCell: ICell = { open: false, flag: true, questionMark: false };
  const emptyField = [[cell, cell], [cell, cell]];
  const field: Field = [[cell, flagCell], [flagCell, flagCell]];
  expect(calculateFlagsCount(emptyField)).toBe(0);
  expect(calculateFlagsCount(field)).toBe(3);
});
