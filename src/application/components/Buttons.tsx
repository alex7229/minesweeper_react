import * as React from "react";
import "../css/buttons.css";
import { DropDown } from "./DropDown";

export const Buttons = (props: {}) => (
  // todo: should add small if board width is less than 16
  <div id="buttons" className="row small">
    <div className="buttonWrapper" id="beginner">
      <div className="button">Beginner</div>
    </div>
    <div className="buttonWrapper" id="advanced">
      <div className="button">Advanced</div>
    </div>
    <div className="buttonWrapper" id="expert">
      <div className="button">Expert</div>
    </div>
    <div className="buttonWrapper" id="custom">
      <div className="button">Custom</div>
      <DropDown />
    </div>
  </div>
);
