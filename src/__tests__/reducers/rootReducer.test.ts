import { elapseOneSecond } from "../../application/actions/actionCreators";
import {
  IGlobalState,
  rootReducer
} from "../../application/reducers/rootReducer";
import { gameOptionsReducerContainer } from "../../DIContainers/reducers/gameOptionsReducerContainer";
import { openCellReducerContainer } from "../../DIContainers/reducers/openCellReducerContainer";
import { startGameReducerContainer } from "../../DIContainers/reducers/startGameReducerContainer";
import { toggleCellReducerContainer } from "../../DIContainers/reducers/toggleCellReducerContainer";

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
    gameOptionsReducerContainer,
    openCellReducerContainer,
    startGameReducerContainer,
    toggleCellReducerContainer
  ];

  const nextState = rootReducer(defaultState, action, reducers);
  expect(elapseOneSecondReducerMock.mock.calls.length).toBe(1);
  expect(elapseOneSecondReducerMock.mock.calls[0]).toEqual([
    defaultState,
    action
  ]);
  expect(nextState).toEqual({ ...defaultState, gameTimeMs: 6000 });
});
