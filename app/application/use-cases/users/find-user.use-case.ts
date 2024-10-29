import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { IUserRepository } from "~/domain/interfaces/user-repo.interface";

export class FindUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(userId: number | string, cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.userRepository.getUserById(userId, accessToken);
  }
}
