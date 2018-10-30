import { Field } from "../../reducers/toggleCellReducer";
import { CalculateCells } from "./calculateCells";

export interface IGameConfig {
  readonly mines: number;
  readonly width: number;
  readonly height: number;
}

export type InferGameConfig = (
  field: Field,
  calculateCells: CalculateCells
) => IGameConfig;

export const inferGameConfig: InferGameConfig = (field, calculateCells) => ({
  height: field.length,
  width: field[0].length,
  mines: calculateCells(field, "mine")
});
