import {
  IChangeGameOptionsAction,
  IToggleCellAction
} from "../../application/actions/actions";
import {
  gameOptionsReducer,
  IGameOptionsState
} from "../../application/reducers/gameOptionsReducer";

const defaultState: IGameOptionsState = {
  width: 22,
  height: 22,
  mines: 13
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
    width: 117
  });
});

it("should change height properly", () => {
  const action: IChangeGameOptionsAction = {
    type: "CHANGE_GAME_OPTIONS",
    payload: { type: "height", value: 117 }
  };
  expect(gameOptionsReducer(defaultState, action)).toEqual({
    ...defaultState,
    height: 117
  });
});

it("should change mines properly", () => {
  const action: IChangeGameOptionsAction = {
    type: "CHANGE_GAME_OPTIONS",
    payload: { type: "mines", value: 117 }
  };
  expect(gameOptionsReducer(defaultState, action)).toEqual({
    ...defaultState,
    mines: 117
  });
});
