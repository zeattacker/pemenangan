import { TPS } from "./tps.entity";
import { Village } from "./village.entity";

export interface DPT {
  id: number | string;
  name: string;
  gender: string;
  age: number;
  nik: string;
  address: string;
  rt: string;
  rw: string;
  village: Village;
  votingStation: TPS;
  createdAt: string;
  updatedAt: string;
}
