import { shallow } from "enzyme";
import * as React from "react";
import { Buttons } from "../../application/components/Buttons";
import { DropDown } from "../../application/components/DropDown";

const defaultProps = {
  widthError: "width error",
  heightError: "height error",
  minesError: "mines error",
  changeOption: jest.fn(),
  startGame: jest.fn(),
  currentFieldWidth: 16
};

it("should provide correct props for dropdown", () => {
  const startGame = jest.fn();
  const element = shallow(<Buttons {...defaultProps} startGame={startGame} />);
  const dropDownProps = element.find(DropDown).props();
  expect(dropDownProps.widthError).toBe(defaultProps.widthError);
  expect(dropDownProps.heightError).toBe(defaultProps.heightError);
  expect(dropDownProps.minesError).toBe(defaultProps.minesError);
  expect(dropDownProps.changeOption).toBe(defaultProps.changeOption);
  dropDownProps.startGame();
  expect(startGame.mock.calls.length).toBe(1);
  expect(startGame.mock.calls[0][0]).toBe("custom");
});

it("should provide correct class for buttons container", () => {
  const element = shallow(<Buttons {...defaultProps} />);
  let container = element.find("#buttons");
  expect(container.hasClass("row")).toBe(true);
  expect(container.hasClass("small")).toBe(false);

  const smallElement = shallow(
    <Buttons {...defaultProps} currentFieldWidth={15} />
  );
  container = smallElement.find("#buttons");
  expect(container.hasClass("row")).toBe(true);
  expect(container.hasClass("small")).toBe(true);
});

it("should provide correct text to buttons", () => {
  const element = shallow(<Buttons {...defaultProps} />);
  expect(element.find("#beginner .button").props().children).toBe("Beginner");
  expect(element.find("#advanced .button").props().children).toBe("Advanced");
  expect(element.find("#expert .button").props().children).toBe("Expert");
  expect(element.find("#custom .button").props().children).toBe("Custom");
});

it("should dispatch start game with proper payload on buttons clicks", () => {
  const startGame = jest.fn();
  const element = shallow(<Buttons {...defaultProps} startGame={startGame} />);

  // custom button wrapper should not start custom game
  element.find("#custom").simulate("click");
  element.find("#beginner").simulate("click");
  element.find("#advanced").simulate("click");
  element.find("#expert").simulate("click");

  expect(startGame.mock.calls.length).toBe(3);
  expect(startGame.mock.calls[0][0]).toBe("beginner");
  expect(startGame.mock.calls[1][0]).toBe("advanced");
  expect(startGame.mock.calls[2][0]).toBe("expert");
});
