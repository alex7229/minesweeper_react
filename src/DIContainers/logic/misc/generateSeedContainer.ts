import { generateSeed } from "../../../application/logic/misc/generateSeed";

export type GenerateSeedContainer = () => string;

export const generateSeedContainer: GenerateSeedContainer = () =>
  generateSeed(Math.random);
