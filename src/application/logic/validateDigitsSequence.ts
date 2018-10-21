import { DigitOrDot } from "../components/Digit";

export type ValidateDigitsSequence = (
  sequence: ReadonlyArray<number | string>
) => sequence is ReadonlyArray<DigitOrDot>;

export const validateDigitsSequence: ValidateDigitsSequence = (
  sequence
): sequence is ReadonlyArray<DigitOrDot> => {
  const allowedSymbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "dot"];
  return sequence.every(possibleDigit =>
    allowedSymbols.includes(possibleDigit)
  );
};
