import { calculateCells } from "../../../application/logic/board/calculateCells";
import { generateEmptyField } from "../../../application/logic/board/generateEmptyField";
import { inferGameConfig } from "../../../application/logic/board/inferGameConfig";
import { placeMinesWithDifficultyContainer } from "../../../DIContainers/logic/board/placeMinesWithDifficultyContainer";

it("should infer game config properly", () => {
  const field = generateEmptyField(15, 23);
  const fieldWithMines = placeMinesWithDifficultyContainer(field, 6, {
    row: 0,
    column: 0
  }).field;
  expect(inferGameConfig(fieldWithMines, calculateCells)).toEqual({
    width: 15,
    height: 23,
    mines: 6
  });
});
