import { connect } from "react-redux";
import { Dispatch } from "redux";
import { openCell, toggleCell } from "../actions/actionCreators";
import { ICellPosition } from "../actions/actions";
import { Board } from "../components/Board";
import { IGlobalState } from "../reducers/rootReducer";

export const mapStateToProps = (state: IGlobalState) => ({
  field: state.field
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  openCell: (position: ICellPosition) => dispatch(openCell(position)),
  toggleCell: (position: ICellPosition) => dispatch(toggleCell(position))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
