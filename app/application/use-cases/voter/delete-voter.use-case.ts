import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import {
  IVoterRepository
} from "~/domain/interfaces/voter-repo.interface";

export class DeleteVoterUseCase {
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
    return this.voterRepository.deleteVoter(voterId, accessToken);
  }
}
