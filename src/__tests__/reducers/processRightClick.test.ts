import { ICellPosition, RIGHT_CLICK_CELL } from "../../actions";
import { ICell, processRightClick } from "../../reducers/processRightClick";

const position: ICellPosition = { column: 0, row: 0 };

it("should not mutate field if position is out of bounds", () => {
  const outOfBoundsPosition: ICellPosition = { column: 25, row: 0 };
  const cell: ICell = { open: false, flag: false, questionMark: false };
  const resultedField = processRightClick([[cell, cell], [cell, cell]], {
    payload: outOfBoundsPosition,
    type: RIGHT_CLICK_CELL
  });
  expect(resultedField).toEqual([[cell, cell], [cell, cell]]);
});

it("should not change cell if it is already open", () => {
  const cell: ICell = { open: true, flag: false, questionMark: false };
  const resultedField = processRightClick([[cell]], {
    payload: position,
    type: RIGHT_CLICK_CELL
  });
  expect(resultedField).toEqual([[cell]]);
});

it("should set up flag first", () => {
  const cell: ICell = { open: false, flag: false, questionMark: false };
  const flagCell: ICell = { open: false, flag: true, questionMark: false };
  const field = processRightClick([[cell]], {
    payload: position,
    type: RIGHT_CLICK_CELL
  });
  expect(field).toEqual([[flagCell]]);
});

it("should change flag for question mark", () => {
  const flagCell: ICell = { open: false, flag: true, questionMark: false };
  const questionMarkCell: ICell = {
    flag: false,
    open: false,
    questionMark: true
  };
  const field = processRightClick([[flagCell]], {
    payload: position,
    type: RIGHT_CLICK_CELL
  });
  expect(field).toEqual([[questionMarkCell]]);
});

it("should remove question mark", () => {
  const questionMarkCell: ICell = {
    flag: false,
    open: false,
    questionMark: true
  };
  const emptyCell: ICell = { open: false, flag: false, questionMark: false };
  const field = processRightClick([[questionMarkCell]], {
    payload: position,
    type: RIGHT_CLICK_CELL
  });
  expect(field).toEqual([[emptyCell]]);
});
