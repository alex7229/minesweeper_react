type ErrorText = string;

export type CheckNumberRange = (
  num: number,
  min: number,
  max: number
) => ErrorText;

export const checkNumberRange: CheckNumberRange = (num, min, max) => {
  if (num !== Math.floor(num)) {
    return "Should be an integer";
  }
  if (num < min) {
    return "Minimum is " + min;
  }
  if (num > max) {
    return "Maximum is " + max;
  }
  return "";
};
