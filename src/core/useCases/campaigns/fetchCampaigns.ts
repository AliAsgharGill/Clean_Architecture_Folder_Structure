import { campaignSliceActions } from "../../../core/useCases/Redux/Slices/campaignSlice";
import { Dispatch } from "redux";

export const fetchCampaigns = (dispatch: Dispatch) => {
  dispatch(campaignSliceActions.fetchCampaigns());
};
