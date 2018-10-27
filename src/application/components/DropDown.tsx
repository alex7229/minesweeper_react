import * as React from "react";
import "../css/dropDown.css";

export const DropDown = (props: {}) => (
  <div id="dropDown">
    <div className="inputRow">
      <div className="errorContainer">
        <div className="error">error</div>
      </div>
      <label htmlFor="width">Width: </label>
      <input id="width" type="number" defaultValue="4" min="4" max="99" />
      <div className="clear" />
    </div>

    <div className="inputRow">
      <div className="errorContainer">
        <div className="error">error</div>
      </div>
      <label htmlFor="height">Height: </label>
      <input id="height" type="number" defaultValue="4" />
      <div className="clear" />
    </div>

    <div className="inputRow">
      <div className="errorContainer">
        <div className="error">error</div>
      </div>
      <label htmlFor="mines">Mines: </label>
      <input id="mines" type="number" defaultValue="4" />
      <div className="clear" />
    </div>

    <div className="inputRow">
      <div className="button">Start</div>
    </div>
  </div>
);
