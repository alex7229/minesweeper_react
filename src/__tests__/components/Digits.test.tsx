import { shallow } from "enzyme";
import * as React from "react";
import { Digit } from "../../application/components/Digit";
import { Digits } from "../../application/components/Digits";
import { validateDigitsSequence } from "../../application/logic/validateDigitsSequence";

it("should render correct Digit components", () => {
  const sequence = [0, 2, "dot", 2, 7];
  if (!validateDigitsSequence(sequence)) {
    throw new Error("not valid digits");
  }
  const element = shallow(<Digits digits={sequence} />);
  expect(element.find("div.digits").length).toBe(1);
  expect(element.find(Digit).get(0).props.digit).toBe(0);
  expect(element.find(Digit).get(1).props.digit).toBe(2);
  expect(element.find(Digit).get(2).props.digit).toBe("dot");
  expect(element.find(Digit).get(3).props.digit).toBe(2);
  expect(element.find(Digit).get(4).props.digit).toBe(7);
});
