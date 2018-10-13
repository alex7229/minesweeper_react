import { ICellPosition } from "../actions";
import { openCells } from "../openCells";
import { ICell } from "../reducers/processRightClick";

const defaultPosition: ICellPosition = { row: 1, column: 1 };
const emptyCell: ICell = {
  row: 0,
  column: 0,
  flag: false,
  isMine: false,
  minesAround: 0,
  open: false,
  questionMark: false
};
const openedCell = { ...emptyCell, open: true };

it("should not throw if the cell is out of bounds", () => {
  expect(() => openCells([[emptyCell]], [defaultPosition])).not.toThrow();
});

it("should open multiple cells", () => {
  const field = [[emptyCell, emptyCell], [emptyCell, emptyCell]];
  const positions: ICellPosition[] = [
    { column: 0, row: 0 },
    { column: 1, row: 1 }
  ];
  expect(openCells(field, positions)).toEqual([
    [openedCell, emptyCell],
    [emptyCell, openedCell]
  ]);
});
