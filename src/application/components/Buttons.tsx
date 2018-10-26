import * as React from "react";
import "../css/buttons.css";

export const Buttons = (props: {}) => (
  <div id="buttonsContainer">
    <div className="button">Beginner</div>
    <div className="button">Advanced</div>
    <div className="button">Expert</div>
    <div className="button">Custom</div>
  </div>
);
