import { shallow } from "enzyme";
import * as React from "react";
import { DropDown } from "../../application/components/DropDown";

const defaultProps = {
  widthError: "width error",
  heightError: "height error",
  minesError: "mines error",
  changeOption: jest.fn(),
  startGame: jest.fn()
};

it("should provide default values for field", () => {
  const element = shallow(<DropDown {...defaultProps} />);
  expect(element.find("#width").props().defaultValue).toBe("30");
  expect(element.find("#height").props().defaultValue).toBe("16");
  expect(element.find("#mines").props().defaultValue).toBe("99");
});

it("should display width, height and mines errors correctly", () => {
  const element = shallow(<DropDown {...defaultProps} />);
  expect(element.find(".error").get(0).props.children).toBe(
    defaultProps.widthError
  );
  expect(element.find(".error").get(1).props.children).toBe(
    defaultProps.heightError
  );
  expect(element.find(".error").get(2).props.children).toBe(
    defaultProps.minesError
  );
});

it("should render proper labels", () => {
  const element = shallow(<DropDown {...defaultProps} />);
  expect(element.find(`label`).get(0).props).toEqual({
    children: "Width: ",
    htmlFor: "width"
  });
  expect(element.find(`label`).get(1).props).toEqual({
    children: "Height: ",
    htmlFor: "height"
  });
  expect(element.find(`label`).get(2).props).toEqual({
    children: "Mines: ",
    htmlFor: "mines"
  });
});

it("should call change width option properly", () => {
  const changeOptionMock = jest.fn();
  const props = { ...defaultProps, changeOption: changeOptionMock };
  const element = shallow(<DropDown {...props} />);
  const event = { currentTarget: { value: "117" } };
  element.find("#width").simulate("change", event);
  expect(changeOptionMock.mock.calls.length).toBe(1);
  expect(changeOptionMock.mock.calls[0][0]).toEqual({
    type: "width",
    value: 117
  });
});

it("should call change height option properly", () => {
  const changeOptionMock = jest.fn();
  const props = { ...defaultProps, changeOption: changeOptionMock };
  const element = shallow(<DropDown {...props} />);
  const event = { currentTarget: { value: "32" } };
  element.find("#height").simulate("change", event);
  expect(changeOptionMock.mock.calls.length).toBe(1);
  expect(changeOptionMock.mock.calls[0][0]).toEqual({
    type: "height",
    value: 32
  });
});

it("should call change mines option properly", () => {
  const changeOptionMock = jest.fn();
  const props = { ...defaultProps, changeOption: changeOptionMock };
  const element = shallow(<DropDown {...props} />);
  const event = { currentTarget: { value: "21" } };
  element.find("#mines").simulate("change", event);
  expect(changeOptionMock.mock.calls.length).toBe(1);
  expect(changeOptionMock.mock.calls[0][0]).toEqual({
    type: "mines",
    value: 21
  });
});

it("should dispatch start game on button click", () => {
  const startGame = jest.fn();
  const element = shallow(<DropDown {...defaultProps} startGame={startGame} />);
  element.find(".button").simulate("click");
  expect(startGame.mock.calls.length).toBe(1);
});
