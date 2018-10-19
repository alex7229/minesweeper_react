import { ICellPosition } from "../actions/actions";
import { IGameOptionsState } from "../reducers/gameOptionsReducer";

type RNG = () => number;
type SeedRandom = (seed: string) => RNG;

export type GenerateMines = (
  gameOptions: IGameOptionsState,
  seed: string,
  seedRandom: SeedRandom,
  reservedPositions?: ReadonlyArray<ICellPosition>
) => ReadonlyArray<ICellPosition>;

export const generateMines: GenerateMines = (
  { width, height, mines },
  seed,
  seedRandom,
  reservedPositions = []
) => {
  if (mines > width * height - reservedPositions.length) {
    throw new Error("there is not enough room to place all mines");
  }
  const mathRandom = seedRandom(seed);
  const emptyCells: number[] = [];
  for (let i = 0; i < width * height; i++) {
    emptyCells.push(i);
  }
  const generatedMines: ICellPosition[] = [];
  let minesLeft = mines;
  while (minesLeft > 0) {
    const mineIndex = Math.floor(mathRandom() * emptyCells.length);
    const mineNumber = emptyCells[mineIndex];
    const row = Math.floor(mineNumber / width);
    const column = mineNumber % width;
    const isPositionReserved =
      reservedPositions.find(
        reservedPosition =>
          reservedPosition.column === column && reservedPosition.row === row
      ) !== undefined;
    if (isPositionReserved) {
      continue;
    }
    minesLeft--;
    emptyCells.splice(mineIndex, 1);
    generatedMines.push({ row, column });
  }
  return generatedMines;
};
