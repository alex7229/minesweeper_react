import { findCellsAround } from "../../application/logic/findCellsAround";
import { recalculateMinesAround } from "../../application/logic/recalculateMinesAround";
import { Field } from "../../reducers/processRightClick";

export type RecalculateMinesAroundFactory = (field: Field) => Field;

export const recalculateMinesAroundFactory: RecalculateMinesAroundFactory = field =>
  recalculateMinesAround(field, findCellsAround);
