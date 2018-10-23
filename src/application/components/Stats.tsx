import * as React from "react";
import "../css/stats.css";
import { DigitOrDot } from "./Digit";
import { Digits } from "./Digits";

export interface IStatsProps {
  readonly timer: ReadonlyArray<DigitOrDot>;
  readonly flagsLeft: ReadonlyArray<DigitOrDot>;
  readonly isSmall: boolean;
  readonly restartGame: () => void;
}

export const Stats = (props: IStatsProps) => (
  <div id="stats" className={`${props.isSmall === true ? "small" : "big"}`}>
    <div id="timer">
      <Digits
        primaryColor="rebeccapurple"
        secondaryColor="rebeccapurple"
        digits={props.timer}
      />
    </div>
    <div className="filler" />
    <div id="flags_count">
      <Digits
        primaryColor="rebeccapurple"
        secondaryColor="rebeccapurple"
        digits={props.flagsLeft}
      />
    </div>
    <img id="flag" src="/images/flag.png" />
    <img
      id="restart_face"
      src="/images/smiley_face.png"
      onClick={props.restartGame}
    />
  </div>
);
