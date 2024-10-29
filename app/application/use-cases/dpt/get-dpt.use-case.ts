import { IDPTRepository } from "~/domain/interfaces/dpt-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class GetDPTUseCase {
  constructor(
    private dptRepository: IDPTRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    query: {
      name: string;
      page: string;
      limit: string;
    },
    cookieHeader?: string | null
  ) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.dptRepository.getDpts(query, accessToken);
  }
}
