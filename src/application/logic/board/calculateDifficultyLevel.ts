import { FindCellsToOpenContainer } from "../../../DIContainers/logic/board/findCellsToOpenContainer";
import { Field } from "../../reducers/toggleCellReducer";
import { OpenCells } from "./openCells";
import { RestoreField } from "./restoreField";

export type CalculateDifficultyLevel = (
  field: Field,
  findCellsToOpen: FindCellsToOpenContainer,
  openCells: OpenCells,
  restoreField: RestoreField
) => number;

export const calculateDifficultyLevel: CalculateDifficultyLevel = (
  field,
  findCellsToOpen,
  openCells,
  restoreField
) => {
  let steps = 0;
  let currentField: Field = restoreField(field);
  // double loop is used in order to open cells with no mines around first
  for (let row = 0; row < currentField.length; row++) {
    for (let column = 0; column < currentField[row].length; column++) {
      const cell = currentField[row][column];
      if (!cell.open && !cell.isMine && cell.minesAround === 0) {
        steps++;
        currentField = openCells(
          currentField,
          findCellsToOpen(currentField, { row, column })
        );
      }
    }
  }
  for (let row = 0; row < currentField.length; row++) {
    for (let column = 0; column < currentField[row].length; column++) {
      const cell = currentField[row][column];
      if (!cell.open && !cell.isMine) {
        steps++;
        currentField = openCells(
          currentField,
          findCellsToOpen(currentField, { row, column })
        );
      }
    }
  }
  return steps;
};
