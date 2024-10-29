import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { IVillageRepository } from "~/domain/interfaces/village-repo.interface";
import { ManageVillageDto } from "~/infra/dtos/manage-village.dto";

export class UpdateVillageUseCase {
  constructor(
    private villageRepository: IVillageRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    village: ManageVillageDto,
    villageId: number | string,
    cookieHeader?: string | null
  ) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.villageRepository.updateVillage(
      village,
      villageId,
      accessToken
    );
  }
}
