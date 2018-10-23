import * as React from "react";
import "../css/digits.css";
import { Digit, DigitOrDot } from "./Digit";

export interface IDigitsProps {
  readonly digits: ReadonlyArray<DigitOrDot>;
  readonly primaryColor: string;
  readonly secondaryColor: string;
}

export const Digits = (props: IDigitsProps) => (
  <div className="digits">
    {props.digits.map((digit, index) => (
      <Digit
        key={index}
        primaryColor={props.primaryColor}
        secondaryColor={props.secondaryColor}
        digit={digit}
      />
    ))}
  </div>
);
