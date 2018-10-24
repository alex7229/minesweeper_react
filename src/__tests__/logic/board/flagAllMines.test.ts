import { flagAllMines } from "../../../application/logic/board/flagAllMines";
import { Field } from "../../../application/reducers/toggleCellReducer";
import { testEmptyCell } from "./generateEmptyField.test";

it("should remove all extra flags and place them on mines", () => {
  const emptyCell = { ...testEmptyCell };
  const flaggedCell = { ...emptyCell, flag: true };
  const flaggedMine = { ...flaggedCell, isMine: true };
  const unflaggedMine = { ...emptyCell, isMine: true };
  const field: Field = [[emptyCell, flaggedCell], [flaggedMine, unflaggedMine]];
  expect(flagAllMines(field)).toEqual([
    [emptyCell, emptyCell],
    [flaggedMine, flaggedMine]
  ]);
});
