import { changeGameOption } from "../../application/actions/actionCreators";
import {
  IGlobalState,
  rootReducer
} from "../../application/reducers/rootReducer";
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
  const action = changeGameOption({ type: "width", value: 67 });
  const changeGameOptionReducerMock = jest.fn().mockReturnValue({ width: 67 });
  const reducers = [
    changeGameOptionReducerMock,
    openCellReducerContainer,
    startGameReducerContainer,
    toggleCellReducerContainer
  ];

  const nextState = rootReducer(defaultState, action, reducers);
  expect(changeGameOptionReducerMock.mock.calls.length).toBe(1);
  expect(changeGameOptionReducerMock.mock.calls[0]).toEqual([
    defaultState,
    action
  ]);
  expect(nextState).toEqual({ ...defaultState, width: 67 });
});
