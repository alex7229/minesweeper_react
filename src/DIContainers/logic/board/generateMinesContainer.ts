import * as seedRandom from "seedrandom";
import { ICellPosition } from "../../../application/actions/actions";
import {
  generateMines,
  IGameConfig
} from "../../../application/logic/board/generateMines";

export type GenerateMinesContainer = (
  gameOptions: IGameConfig,
  seed: string,
  reservedPositions?: ReadonlyArray<ICellPosition>
) => ReadonlyArray<ICellPosition>;

export const generateMinesContainer: GenerateMinesContainer = (
  gameOptions,
  seed,
  reservedPositions
) => generateMines(gameOptions, seed, seedRandom, reservedPositions);
