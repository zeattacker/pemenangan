import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ITPSRepository } from "~/domain/interfaces/tps-repo.interface";

export class FindTpsUseCase {
  constructor(
    private tpsRepository: ITPSRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(tpsId: number | string, cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.tpsRepository.getTpsById(tpsId, accessToken);
  }
}
