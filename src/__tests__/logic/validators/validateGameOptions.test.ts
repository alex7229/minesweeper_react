import {
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_EMPTY_CELLS,
  MIN_HEIGHT,
  MIN_MINES,
  MIN_WIDTH
} from "../../../application/constants";
import { validateGameOptions } from "../../../application/logic/validators/validateGameOptions";

it("should call check number range with correct parameters", () => {
  const checkRange = jest.fn().mockReturnValue("");
  const options = { height: 10, width: 10, mines: 4 };
  validateGameOptions(options, checkRange);

  expect(checkRange.mock.calls.length).toBe(3);
  expect(checkRange.mock.calls[0][0]).toBe(options.width);
  expect(checkRange.mock.calls[0][1]).toBe(MIN_WIDTH);
  expect(checkRange.mock.calls[0][2]).toBe(MAX_WIDTH);

  expect(checkRange.mock.calls[1][0]).toBe(options.height);
  expect(checkRange.mock.calls[1][1]).toBe(MIN_HEIGHT);
  expect(checkRange.mock.calls[1][2]).toBe(MAX_HEIGHT);

  expect(checkRange.mock.calls[2][0]).toBe(options.mines);
  expect(checkRange.mock.calls[2][1]).toBe(MIN_MINES);
  const maxMines = options.width * options.height - MIN_EMPTY_CELLS;
  expect(checkRange.mock.calls[2][2]).toBe(maxMines);
});

it("should return true if all checks returned no errors", () => {
  const checkRange = jest.fn().mockReturnValue("");
  const options = { height: 10, width: 10, mines: 4 };
  expect(validateGameOptions(options, checkRange)).toBe(true);
});

it("should return false if first check returned an error", () => {
  const checkRange = jest
    .fn()
    .mockReturnValueOnce("width error")
    .mockReturnValueOnce("")
    .mockReturnValueOnce("");
  const options = { height: 10, width: 10, mines: 4 };
  expect(validateGameOptions(options, checkRange)).toBe(false);
});

it("should return false if second check returned an error", () => {
  const checkRange = jest
    .fn()
    .mockReturnValueOnce("")
    .mockReturnValueOnce("height error")
    .mockReturnValueOnce("");
  const options = { height: 10, width: 10, mines: 4 };
  expect(validateGameOptions(options, checkRange)).toBe(false);
});

it("should return false if third check returned an error", () => {
  const checkRange = jest
    .fn()
    .mockReturnValueOnce("")
    .mockReturnValueOnce("")
    .mockReturnValueOnce("mines error");
  const options = { height: 10, width: 10, mines: 4 };
  expect(validateGameOptions(options, checkRange)).toBe(false);
});
