import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { IVillageRepository } from "~/domain/interfaces/village-repo.interface";

export class GetVillageUseCase {
  constructor(
    private villageRepository: IVillageRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(districtId: number | string, cookieHeader?: string | null) {
    let accessToken = await this.sessionRepository.getAccessToken(cookieHeader);

    if (!accessToken) {
      accessToken = "";
    }
    return this.villageRepository.getVillages(districtId, accessToken);
  }
}
