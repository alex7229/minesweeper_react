import { IStartGameAction, IToggleCellAction } from "../../application/actions";
import {
  IStartGameReducerState,
  startGameReducer
} from "../../application/reducers/startGameReducer";

const defaultState: IStartGameReducerState = {
  width: 7,
  height: 9,
  gameStartTimestamp: 0,
  field: [[]]
};

const defaultAction: IStartGameAction = {
  type: "START_GAME",
  payload: "beginner"
};

const helperFunctions = {
  getTime: new Date().getTime
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
