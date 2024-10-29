import { District } from "./district.entity";

export interface Village {
  id: number;
  district: District;
  name: string;
}
