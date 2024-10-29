import { IBroadcastRepository } from "~/domain/interfaces/broadcast-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class GetBroadcastUseCase {
  constructor(
    private broadcastRepository: IBroadcastRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.broadcastRepository.getBroadcasts(accessToken);
  }
}
