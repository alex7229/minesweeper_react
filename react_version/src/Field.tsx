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
        this.state = {
            field: [],
            bombsArePlaced: false
        };

        this.generateEmptyField = this.generateEmptyField.bind(this);
        this.placeMines = this.placeMines.bind(this);
        this.openCell = this.openCell.bind(this);
    }

    componentDidMount() {
        if (this.state.field.length === 0) {
            this.generateEmptyField();
            return;
        }
    }

    openCell(position: CellPosition) {
        if (!this.state.bombsArePlaced) {
            return;
        }
        let field = this.state.field;
        let cell = field[position.row][position.column];
        if (cell.mine) {
            return;
        }
        if (cell.nearbyMines > 0) {
            cell.isOpen = true;
            this.setState({field});
            return;
        }
        this.openEmptyCells(position);
    }

    openEmptyCells(position: CellPosition) {
        let fieldCopy = cloneDeep(this.state.field);
        const self = this;
        function floodOpen(pos: CellPosition) {
            let currentCell = fieldCopy[pos.row][pos.column];
            currentCell.isOpen = true;
            let adjustedCells = self.findAdjustedCells(currentCell, fieldCopy);
            adjustedCells.forEach((adjustedCell => {
                if (adjustedCell.mine || adjustedCell.isOpen) {
                    return;
                }
                if (adjustedCell.nearbyMines > 0) {
                    adjustedCell.isOpen = true;
                    return;
                }
                floodOpen(adjustedCell);
            }));
        }
        floodOpen(position);
        this.setState({field: fieldCopy});
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
        let nonMineZone = this.findAdjustedCells(firstClick);
        nonMineZone.push(fieldCopy[firstClick.row][firstClick.column]);
        let oneDimensionalField = fieldCopy
            .reduce((cells: CellProps[], currentRow: CellProps[]) => {
                return cells.concat(currentRow);
            });
        let mines = this.props.mines;
        while (mines > 0) {
            const mineNumber = Math.floor(Math.random() * oneDimensionalField.length);
            const mine = oneDimensionalField[mineNumber];
            const isMineProhibited = nonMineZone.some((adjustedCell: CellProps) => {
                return adjustedCell.column === mine.column && adjustedCell.row === mine.row;
            });
            if (isMineProhibited) {
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
        this.setState({field: fieldCopy, bombsArePlaced: true}, () => this.openCell(firstClick));
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
                                isOpen={cell.isOpen}
                                openCell={this.openCell}
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
                    placeMines: this.placeMines,
                    isOpen: false,
                    openCell: this.openCell
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
        for (let row = position.row - 1; row <= position.row + 1; row++) {
            for (let column = position.column - 1; column <= position.column + 1; column++) {
                if (row < 0 || column < 0) {
                    continue;
                }
                if (row === position.row && column === position.column) {
                    // don't count middle cell itself
                    continue;
                }
                if (field[row] && field[row][column]) {
                    cells.push(field[row][column]);
                }
            }
        }
        return cells;
    }

}