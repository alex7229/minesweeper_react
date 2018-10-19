import { ICellPosition } from "../actions/actions";
import { Field, Row } from "../reducers/toggleCellReducer";
import { FindCellsAround } from "./findCellsAround";

export type FindCellsToOpen = (
  field: Field,
  currentCellPosition: ICellPosition,
  findCellsAround: FindCellsAround,
  foundCells?: Row
) => Row;

export const findCellsToOpen: FindCellsToOpen = (
  field,
  currentCellPosition,
  findCellsAround,
  foundCells = []
) => {
  const { row, column } = currentCellPosition;
  const currentCell = field[row] && field[row][column];
  if (!currentCell || currentCell.isMine || currentCell.open) {
    throw new Error("current cell should not be opened, mine or out of bounds");
  }
  let allFoundCells = [...foundCells, currentCell];
  if (currentCell.minesAround > 0) {
    return allFoundCells;
  }
  const cellsAround = findCellsAround(field, {
    row: currentCell.row,
    column: currentCell.column
  });
  for (const cellAround of cellsAround) {
    const cellIsUsed =
      allFoundCells.find(
        oldCell =>
          oldCell.column === cellAround.column && oldCell.row === cellAround.row
      ) !== undefined;
    if (!cellIsUsed && !cellAround.open) {
      const allOtherCells = findCellsToOpen(
        field,
        { row: cellAround.row, column: cellAround.column },
        findCellsAround,
        allFoundCells
      );
      allFoundCells = [...allOtherCells];
    }
  }
  return allFoundCells;
};
