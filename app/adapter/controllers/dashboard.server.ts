import { GetDashboardTopUseCase } from "~/application/use-cases/dashboard/get-dashboard-top.use-case";
import { ApiDashboardRepository } from "~/infra/repositories/api-dashboard.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;
const dashboardRepository = new ApiDashboardRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();

const getDashboardTopUC = new GetDashboardTopUseCase(
  sessionRepository,
  dashboardRepository
);

export async function getDashboardTop(request: Request) {
  return getDashboardTopUC.execute(request.headers.get("Cookie"));
}
