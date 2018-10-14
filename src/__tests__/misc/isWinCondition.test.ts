import { findCellsAround } from "../../misc/findCellsAround";
import { findCellsToOpen } from "../../misc/findCellsToOpen";
import { generateEmptyField } from "../../misc/generateEmptyField";
import { isWinCondition } from "../../misc/isWinCondition";
import { openCells } from "../../misc/openCells";
import { placeMines } from "../../misc/placeMines";
import { recalculateMinesAround } from "../../misc/recalculateMinesAround";
import { Field, ICell } from "../../reducers/processRightClick";

it("should return true if all flags are placed on top of mines", () => {
  const emptyCell: ICell = {
    flag: false,
    questionMark: false,
    minesAround: 2,
    isMine: false,
    row: 0,
    column: 0,
    open: false
  };
  const flaggedMine = { ...emptyCell, isMine: true, flag: true };
  const field: Field = [
    [emptyCell, { ...flaggedMine, column: 1 }],
    [{ ...emptyCell, row: 1, column: 0 }, { ...flaggedMine, row: 1, column: 1 }]
  ];
  expect(isWinCondition(field)).toBe(true);
});

it("should return true if all possible cells are opened", () => {
  const game = generateEmptyField(3, 3);
  const fieldWithMines = recalculateMinesAround(
    placeMines(game, [{ row: 2, column: 2 }]),
    findCellsAround
  );
  const cellsToOpen = findCellsToOpen(
    fieldWithMines,
    { row: 0, column: 0 },
    findCellsAround
  );
  const openedField = openCells(fieldWithMines, cellsToOpen);
  expect(isWinCondition(openedField)).toBe(true);
});

it("should return false if game is not finished", () => {
  const game = generateEmptyField(2, 2);
  const fieldWithMines = placeMines(game, [{ row: 0, column: 0 }]);
  expect(isWinCondition(fieldWithMines)).toBe(false);
});
