import { candidatesSliceAction } from "../../../core/useCases/Redux/Slices/CandidateSlice";
import { Dispatch } from "redux";

export const fetchCandidates = (dispatch: Dispatch) => {
  dispatch(candidatesSliceAction.fetchCandidates());
};
