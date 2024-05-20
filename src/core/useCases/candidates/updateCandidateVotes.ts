import { Candidate } from "../../entities/Candidates";
import { Dispatch } from "redux";
import { candidatesSliceAction } from "../../../core/useCases/Redux/Slices/CandidateSlice";

export const updateCandidateVotes = (dispatch: Dispatch, participant: Candidate) => {
  dispatch(candidatesSliceAction.updateCandidateVotes(participant));
};
