import { ICellPosition } from "../../application/actions";
import { findCellsAround } from "../../application/logic/findCellsAround";
import { findCellsToOpen } from "../../application/logic/findCellsToOpen";
import { Field, Row } from "../../application/reducers/rightClickReducer";

export type FindCellsToOpenFactory = (
  field: Field,
  currentCellPosition: ICellPosition
) => Row;

export const findCellsToOpenFactory: FindCellsToOpenFactory = (
  field,
  currentCellPosition
) => findCellsToOpen(field, currentCellPosition, findCellsAround);
