import { IBroadcastRepository } from "~/domain/interfaces/broadcast-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ManageBroadcastDto } from "~/infra/dtos/manage-broadcast.dto";

export class CreateBroadcastUseCase {
  constructor(
    private broadcastRepository: IBroadcastRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(candidate: ManageBroadcastDto, cookieHeader?: string | null) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.broadcastRepository.createBroadcast(candidate, accessToken);
  }
}
