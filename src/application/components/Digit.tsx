import * as React from "react";

export type DigitOrDot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "dot";

interface IProps {
  readonly digit: DigitOrDot;
  readonly primaryColor: string;
  readonly secondaryColor: string;
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
  const style = {
    backgroundColor: props.primaryColor,
    borderColor: props.secondaryColor
  };
  return (
    <div className={className}>
      <span style={style} className="d1" />
      <span style={style} className="d2" />
      <span style={style} className="d3" />
      <span style={style} className="d4" />
      <span style={style} className="d5" />
      <span style={style} className="d6" />
      <span style={style} className="d7" />
    </div>
  );
};
