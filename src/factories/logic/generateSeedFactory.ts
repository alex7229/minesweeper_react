import { generateSeed } from "../../application/logic/generateSeed";

export type GenerateSeedFactory = () => string;

export const generateSeedFactory: GenerateSeedFactory = () =>
  generateSeed(Math.random);
