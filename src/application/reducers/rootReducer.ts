import { AnyAction } from "../actions/actions";
import { Field } from "./toggleCellReducer";

export interface IGlobalState {
  readonly gameTimeMs: number;
  readonly width: number;
  readonly height: number;
  readonly mines: number;
  readonly seed: string;
  readonly isFinished: boolean;
  readonly field: Field;
  readonly gameStartTimestamp: number;
  readonly winOverlay: boolean;
}

export type Reducer = (
  state: Partial<IGlobalState>,
  action: AnyAction
) => Partial<IGlobalState>;

export type RootReducer = (
  state: IGlobalState,
  action: AnyAction,
  reducers: ReadonlyArray<Reducer>
) => IGlobalState;

const defaultState: IGlobalState = {
  gameTimeMs: 0,
  gameStartTimestamp: 0,
  width: 30,
  height: 16,
  mines: 99,
  seed: "default seed",
  isFinished: false,
  field: [[]],
  winOverlay: false
};

export const rootReducer: RootReducer = (
  state = defaultState,
  action,
  reducers
) =>
  reducers.reduce(
    (currentState, currentReducer) => ({
      ...currentState,
      ...currentReducer(currentState, action)
    }),
    state
  );
