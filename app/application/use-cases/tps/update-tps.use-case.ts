import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ITPSRepository } from "~/domain/interfaces/tps-repo.interface";
import { ManageTpsDto } from "~/infra/dtos/manage-tps.dto";

export class UpdateTpsUseCase {
  constructor(
    private tpsRepository: ITPSRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    dptData: Omit<ManageTpsDto, "id">,
    cookieHeader?: string | null
  ) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    dptData.villageId =
      dptData.villageId !== "" ? parseInt(dptData.villageId.toString()) : "";

    return this.tpsRepository.updateTps(dptData, accessToken);
  }
}
