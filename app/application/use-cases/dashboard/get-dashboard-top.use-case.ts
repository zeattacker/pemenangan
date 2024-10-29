import { IDashboardRepository } from "~/domain/interfaces/dashboard-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class GetDashboardTopUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private dashboardRepository: IDashboardRepository
  ) {}

  async execute(cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.dashboardRepository.getDashboard(accessToken);
  }
}
