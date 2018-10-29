import { AnyAction } from "../../application/actions/actions";
import {
  hideOverlayReducer,
  IHideOverlayState
} from "../../application/reducers/hideOverlayReducer";

const defaultState: IHideOverlayState = { winOverlay: true };

it("should not hide state if action is incorrect", () => {
  const action: AnyAction = {
    type: "TOGGLE_CELL",
    payload: { row: 0, column: 0 }
  };
  expect(hideOverlayReducer(defaultState, action)).toEqual(defaultState);
});

it("should hide overlay", () => {
  const action: AnyAction = { type: "HIDE_OVERLAY" };
  expect(hideOverlayReducer(defaultState, action)).toEqual({
    ...defaultState,
    winOverlay: false
  });
});
