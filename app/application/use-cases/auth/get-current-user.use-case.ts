import { TokenExpiredError } from "~/domain/errors/token-expired.error";
import type { IAuthRepository } from "~/domain/interfaces/auth-repo.interface";
import type { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class GetCurrentUserUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private authRepository: IAuthRepository
  ) {}

  async execute(cookieHeader?: string) {
    let session = await this.sessionRepository.getSession(cookieHeader);
    if (!session) {
      return null;
    }

    try {
      const data = await this.authRepository.validate(session.accessToken);

      return data;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        // Try to refresh the token
        const { accessToken, refreshToken } =
          await this.authRepository.refreshToken(session.refreshToken);
        session = { accessToken, refreshToken };
        await this.sessionRepository.updateSession(cookieHeader!, session);
        return await this.authRepository.validate(accessToken);
      }
      throw error;
    }
  }
}
