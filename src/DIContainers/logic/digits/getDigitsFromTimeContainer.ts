import { DigitOrDot } from "../../../application/components/Digit";
import { getDigitsFromTime } from "../../../application/logic/digits/getDigitsFromTime";
import { getDigitsFromNumberContainer } from "./getDigitsFromNumberContainer";

export type GetDigitsFromTimeContainer = (
  timeMs: number
) => ReadonlyArray<DigitOrDot>;

export const getDigitsFromTimeContainer: GetDigitsFromTimeContainer = timeMs =>
  getDigitsFromTime(timeMs, getDigitsFromNumberContainer);
