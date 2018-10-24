import { CalculateDifficultyLevelContainer } from "../../../DIContainers/logic/board/calculateDifficultyLevelContainer";
import { GenerateMinesContainer } from "../../../DIContainers/logic/board/generateMinesContainer";
import { RecalculateMinesAroundContainer } from "../../../DIContainers/logic/board/recalculateMinesAroundContainer";
import { GenerateSeedContainer } from "../../../DIContainers/logic/misc/generateSeedContainer";
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
    calculateDifficultyLevel: CalculateDifficultyLevelContainer;
    generateMines: GenerateMinesContainer;
    placeMines: PlaceMines;
    findCellsAround: FindCellsAround;
    recalculateMinesAround: RecalculateMinesAroundContainer;
    generateSeed: GenerateSeedContainer;
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
    if (minDifficulty === 1) {
      // min difficulty 1 means  that this is custom field.
      // Checking difficulty is pointless
      currentDifficulty = 2;
    } else {
      currentDifficulty = functions.calculateDifficultyLevel(fieldWithMines);
    }
  }
  return { field: fieldWithMines, seed: currentSeed };
};
