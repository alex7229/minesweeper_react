import * as React from "react";
import "../css/buttons.css";
import { DropDown } from "./DropDown";

export const Buttons = (props: {}) => (
  <div id="buttons" className="row">
    <div className="buttonWrapper">
      <div className="button">Beginner</div>
    </div>
    <div className="buttonWrapper">
      <div className="button">Advanced</div>
    </div>
    <div className="buttonWrapper">
      <div className="button">Expert</div>
    </div>
    <div className="buttonWrapper" id="custom">
      <div className="button">Custom</div>
      <DropDown />
    </div>
  </div>
);
