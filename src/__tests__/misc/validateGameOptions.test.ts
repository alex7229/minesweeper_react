import { validateGameOptions } from "../../misc/validateGameOptions";
import { IGameOptionsState } from "../../reducers/gameOptions";

it("should not validate if any param is not integer", () => {
  expect(validateGameOptions({ width: 6, height: 6, mines: 2.23 })).toBe(false);
  expect(validateGameOptions({ width: 6.56, height: 6, mines: 2 })).toBe(false);
  expect(validateGameOptions({ width: 7, height: 6.56, mines: 2 })).toBe(false);
});

it("should not validate if width or height is less than 4 or bigger than 100", () => {
  expect(validateGameOptions({ width: 4, height: 3, mines: 2 })).toBe(false);
  expect(validateGameOptions({ width: 3, height: 5, mines: 2 })).toBe(false);
  expect(validateGameOptions({ width: 105, height: 6, mines: 2 })).toBe(false);
  expect(validateGameOptions({ width: 6, height: 117, mines: 2 })).toBe(false);
});

it("should not validate if mines number is less than 1 or bigger than limit", () => {
  const defaultOptions: IGameOptionsState = {
    width: 5,
    height: 5,
    mines: 1
  };
  const limit = defaultOptions.width * defaultOptions.height - 9;

  expect(validateGameOptions({ ...defaultOptions, mines: 0 })).toBe(false);
  expect(validateGameOptions({ ...defaultOptions, mines: -1 })).toBe(false);
  expect(validateGameOptions({ ...defaultOptions, mines: limit })).toBe(true);
  expect(validateGameOptions({ ...defaultOptions, mines: limit + 1 })).toBe(
    false
  );
});
