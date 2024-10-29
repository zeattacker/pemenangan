import { IDistrictRepository } from "~/domain/interfaces/district-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ManageDistrictDto } from "~/infra/dtos/manage-district.dto";

export class CreateDistrictUseCase {
  constructor(
    private districtRepository: IDistrictRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    districtData: Omit<ManageDistrictDto, "id">,
    cookieHeader?: string | null
  ) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.districtRepository.createDistrict(districtData, accessToken);
  }
}
