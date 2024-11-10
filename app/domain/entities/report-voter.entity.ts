interface ReportVoterDetail {
  id: number;
  name: string;
  voterCount: number;
}

export interface ReportVoter {
  id: number;
  name: string;
  voterCount: number;
  villages: ReportVoterDetail[];
}
