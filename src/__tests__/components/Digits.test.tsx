import { shallow } from "enzyme";
import * as React from "react";
import { Digit, DigitOrDot } from "../../application/components/Digit";
import { Digits, IDigitsProps } from "../../application/components/Digits";

const defaultProps: IDigitsProps = {
  digits: [7],
  primaryColor: "black",
  secondaryColor: "white",
  float: "left",
  scaling: 0.6
};

it("should render correct Digit components", () => {
  const sequence: DigitOrDot[] = [0, 2, "dot", 2, 7];
  const element = shallow(<Digits {...defaultProps} digits={sequence} />);
  expect(element.find("div.digits").length).toBe(1);
  expect(element.find(Digit).get(0).props.digit).toBe(0);
  expect(element.find(Digit).get(1).props.digit).toBe(2);
  expect(element.find(Digit).get(2).props.digit).toBe("dot");
  expect(element.find(Digit).get(3).props.digit).toBe(2);
  expect(element.find(Digit).get(4).props.digit).toBe(7);
});

it("should pass color down to digit component", () => {
  const digitProps = {
    primaryColor: defaultProps.primaryColor,
    secondaryColor: defaultProps.secondaryColor,
    digit: defaultProps.digits[0]
  };
  const element = shallow(<Digits {...defaultProps} />);
  const digit = element.find(Digit);
  expect(digit.props()).toEqual(digitProps);
});

it("should render float and scaling css", () => {
  const style = {
    float: "right",
    transform: "scale(1.2)"
  };
  const element = shallow(
    <Digits {...defaultProps} float="right" scaling={1.2} />
  );
  expect(element.props().style).toEqual(style);
});
