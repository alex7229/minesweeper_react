import { shallow } from "enzyme";
import * as React from "react";
import { Cell } from "../../application/components/Cell";

const defaultProps = {
  openCell: jest.fn(),
  toggleCell: jest.fn(),
  row: 0,
  column: 0,
  flag: false,
  open: false,
  questionMark: false,
  minesAround: 0,
  isMine: false
};

it("should render proper color depending on mines nearby", () => {
  const openProps = { ...defaultProps, open: true };
  expect(
    shallow(<Cell {...openProps} minesAround={1} />).props().style.color
  ).toBe("blue");
  expect(
    shallow(<Cell {...openProps} minesAround={2} />).props().style.color
  ).toBe("green");
  expect(
    shallow(<Cell {...openProps} minesAround={3} />).props().style.color
  ).toBe("red");
  expect(
    shallow(<Cell {...openProps} minesAround={4} />).props().style.color
  ).toBe("yellow");
});

it("should not provide css color is cell is not empty", () => {
  const element = shallow(<Cell {...defaultProps} />);
  expect(element.props().style).toBe(undefined);
});

it("should provide correct class for unopened cell", () => {
  const emptyCell = shallow(<Cell {...defaultProps} />);
  const flag = shallow(<Cell {...defaultProps} flag={true} />);
  const questionMark = shallow(<Cell {...defaultProps} questionMark={true} />);
  expect(emptyCell.hasClass("cell")).toBe(true);
  expect(flag.hasClass("cell") && flag.hasClass("flag")).toBe(true);
  expect(
    questionMark.hasClass("cell") && questionMark.hasClass("questionMark")
  ).toBe(true);
});

it("should provide correct class for opened cell", () => {
  const mine = shallow(<Cell {...defaultProps} isMine={true} open={true} />);
  const nonMine = shallow(<Cell {...defaultProps} open={true} />);
  const noMinesAround = shallow(
    <Cell {...defaultProps} minesAround={0} open={true} />
  );
  expect(
    mine.hasClass("cell") && mine.hasClass("open") && mine.hasClass("mine")
  ).toBe(true);
  expect(nonMine.hasClass("cell") && nonMine.hasClass("open")).toBe(true);
  expect(
    noMinesAround.hasClass("cell") &&
      noMinesAround.hasClass("open") &&
      noMinesAround.hasClass("noMinesAround")
  ).toBe(true);
});

it(
  "should render mines around number when the " +
    "cell is not a mine and mines around > 0",
  () => {
    const opened = { ...defaultProps, open: true };
    const twoMines = shallow(<Cell {...opened} minesAround={2} />);
    const noMines = shallow(<Cell {...opened} minesAround={0} />);
    const mine = shallow(<Cell {...opened} minesAround={3} isMine={true} />);
    expect(twoMines.find(".cell").text()).toBe("2");
    expect(noMines.find(".cell").text()).toBe("");
    expect(mine.find(".cell").text()).toBe("");
  }
);

it("left click should dispatch open cell action", () => {
  const openCellMock = jest.fn();
  const props = { ...defaultProps, openCell: openCellMock };
  const element = shallow(<Cell {...props} />);
  element.find(".cell").simulate("click");
  expect(openCellMock.mock.calls.length).toBe(1);
});

it("right click should dispatch toggle cell action", () => {
  const toggleCellMock = jest.fn();
  const props = { ...defaultProps, toggleCell: toggleCellMock };
  const element = shallow(<Cell {...props} />);
  element.find(".cell").simulate("contextMenu");
  expect(toggleCellMock.mock.calls.length).toBe(1);
});
