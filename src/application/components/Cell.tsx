import * as React from "react";

export interface ICellPosition {
  row: number;
  column: number;
}

export interface ICellProps extends ICellPosition {
  mine: boolean;
  nearbyMines: number;
  placeMines: (cell: ICellPosition) => void;
  openCell: (cell: ICellPosition) => void;
  isOpen: boolean;
}

export class Cell extends React.Component<ICellProps, {}> {
  constructor(props: ICellProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    this.props.placeMines({
      column: this.props.column,
      row: this.props.row
    });
    this.props.openCell(this.props);
  }

  public render() {
    let className = this.props.isOpen ? "isOpen " : "isClosed ";
    className += this.props.mine ? "mine " : "mineless ";
    return (
      <div
        data-nearbymines={!this.props.mine && this.props.nearbyMines}
        className={className}
        onClick={this.handleClick}
      >
        {this.props.nearbyMines && this.props.isOpen
          ? this.props.nearbyMines
          : ""}
      </div>
    );
  }
}
