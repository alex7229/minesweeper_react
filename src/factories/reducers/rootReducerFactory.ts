import { AnyAction } from "../../application/actions/actions";
import { elapseOneSecondReducer } from "../../application/reducers/elapseOneSecondReducer";
import {
  IGlobalState,
  rootReducer
} from "../../application/reducers/rootReducer";
import { gameOptionsReducerFactory } from "./gameOptionsReducerFactory";
import { openCellReducerFactory } from "./openCellReducerFactory";
import { startGameReducerFactory } from "./startGameReducerFactory";
import { toggleCellReducerFactory } from "./toggleCellReducerFactory";

export type RootReducerFactory = (
  state: IGlobalState,
  action: AnyAction
) => IGlobalState;

export const rootReducerFactory: RootReducerFactory = (state, action) =>
  rootReducer(state, action, [
    elapseOneSecondReducer,
    gameOptionsReducerFactory,
    openCellReducerFactory,
    startGameReducerFactory,
    toggleCellReducerFactory
  ]);
