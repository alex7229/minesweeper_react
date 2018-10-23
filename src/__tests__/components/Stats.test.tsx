import { shallow } from "enzyme";
import * as React from "react";
import { Digits } from "../../application/components/Digits";
import { IStatsProps, Stats } from "../../application/components/Stats";

const defaultProps: IStatsProps = {
  timer: [2, 2, "dot", 3, 5, "dot", 0, 0],
  flagsLeft: [4, 4],
  isSmall: false,
  restartGame: jest.fn()
};

it("should render correct id and class of the container", () => {
  const bigElement = shallow(<Stats {...defaultProps} isSmall={false} />);
  expect(bigElement.find("div#stats.big").length).toBe(1);
  const smallElement = shallow(<Stats {...defaultProps} isSmall={true} />);
  expect(smallElement.find("div#stats.small").length).toBe(1);
});

it("should pass correct props to timer", () => {
  const element = shallow(<Stats {...defaultProps} />);
  expect(
    element
      .find("#timer")
      .find(Digits)
      .props()
  ).toEqual({
    primaryColor: "rebeccapurple",
    secondaryColor: "rebeccapurple",
    digits: defaultProps.timer
  });
});

it("should pass correct props to flags count", () => {
  const element = shallow(<Stats {...defaultProps} />);
  expect(
    element
      .find("#flags_count")
      .find(Digits)
      .props()
  ).toEqual({
    primaryColor: "rebeccapurple",
    secondaryColor: "rebeccapurple",
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

it("should have smiley face img", () => {
  const element = shallow(<Stats {...defaultProps} />);
  expect(element.find("img#restart_face").length).toBe(1);
});

it("should call restart game on smiley face click", () => {
  const clickMock = jest.fn();
  const element = shallow(<Stats {...defaultProps} restartGame={clickMock} />);
  const image = element.find("img#restart_face");
  image.simulate("click");
  expect(clickMock.mock.calls.length).toBe(1);
});
