import * as _ from 'lodash';
import * as React from 'react';
import { Cell, ICellPosition as CellPosition, ICellProps } from './Cell';


interface IProps
 {
    rows: number;
    columns: number;
    mines: number;
}

interface IState {
    field: ICellProps[][];
    bombsArePlaced: boolean;
}

export class Field extends React.Component <IProps
, IState> {

    constructor(props: IProps
        ) {
        super(props);
        this.state = {
            bombsArePlaced: false,field: [],
           
        };

        this.generateEmptyField = this.generateEmptyField.bind(this);
        this.placeMines = this.placeMines.bind(this);
        this.openCell = this.openCell.bind(this);
    }

    public componentDidMount() {
        if (this.state.field.length === 0) {
            this.generateEmptyField();
            return;
        }
    }

    public openCell(position: CellPosition) {
        if (!this.state.bombsArePlaced) {
            return;
        }
        const field = this.state.field;
        const cell = field[position.row][position.column];
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

    public openEmptyCells(position: CellPosition) {
        const fieldCopy = _.cloneDeep(this.state.field);
        const self = this;
        function floodOpen(pos: CellPosition) {
            const currentCell = fieldCopy[pos.row][pos.column];
            currentCell.isOpen = true;
            const adjustedCells = self.findAdjustedCells(currentCell, fieldCopy);
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

    public placeMines(firstClick: CellPosition): void {
        if (this.state.bombsArePlaced) {
            return;
        }
        const minesLimit = this.props.rows * this.props.columns - 9;
        if (this.props.mines > minesLimit) {
            throw new Error('number of mines was exceeded');
        }
        const fieldCopy = _.cloneDeep(this.state.field);
        const nonMineZone = this.findAdjustedCells(firstClick);
        nonMineZone.push(fieldCopy[firstClick.row][firstClick.column]);
        const oneDimensionalField = fieldCopy
            .reduce((cells: ICellProps[], currentRow: ICellProps[]) => {
                return cells.concat(currentRow);
            });
        let mines = this.props.mines;
        while (mines > 0) {
            const mineNumber = Math.floor(Math.random() * oneDimensionalField.length);
            const mine = oneDimensionalField[mineNumber];
            const isMineProhibited = nonMineZone.some((adjustedCell: ICellProps) => {
                return adjustedCell.column === mine.column && adjustedCell.row === mine.row;
            });
            if (isMineProhibited) {
                continue;
            }
            fieldCopy[mine.row][mine.column].mine = true;
            oneDimensionalField.splice(mineNumber, 1);
            mines--;
        }
        fieldCopy.forEach((row: ICellProps[]) => {
            row.forEach((cell: ICellProps) => {
                const position: CellPosition = {
                    column: cell.column,row:  cell.row,
                    
                };
                cell.nearbyMines = this.findAdjustedMinesNumber(position, fieldCopy);
            });
        });
        this.setState({field: fieldCopy, bombsArePlaced: true}, () => this.openCell(firstClick));
    }

    public render() {
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
        const field: ICellProps[][] = [];
        for (let row = 0; row < this.props.rows; row++) {
            const currentRow: ICellProps[] = [];
            for (let column = 0; column < this.props.columns; column++) {
                currentRow.push({
                    column,
                    isOpen: false,
                    mine: false,
                    nearbyMines: 0,
                    openCell: this.openCell,
                    placeMines: this.placeMines,
                    row,
                    
                   
                    
                 
                   
                });
            }
            field.push(currentRow);
        }
        this.setState({field});
    }

    private findAdjustedMinesNumber(position: CellPosition, field: ICellProps[][] = this.state.field): number {
        return this.findAdjustedCells(position, field)
            .filter((cell: ICellProps) => cell.mine)
            .length;
    }

    private findAdjustedCells(position: CellPosition, field: ICellProps[][] = this.state.field): ICellProps[] {
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