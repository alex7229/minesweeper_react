import { ICellPosition } from "../actions";
import { findCellsAround } from "../application/logic/findCellsAround";
import { findCellsToOpen } from "../application/logic/findCellsToOpen";
import { Field, Row } from "../reducers/processRightClick";

export type FindCellsToOpenFactory = (
  field: Field,
  currentCellPosition: ICellPosition
) => Row;

export const findCellsToOpenFactory: FindCellsToOpenFactory = (
  field,
  currentCellPosition
) => findCellsToOpen(field, currentCellPosition, findCellsAround);
