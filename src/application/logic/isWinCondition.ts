import { Field } from "../../reducers/processRightClick";

export type IsWinCondition = (field: Field) => boolean;

export const isWinCondition: IsWinCondition = field => {
  let allCellsAreOpened = true;
  let allMinesAreFlagged = true;
  for (const row of field) {
    for (const cell of row) {
      if (cell.isMine && !cell.flag) {
        allMinesAreFlagged = false;
      }
      if (!cell.isMine && !cell.open) {
        allCellsAreOpened = false;
      }
    }
  }
  return allCellsAreOpened || allMinesAreFlagged;
};
