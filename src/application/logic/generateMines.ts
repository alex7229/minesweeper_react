import { ICellPosition } from "../../actions";

type RNG = () => number;
type SeedRandom = (seed: string) => RNG;

export type GenerateMines = (
  width: number,
  height: number,
  mines: number,
  seed: string,
  seedRandom: SeedRandom
) => ReadonlyArray<ICellPosition>;

export const generateMines: GenerateMines = (
  width,
  height,
  mines,
  seed,
  seedRandom
) => {
  const mathRandom = seedRandom(seed);
  const emptyCells: number[] = [];
  for (let i = 0; i < width * height; i++) {
    emptyCells.push(i);
  }
  const generatedMines: ICellPosition[] = [];
  for (let i = 0; i < mines; i++) {
    const mineIndex = Math.floor(mathRandom() * emptyCells.length);
    const mineNumber = emptyCells[mineIndex];
    emptyCells.splice(mineIndex, 1);
    const row = Math.floor(mineNumber / width);
    const column = mineNumber % width;
    generatedMines.push({ row, column });
  }
  return generatedMines;
};
