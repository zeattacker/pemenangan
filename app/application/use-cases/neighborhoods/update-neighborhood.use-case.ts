import { INeighborhoodRepository } from "~/domain/interfaces/neighborhood-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ManageNeighborhoodDto } from "~/infra/dtos/manage-neighborhood.dto";

export class UpdateNeighborhoodUseCase {
  constructor(
    private neighborhoodRepository: INeighborhoodRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    neighborhood: ManageNeighborhoodDto,
    neighborhoodId: number | string,
    cookieHeader?: string | null
  ) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.neighborhoodRepository.updateNeighborhood(
      neighborhood,
      neighborhoodId,
      accessToken
    );
  }
}
