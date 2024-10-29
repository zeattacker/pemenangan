import { IBroadcastRepository } from "~/domain/interfaces/broadcast-repo.interface";
import { IDPTRepository } from "~/domain/interfaces/voter-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class DeleteBroadcastUseCase {
  constructor(
    private broadcastRepository: IBroadcastRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(broadcastId: number | string, cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.broadcastRepository.deleteBroadcast(broadcastId, accessToken);
  }
}
