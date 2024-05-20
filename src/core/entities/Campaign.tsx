import { Candidate } from "./Candidates";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  image: string;
  candidates?: Candidate[];
  startDate: string;
  endDate: string;
}
