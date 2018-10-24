import { ICellPosition } from "../../actions/actions";
import { Field } from "../../reducers/toggleCellReducer";

export type OpenAllMines = (
  field: Field,
  activeMinePosition: ICellPosition
) => Field;

export const openAllMines: OpenAllMines = (field, activeMinePosition) =>
  field.map((row, rowIndex) =>
    row.map((cell, columnIndex) => {
      if (!cell.isMine) {
        return cell;
      }
      if (
        rowIndex === activeMinePosition.row &&
        columnIndex === activeMinePosition.column
      ) {
        return { ...cell, open: true, isMineActive: true };
      }
      return { ...cell, open: true };
    })
  );
