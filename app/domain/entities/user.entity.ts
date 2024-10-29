import { District } from "./district.entity";
import { Neighborhood } from "./neighborhood.entity";
import { TPS } from "./tps.entity";
import { UserExtend } from "./user-extend.entity";
import { Village } from "./village.entity";

export interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  userExtend: UserExtend;
  role: UserRole;
  district: District;
  neighborhood: Neighborhood;
  isAdmin: boolean;
  village: Village;
  votingStations: TPS;
  hasGroups: string[];
}

export type UserRole = "Admin" | "Korcam" | "Korkel" | "Relawan" | "Saksi";
