import { Field } from "../reducers/rightClickReducer";

export type FlagAllMines = (field: Field) => Field;

export const flagAllMines: FlagAllMines = field =>
  field.map(row =>
    row.map(
      cell => (cell.isMine ? { ...cell, flag: true } : { ...cell, flag: false })
    )
  );
