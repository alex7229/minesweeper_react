import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  changeGameOption,
  elapseOneSecond,
  openCell,
  startGame,
  startTimer,
  toggleCell
} from "../../application/actions/actionCreators";
import { ICellPosition } from "../../application/actions/actions";
import { elapseOneSecondReducer } from "../../application/reducers/elapseOneSecondReducer";

const position: ICellPosition = { column: 2, row: 4 };

it("should create open cell action", () => {
  expect(openCell(position)).toEqual({ type: "OPEN_CELL", payload: position });
});

it("should create right click action", () => {
  expect(toggleCell(position)).toEqual({
    payload: position,
    type: "TOGGLE_CELL"
  });
});

it("should create start game action", () => {
  expect(startGame("beginner")).toEqual({
    type: "START_GAME",
    payload: "beginner"
  });
});

it("should create change game options action", () => {
  expect(changeGameOption({ type: "width", value: 55 })).toEqual({
    type: "CHANGE_GAME_OPTIONS",
    payload: { type: "width", value: 55 }
  });
});

it("should create elapse one second action", () => {
  expect(elapseOneSecond()).toEqual({ type: "ELAPSE_ONE_SECOND" });
});

it(
  "start timer should dispatch an elapse action " +
    "every second until the game is finished",
  () => {
    jest.useFakeTimers();
    const store = createStore(
      elapseOneSecondReducer,
      { gameTimeMs: 0 },
      applyMiddleware(thunkMiddleware)
    );
    let count = 0;
    const getStateMock = () => {
      count++;
      if (count > 10) {
        return { isFinished: true };
      }
      return { isFinished: false };
    };
    startTimer(store.dispatch, getStateMock);
    jest.runTimersToTime(15000);
    expect(store.getState().gameTimeMs).toBe(10000);
  }
);
