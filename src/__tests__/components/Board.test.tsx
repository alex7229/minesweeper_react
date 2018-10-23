import { shallow } from "enzyme";
import * as React from "react";
import { Board } from "../../application/components/Board";
import { generateEmptyField } from "../../application/logic/board/generateEmptyField";

const width = 30;
const height = 16;

const defaultProps = {
  field: generateEmptyField(width, height),
  openCell: jest.fn(),
  toggleCell: jest.fn()
};

it("should place clear div in the end of every row", () => {
  // row length is 10, so 10-th, 21-th and 32-th cell should be clear div
  const props = { ...defaultProps, field: generateEmptyField(10, 3) };
  const board = shallow(<Board {...props} />);
  expect(board.find(".clear").length).toBe(3);
  expect(board.props().children[10].props.className).toBe("clear");
  expect(board.props().children[21].props.className).toBe("clear");
  expect(board.props().children[32].props.className).toBe("clear");
});

it("should render proper amount of cells", () => {
  const cellsNumber = (width + 1) * height;
  // +1 is from clear div on every row
  const board = shallow(<Board {...defaultProps} />);
  expect(board.props().children.length).toBe(cellsNumber);
});

it("should pass correct cell props", () => {
  // cherry picking is used. Cell from second row and third column is used
  // row and column count starts from 0
  // width +1 because of clear div in the end of the row
  const row = 1;
  const column = 2;
  const position = row * (width + 1) + column;

  const board = shallow(<Board {...defaultProps} />);
  const cell = board.props().children[position];
  expect(cell.props.row).toBe(row);
  expect(cell.props.column).toBe(column);
  expect(cell.props.open).toBe(false);
  expect(cell.props.isMine).toBe(false);
  expect(cell.props.flag).toBe(false);
  expect(cell.props.questionMark).toBe(false);
  expect(cell.props.minesAround).toBe(0);
  expect(cell.key).toBe(`${row} - ${column}`);
});

it("should pass correct click handlers", () => {
  const openCellMock = jest.fn();
  const toggleCellMock = jest.fn();

  const board = shallow(
    <Board
      {...defaultProps}
      openCell={openCellMock}
      toggleCell={toggleCellMock}
    />
  );
  const children = board.props().children;
  // last cell is used (but not the last element)
  // because the last element is clear div
  const cellChild = children[children.length - 2];
  const cell = shallow(cellChild);
  cell.simulate("click");
  expect(openCellMock.mock.calls.length).toBe(1);
  expect(openCellMock.mock.calls[0][0]).toEqual({ column: 29, row: 15 });
  cell.simulate("contextMenu");
  expect(toggleCellMock.mock.calls.length).toBe(1);
  expect(toggleCellMock.mock.calls[0][0]).toEqual({ column: 29, row: 15 });
});
