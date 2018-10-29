import { AnyAction } from "../actions/actions";

export interface IHideOverlayState {
  readonly winOverlay: boolean;
}

export type HideOverlayReducer = (
  state: IHideOverlayState,
  action: AnyAction
) => IHideOverlayState;

export const hideOverlayReducer: HideOverlayReducer = (state, action) => {
  if (action.type !== "HIDE_OVERLAY") {
    return state;
  }
  return { ...state, winOverlay: false };
};
