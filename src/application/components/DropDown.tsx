import * as React from "react";
import { IGameOptionPayload } from "../actions/actions";
import "../css/dropDown.css";

interface IProps {
  readonly widthError: string;
  readonly heightError: string;
  readonly minesError: string;
  readonly changeOption: (payload: IGameOptionPayload) => void;
  readonly startGame: () => void;
}

export const DropDown = (props: IProps) => (
  <div id="dropDown">
    <div className="inputRow">
      <div className="errorContainer">
        <div className="error">{props.widthError}</div>
      </div>
      <label htmlFor="width">Width: </label>
      <input
        id="width"
        type="text"
        defaultValue="30"
        // tslint:disable-next-line
        onChange={event =>
          props.changeOption({
            type: "width",
            value: parseInt(event.currentTarget.value, 10)
          })
        }
      />
      <div className="clear" />
    </div>

    <div className="inputRow">
      <div className="errorContainer">
        <div className="error">{props.heightError}</div>
      </div>
      <label htmlFor="height">Height: </label>
      <input
        id="height"
        type="text"
        defaultValue="16" // tslint:disable-next-line
        onChange={event =>
          props.changeOption({
            type: "height",
            value: parseInt(event.currentTarget.value, 10)
          })
        }
      />
      <div className="clear" />
    </div>

    <div className="inputRow">
      <div className="errorContainer">
        <div className="error">{props.minesError}</div>
      </div>
      <label htmlFor="mines">Mines: </label>
      <input
        id="mines"
        type="text"
        defaultValue="99" // tslint:disable-next-line
        onChange={event =>
          props.changeOption({
            type: "mines",
            value: parseInt(event.currentTarget.value, 10)
          })
        }
      />
      <div className="clear" />
    </div>

    <div className="inputRow">
      <div className="button" onClick={props.startGame}>
        Start
      </div>
    </div>
  </div>
);
