import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  CalculateDifficultyLevelContainer,
  calculateDifficultyLevelContainer
} from "../../DIContainers/logic/board/calculateDifficultyLevelContainer";
import { hideOverlay } from "../actions/actionCreators";
import { WinOverlay } from "../components/WinOverlay";
import { IGlobalState } from "../reducers/rootReducer";

interface IStateProps {
  readonly time: number;
  readonly difficulty: number;
}

interface IStateDependecies {
  readonly calculateDifficultyLevel: CalculateDifficultyLevelContainer;
}
type MapStateToProps = (state: IGlobalState) => IStateProps;
export type MapStateToPropsFactory = (
  deps: IStateDependecies
) => MapStateToProps;

export const mapStateToPropsFactory: MapStateToPropsFactory = deps => state => ({
  time: state.gameTimeMs,
  difficulty: deps.calculateDifficultyLevel(state.field)
});

const mapStateToProps = mapStateToPropsFactory({
  calculateDifficultyLevel: calculateDifficultyLevelContainer
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideOverlay: () => dispatch(hideOverlay())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WinOverlay);
