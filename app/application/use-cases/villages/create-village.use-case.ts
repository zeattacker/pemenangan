import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { IVillageRepository } from "~/domain/interfaces/village-repo.interface";
import { ManageVillageDto } from "~/infra/dtos/manage-village.dto";

export class CreateVillageUseCase {
  constructor(
    private villageRepository: IVillageRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(village: ManageVillageDto, cookieHeader?: string | null) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.villageRepository.createVillage(village, accessToken);
  }
}
