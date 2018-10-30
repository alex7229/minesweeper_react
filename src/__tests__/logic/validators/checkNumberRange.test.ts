import { checkNumberRange } from "../../../application/logic/validators/checkNumberRange";

it("should not validate float numbers", () => {
  expect(checkNumberRange(23.4, 20, 30)).toBe("Should be an integer");
});

it("should return empty string if number is valid", () => {
  expect(checkNumberRange(30, 27, 32)).toBe("");
});

it("should validate minimum limit", () => {
  expect(checkNumberRange(20, 20, 25)).toBe("");
  expect(checkNumberRange(20, 21, 25)).toBe("Minimum is 21");
});

it("should validate maximum limit", () => {
  expect(checkNumberRange(20, 15, 20)).toBe("");
  expect(checkNumberRange(20, 15, 18)).toBe("Maximum is 18");
});
