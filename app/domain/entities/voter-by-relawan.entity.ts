import { Village } from "./village.entity";

export interface VoterDetail {
  id: number;
  name: string;
  votingStationId: number;
  votingStationName: string;
  rt: string;
  rw: string;
}
export interface VoterByRelawan {
  id: number;
  name: string;
  phoneNumber: string;
  village: Village;
  voterCount: number;
  voters: VoterDetail[];
}
