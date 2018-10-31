import { ValidateGameOptionsContainer } from "../../DIContainers/logic/validators/validateGameOptionsContainer";
import { AnyAction } from "../actions/actions";
import { ADVANCED_CONFIG, BEGINNER_CONFIG, EXPERT_CONFIG } from "../constants";
import { GenerateEmptyField } from "../logic/board/generateEmptyField";
import { Field } from "./toggleCellReducer";

export interface IStartGameReducerState {
  readonly width: number;
  readonly height: number;
  readonly mines: number;
  readonly widthInput: number;
  readonly heightInput: number;
  readonly minesInput: number;
  readonly gameStartTimestamp: number;
  readonly field: Field;
  readonly isFinished: boolean;
}

export type StartGameReducer = (
  state: IStartGameReducerState,
  action: AnyAction,
  functions: {
    getTime: () => number;
    generateEmptyField: GenerateEmptyField;
    validateGameOptions: ValidateGameOptionsContainer;
  }
) => IStartGameReducerState;

export const startGameReducer: StartGameReducer = (
  state,
  action,
  functions
) => {
  if (action.type !== "START_GAME") {
    return state;
  }
  let config = {
    width: state.width,
    height: state.height,
    mines: state.mines
  };
  const inputsConfig = {
    width: state.widthInput,
    height: state.heightInput,
    mines: state.minesInput
  };
  if (action.payload === "beginner") {
    config = BEGINNER_CONFIG;
  }
  if (action.payload === "advanced") {
    config = ADVANCED_CONFIG;
  }
  if (action.payload === "expert") {
    config = EXPERT_CONFIG;
  }
  if (action.payload === "custom") {
    if (functions.validateGameOptions(inputsConfig) === false) {
      return state;
    }
    config = inputsConfig;
  }
  return {
    ...state,
    ...config,
    isFinished: false,
    gameStartTimestamp: functions.getTime(),
    field: functions.generateEmptyField(config.width, config.height)
  };
};
