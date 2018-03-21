import * as React from 'react';
import { Cell, CellPosition, Props as CellProps } from './Cell';
const cloneDeep = require('lodash/cloneDeep');

interface Props {
    rows: number;
    columns: number;
    mines: number;
}

interface State {
    field: CellProps[][];
    bombsArePlaced: boolean;
}

export class Field extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {field: [], bombsArePlaced: false};

        this.generateEmptyField = this.generateEmptyField.bind(this);
        this.placeMines = this.placeMines.bind(this);
    }

    componentDidMount() {
        this.generateEmptyField();
    }

    placeMines(firstClick: CellPosition): void {
        if (this.state.bombsArePlaced) {
            return;
        }
        const minesLimit = this.props.rows * this.props.columns - 9;
        if (this.props.mines > minesLimit) {
            throw new Error('number of mines was exceeded');
        }
        let fieldCopy = cloneDeep(this.state.field);
        const adjustedCells = this.findAdjustedCells(firstClick);
        let oneDimensionalField = fieldCopy
            .reduce((cells: CellProps[], currentRow: CellProps[]) => {
                return cells.concat(currentRow);
            });
        let mines = this.props.mines;
        while (mines > 0) {
            const mineNumber = Math.floor(Math.random() * oneDimensionalField.length);
            const mine = oneDimensionalField[mineNumber];
            const isCellAdjusted = adjustedCells.some((adjustedCell: CellProps) => {
                return adjustedCell.column === mine.column && adjustedCell.row === mine.row;
            });
            if (isCellAdjusted) {
                continue;
            }
            fieldCopy[mine.row][mine.column].mine = true;
            oneDimensionalField.splice(mineNumber, 1);
            mines--;
        }
        fieldCopy.forEach((row: CellProps[]) => {
            row.forEach((cell: CellProps) => {
                const position: CellPosition = {
                    row:  cell.row,
                    column: cell.column
                };
                cell.nearbyMines = this.findAdjustedMinesNumber(position, fieldCopy);
            });
        });
        this.setState({field: fieldCopy, bombsArePlaced: true});
    }

    render() {
        const rows = this.state.field.map((row, index) => {
            return (
                <div className="row" key={index}>
                    {row.map(cell => {
                        return (
                            <Cell
                                key={cell.row.toString() + '_' + cell.column.toString()}
                                row={cell.row}
                                column={cell.column}
                                mine={cell.mine}
                                placeMines={this.placeMines}
                                nearbyMines={cell.nearbyMines}
                            />
                        );
                    })}
                </div>
            );
        });
        return <div id="testContainer">{rows}</div>;
    }

    private generateEmptyField(): void {
        let field: CellProps[][] = [];
        for (let row = 0; row < this.props.rows; row++) {
            let currentRow: CellProps[] = [];
            for (let column = 0; column < this.props.columns; column++) {
                currentRow.push({
                    mine: false,
                    row,
                    column,
                    nearbyMines: 0,
                    placeMines: this.placeMines
                });
            }
            field.push(currentRow);
        }
        this.setState({field});
    }

    private findAdjustedMinesNumber(position: CellPosition, field: CellProps[][] = this.state.field): number {
        return this.findAdjustedCells(position, field)
            .filter((cell: CellProps) => cell.mine)
            .length;
    }

    private findAdjustedCells(position: CellPosition, field: CellProps[][] = this.state.field): CellProps[] {
        if (!field[position.row] || !field[position.row][position.column]) {
            return [];
        }
        const cells = [];
        for (let row = position.row - 1; row <= position.row + 1 && row >= 0; row++) {
            for (let column = position.column - 1; column <= position.column + 1 && column >= 0; column++) {
                if (field[row] && field[row][column]) {
                    cells.push(field[row][column]);
                }
            }
        }
        return cells;
    }

}