import { ICandidateRepository } from "~/domain/interfaces/candidate-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class DeleteCandidateUseCase {
  constructor(
    private candidateRepository: ICandidateRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(candidateId: number | string, cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.candidateRepository.deleteCandidate(candidateId, accessToken);
  }
}
