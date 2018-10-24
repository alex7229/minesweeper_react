import { ICellPosition } from "../../../application/actions/actions";
import { openCells } from "../../../application/logic/board/openCells";
import { testEmptyCell } from "./generateEmptyField.test";

const defaultPosition: ICellPosition = { row: 1, column: 1 };
const emptyCell = { ...testEmptyCell };
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
