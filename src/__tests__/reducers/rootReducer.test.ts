import { changeGameOption } from "../../application/actions/actionCreators";
import { hideOverlayReducer } from "../../application/reducers/hideOverlayReducer";
import { rootReducer } from "../../application/reducers/rootReducer";
import { openCellReducerContainer } from "../../DIContainers/reducers/openCellReducerContainer";
import { startGameReducerContainer } from "../../DIContainers/reducers/startGameReducerContainer";
import { toggleCellReducerContainer } from "../../DIContainers/reducers/toggleCellReducerContainer";
import { testGlobalState } from "../reactContainers/BoardContainer.test";

const defaultState = { ...testGlobalState };

it("should change state properly", () => {
  const action = changeGameOption({ type: "width", value: 67 });
  const changeGameOptionReducerMock = jest.fn().mockReturnValue({ width: 67 });
  const reducers = [
    changeGameOptionReducerMock,
    openCellReducerContainer,
    startGameReducerContainer,
    toggleCellReducerContainer,
    hideOverlayReducer
  ];

  const nextState = rootReducer(defaultState, action, reducers);
  expect(changeGameOptionReducerMock.mock.calls.length).toBe(1);
  expect(changeGameOptionReducerMock.mock.calls[0]).toEqual([
    defaultState,
    action
  ]);
  expect(nextState).toEqual({ ...defaultState, width: 67 });
});
