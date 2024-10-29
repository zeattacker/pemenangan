import { IBroadcastRepository } from "~/domain/interfaces/broadcast-repo.interface";
import { ICandidateRepository } from "~/domain/interfaces/candidate-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ManageBroadcastDto } from "~/infra/dtos/manage-broadcast.dto";
import { ManageCandidateDto } from "~/infra/dtos/manage-candidate.dto";

export class UpdateBroadcastUseCase {
  constructor(
    private broadcastRepository: IBroadcastRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    broadcast: ManageBroadcastDto,
    broadcastId: number | string,
    cookieHeader?: string | null
  ) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.broadcastRepository.updateBroadcast(
      broadcast,
      broadcastId,
      accessToken
    );
  }
}
