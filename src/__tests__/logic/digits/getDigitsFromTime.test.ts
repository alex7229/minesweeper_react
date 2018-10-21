import { getDigitsFromTime } from "../../../application/logic/digits/getDigitsFromTime";
import { getDigitsFromNumberFactory } from "../../../factories/logic/digits/getDigitsFromNumberFactory";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

it("should get correct sequence from seconds", () => {
  expect(getDigitsFromTime(552, getDigitsFromNumberFactory)).toEqual([0, 0]);
  expect(getDigitsFromTime(59235, getDigitsFromNumberFactory)).toEqual([5, 9]);
});

it("should get correct sequence from minutes and seconds", () => {
  let time = 7 * MINUTE + 5 * SECOND + 44;
  let sequence = [0, 7, "dot", 0, 5];
  expect(getDigitsFromTime(time, getDigitsFromNumberFactory)).toEqual(sequence);

  time = 59 * MINUTE + 59 * SECOND + 954;
  sequence = [5, 9, "dot", 5, 9];
  expect(getDigitsFromTime(time, getDigitsFromNumberFactory)).toEqual(sequence);
});

it("should get correct sequence from hours, minutes and seconds", () => {
  let time = 7 * HOUR + 6 * MINUTE + 462;
  let sequence = [0, 7, "dot", 0, 6, "dot", 0, 0];
  expect(getDigitsFromTime(time, getDigitsFromNumberFactory)).toEqual(sequence);

  time = 212 * HOUR + 222;
  sequence = [2, 1, 2, "dot", 0, 0, "dot", 0, 0];
  expect(getDigitsFromTime(time, getDigitsFromNumberFactory)).toEqual(sequence);
});
