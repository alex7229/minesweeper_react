import { Field } from "../reducers/toggleCellReducer";

export type CalculateCells = (field: Field, type: "flag" | "mine") => number;

export const calculateCells: CalculateCells = (field, type) =>
  field
    .map(
      row =>
        row.filter(cell => (type === "flag" ? cell.flag : cell.isMine)).length
    )
    .reduce((totalCells, cellsInRow) => totalCells + cellsInRow);
