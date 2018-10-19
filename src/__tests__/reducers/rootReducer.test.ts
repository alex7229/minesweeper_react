import { elapseOneSecond } from "../../application/actions";
import {
  IGlobalState,
  rootReducer
} from "../../application/reducers/rootReducer";
import { gameOptionsReducerFactory } from "../../factories/reducers/gameOptionsReducerFactory";
import { openCellReducerFactory } from "../../factories/reducers/openCellReducerFactory";
import { startGameReducerFactory } from "../../factories/reducers/startGameReducerFactory";
import { toggleCellReducerFactory } from "../../factories/reducers/toggleCellReducerFactory";

const defaultState: IGlobalState = {
  gameTimeMs: 0,
  width: 30,
  height: 16,
  mines: 99,
  seed: "random seed",
  isFinished: false,
  field: [[]],
  gameStartTimestamp: 0
};

it("should change state properly", () => {
  const action = elapseOneSecond();
  const elapseOneSecondReducerMock = jest
    .fn()
    .mockReturnValue({ gameTimeMs: 6000 });
  const reducers = [
    elapseOneSecondReducerMock,
    gameOptionsReducerFactory,
    openCellReducerFactory,
    startGameReducerFactory,
    toggleCellReducerFactory
  ];

  const nextState = rootReducer(defaultState, action, reducers);
  expect(elapseOneSecondReducerMock.mock.calls.length).toBe(1);
  expect(elapseOneSecondReducerMock.mock.calls[0]).toEqual([
    defaultState,
    action
  ]);
  expect(nextState).toEqual({ ...defaultState, gameTimeMs: 6000 });
});
