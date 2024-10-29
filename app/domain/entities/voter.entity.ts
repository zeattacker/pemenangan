import { DPT } from "./dpt.entity";
import { TPS } from "./tps.entity";
import { User } from "./user.entity";
import { Village } from "./village.entity";

export interface Voter {
  id: number;
  registeredBy: User;
  votingStation: TPS;
  village: Village;
  dpt: DPT;
  isActive: boolean;
  nik: string;
}
