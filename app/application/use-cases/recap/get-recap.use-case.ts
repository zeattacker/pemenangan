import { IRecapRepository } from "~/domain/interfaces/recap-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { PaginationRequestDTO } from "~/infra/dtos/pagination-request.dto";

export class GetRecapUseCase {
  constructor(
    private recapRepository: IRecapRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    cookieHeader?: string | null,
    paginationRequest?: PaginationRequestDTO
  ) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.recapRepository.getRecaps(accessToken, paginationRequest);
  }
}
