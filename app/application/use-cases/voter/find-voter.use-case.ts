import { IVoterRepository } from "~/domain/interfaces/voter-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class FindVoterUseCase {
  constructor(
    private voterRepository: IVoterRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(voterId: number | string, cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.voterRepository.getVoterById(voterId, accessToken);
  }
}
