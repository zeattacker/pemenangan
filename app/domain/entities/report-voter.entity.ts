interface ReportVoterDetail {
  id: number;
  name: string;
  voterCount: string;
  votingStations: {
    id: number;
    name: string;
    voterCount: string;
  }[];
}

export interface ReportVoter {
  id: number;
  name: string;
  voterCount: number;
  villages: ReportVoterDetail[];
}
