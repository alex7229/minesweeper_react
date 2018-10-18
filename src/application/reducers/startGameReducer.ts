import { AnyAction } from "../actions";
import {
  GenerateEmptyField,
  generateEmptyField
} from "../logic/generateEmptyField";
import { Field } from "./toggleCellReducer";

export interface IStartGameReducerState {
  readonly width: number;
  readonly height: number;
  readonly mines: number;
  readonly gameStartTimestamp: number;
  readonly field: Field;
}

export type StartGameReducer = (
  state: IStartGameReducerState,
  action: AnyAction,
  functions: {
    getTime: () => number;
    generateEmptyField: GenerateEmptyField;
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
  let width = state.width;
  let height = state.height;
  let mines = state.mines;
  if (action.payload === "beginner") {
    width = 9;
    height = 9;
    mines = 10;
  }
  if (action.payload === "advanced") {
    width = 16;
    height = 16;
    mines = 40;
  }
  if (action.payload === "expert") {
    width = 30;
    height = 16;
    mines = 99;
  }
  return {
    width,
    height,
    mines,
    gameStartTimestamp: functions.getTime(),
    field: generateEmptyField(width, height)
  };
};
