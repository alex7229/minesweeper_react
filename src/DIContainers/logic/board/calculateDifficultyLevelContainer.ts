import { calculateDifficultyLevel } from "../../../application/logic/board/calculateDifficultyLevel";
import { openCells } from "../../../application/logic/board/openCells";
import { restoreField } from "../../../application/logic/board/restoreField";
import { Field } from "../../../application/reducers/toggleCellReducer";
import { findCellsToOpenContainer } from "./findCellsToOpenContainer";

export type CalculateDifficultyLevelContainer = (field: Field) => number;

export const calculateDifficultyLevelContainer: CalculateDifficultyLevelContainer = field =>
  calculateDifficultyLevel(
    field,
    findCellsToOpenContainer,
    openCells,
    restoreField
  );
