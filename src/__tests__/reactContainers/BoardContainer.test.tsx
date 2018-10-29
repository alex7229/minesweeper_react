import { generateEmptyField } from "../../application/logic/board/generateEmptyField";
import {
  mapDispatchToProps,
  mapStateToProps
} from "../../application/reactContainers/BoardContainer";
import { IGlobalState } from "../../application/reducers/rootReducer";

export const testGlobalState: IGlobalState = {
  mines: 10,
  width: 10,
  height: 10,
  field: generateEmptyField(10, 10),
  gameStartTimestamp: 1000,
  gameTimeMs: 25000,
  seed: "random seed",
  isFinished: false,
  winOverlay: false
};

it("should provide props from state", () => {
  expect(mapStateToProps(testGlobalState)).toEqual({
    field: testGlobalState.field
  });
});

it("should dispatch correct actions", () => {
  const dispatch = jest.fn();

  const firstPosition = { row: 0, column: 22 };
  const secondPosition = { row: 12, column: 17 };

  const handlers = mapDispatchToProps(dispatch);
  handlers.openCell(firstPosition);
  handlers.toggleCell(secondPosition);

  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "OPEN_CELL",
    payload: firstPosition
  });
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "TOGGLE_CELL",
    payload: secondPosition
  });
});
