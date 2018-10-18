import { IStartGameAction, IToggleCellAction } from "../../application/actions";
import { generateEmptyField } from "../../application/logic/generateEmptyField";
import {
  IStartGameReducerState,
  startGameReducer
} from "../../application/reducers/startGameReducer";

const defaultState: IStartGameReducerState = {
  width: 7,
  height: 9,
  mines: 5,
  gameStartTimestamp: 0,
  field: [[]]
};

const defaultAction: IStartGameAction = {
  type: "START_GAME",
  payload: "beginner"
};

const helperFunctions = {
  getTime: jest.fn().mockReturnValue(10000),
  generateEmptyField
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
    width: 9,
    height: 9,
    mines: 10,
    gameStartTimestamp: 10000,
    field
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
    width: 16,
    height: 16,
    mines: 40,
    gameStartTimestamp: 10000,
    field
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
    width: 30,
    height: 16,
    mines: 99,
    gameStartTimestamp: 10000,
    field
  });
});

it("should set current field size mines for custom", () => {
  const { width, height } = defaultState;
  const field = generateEmptyField(width, height);
  expect(
    startGameReducer(
      defaultState,
      { ...defaultAction, payload: "custom" },
      helperFunctions
    )
  ).toEqual({
    width,
    height,
    mines: defaultState.mines,
    gameStartTimestamp: 10000,
    field
  });
});
