export interface Candidate {
  id: number;
  candidateName: string;
  candidateSymbol: string;
  votes: number;
  campaignID?: number;
}
