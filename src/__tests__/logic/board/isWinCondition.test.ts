import { generateEmptyField } from "../../../application/logic/board/generateEmptyField";
import { isWinCondition } from "../../../application/logic/board/isWinCondition";
import { openCells } from "../../../application/logic/board/openCells";
import { placeMines } from "../../../application/logic/board/placeMines";
import { Field, ICell } from "../../../application/reducers/toggleCellReducer";
import { findCellsToOpenFactory } from "../../../factories/logic/findCellsToOpenFactory";
import { recalculateMinesAroundFactory } from "../../../factories/logic/recalculateMinesAroundFactory";

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
