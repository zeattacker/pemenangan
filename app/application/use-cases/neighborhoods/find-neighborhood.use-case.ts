import { INeighborhoodRepository } from "~/domain/interfaces/neighborhood-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class FindNeighborhoodUseCase {
  constructor(
    private neighborhoodRepository: INeighborhoodRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(villageId: number | string, cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.neighborhoodRepository.getNeighborhoodById(
      villageId,
      accessToken
    );
  }
}
