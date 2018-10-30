import { checkNumberRange } from "../../../application/logic/validators/checkNumberRange";
import { validateGameOptions } from "../../../application/logic/validators/validateGameOptions";
import { IGameOptionsState } from "../../../application/reducers/gameOptionsReducer";

export type ValidateGameOptionsContainer = (
  options: IGameOptionsState
) => boolean;

export const validateGameOptionsContainer: ValidateGameOptionsContainer = options =>
  validateGameOptions(options, checkNumberRange);
