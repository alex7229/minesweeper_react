import { CalculateDifficultyLevelFactory } from "../../../factories/logic/board/calculateDifficultyLevelFactory";
import { GenerateMinesFactory } from "../../../factories/logic/board/generateMinesFactory";
import { GenerateSeedFactory } from "../../../factories/logic/misc/generateSeedFactory";
import { RecalculateMinesAroundFactory } from "../../../factories/logic/board/recalculateMinesAroundFactory";
import { ICellPosition } from "../../actions/actions";
import { Field } from "../../reducers/toggleCellReducer";
import { FindCellsAround } from "./findCellsAround";
import { PlaceMines } from "./placeMines";

export type PlaceMinesWithDifficulty = (
  field: Field,
  mines: number,
  // from position is first clicked cell. There should be no mines around it
  fromPosition: ICellPosition,
  functions: {
    calculateDifficultyLevel: CalculateDifficultyLevelFactory;
    generateMines: GenerateMinesFactory;
    placeMines: PlaceMines;
    findCellsAround: FindCellsAround;
    recalculateMinesAround: RecalculateMinesAroundFactory;
    generateSeed: GenerateSeedFactory;
  },
  minDificulty?: number
) => { field: Field; seed: string };

export const placeMinesWithDifficulty: PlaceMinesWithDifficulty = (
  field,
  mines,
  fromPosition,
  functions,
  minDifficulty = 1
) => {
  const height = field.length;
  const width = field[0].length;
  const cellsAround = [
    field[fromPosition.row][fromPosition.column],
    ...functions.findCellsAround(field, fromPosition)
  ];
  let currentDifficulty = -1;
  let currentSeed = "";
  let fieldWithMines = field;
  while (currentDifficulty < minDifficulty) {
    currentSeed = functions.generateSeed();
    const generatedMines = functions.generateMines(
      { height, width, mines },
      currentSeed,
      cellsAround
    );
    fieldWithMines = functions.recalculateMinesAround(
      functions.placeMines(field, generatedMines)
    );
    currentDifficulty = functions.calculateDifficultyLevel(fieldWithMines);
  }
  return { field: fieldWithMines, seed: currentSeed };
};
