import * as React from "react";
import "../css/digits.css";
import { Digit, DigitOrDot } from "./Digit";

interface IProps {
  readonly digits: ReadonlyArray<DigitOrDot>;
}

export const Digits = (props: IProps) => (
  <div className="digits">
    {props.digits.map((digit, index) => (
      <Digit key={index} digit={digit} />
    ))}
  </div>
);
