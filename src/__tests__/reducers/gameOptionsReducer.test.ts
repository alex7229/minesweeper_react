import {
  IChangeGameOptionsAction,
  IToggleCellAction
} from "../../application/actions/actions";
import { gameOptionsReducer } from "../../application/reducers/gameOptionsReducer";

const defaultState = {
  widthInput: 22,
  heightInput: 22,
  minesInput: 13
};

it("should not change state if action is not change options", () => {
  const action: IToggleCellAction = {
    type: "TOGGLE_CELL",
    payload: { row: 12, column: 44 }
  };
  expect(gameOptionsReducer(defaultState, action)).toEqual(defaultState);
});

it("should change width properly", () => {
  const action: IChangeGameOptionsAction = {
    type: "CHANGE_GAME_OPTIONS",
    payload: { type: "width", value: 117 }
  };
  expect(gameOptionsReducer(defaultState, action)).toEqual({
    ...defaultState,
    widthInput: 117
  });
});

it("should change height properly", () => {
  const action: IChangeGameOptionsAction = {
    type: "CHANGE_GAME_OPTIONS",
    payload: { type: "height", value: 117 }
  };
  expect(gameOptionsReducer(defaultState, action)).toEqual({
    ...defaultState,
    heightInput: 117
  });
});

it("should change mines properly", () => {
  const action: IChangeGameOptionsAction = {
    type: "CHANGE_GAME_OPTIONS",
    payload: { type: "mines", value: 117 }
  };
  expect(gameOptionsReducer(defaultState, action)).toEqual({
    ...defaultState,
    minesInput: 117
  });
});
