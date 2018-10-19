import { shallow } from "enzyme";
import * as React from "react";
import { Board } from "../../application/components/Board";
import { generateEmptyField } from "../../application/logic/generateEmptyField";

const defaultProps = {
  width: 30,
  height: 16,
  mines: 99,
  field: generateEmptyField(30, 16),
  openCell: jest.fn(),
  toggleCell: jest.fn()
};

it("should render proper size for the field", () => {
  const blockSize = 25;
  const height = 16 * blockSize;
  const width = 30 * blockSize;
  const style = { height, width };
  const board = shallow(<Board {...defaultProps} />);
  expect(board.props().style).toEqual(style);
});

it("should render proper amount of cells", () => {
  const cellsNumber = defaultProps.width * defaultProps.height;
  const board = shallow(<Board {...defaultProps} />);
  expect(board.props().children.length).toBe(cellsNumber);
});

it("should pass correct cell props", () => {
  // cherry picking is used. Cell from second row and third column is used
  // row and column count starts from 0
  const row = 1;
  const column = 2;
  const position = row * defaultProps.width + column;

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
  // 479 is the last position for 30*16 field
  const cellChild = board.props().children[479];
  const cell = shallow(cellChild);
  cell.simulate("click");
  expect(openCellMock.mock.calls.length).toBe(1);
  expect(openCellMock.mock.calls[0][0]).toEqual({ column: 29, row: 15 });
  cell.simulate("contextMenu");
  expect(toggleCellMock.mock.calls.length).toBe(1);
  expect(toggleCellMock.mock.calls[0][0]).toEqual({ column: 29, row: 15 });
});
