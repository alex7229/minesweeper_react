import { flagAllMines } from "../../../application/logic/flagAllMines";
import { Field, ICell } from "../../../reducers/processRightClick";

it("should remove all extra flags and place them on mines", () => {
  const emptyCell: ICell = {
    flag: false,
    open: false,
    questionMark: false,
    minesAround: 2,
    isMine: false,
    column: 0,
    row: 0
  };
  const flaggedCell = { ...emptyCell, flag: true };
  const flaggedMine = { ...flaggedCell, isMine: true };
  const unflaggedMine = { ...emptyCell, isMine: true };
  const field: Field = [[emptyCell, flaggedCell], [flaggedMine, unflaggedMine]];
  expect(flagAllMines(field)).toEqual([
    [emptyCell, emptyCell],
    [flaggedMine, flaggedMine]
  ]);
});
