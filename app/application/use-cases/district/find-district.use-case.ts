import { IDistrictRepository } from "~/domain/interfaces/district-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class FindDistrictUseCase {
  constructor(
    private districtRepository: IDistrictRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(districtId: number | string, cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.districtRepository.getDistrictById(districtId, accessToken);
  }
}
