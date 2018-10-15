import { Field } from "../../reducers/processRightClick";

export type OpenAllMines = (field: Field) => Field;

export const openAllMines: OpenAllMines = field =>
  field.map(row =>
    row.map(cell => (cell.isMine ? { ...cell, open: true } : cell))
  );