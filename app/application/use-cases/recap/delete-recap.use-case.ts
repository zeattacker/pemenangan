import { IRecapRepository } from "~/domain/interfaces/recap-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class DeleteRecapUseCase {
  constructor(
    private recapRepository: IRecapRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(recapId: number | string, cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.recapRepository.deleteRecap(recapId, accessToken);
  }
}
