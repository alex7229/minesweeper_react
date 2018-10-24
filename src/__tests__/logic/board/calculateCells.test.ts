import { calculateCells } from "../../../application/logic/board/calculateCells";
import { generateEmptyField } from "../../../application/logic/board/generateEmptyField";
import { placeMines } from "../../../application/logic/board/placeMines";
import { Field, ICell } from "../../../application/reducers/toggleCellReducer";
import { generateMinesContainer } from "../../../DIContainers/logic/board/generateMinesContainer";
import { recalculateMinesAroundContainer } from "../../../DIContainers/logic/board/recalculateMinesAroundContainer";
import { testEmptyCell } from "./generateEmptyField.test";

const cell = { ...testEmptyCell };

it("should return correct flags number", () => {
  const flagCell: ICell = { ...cell, flag: true };
  const emptyField = [[cell, cell], [cell, cell]];
  const field: Field = [[cell, flagCell], [flagCell, flagCell]];
  expect(calculateCells(emptyField, "flag")).toBe(0);
  expect(calculateCells(field, "flag")).toBe(3);
});

it("should return correct mines number", () => {
  const emptyField = generateEmptyField(20, 20);
  const mines = generateMinesContainer(
    { width: 20, height: 20, mines: 117 },
    "hello"
  );
  const fieldWithMines = recalculateMinesAroundContainer(
    placeMines(emptyField, mines)
  );
  expect(calculateCells(emptyField, "mine")).toBe(0);
  expect(calculateCells(fieldWithMines, "mine")).toBe(117);
});

it("should return correct active mines number", () => {
  // it can be either one or nill
  expect(calculateCells(generateEmptyField(5, 5), "active_mine")).toBe(0);
  const activeMine = { ...cell, isMine: true, isMineActive: true };
  const fieldWithActiveMine = [[cell, cell], [cell, activeMine]];
  expect(calculateCells(fieldWithActiveMine, "active_mine")).toBe(1);
});
