import { openAllMines } from "../../../application/logic/openAllMines";
import { Field, ICell } from "../../../reducers/processRightClick";

it("should open all mines", () => {
  const emptyCell: ICell = {
    flag: false,
    questionMark: false,
    open: false,
    isMine: false,
    row: 0,
    column: 0,
    minesAround: 3
  };
  const closedMine = { ...emptyCell, isMine: true };
  const openedMine = { ...closedMine, open: true };
  // for the sake of simplicity row and columns are all zeroes
  const field: Field = [[emptyCell, closedMine], [closedMine, closedMine]];
  expect(openAllMines(field)).toEqual([
    [emptyCell, openedMine],
    [openedMine, openedMine]
  ]);
});
