import { Village } from "./village.entity";

export interface Recap {
  id: number;
  name: string;
  candidates: {
    id: number;
    name: string;
    validVote: number;
  }[];
  invalidVote: number;
  village: Village;
}
