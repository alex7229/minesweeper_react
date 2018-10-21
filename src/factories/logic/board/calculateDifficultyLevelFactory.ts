import { calculateDifficultyLevel } from "../../../application/logic/board/calculateDifficultyLevel";
import { openCells } from "../../../application/logic/board/openCells";
import { Field } from "../../../application/reducers/toggleCellReducer";
import { findCellsToOpenFactory } from "./findCellsToOpenFactory";

export type CalculateDifficultyLevelFactory = (field: Field) => number;

export const calculateDifficultyLevelFactory: CalculateDifficultyLevelFactory = field =>
  calculateDifficultyLevel(field, findCellsToOpenFactory, openCells);
