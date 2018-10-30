import { IGameConfig } from "../../../application/logic/board/inferGameConfig";
import { checkNumberRange } from "../../../application/logic/validators/checkNumberRange";
import { validateGameOptions } from "../../../application/logic/validators/validateGameOptions";

export type ValidateGameOptionsContainer = (options: IGameConfig) => boolean;

export const validateGameOptionsContainer: ValidateGameOptionsContainer = options =>
  validateGameOptions(options, checkNumberRange);
