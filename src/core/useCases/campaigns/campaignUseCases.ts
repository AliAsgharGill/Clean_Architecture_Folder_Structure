import axios from "axios";
import { Campaign } from "../../entities/Campaign";
import { Candidate } from "../../entities/Candidates";

const API_URL = "http://localhost:3000";

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await axios.get(`${API_URL}/campaigns`);
  return response.data;
};

export const addCampaign = async (campaign: Campaign): Promise<void> => {
  await axios.post(`${API_URL}/campaigns`, campaign);
};

export const updateCampaign = async (campaign: Campaign): Promise<void> => {
  await axios.put(`${API_URL}/campaigns/${campaign.id}`, campaign);
};

export const deleteCampaign = async (campaignID: string): Promise<void> => {
  await axios.delete(`${API_URL}/campaigns/${campaignID}`);
};

export const fetchCandidates = async (
  campaignID: string
): Promise<Candidate[]> => {
  const response = await axios.get(
    `${API_URL}/campaigns/${campaignID}/candidates`
  );
  return response.data;
};

export const addCandidate = async (candidate: Candidate): Promise<void> => {
  await axios.post(`${API_URL}/candidates`, candidate);
};

export const updateCandidate = async (candidate: Candidate): Promise<void> => {
  await axios.put(`${API_URL}/candidates/${candidate.id}`, candidate);
};

export const deleteCandidate = async (candidateID: string): Promise<void> => {
  await axios.delete(`${API_URL}/candidates/${candidateID}`);
};
