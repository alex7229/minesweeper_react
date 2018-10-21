import { generateSeed } from "../../application/logic/misc/generateSeed";

export type GenerateSeedFactory = () => string;

export const generateSeedFactory: GenerateSeedFactory = () =>
  generateSeed(Math.random);
