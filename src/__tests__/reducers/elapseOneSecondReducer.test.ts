import {
  ELAPSE_ONE_SECOND,
  IElapseOneSecondAction,
  IToggleCellAction,
  TOGGLE_CELL
} from "../../application/actions";
import {
  elapseOneSecondReducer,
  IElapseOneSecondReducerState
} from "../../application/reducers/elapseOneSecondReducer";

it("should not change state if action type is incorrect", () => {
  const action: IToggleCellAction = {
    type: TOGGLE_CELL,
    payload: { row: 0, column: 0 }
  };
  const state = { gameTimeMs: 10000, isFinished: false };
  expect(elapseOneSecondReducer(state, action)).toEqual(state);
});

it("should add one second to game time", () => {
  const state: IElapseOneSecondReducerState = {
    gameTimeMs: 15500
  };
  const action: IElapseOneSecondAction = { type: ELAPSE_ONE_SECOND };
  expect(elapseOneSecondReducer(state, action)).toEqual({
    ...state,
    gameTimeMs: 16500
  });
});
