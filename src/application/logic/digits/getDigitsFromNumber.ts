import { DigitOrDot } from "../../components/Digit";
import { ValidateDigitsSequence } from "../validators/validateDigitsSequence";

export type GetDigitsFromNumber = (
  num: number,
  validateDigitsSequence: ValidateDigitsSequence
) => ReadonlyArray<DigitOrDot>;

export const getDigitsFromNumber: GetDigitsFromNumber = (
  num,
  validateDigitsSequence
) => {
  const roundedNum = Math.floor(num);
  if (roundedNum !== num || num < 0) {
    throw new Error("number should be a positive interger");
  }
  const digits = num
    .toString()
    .split("")
    .map(currentNumber => parseInt(currentNumber, 10));
  if (digits.length === 1) {
    digits.unshift(0);
  }
  if (!validateDigitsSequence(digits)) {
    // it is used to tell typescript that digits are in fact DigitOrDot array
    throw new Error("should not occure ever");
  }
  return digits;
};
