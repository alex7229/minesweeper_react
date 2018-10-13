import { validateGameOptions } from "../validateGameOptions";

it("should not validate if any param is not integer", () => {
  expect(validateGameOptions(6, 6, 2.23)).toBe(false);
  expect(validateGameOptions(6.56, 6, 2)).toBe(false);
  expect(validateGameOptions(7, 6.56, 2)).toBe(false);
});

it("should not validate if width or height is less than 4 or bigger than 100", () => {
  expect(validateGameOptions(4, 3, 2)).toBe(false);
  expect(validateGameOptions(3, 5, 2)).toBe(false);
  expect(validateGameOptions(105, 6, 2)).toBe(false);
  expect(validateGameOptions(6, 117, 2)).toBe(false);
});

it("should not validate if mines number is less than 1 or bigger than limit", () => {
  const width = 5;
  const height = 5;
  const limit = width * height - 9;

  expect(validateGameOptions(4, 4, 0)).toBe(false);
  expect(validateGameOptions(4, 4, -1)).toBe(false);
  expect(validateGameOptions(width, height, limit)).toBe(true);
  expect(validateGameOptions(width, height, limit + 1)).toBe(false);
});
