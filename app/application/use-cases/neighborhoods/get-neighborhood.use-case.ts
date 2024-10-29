import { INeighborhoodRepository } from "~/domain/interfaces/neighbourhood-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class GetNeighborhoodUseCase {
  constructor(
    private neighborhoodRepository: INeighborhoodRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(villageId: number | string, cookieHeader?: string | null) {
    let accessToken = "";
    if (cookieHeader !== "") {
      accessToken =
        (await this.sessionRepository.getAccessToken(cookieHeader)) || "";

      if (!accessToken) {
        return null;
      }
    }
    return this.neighborhoodRepository.getNeighborhoods(villageId, accessToken);
  }
}
