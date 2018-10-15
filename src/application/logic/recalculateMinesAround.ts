import { Field } from "../../reducers/processRightClick";
import { FindCellsAround } from "./findCellsAround";

export type RecalculateMinesAround = (
  field: Field,
  findCellsAround: FindCellsAround
) => Field;

export const recalculateMinesAround: RecalculateMinesAround = (
  field,
  findCellsAround
) =>
  field.map(row =>
    row.map(cell => {
      const cellsAround = findCellsAround(field, {
        row: cell.row,
        column: cell.column
      });
      const minesCount = cellsAround.filter(currentCell => currentCell.isMine)
        .length;
      return { ...cell, minesAround: minesCount };
    })
  );
