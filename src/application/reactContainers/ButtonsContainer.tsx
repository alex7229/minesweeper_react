import { connect } from "react-redux";
import { Dispatch } from "redux";
import { changeGameOption, startGame } from "../actions/actionCreators";
import {
  Buttons,
  IButtonsDispatchProps,
  IButtonsStateProps
} from "../components/Buttons";
import {
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_EMPTY_CELLS,
  MIN_HEIGHT,
  MIN_MINES,
  MIN_WIDTH
} from "../constants";
import {
  CheckNumberRange,
  checkNumberRange
} from "../logic/validators/checkNumberRange";
import { IGlobalState } from "../reducers/rootReducer";

type MapStateToProps = (state: IGlobalState) => IButtonsStateProps;
type MapStateToPropsFactory = (
  checkNumber: CheckNumberRange
) => MapStateToProps;

export const mapStateToPropsFactory: MapStateToPropsFactory = checkNumber => state => ({
  currentFieldWidth: state.field[0].length,
  widthError: checkNumber(state.width, MIN_WIDTH, MAX_WIDTH),
  heightError: checkNumber(state.height, MIN_HEIGHT, MAX_HEIGHT),
  minesError: checkNumber(
    state.mines,
    MIN_MINES,
    state.width * state.height - MIN_EMPTY_CELLS
  )
});

const mapStateToProps = mapStateToPropsFactory(checkNumberRange);

type MapDispatchToProps = (dispatch: Dispatch) => IButtonsDispatchProps;

export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  changeOption: payload => dispatch(changeGameOption(payload)),
  startGame: payload => dispatch(startGame(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buttons);
