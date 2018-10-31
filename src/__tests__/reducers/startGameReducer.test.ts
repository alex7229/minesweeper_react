import {
  IStartGameAction,
  IToggleCellAction
} from "../../application/actions/actions";
import { generateEmptyField } from "../../application/logic/board/generateEmptyField";
import {
  IStartGameReducerState,
  startGameReducer
} from "../../application/reducers/startGameReducer";

const defaultState: IStartGameReducerState = {
  width: 7,
  height: 9,
  mines: 5,
  widthInput: 33,
  heightInput: 17,
  minesInput: 22,
  gameStartTimestamp: 0,
  field: [[]],
  isFinished: true
};

const defaultAction: IStartGameAction = {
  type: "START_GAME",
  payload: "beginner"
};

const helperFunctions = {
  getTime: jest.fn().mockReturnValue(10000),
  generateEmptyField,
  validateGameOptions: jest.fn().mockReturnValue(true)
};

it("should not change state if action is not start game", () => {
  const action: IToggleCellAction = {
    type: "TOGGLE_CELL",
    payload: { row: 0, column: 0 }
  };
  expect(startGameReducer(defaultState, action, helperFunctions)).toEqual(
    defaultState
  );
});

it("should set correct start time", () => {
  const getTimeMock = jest.fn().mockReturnValue(44);
  expect(
    startGameReducer(defaultState, defaultAction, {
      ...helperFunctions,
      getTime: getTimeMock
    }).gameStartTimestamp
  ).toBe(44);
});

it("should set 9 by 9 field and 10 mines for beginner", () => {
  const field = generateEmptyField(9, 9);
  expect(
    startGameReducer(defaultState, defaultAction, helperFunctions)
  ).toEqual({
    ...defaultState,
    width: 9,
    height: 9,
    mines: 10,
    gameStartTimestamp: 10000,
    field,
    isFinished: false
  });
});

it("should set 16 by 16 field and 40 mines for advanced", () => {
  const field = generateEmptyField(16, 16);
  expect(
    startGameReducer(
      defaultState,
      { ...defaultAction, payload: "advanced" },
      helperFunctions
    )
  ).toEqual({
    ...defaultState,
    width: 16,
    height: 16,
    mines: 40,
    gameStartTimestamp: 10000,
    field,
    isFinished: false
  });
});

it("should set 30 by 16 field and 99 mines for expert", () => {
  const field = generateEmptyField(30, 16);
  expect(
    startGameReducer(
      defaultState,
      { ...defaultAction, payload: "expert" },
      helperFunctions
    )
  ).toEqual({
    ...defaultState,
    width: 30,
    height: 16,
    mines: 99,
    gameStartTimestamp: 10000,
    field,
    isFinished: false
  });
});

it("should set state from inputs for custom if inputs are valid", () => {
  const validateGameOptions = jest.fn().mockReturnValue(true);
  expect(
    startGameReducer(
      defaultState,
      { ...defaultAction, payload: "custom" },
      {
        ...helperFunctions,
        validateGameOptions
      }
    )
  ).toEqual({
    ...defaultState,
    width: defaultState.widthInput,
    height: defaultState.heightInput,
    mines: defaultState.minesInput,
    field: generateEmptyField(
      defaultState.widthInput,
      defaultState.heightInput
    ),
    isFinished: false,
    gameStartTimestamp: 10000
  });
});

it("should not change state for custom if inputs are invalid", () => {
  const validateGameOptions = jest.fn().mockReturnValue(false);
  expect(
    startGameReducer(
      defaultState,
      { ...defaultAction, payload: "custom" },
      {
        ...helperFunctions,
        validateGameOptions
      }
    )
  ).toEqual(defaultState);
});

it("should not change field size and mines on restart", () => {
  expect(
    startGameReducer(
      defaultState,
      { ...defaultAction, payload: "restart" },
      helperFunctions
    )
  ).toEqual({
    ...defaultState,
    field: generateEmptyField(defaultState.width, defaultState.height),
    isFinished: false,
    gameStartTimestamp: 10000
  });
});
