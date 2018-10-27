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
  getDigitsFromNumber: jest.fn(),
  getTime: jest.fn(),
  calculateMines: jest.fn()
};

it("should calculate size properly", () => {
  const factory = mapStateToPropsFactory(stateDependencies);

  expect(factory({ ...testGlobalState, width: 17 }).size).toBe("big");
  expect(factory({ ...testGlobalState, width: 16 }).size).toBe("small");
  expect(factory({ ...testGlobalState, width: 9 }).size).toBe("small");
  expect(factory({ ...testGlobalState, width: 8 }).size).toBe("tiny");
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

it("should provide game start timestamp", () => {
  const state = { ...testGlobalState };
  const factory = mapStateToPropsFactory(stateDependencies);
  expect(factory(state).gameStartTimestamp).toBe(state.gameStartTimestamp);
});

it("should provide is finished field", () => {
  const state = { ...testGlobalState, isFinished: true };
  const factory = mapStateToPropsFactory(stateDependencies);
  expect(factory(state).isFinished).toBe(state.isFinished);
});

it("should provide get time function", () => {
  const getTimeMock = jest.fn().mockReturnValue(2);
  const state = { ...testGlobalState };
  const factory = mapStateToPropsFactory({
    ...stateDependencies,
    getTime: getTimeMock
  });
  expect(factory(state).getTime()).toBe(2);
});

it("should provide get digits from time function", () => {
  const getDigitsMock = jest.fn().mockReturnValue([0, 2]);
  const state = { ...testGlobalState };
  const factory = mapStateToPropsFactory({
    ...stateDependencies,
    getDigitsFromTime: getDigitsMock
  });
  expect(factory(state).getDigitsFromTime(2)).toEqual([0, 2]);
});

it("should provide game has started property depending on mines count", () => {
  const calculateMinesMock = jest
    .fn()
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(15);
  const state = { ...testGlobalState };
  const factory = mapStateToPropsFactory({
    ...stateDependencies,
    calculateMines: calculateMinesMock
  });
  expect(factory(state).gameHasStarted).toBe(false);
  expect(factory(state).gameHasStarted).toBe(true);
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
