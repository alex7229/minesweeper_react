import * as React from "react";
import "../css/winOverlay.css";

interface IProps {
  readonly time: number;
  readonly difficulty: number;
  readonly hideOverlay: () => void;
}

export const WinOverlay = (props: IProps) => (
  <div id="overlay" onClick={props.hideOverlay}>
    <div>
      <div>
        Time (secs): <span>223.52</span>
        {/* 2 digits after decimal */}
      </div>
      <div>
        Difficulty 3BV: <span>116</span>
        {/* integer */}
      </div>
      <div>
        3BV/sec: <span>0.5</span>
        {/* 3 digits after . */}
      </div>
    </div>
  </div>
);
