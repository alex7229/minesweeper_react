import { DigitOrDot } from "../../../application/components/Digit";
import { getDigitsFromNumber } from "../../../application/logic/digits/getDigitsFromNumber";
import { validateDigitsSequence } from "../../../application/logic/validators/validateDigitsSequence";

export type GetDigitsFromNumberContainer = (
  num: number
) => ReadonlyArray<DigitOrDot>;

export const getDigitsFromNumberContainer: GetDigitsFromNumberContainer = (
  num: number
) => getDigitsFromNumber(num, validateDigitsSequence);
