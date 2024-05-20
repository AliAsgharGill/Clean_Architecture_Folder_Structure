import { Campaign } from "../../entities/Campaign";
import { Candidate } from "../../entities/Candidates";
import { Dispatch } from "redux";
import { candidatesSliceAction } from "../../../core/useCases/Redux/Slices/CandidateSlice";

export const handleManageCampaign = (
  campaign: Campaign,
  campaigns: Campaign[],
  candidates: Candidate[],
  disabledCampaigns: string[],
  setDisabledCampaigns: (value: string[]) => void,
  setView: (value: boolean) => void,
  setParticipants: (value: Candidate[]) => void
) => {
  const campaignExist = campaigns.find((camp: Campaign) => camp.id === campaign.id);
  const contestants = candidates.filter((can: Candidate) => can.campaignID === campaignExist?.id);
  setParticipants(contestants);

  if (campaignExist) {
    setView(true);
    const updatedDisabledCampaigns = [...disabledCampaigns, campaignExist.id];
    setDisabledCampaigns(updatedDisabledCampaigns);
    localStorage.setItem("disabledCampaigns", JSON.stringify(updatedDisabledCampaigns));
  }
};
