import { shallow } from "enzyme";
import * as React from "react";
import { WinOverlay } from "../../application/components/WinOverlay";

const defaultProps = {
  time: 22,
  difficulty: 110,
  hideOverlay: jest.fn(),
  visible: true
};

it("should not trigger hide overlay if content was clicked", () => {
  const hideOverlay = jest.fn();
  const element = shallow(
    <WinOverlay {...defaultProps} hideOverlay={hideOverlay} />
  );
  const targetId = "overlayContent";
  const target = { id: targetId };
  element.find(`#${targetId}`).simulate("click", { target });
  expect(hideOverlay.mock.calls.length).toBe(0);
});

it("should call hide overlay if overlay itself was clicked", () => {
  const hideOverlay = jest.fn();
  const element = shallow(
    <WinOverlay {...defaultProps} hideOverlay={hideOverlay} />
  );
  const targetId = "overlay";
  const target = { id: targetId };
  element.find(`#${targetId}`).simulate("click", { target });
  expect(hideOverlay.mock.calls.length).toBe(1);
});

it("should round time to two decimal places", () => {
  // time is 256 secs and 245 ms
  const props = { ...defaultProps, time: 256245 };
  const element = shallow(<WinOverlay {...props} />);
  expect(element.find("span").get(0).props.children).toBe(256.24);
});

it("should place difficulty properly", () => {
  const props = { ...defaultProps, difficulty: 212 };
  const element = shallow(<WinOverlay {...props} />);
  expect(element.find("span").get(1).props.children).toBe(212);
});

it("should round difficulty per time to three decimal places", () => {
  const props = { ...defaultProps, time: 3000, difficulty: 1 };
  // 1 difficulty per 3 secs, or 0.33333333 diff per sec
  const element = shallow(<WinOverlay {...props} />);
  expect(element.find("span").get(2).props.children).toBe(0.333);
});

it("should render correct display depending on visible state", () => {
  const invisibleElement = shallow(
    <WinOverlay {...defaultProps} visible={false} />
  );
  expect(invisibleElement.find("#overlay").hasClass("invisible")).toBe(true);

  const visibleElement = shallow(
    <WinOverlay {...defaultProps} visible={true} />
  );

  expect(visibleElement.find("#overlay").hasClass("invisible")).toBe(false);
});
