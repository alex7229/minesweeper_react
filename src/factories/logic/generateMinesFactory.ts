import * as seedRandom from "seedrandom";
import { ICellPosition } from "../../actions";
import { generateMines } from "../../application/logic/generateMines";
import { IGameOptionsState } from "../../reducers/gameOptionsReducer";

export type GenerateMinesFactory = (
  gameOptions: IGameOptionsState,
  seed: string
) => ReadonlyArray<ICellPosition>;

export const generateMinesFactory: GenerateMinesFactory = (gameOptions, seed) =>
  generateMines(gameOptions, seed, seedRandom);
