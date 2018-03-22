import * as React from 'react';

export interface CellPosition {
    row: number;
    column: number;
}

export interface Props extends CellPosition {
    mine: boolean;
    nearbyMines: number;
    placeMines: (cell: CellPosition) => void;
    openCell: (cell: CellPosition) => void;
    isOpen: boolean;
}

interface State {
    // todo: flag and question mark should be here
}

export class Cell extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        this.props.placeMines({
            row: this.props.row,
            column: this.props.column
        });
        this.props.openCell(this.props);
    }

    render() {
        let className = this.props.isOpen ? 'isOpen ' : 'isClosed ';
        className += this.props.mine ? 'mine ' : 'mineless ';
        return (
            <div
                data-nearbymines={!this.props.mine && this.props.nearbyMines}
                className={className}
                onClick={this.handleClick}
            >
                {this.props.nearbyMines && this.props.isOpen ? this.props.nearbyMines : ''}
            </div>
        );
    }

}