import { GetRecapReportUseCase } from "~/application/use-cases/report/get-recap-report.use-case";
import { GetVoterReportUseCase } from "~/application/use-cases/report/get-voter-report.use-case";
import { ApiReportRepository } from "~/infra/repositories/api-report.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const reportRepository = new ApiReportRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();

const getVoterReportUC = new GetVoterReportUseCase(
  sessionRepository,
  reportRepository
);
const getRecapReportUC = new GetRecapReportUseCase(
  sessionRepository,
  reportRepository
);

export async function getVoterReport(request: Request) {
  return getVoterReportUC.execute(request.headers.get("Cookie")!);
}

export async function getRecapReport(request: Request) {
  return getRecapReportUC.execute(request.headers.get("Cookie")!);
}
