import { IGameOptionPayload } from "../../application/actions/actions";
import {
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_EMPTY_CELLS,
  MIN_HEIGHT,
  MIN_MINES,
  MIN_WIDTH
} from "../../application/constants";
import {
  mapDispatchToProps,
  mapStateToPropsFactory
} from "../../application/reactContainers/ButtonsContainer";
import { testGlobalState } from "./BoardContainer.test";

const defaultState = { ...testGlobalState };

it("should provide correct field width", () => {
  const width = defaultState.field[0].length;
  const factory = mapStateToPropsFactory(jest.fn());
  expect(factory(defaultState).currentFieldWidth).toBe(width);
});

it("should provide correct error messages", () => {
  const state = { ...defaultState, width: 32, height: 12, mines: 4 };
  const checkRange = jest.fn().mockReturnValue("no errors");
  const factory = mapStateToPropsFactory(checkRange);
  const nextState = factory(state);
  expect(nextState.heightError).toBe("no errors");
  expect(nextState.widthError).toBe("no errors");
  expect(nextState.minesError).toBe("no errors");

  expect(checkRange.mock.calls.length).toBe(3);
  expect(checkRange.mock.calls[0][0]).toBe(state.width);
  expect(checkRange.mock.calls[0][1]).toBe(MIN_WIDTH);
  expect(checkRange.mock.calls[0][2]).toBe(MAX_WIDTH);

  expect(checkRange.mock.calls[1][0]).toBe(state.height);
  expect(checkRange.mock.calls[1][1]).toBe(MIN_HEIGHT);
  expect(checkRange.mock.calls[1][2]).toBe(MAX_HEIGHT);

  expect(checkRange.mock.calls[2][0]).toBe(state.mines);
  expect(checkRange.mock.calls[2][1]).toBe(MIN_MINES);
  const maxMines = state.width * state.height - MIN_EMPTY_CELLS;
  expect(checkRange.mock.calls[2][2]).toBe(maxMines);
});

it("should provide correct dispatch props", () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  const changeOptionPayload: IGameOptionPayload = { type: "width", value: 114 };
  props.changeOption(changeOptionPayload);
  props.startGame("advanced");

  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "CHANGE_GAME_OPTIONS",
    payload: changeOptionPayload
  });
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "START_GAME",
    payload: "advanced"
  });
});
