import { Field, ICell } from "../../reducers/toggleCellReducer";

export type GenerateEmptyField = (width: number, height: number) => Field;

export const generateEmptyField: GenerateEmptyField = (width, height) => {
  const field: ICell[][] = [];
  for (let row = 0; row < height; row++) {
    field.push([]);
    for (let column = 0; column < width; column++) {
      field[row][column] = {
        column,
        row,
        open: false,
        flag: false,
        isMine: false,
        minesAround: 0,
        questionMark: false
      };
    }
  }
  return field;
};
