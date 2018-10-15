import { Field } from "../../reducers/rightClickReducer";

export type CalculateFlagsCount = (field: Field) => number;

export const calculateFlagsCount: CalculateFlagsCount = field =>
  field
    .map(row => row.filter(cell => cell.flag).length)
    .reduce((totalFlags, flagsInRow) => totalFlags + flagsInRow);
