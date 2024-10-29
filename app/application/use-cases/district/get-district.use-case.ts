import { IDistrictRepository } from "~/domain/interfaces/district-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class GetDistrictUseCase {
  constructor(
    private districtRepository: IDistrictRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async getDistricts(cityId: number | string, cookieHeader?: string | null) {
    let accessToken = "";
    if (cookieHeader !== "") {
      accessToken =
        (await this.sessionRepository.getAccessToken(cookieHeader)) || "";

      if (!accessToken) {
        return null;
      }
    }
    return this.districtRepository.getDistricts(cityId, accessToken);
  }
}
