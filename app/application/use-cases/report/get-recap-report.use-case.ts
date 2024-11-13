import { IReportRepository } from "~/domain/interfaces/report-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class GetRecapReportUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private reportRepository: IReportRepository
  ) {}

  async execute(cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.reportRepository.getReportRecap(accessToken);
  }
}
