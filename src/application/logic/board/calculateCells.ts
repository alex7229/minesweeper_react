import { Field } from "../../reducers/toggleCellReducer";

export type CalculateCells = (
  field: Field,
  type: "flag" | "mine" | "active_mine"
) => number;

export const calculateCells: CalculateCells = (field, type) =>
  field
    .map(
      row =>
        row.filter(cell => {
          if (type === "flag" && cell.flag === true) {
            return true;
          }
          if (type === "mine" && cell.isMine === true) {
            return true;
          }
          if (type === "active_mine" && cell.isMineActive === true) {
            return true;
          }
          return false;
        }).length
    )
    .reduce((totalCells, cellsInRow) => totalCells + cellsInRow);
