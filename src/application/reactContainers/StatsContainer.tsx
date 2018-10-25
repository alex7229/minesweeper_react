import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  GetDigitsFromNumberContainer,
  getDigitsFromNumberContainer
} from "../../DIContainers/logic/digits/getDigitsFromNumberContainer";
import {
  GetDigitsFromTimeContainer,
  getDigitsFromTimeContainer
} from "../../DIContainers/logic/digits/getDigitsFromTimeContainer";
import { startGame } from "../actions/actionCreators";
import { DigitOrDot } from "../components/Digit";
import { Stats } from "../components/Stats";
import { calculateCells } from "../logic/board/calculateCells";
import { IGlobalState } from "../reducers/rootReducer";
import { Field } from "../reducers/toggleCellReducer";

type MapStateToProps = (
  state: IGlobalState
) => {
  readonly gameHasStarted: boolean;
  readonly gameStartTimestamp: number;
  readonly mineWasClicked: boolean;
  readonly timer: ReadonlyArray<DigitOrDot>;
  readonly flagsLeft: ReadonlyArray<DigitOrDot>;
  readonly isSmall: boolean;
  readonly isFinished: boolean;
  readonly getTime: () => number;
  readonly getDigitsFromTime: GetDigitsFromTimeContainer
};
interface IStateDependencies {
  readonly getDigitsFromTime: GetDigitsFromTimeContainer;
  readonly getDigitsFromNumber: GetDigitsFromNumberContainer;
  readonly calculateFlags: (field: Field) => number;
  readonly calculateActiveMines: (field: Field) => number;
  readonly calculateMines: (field: Field) => number;
  readonly getTime: () => number;
}
type MapStateToPropsFactory = (
  dependencies: IStateDependencies
) => MapStateToProps;

type MapDispatchToProps = (
  dispatch: Dispatch
) => { readonly restartGame: () => void };

export const mapStateToPropsFactory: MapStateToPropsFactory = dependencies => state => ({
  mineWasClicked: dependencies.calculateActiveMines(state.field) === 1,
  timer: dependencies.getDigitsFromTime(state.gameTimeMs),
  flagsLeft: dependencies.getDigitsFromNumber(
    state.mines - dependencies.calculateFlags(state.field)
  ),
  isSmall: state.width < 17,
  gameStartTimestamp: state.gameStartTimestamp,
  isFinished: state.isFinished,
  getTime: dependencies.getTime,
  getDigitsFromTime: dependencies.getDigitsFromTime,
  gameHasStarted: dependencies.calculateMines(state.field) > 0
});

export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  restartGame: () => dispatch(startGame("custom"))
});

export default connect(
  mapStateToPropsFactory({
    getDigitsFromTime: getDigitsFromTimeContainer,
    calculateFlags: (field: Field) => calculateCells(field, "flag"),
    calculateActiveMines: (field: Field) =>
      calculateCells(field, "active_mine"),
    getDigitsFromNumber: getDigitsFromNumberContainer,
    getTime: () => new Date().getTime(),
    calculateMines: (field: Field) => calculateCells(field, 'mine')
  }),
  mapDispatchToProps
)(Stats);
