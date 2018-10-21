import { getDigitsFromNumber } from "../../../application/logic/digits/getDigitsFromNumber";
import { validateDigitsSequence } from "../../../application/logic/validators/validateDigitsSequence";

it("should throw if number is not positive integer", () => {
  expect(() => getDigitsFromNumber(-17, validateDigitsSequence)).toThrow();
  expect(() => getDigitsFromNumber(25.45, validateDigitsSequence)).toThrow();
});

it("should generate correct sequence", () => {
  expect(getDigitsFromNumber(262, validateDigitsSequence)).toEqual([2, 6, 2]);
  expect(getDigitsFromNumber(64, validateDigitsSequence)).toEqual([6, 4]);
});

it("should prepend single digit with zeroes", () => {
  expect(getDigitsFromNumber(4, validateDigitsSequence)).toEqual([0, 4]);
});
