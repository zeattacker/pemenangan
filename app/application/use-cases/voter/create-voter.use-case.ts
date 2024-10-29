import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { IVoterRepository } from "~/domain/interfaces/voter-repo.interface";
import { ManageVoterDto } from "~/infra/dtos/manage-voter.dto";

export class CreateVoterUseCase {
  constructor(
    private voterRepository: IVoterRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(voterData: ManageVoterDto, cookieHeader?: string | null) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    voterData.dptId = parseInt(voterData.dptId.toString());

    return this.voterRepository.createVoter(voterData, accessToken);
  }
}
