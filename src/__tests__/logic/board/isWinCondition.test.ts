import { generateEmptyField } from "../../../application/logic/board/generateEmptyField";
import { isWinCondition } from "../../../application/logic/board/isWinCondition";
import { openCells } from "../../../application/logic/board/openCells";
import { placeMines } from "../../../application/logic/board/placeMines";
import { Field } from "../../../application/reducers/toggleCellReducer";
import { findCellsToOpenContainer } from "../../../DIContainers/logic/board/findCellsToOpenContainer";
import { recalculateMinesAroundContainer } from "../../../DIContainers/logic/board/recalculateMinesAroundContainer";
import { testEmptyCell } from "./generateEmptyField.test";

it("should return true if all flags are placed on top of mines", () => {
  const emptyCell = { ...testEmptyCell };
  const flaggedMine = { ...emptyCell, isMine: true, flag: true };
  const field: Field = [
    [emptyCell, { ...flaggedMine, column: 1 }],
    [{ ...emptyCell, row: 1, column: 0 }, { ...flaggedMine, row: 1, column: 1 }]
  ];
  expect(isWinCondition(field)).toBe(true);
});

it("should return true if all possible cells are opened", () => {
  const game = generateEmptyField(3, 3);
  const fieldWithMines = recalculateMinesAroundContainer(
    placeMines(game, [{ row: 2, column: 2 }])
  );
  const cellsToOpen = findCellsToOpenContainer(fieldWithMines, {
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
