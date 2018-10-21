import { ICellPosition } from "../../../application/actions/actions";
import { generateEmptyField } from "../../../application/logic/board/generateEmptyField";
import { placeMines } from "../../../application/logic/board/placeMines";

it("should place mines properly", () => {
  const field = generateEmptyField(4, 4);
  const mines: ICellPosition[] = [{ row: 2, column: 2 }, { row: 0, column: 3 }];
  const fieldWithMines = placeMines(field, mines);
  expect(fieldWithMines[2][2].isMine).toBe(true);
  expect(fieldWithMines[0][3].isMine).toBe(true);
  const minesCount = fieldWithMines
    .reduce((rows, currentRow) => rows.concat(currentRow), [])
    .filter(cell => cell.isMine).length;
  expect(minesCount).toBe(2);
});
