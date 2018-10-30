import * as seedRandom from "seedrandom";
import { ICellPosition } from "../../../application/actions/actions";
import { generateMines } from "../../../application/logic/board/generateMines";
import { IGameConfig } from "../../../application/logic/board/inferGameConfig";

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
