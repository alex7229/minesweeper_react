import * as React from "react";
import { GetDigitsFromTimeContainer } from "../../DIContainers/logic/digits/getDigitsFromTimeContainer";
import "../css/stats.css";
import { DigitOrDot } from "./Digit";
import { Digits } from "./Digits";

export interface IStatsDispatchProps {
  readonly restartGame: () => void;
}

export interface IStatsStateProps {
  readonly gameHasStarted: boolean;
  readonly mineWasClicked: boolean;
  readonly gameStartTimestamp: number;
  readonly flagsLeft: ReadonlyArray<DigitOrDot>;
  readonly size: "small" | "big";
  readonly isFinished: boolean;
  readonly getTime: () => number;
  readonly getDigitsFromTime: GetDigitsFromTimeContainer;
  readonly gameTimeMs: number;
}

export type IStatsProps = IStatsStateProps & IStatsDispatchProps;

export class Stats extends React.Component<IStatsProps> {
  public props: IStatsProps;
  public interval: NodeJS.Timer;
  public intervalIsRunning: boolean;

  constructor(props: IStatsProps) {
    super(props);
    this.props = props;

    this.startTimer = this.startTimer.bind(this);
    this.stopInterval = this.stopInterval.bind(this);

    this.startTimer();
  }

  public startTimer() {
    if (this.intervalIsRunning) {
      return;
    }
    this.interval = setInterval(() => this.forceUpdate(), 1000);
    this.intervalIsRunning = true;
  }

  public stopInterval() {
    clearInterval(this.interval);
    this.intervalIsRunning = false;
  }

  public componentWillUnmount() {
    this.stopInterval();
  }

  public render() {
    if (this.props.gameHasStarted && !this.props.isFinished) {
      this.startTimer();
    }
    if (this.props.isFinished) {
      this.stopInterval();
    }

    const gameTime = this.props.isFinished
      ? this.props.gameTimeMs
      : this.props.getTime() - this.props.gameStartTimestamp;
    const timerDigits = this.props.getDigitsFromTime(
      this.props.gameHasStarted ? gameTime : 0
    );
    return (
      <div id="stats" className={"row " + this.props.size}>
        <div id="timer">
          <Digits digits={timerDigits} />
        </div>
        <div className="filler" />
        <div id="flags_count">
          <Digits digits={this.props.flagsLeft} />
        </div>
        <img id="flag" src="/images/flag.png" />
        <img
          id="restart_face"
          src={`/images/${
            this.props.mineWasClicked ? "dead" : "smiley"
          }_face.png`}
          onClick={this.props.restartGame}
        />
      </div>
    );
  }
}
