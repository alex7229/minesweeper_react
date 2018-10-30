import { Field } from "../../reducers/toggleCellReducer";

export type RestoreField = (field: Field) => Field;

export const restoreField: RestoreField = field =>
  field.map(row => row.map(cell => ({ ...cell, open: false, flag: false })));
