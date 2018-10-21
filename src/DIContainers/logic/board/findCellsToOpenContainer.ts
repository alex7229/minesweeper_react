import { ICellPosition } from "../../../application/actions/actions";
import { findCellsAround } from "../../../application/logic/board/findCellsAround";
import { findCellsToOpen } from "../../../application/logic/board/findCellsToOpen";
import { Field, Row } from "../../../application/reducers/toggleCellReducer";

export type FindCellsToOpenContainer = (
  field: Field,
  currentCellPosition: ICellPosition
) => Row;

export const findCellsToOpenContainer: FindCellsToOpenContainer = (
  field,
  currentCellPosition
) => findCellsToOpen(field, currentCellPosition, findCellsAround);
