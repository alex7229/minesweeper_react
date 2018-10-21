type GetRandomNumber = () => number;

export type GenerateSeed = (getRandomNumber: GetRandomNumber) => string;

// multiplying by 10^17 ensures there is no dot in seed
// it's completely optional
export const generateSeed: GenerateSeed = getRandomNumber =>
  (getRandomNumber() * 10 ** 17).toString(32);
