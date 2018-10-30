import { restoreField } from "../../../application/logic/board/restoreField";
import { testEmptyCell } from "./generateEmptyField.test";

it("should close all cells and remove flags", () => {
  const cell = { ...testEmptyCell };
  const flaggedCell = { ...cell, flag: true };
  const openCell = { ...cell, open: true };
  const mine = { ...cell, isMine: true };
  const field = [[cell, flaggedCell, flaggedCell], [openCell, openCell, mine]];
  expect(restoreField(field)).toEqual([[cell, cell, cell], [cell, cell, mine]]);
});
