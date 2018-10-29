import * as React from "react";
import "../css/winOverlay.css";

interface IProps {
  readonly time: number;
  readonly difficulty: number;
  readonly hideOverlay: () => void;
}

export const WinOverlay = (props: IProps) => {
  const hideOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    return target.id === "overlay" ? props.hideOverlay() : null;
  };

  return (
    <div id="overlay" onClick={hideOverlay}>
      <div id="overlayContent" onClick={hideOverlay}>
        <div>
          {/* rounded to two decimal places */}
          Time (secs): <span>{Math.floor(props.time / 10) / 100}</span>
        </div>
        <div>
          Difficulty 3BV: <span>{props.difficulty}</span>
        </div>
        <div>
          3BV/sec:{" "}
          <span>
            {/* It is rounded to 3 decimal places */}
            {Math.floor((props.difficulty / props.time) * 1000000) / 1000}
          </span>
        </div>
      </div>
    </div>
  );
};
