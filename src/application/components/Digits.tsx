import * as React from "react";
import "../css/digits.css";
import { Digit, DigitOrDot } from "./Digit";

export interface IDigitsProps {
  readonly digits: ReadonlyArray<DigitOrDot>;
}

export const Digits = (props: IDigitsProps) => (
  <div className="digits">
    {props.digits.map((digit, index) => (
      <Digit key={index} digit={digit} />
    ))}
  </div>
);
