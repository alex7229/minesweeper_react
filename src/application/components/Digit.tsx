import * as React from "react";

export type DigitOrDot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "dot";

interface IProps {
  readonly digit: DigitOrDot;
}

export const Digit = (props: IProps) => {
  let className = "dots";
  if (props.digit === 0) {
    className = "zero";
  } else if (props.digit === 1) {
    className = "one";
  } else if (props.digit === 2) {
    className = "two";
  } else if (props.digit === 3) {
    className = "three";
  } else if (props.digit === 4) {
    className = "four";
  } else if (props.digit === 5) {
    className = "five";
  } else if (props.digit === 6) {
    className = "six";
  } else if (props.digit === 7) {
    className = "seven";
  } else if (props.digit === 8) {
    className = "eight";
  } else if (props.digit === 9) {
    className = "nine";
  }
  return (
    <div className={className}>
      <span className="d1" />
      <span className="d2" />
      <span className="d3" />
      <span className="d4" />
      <span className="d5" />
      <span className="d6" />
      <span className="d7" />
    </div>
  );
};
