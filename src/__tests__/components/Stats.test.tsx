import { shallow } from "enzyme";
import * as React from "react";
import { Digits } from "../../application/components/Digits";
import { IStatsProps, Stats } from "../../application/components/Stats";
import { getDigitsFromTimeContainer } from "../../DIContainers/logic/digits/getDigitsFromTimeContainer";

jest.useFakeTimers();

const defaultProps: IStatsProps = {
  gameHasStarted: true,
  getTime: jest.fn(),
  getDigitsFromTime: jest.fn(),
  gameTimeMs: 0,
  gameStartTimestamp: 0,
  flagsLeft: [4, 4],
  size: "big",
  restartGame: jest.fn(),
  mineWasClicked: false,
  isFinished: false
};

it("should render correct id and class of the container", () => {
  const bigElement = shallow(<Stats {...defaultProps} size="big" />);
  expect(bigElement.find("div#stats.big.row").length).toBe(1);
  const smallElement = shallow(<Stats {...defaultProps} size="small" />);
  expect(smallElement.find("div#stats.small.row").length).toBe(1);
  const tinyElement = shallow(<Stats {...defaultProps} size="tiny" />);
  expect(tinyElement.find("div#stats.tiny.row").length).toBe(1);
});

it("should pass correct props to timer", () => {
  const currentTime = 10000;
  const gameStartTimestamp = 5000;
  const timerDigits = [0, 5];
  const getTime = jest.fn().mockReturnValue(currentTime);
  const getDigitsFromTime = jest.fn().mockReturnValue(timerDigits);
  const props = {
    ...defaultProps,
    gameStartTimestamp,
    getTime,
    getDigitsFromTime
  };
  const element = shallow(<Stats {...props} />);
  expect(
    element
      .find("#timer")
      .find(Digits)
      .props()
  ).toEqual({
    digits: timerDigits
  });
  expect(getTime.mock.calls.length).toBe(1);
  expect(getDigitsFromTime.mock.calls[0][0]).toBe(
    currentTime - gameStartTimestamp
  );
});

it("should pass 0 to timer if game has not started", () => {
  const getDigitsFromTime = jest.fn();
  const props = { ...defaultProps, gameHasStarted: false, getDigitsFromTime };
  shallow(<Stats {...props} />);
  expect(getDigitsFromTime.mock.calls[0][0]).toBe(0);
});

it("component should be force updated every second", () => {
  let timesCalled = 0;
  const props = {
    ...defaultProps
  };
  const element = shallow(<Stats {...props} />);
  const instance = element.instance();
  const pureForceUpdate = instance.forceUpdate;
  instance.forceUpdate = () => {
    timesCalled++;
    return pureForceUpdate.bind(pureForceUpdate);
  };
  jest.runTimersToTime(14700);
  jest.clearAllTimers();
  expect(timesCalled).toBe(14);
  instance.forceUpdate = pureForceUpdate;
});

it("should not force update element if the game is finished", () => {
  let timesCalled = 0;
  const props = {
    ...defaultProps
  };
  const element = shallow(<Stats {...props} />);
  const instance = element.instance();
  const pureForceUpdate = instance.forceUpdate;
  instance.forceUpdate = () => {
    timesCalled++;
    return pureForceUpdate.bind(pureForceUpdate);
  };
  jest.runTimersToTime(14700);
  element.setProps({ isFinished: true });
  jest.runTimersToTime(20000);
  jest.clearAllTimers();
  expect(timesCalled).toBe(14);
  instance.forceUpdate = pureForceUpdate;
});

it("should continue updating element if the game was restarted", () => {
  let timesCalled = 0;
  const props = {
    ...defaultProps
  };
  const element = shallow(<Stats {...props} />);
  const instance = element.instance();
  const pureForceUpdate = instance.forceUpdate;
  instance.forceUpdate = () => {
    timesCalled++;
    return pureForceUpdate.bind(pureForceUpdate);
  };
  jest.runTimersToTime(14700);
  element.setProps({ isFinished: true });
  jest.runTimersToTime(20000);
  element.setProps({ isFinished: false });
  jest.runTimersToTime(10000);
  jest.clearAllTimers();
  expect(timesCalled).toBe(24);
  instance.forceUpdate = pureForceUpdate;
});

it("should not call getTime if component was unmounted", () => {
  const getTime = jest.fn();
  const props = {
    ...defaultProps,
    getTime
  };
  // first call on mount
  const element = shallow(<Stats {...props} />);
  // second call after 1 sec via interval
  jest.runTimersToTime(1500);
  element.unmount();
  jest.runTimersToTime(15000);
  jest.clearAllTimers();
  // should be no more calls after unmount
  element.update();
  expect(getTime.mock.calls.length).toBe(2);
});

it("should pass correct props to flags count", () => {
  const element = shallow(<Stats {...defaultProps} />);
  expect(
    element
      .find("#flags_count")
      .find(Digits)
      .props()
  ).toEqual({
    digits: defaultProps.flagsLeft
  });
});

it("should have filler", () => {
  const element = shallow(<Stats {...defaultProps} />);
  expect(element.find("div.filler").length).toBe(1);
});

it("should have flag image", () => {
  const element = shallow(<Stats {...defaultProps} />);
  expect(element.find("img#flag").length).toBe(1);
});

it("should render smiley face img if game is not failed", () => {
  const element = shallow(<Stats {...defaultProps} />);
  const image = element.find("#restart_face");
  expect(image.props().src).toContain("smiley_face");
});

it("should render dead face if mine was clicked", () => {
  const element = shallow(<Stats {...defaultProps} mineWasClicked={true} />);
  const image = element.find("#restart_face");
  expect(image.props().src).toContain("dead_face");
});

it("should call restart game on smiley face click", () => {
  const clickMock = jest.fn();
  const element = shallow(<Stats {...defaultProps} restartGame={clickMock} />);
  const image = element.find("img#restart_face");
  image.simulate("click");
  expect(clickMock.mock.calls.length).toBe(1);
});

it("should not update timer if the game is already finished", () => {
  const props = {
    ...defaultProps,
    gameTimeMs: 47000,
    isFinished: true,
    getTime: () => 25000,
    getDigitsFromTime: getDigitsFromTimeContainer
  };
  const element = shallow(<Stats {...props} />);
  const timer = element.find("#timer").find(Digits);
  // 47 seconds
  expect(timer.props().digits).toEqual([4, 7]);
});
