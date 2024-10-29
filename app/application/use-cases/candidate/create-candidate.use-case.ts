import { ICandidateRepository } from "~/domain/interfaces/candidate-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ManageCandidateDto } from "~/infra/dtos/manage-candidate.dto";

export class CreateCandidateUseCase {
  constructor(
    private candidateRepository: ICandidateRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(candidate: ManageCandidateDto, cookieHeader?: string | null) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.candidateRepository.createCandidate(candidate, accessToken);
  }
}
