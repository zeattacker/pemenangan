import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ITPSRepository } from "~/domain/interfaces/tps-repo.interface";

export class GetTpsDataUseCase {
  constructor(
    private tpsRepository: ITPSRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async getTps(villageId: number | string, cookieHeader?: string | null) {
    let accessToken = "";
    if (cookieHeader !== "") {
      accessToken =
        (await this.sessionRepository.getAccessToken(cookieHeader)) || "";

      if (!accessToken) {
        return null;
      }
    }
    return this.tpsRepository.getTps(villageId, accessToken);
  }
}
