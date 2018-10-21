import { ICellPosition } from "../../../application/actions/actions";
import { findCellsAround } from "../../../application/logic/board/findCellsAround";
import { placeMines } from "../../../application/logic/board/placeMines";
import { placeMinesWithDifficulty } from "../../../application/logic/board/placeMinesWithDifficulty";
import { Field } from "../../../application/reducers/toggleCellReducer";
import { generateSeedContainer } from "../misc/generateSeedContainer";
import { calculateDifficultyLevelContainer } from "./calculateDifficultyLevelContainer";
import { generateMinesContainer } from "./generateMinesContainer";
import { recalculateMinesAroundContainer } from "./recalculateMinesAroundContainer";

export type PlaceMinesWithDifficultyContainer = (
  field: Field,
  mines: number,
  fromPosition: ICellPosition,
  minDifficulty?: number
) => { field: Field; seed: string };

export const placeMinesWithDifficultyContainer: PlaceMinesWithDifficultyContainer = (
  field,
  mines,
  fromPosition,
  minDifficulty
) =>
  placeMinesWithDifficulty(
    field,
    mines,
    fromPosition,
    {
      calculateDifficultyLevel: calculateDifficultyLevelContainer,
      generateMines: generateMinesContainer,
      placeMines,
      findCellsAround,
      recalculateMinesAround: recalculateMinesAroundContainer,
      generateSeed: generateSeedContainer
    },
    minDifficulty
  );
