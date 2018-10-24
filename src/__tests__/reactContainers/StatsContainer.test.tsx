import {
  mapDispatchToProps,
  mapStateToPropsFactory
} from "../../application/reactContainers/StatsContainer";
import { getDigitsFromNumberContainer } from "../../DIContainers/logic/digits/getDigitsFromNumberContainer";
import { testGlobalState } from "./BoardContainer.test";

const stateDependencies = {
  getDigitsFromTime: jest.fn(),
  calculateFlags: jest.fn(),
  calculateActiveMines: jest.fn(),
  getDigitsFromNumber: jest.fn()
};

it("should calculate small size properly", () => {
  const smallField = { ...testGlobalState, width: 16 };
  let factory = mapStateToPropsFactory(stateDependencies);
  expect(factory(smallField).isSmall).toBe(true);

  const bigField = { ...testGlobalState, width: 17 };
  factory = mapStateToPropsFactory(stateDependencies);
  expect(factory(bigField).isSmall).toBe(false);
});

it("should calculate timer properly", () => {
  const getDigitsFromTime = jest.fn().mockReturnValue([2, 5]);
  const state = { ...testGlobalState };
  const factory = mapStateToPropsFactory({
    ...stateDependencies,
    getDigitsFromTime
  });
  expect(factory(state).timer).toEqual([2, 5]);
  expect(getDigitsFromTime.mock.calls[0][0]).toBe(state.gameTimeMs);
});

it("should set mine was clicked if field contains clicked mine", () => {
  const calculateActiveMinesMock = jest
    .fn()
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(1);
  const factory = mapStateToPropsFactory({
    ...stateDependencies,
    calculateActiveMines: calculateActiveMinesMock
  });
  expect(factory(testGlobalState).mineWasClicked).toBe(false);
  expect(factory(testGlobalState).mineWasClicked).toBe(true);
  expect(calculateActiveMinesMock.mock.calls.length).toBe(2);
  expect(calculateActiveMinesMock.mock.calls[0][0]).toEqual(
    testGlobalState.field
  );
  expect(calculateActiveMinesMock.mock.calls[1][0]).toEqual(
    testGlobalState.field
  );
});

it("should calculate flags count properly", () => {
  const state = { ...testGlobalState };
  const calculateFlagsMock = jest.fn().mockReturnValue(3);

  const factory = mapStateToPropsFactory({
    ...stateDependencies,
    getDigitsFromNumber: getDigitsFromNumberContainer,
    calculateFlags: calculateFlagsMock
  });
  // 10 mines minus 3 flags
  expect(factory(state).flagsLeft).toEqual([0, 7]);
  expect(calculateFlagsMock.mock.calls[0][0]).toBe(state.field);
});

it("should dispatch restart game handler", () => {
  const dispatch = jest.fn();

  const props = mapDispatchToProps(dispatch);
  props.restartGame();
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "START_GAME",
    payload: "custom"
  });
});
