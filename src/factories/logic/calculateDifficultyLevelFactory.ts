import { calculateDifficultyLevel } from "../../application/logic/calculateDifficultyLevel";
import { openCells } from "../../application/logic/openCells";
import { Field } from "../../reducers/processRightClick";
import { findCellsToOpenFactory } from "./findCellsToOpenFactory";

export type CalculateDifficultyLevelFactory = (field: Field) => number;

export const calculateDifficultyLevelFactory: CalculateDifficultyLevelFactory = field =>
  calculateDifficultyLevel(field, findCellsToOpenFactory, openCells);
