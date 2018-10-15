import * as seedRandom from "seedrandom";
import { ICellPosition } from "../../application/actions";
import { generateMines } from "../../application/logic/generateMines";
import { IGameOptionsState } from "../../application/reducers/gameOptionsReducer";

export type GenerateMinesFactory = (
  gameOptions: IGameOptionsState,
  seed: string
) => ReadonlyArray<ICellPosition>;

export const generateMinesFactory: GenerateMinesFactory = (gameOptions, seed) =>
  generateMines(gameOptions, seed, seedRandom);
