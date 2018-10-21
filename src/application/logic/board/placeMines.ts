import * as _ from "lodash";
import { ICellPosition } from "../../actions/actions";
import { Field } from "../../reducers/toggleCellReducer";

export type PlaceMines = (
  field: Field,
  mines: ReadonlyArray<ICellPosition>
) => Field;

export const placeMines: PlaceMines = (field, mines) => {
  const fieldCopy = _.cloneDeep(field);
  for (const position of mines) {
    // @ts-ignore
    fieldCopy[position.row][position.column].isMine = true;
  }
  return fieldCopy;
};
