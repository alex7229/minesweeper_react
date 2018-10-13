import * as _ from "lodash";
import { ICellPosition } from "./actions";
import { Field } from "./reducers/processRightClick";

export type PlaceMines = (
  field: Field,
  mines: ReadonlyArray<ICellPosition>
) => Field;

export const placeMines: PlaceMines = (field, mines) => {
  const positions = _.orderBy(mines, ["row", "column"], ["asc", "asc"]);
  const fieldCopy = _.cloneDeep(field);
  for (const position of positions) {
    // @ts-ignore
    fieldCopy[position.row][position.column].isMine = true;
  }
  return fieldCopy;
};
