import { IGameOptionsState } from "../../reducers/gameOptions";

export type ValidateGameOptions = (options: IGameOptionsState) => boolean;

export const validateGameOptions: ValidateGameOptions = ({
  height,
  width,
  mines
}) => {
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
