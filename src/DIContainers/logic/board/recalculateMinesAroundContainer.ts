import { findCellsAround } from "../../../application/logic/board/findCellsAround";
import { recalculateMinesAround } from "../../../application/logic/board/recalculateMinesAround";
import { Field } from "../../../application/reducers/toggleCellReducer";

export type RecalculateMinesAroundContainer = (field: Field) => Field;

export const recalculateMinesAroundContainer: RecalculateMinesAroundContainer = field =>
  recalculateMinesAround(field, findCellsAround);
