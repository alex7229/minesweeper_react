import { generateEmptyField } from "../../../application/logic/generateEmptyField";
import { isWinCondition } from "../../../application/logic/isWinCondition";
import { openCells } from "../../../application/logic/openCells";
import { placeMines } from "../../../application/logic/placeMines";
import { findCellsToOpenFactory } from "../../../factories/findCellsToOpenFactory";
import { recalculateMinesAroundFactory } from "../../../factories/recalculateMinesAroundFactory";
import { Field, ICell } from "../../../reducers/processRightClick";

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
  const fieldWithMines = recalculateMinesAroundFactory(
    placeMines(game, [{ row: 2, column: 2 }])
  );
  const cellsToOpen = findCellsToOpenFactory(fieldWithMines, {
    row: 0,
    column: 0
  });
  const openedField = openCells(fieldWithMines, cellsToOpen);
  expect(isWinCondition(openedField)).toBe(true);
});

it("should return false if game is not finished", () => {
  const game = generateEmptyField(2, 2);
  const fieldWithMines = placeMines(game, [{ row: 0, column: 0 }]);
  expect(isWinCondition(fieldWithMines)).toBe(false);
});
