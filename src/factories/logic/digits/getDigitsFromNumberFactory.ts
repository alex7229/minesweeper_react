import { DigitOrDot } from "../../../application/components/Digit";
import { getDigitsFromNumber } from "../../../application/logic/digits/getDigitsFromNumber";
import { validateDigitsSequence } from "../../../application/logic/validators/validateDigitsSequence";

export type GetDigitsFromNumberFactory = (
  num: number
) => ReadonlyArray<DigitOrDot>;

export const getDigitsFromNumberFactory: GetDigitsFromNumberFactory = (
  num: number
) => getDigitsFromNumber(num, validateDigitsSequence);
