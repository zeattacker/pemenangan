import { IRecapRepository } from "~/domain/interfaces/recap-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ManageRecapDto } from "~/infra/dtos/manage-recap.dto";

export class UpdateRecapUseCase {
  constructor(
    private recapRepository: IRecapRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    recapId: number | string,
    data: ManageRecapDto,
    cookieHeader?: string | null
  ) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.recapRepository.updateRecap(recapId, data, accessToken);
  }
}
