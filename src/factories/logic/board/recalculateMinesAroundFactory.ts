import { findCellsAround } from "../../../application/logic/board/findCellsAround";
import { recalculateMinesAround } from "../../../application/logic/board/recalculateMinesAround";
import { Field } from "../../../application/reducers/toggleCellReducer";

export type RecalculateMinesAroundFactory = (field: Field) => Field;

export const recalculateMinesAroundFactory: RecalculateMinesAroundFactory = field =>
  recalculateMinesAround(field, findCellsAround);
