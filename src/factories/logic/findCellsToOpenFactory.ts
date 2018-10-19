import { ICellPosition } from "../../application/actions/actions";
import { findCellsAround } from "../../application/logic/findCellsAround";
import { findCellsToOpen } from "../../application/logic/findCellsToOpen";
import { Field, Row } from "../../application/reducers/toggleCellReducer";

export type FindCellsToOpenFactory = (
  field: Field,
  currentCellPosition: ICellPosition
) => Row;

export const findCellsToOpenFactory: FindCellsToOpenFactory = (
  field,
  currentCellPosition
) => findCellsToOpen(field, currentCellPosition, findCellsAround);
