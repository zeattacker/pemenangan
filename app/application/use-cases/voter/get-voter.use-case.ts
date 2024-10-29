import {
  IDPTRepository,
  IVoterRepository,
} from "~/domain/interfaces/voter-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class GetVoterUseCase {
  constructor(
    private voterRepository: IVoterRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.voterRepository.getVoters(accessToken);
  }
}
