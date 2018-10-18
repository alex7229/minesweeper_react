import {
  CHANGE_GAME_OPTIONS,
  IChangeGameOptionsAction,
  IToggleCellAction,
  TOGGLE_CELL
} from "../../application/actions";
import {
  gameOptionsReducer,
  IGameOptionsState
} from "../../application/reducers/gameOptionsReducer";

const defaultState: IGameOptionsState = {
  width: 22,
  height: 22,
  mines: 13
};

it("should not change width if action is not change width", () => {
  const validate = jest.fn().mockReturnValue(true);
  const action: IToggleCellAction = {
    type: TOGGLE_CELL,
    payload: { row: 12, column: 44 }
  };
  expect(gameOptionsReducer(defaultState, action, validate)).toEqual(
    defaultState
  );
});

it("should return previous width if validation fails", () => {
  const validator = jest.fn().mockReturnValue(false);
  const action: IChangeGameOptionsAction = {
    type: CHANGE_GAME_OPTIONS,
    payload: { type: "width", value: 66 }
  };
  expect(gameOptionsReducer(defaultState, action, validator)).toEqual(
    defaultState
  );
});

it("should change width prooperly", () => {
  const validator = jest.fn().mockReturnValue(true);
  const action: IChangeGameOptionsAction = {
    type: CHANGE_GAME_OPTIONS,
    payload: { type: "width", value: 117 }
  };
  expect(gameOptionsReducer(defaultState, action, validator)).toEqual({
    ...defaultState,
    width: 117
  });
});

it("should change height prooperly", () => {
  const validator = jest.fn().mockReturnValue(true);
  const action: IChangeGameOptionsAction = {
    type: CHANGE_GAME_OPTIONS,
    payload: { type: "height", value: 117 }
  };
  expect(gameOptionsReducer(defaultState, action, validator)).toEqual({
    ...defaultState,
    height: 117
  });
});

it("should change mines prooperly", () => {
  const validator = jest.fn().mockReturnValue(true);
  const action: IChangeGameOptionsAction = {
    type: CHANGE_GAME_OPTIONS,
    payload: { type: "mines", value: 117 }
  };
  expect(gameOptionsReducer(defaultState, action, validator)).toEqual({
    ...defaultState,
    mines: 117
  });
});