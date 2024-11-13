import { District } from "./district.entity";

interface DetailVote {
  id: number;
  name: string;
  voteCount: number;
  [key: string]: any;
}

export interface ReportRecap {
  id: number;
  name: string;
  viceName: string;
  voteCount: number;
  districts: DetailVote[];
}
