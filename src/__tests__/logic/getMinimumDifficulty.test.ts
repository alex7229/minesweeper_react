import { generateEmptyField } from "../../application/logic/generateEmptyField";
import { getMinumumDifficulty } from "../../application/logic/getMinimumDifficulty";

it("should return 2 for beginner", () => {
  const field = generateEmptyField(9, 9);
  expect(getMinumumDifficulty(field, 10)).toBe(2);
});

it("should return 30 for advanced", () => {
  const field = generateEmptyField(16, 16);
  expect(getMinumumDifficulty(field, 40)).toBe(30);
});

it("should return 100 for expert", () => {
  const field = generateEmptyField(30, 16);
  expect(getMinumumDifficulty(field, 99));
});

it("should return 1 for any other numbers", () => {
  const beginnerField = generateEmptyField(9, 9);
  expect(getMinumumDifficulty(beginnerField, 2)).toBe(1);
  const customField = generateEmptyField(15, 42);
  expect(getMinumumDifficulty(customField, 55)).toBe(1);
});
