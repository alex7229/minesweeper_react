import { Field, ICell } from "./reducers/processRightClick";

export type GenerateEmptyField = (
  unroundedWidth: number,
  unroundedHeight: number
) => Field;

export const generateEmptyField: GenerateEmptyField = (
  unroundedWidth,
  unroundedHeight
) => {
  const width = Math.floor(unroundedWidth);
  const height = Math.floor(unroundedHeight);
  if (width <= 0 || height <= 0) {
    throw new Error("cannot create field with non-positive size");
  }
  if (width > 1000 || height > 1000) {
    throw new Error("cannot create field with size bigger than 1000");
  }
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
