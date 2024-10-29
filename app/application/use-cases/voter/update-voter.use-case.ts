import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { IVoterRepository } from "~/domain/interfaces/voter-repo.interface";
import { ManageVoterDto } from "~/infra/dtos/manage-voter.dto";

export class UpdateVoterUseCase {
  constructor(
    private voterRepository: IVoterRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    voterId: number | string,
    isActive: boolean,
    cookieHeader?: string | null
  ) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.voterRepository.updateVoter(voterId, isActive, accessToken);
  }
}
