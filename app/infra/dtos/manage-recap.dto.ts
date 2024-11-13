export interface ManageRecapDto {
  votingStationId: number | string;
  candidates: {
    candidateId: number | string;
    validVote: number;
  }[];
  invalidVote: number | string;
}
