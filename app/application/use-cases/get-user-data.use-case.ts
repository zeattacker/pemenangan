import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { IUserRepository } from "~/domain/interfaces/user-repo.interface";

export class GetUserDataUseCase {
  constructor(
    private userRepository: IUserRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async getUsers(cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.userRepository.getUsers(accessToken);
  }

  async getUserById(userId: number | string, cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.userRepository.getUserById(userId, accessToken);
  }
}
