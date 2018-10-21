import { calculateCells } from "../../../application/logic/board/calculateCells";
import { findCellsAround } from "../../../application/logic/board/findCellsAround";
import { generateEmptyField } from "../../../application/logic/board/generateEmptyField";
import { placeMines } from "../../../application/logic/board/placeMines";
import { placeMinesWithDifficulty } from "../../../application/logic/board/placeMinesWithDifficulty";
import { calculateDifficultyLevelFactory } from "../../../factories/logic/calculateDifficultyLevelFactory";
import { generateMinesFactory } from "../../../factories/logic/generateMinesFactory";
import { generateSeedFactory } from "../../../factories/logic/generateSeedFactory";
import { recalculateMinesAroundFactory } from "../../../factories/logic/recalculateMinesAroundFactory";

const helperFunctions = {
  calculateDifficultyLevel: calculateDifficultyLevelFactory,
  generateMines: generateMinesFactory,
  placeMines,
  findCellsAround,
  recalculateMinesAround: recalculateMinesAroundFactory,
  generateSeed: generateSeedFactory
};

it("should use seed provided by generateSeed func", () => {
  const field = generateEmptyField(3, 3);
  const seedMock = jest.fn().mockReturnValue("seed");
  const result = placeMinesWithDifficulty(
    field,
    5,
    { row: 0, column: 0 },
    { ...helperFunctions, generateSeed: seedMock }
  );
  expect(result.seed).toBe("seed");
});

it("should not place mines in the adjusted cells to clicked cell", () => {
  const field = generateEmptyField(3, 3);
  const result = placeMinesWithDifficulty(
    field,
    5,
    { row: 0, column: 0 },
    helperFunctions
  );
  expect(calculateCells(result.field, "mine")).toBe(5);
  expect(result.field[0][0].isMine).toBe(false);
  expect(result.field[0][1].isMine).toBe(false);
  expect(result.field[1][0].isMine).toBe(false);
  expect(result.field[1][1].isMine).toBe(false);
});

it("should generate mines until minDifficulty is satisfied", () => {
  const field = generateEmptyField(3, 3);
  const difficultyMock = jest
    .fn()
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(12)
    .mockReturnValueOnce(22)
    .mockReturnValueOnce(45);
  placeMinesWithDifficulty(
    field,
    1,
    { row: 0, column: 0 },
    {
      ...helperFunctions,
      calculateDifficultyLevel: difficultyMock
    },
    22
  );
  expect(difficultyMock.mock.calls.length).toBe(3);
});
