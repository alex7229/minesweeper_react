import { GetDigitsFromNumberContainer } from "../../../DIContainers/logic/digits/getDigitsFromNumberContainer";
import { DigitOrDot } from "../../components/Digit";

export type GetDigitsFromTime = (
  timeMs: number,
  getDigitsFromNumber: GetDigitsFromNumberContainer
) => ReadonlyArray<DigitOrDot>;

export const getDigitsFromTime: GetDigitsFromTime = (
  timeMs,
  getDigitsFromNumber
) => {
  const totalSecs = Math.floor(timeMs / 1000);
  const secs = totalSecs % 60;
  if (totalSecs === secs) {
    // less than 1 minute
    return getDigitsFromNumber(secs);
  }
  const totalMinutes = Math.floor(totalSecs / 60);
  const minutes = totalMinutes % 60;
  if (totalMinutes === minutes) {
    // less than 1 hour
    return [
      ...getDigitsFromNumber(minutes),
      "dot",
      ...getDigitsFromNumber(secs)
    ];
  }
  // more than 1 hour
  const hours = Math.floor(totalMinutes / 60);
  return [
    ...getDigitsFromNumber(hours),
    "dot",
    ...getDigitsFromNumber(minutes),
    "dot",
    ...getDigitsFromNumber(secs)
  ];
};
