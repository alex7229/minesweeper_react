import * as React from 'react';

export interface CellPosition {
    row: number;
    column: number;
}

export interface Props extends CellPosition {
    mine: boolean;
    nearbyMines: number;
    placeMines: (cell: CellPosition) => void;
}

interface State {
    isOpen: boolean;
}

export class Cell extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        this.props.placeMines({
            row: this.props.row,
            column: this.props.column
        });
        this.setState({
            isOpen: true
        });
    }

    render() {
        let className = this.state.isOpen ? 'isOpen ' : 'isClosed ';
        className += this.props.mine ? 'mine ' : 'mineless ';
        return (
            <div
                data-nearbymines={this.props.nearbyMines}
                className={className}
                onClick={this.handleClick}
            >
                {this.props.nearbyMines && this.state.isOpen ? this.props.nearbyMines : ''}
            </div>
        );
    }

}