import { DigitOrDot } from "../../../application/components/Digit";
import { getDigitsFromTime } from "../../../application/logic/digits/getDigitsFromTime";
import { getDigitsFromNumberFactory } from "./getDigitsFromNumberFactory";

export type GetDigitsFromTimeFactory = (
  timeMs: number
) => ReadonlyArray<DigitOrDot>;

export const getDigitsFromTimeFactory: GetDigitsFromTimeFactory = timeMs =>
  getDigitsFromTime(timeMs, getDigitsFromNumberFactory);
