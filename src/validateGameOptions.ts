export type ValidateGameOptions = (
  width: number,
  height: number,
  mines: number
) => boolean;

export const validateGameOptions: ValidateGameOptions = (
  width,
  height,
  mines
) => {
  if (
    width !== Math.floor(width) ||
    height !== Math.floor(height) ||
    mines !== Math.floor(mines)
  ) {
    return false;
  }
  if (width < 4 || width > 100 || height < 4 || height > 100) {
    return false;
  }
  if (mines < 1) {
    return false;
  }
  const minEmptyCellsNumber = 9;
  const limit = width * height - minEmptyCellsNumber;
  return mines <= limit;
};
