import { AnyAction } from "../../application/actions/actions";
import { hideOverlayReducer } from "../../application/reducers/hideOverlayReducer";
import {
  IGlobalState,
  rootReducer
} from "../../application/reducers/rootReducer";
import { gameOptionsReducerContainer } from "./gameOptionsReducerContainer";
import { openCellReducerContainer } from "./openCellReducerContainer";
import { startGameReducerContainer } from "./startGameReducerContainer";
import { toggleCellReducerContainer } from "./toggleCellReducerContainer";

export type RootReducerContainer = (
  state: IGlobalState,
  action: AnyAction
) => IGlobalState;

export const rootReducerContainer: RootReducerContainer = (state, action) =>
  rootReducer(state, action, [
    gameOptionsReducerContainer,
    openCellReducerContainer,
    startGameReducerContainer,
    toggleCellReducerContainer,
    hideOverlayReducer
  ]);
