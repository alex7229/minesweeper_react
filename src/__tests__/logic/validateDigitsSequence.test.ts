import { validateDigitsSequence } from "../../application/logic/validateDigitsSequence";

it("should validate digits properly", () => {
  const sequence = [1, 2, 5, 6, "dot"];
  expect(validateDigitsSequence(sequence)).toBe(true);
});

it("should not validate if numbers are not digits or random strings are present", () => {
  const badNumbers = [2, 5, 25];
  const badString = [2, 5, 2, "as", 5];
  expect(validateDigitsSequence(badNumbers)).toBe(false);
  expect(validateDigitsSequence(badString)).toBe(false);
});
