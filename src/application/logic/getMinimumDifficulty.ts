import { Field } from "../reducers/toggleCellReducer";

export type GetMinumumDifficulty = (field: Field, mines: number) => number;

export const getMinumumDifficulty: GetMinumumDifficulty = (field, mines) => {
  const height = field.length;
  const width = field[0].length;
  if (height === 9 && width === 9 && mines === 10) {
    return 2;
  }
  if (height === 16 && width === 16 && mines === 40) {
    return 30;
  }
  if (height === 16 && width === 30 && mines === 99) {
    return 100;
  }
  return 1;
};
