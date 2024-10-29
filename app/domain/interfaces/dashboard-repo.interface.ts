import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { Dashboard } from "../entities/dashboard.entity";

export interface IDashboardRepository {
  getDashboard(acessToken: string): Promise<ObjectResponse<Dashboard>>;
}
