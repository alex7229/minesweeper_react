import * as React from "react";
import { IGameOptionPayload, StartGamePayload } from "../actions/actions";
import "../css/buttons.css";
import { DropDown } from "./DropDown";

export interface IButtonsStateProps {
  readonly widthError: string;
  readonly heightError: string;
  readonly minesError: string;
  readonly currentFieldWidth: number;
}

export interface IButtonsDispatchProps {
  readonly changeOption: (payload: IGameOptionPayload) => void;
  readonly startGame: (type: StartGamePayload) => void;
}

type IProps = IButtonsStateProps & IButtonsDispatchProps;

export const Buttons = (props: IProps) => {
  const dropDownProps = {
    widthError: props.widthError,
    heightError: props.heightError,
    minesError: props.minesError,
    startGame: props.startGame.bind(null, "custom"),
    changeOption: props.changeOption
  };
  return (
    <div
      id="buttons"
      className={"row " + (props.currentFieldWidth < 16 ? "small" : "")}
    >
      <div
        className="buttonWrapper"
        id="beginner"
        onClick={props.startGame.bind(null, "beginner")}
      >
        <div className="button">Beginner</div>
      </div>
      <div
        className="buttonWrapper"
        id="advanced"
        onClick={props.startGame.bind(null, "advanced")}
      >
        <div className="button">Advanced</div>
      </div>
      <div
        className="buttonWrapper"
        id="expert"
        onClick={props.startGame.bind(null, "expert")}
      >
        <div className="button">Expert</div>
      </div>
      <div className="buttonWrapper" id="custom">
        <div className="button">Custom</div>
        <DropDown {...dropDownProps} />
      </div>
    </div>
  );
};
