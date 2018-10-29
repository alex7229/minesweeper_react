import {
  mapDispatchToProps,
  mapStateToPropsFactory
} from "../../application/reactContainers/WinOverlayContainer";
import { testGlobalState } from "./BoardContainer.test";

it("should provide correct difficulty and time props", () => {
  const difficultyMock = jest.fn().mockReturnValue(144);
  const state = { ...testGlobalState, gameTimeMs: 552 };
  const factory = mapStateToPropsFactory({
    calculateDifficultyLevel: difficultyMock
  });
  expect(factory(state)).toEqual({ time: 552, difficulty: 144 });
});

it("should dispatch hide overlay action", () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  props.hideOverlay();
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual({ type: "HIDE_OVERLAY" });
});
