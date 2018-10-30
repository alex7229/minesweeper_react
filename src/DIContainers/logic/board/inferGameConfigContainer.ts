import { calculateCells } from "../../../application/logic/board/calculateCells";
import {
  IGameConfig,
  inferGameConfig
} from "../../../application/logic/board/inferGameConfig";
import { Field } from "../../../application/reducers/toggleCellReducer";

export type InferGameConfigContainer = (field: Field) => IGameConfig;

export const inferGameConfigContainer: InferGameConfigContainer = field =>
  inferGameConfig(field, calculateCells);
