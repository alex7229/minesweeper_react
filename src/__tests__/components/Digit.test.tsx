import { shallow } from "enzyme";
import * as React from "react";
import { Digit } from "../../application/components/Digit";

it("should provide correct spans for digit", () => {
  const element = shallow(<Digit digit={5} />);
  expect(element.find("span.d1").length).toBe(1);
  expect(element.find("span.d2").length).toBe(1);
  expect(element.find("span.d3").length).toBe(1);
  expect(element.find("span.d4").length).toBe(1);
  expect(element.find("span.d5").length).toBe(1);
  expect(element.find("span.d6").length).toBe(1);
  expect(element.find("span.d7").length).toBe(1);
});

it("should provide correct class name for digit", () => {
  expect(shallow(<Digit digit={0} />).find("div.zero").length).toBe(1);
  expect(shallow(<Digit digit={1} />).find("div.one").length).toBe(1);
  expect(shallow(<Digit digit={2} />).find("div.two").length).toBe(1);
  expect(shallow(<Digit digit={3} />).find("div.three").length).toBe(1);
  expect(shallow(<Digit digit={4} />).find("div.four").length).toBe(1);
  expect(shallow(<Digit digit={5} />).find("div.five").length).toBe(1);
  expect(shallow(<Digit digit={6} />).find("div.six").length).toBe(1);
  expect(shallow(<Digit digit={7} />).find("div.seven").length).toBe(1);
  expect(shallow(<Digit digit={8} />).find("div.eight").length).toBe(1);
  expect(shallow(<Digit digit={9} />).find("div.nine").length).toBe(1);
  expect(shallow(<Digit digit={"dot"} />).find("div.dots").length).toBe(1);
});
