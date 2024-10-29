import type { IAuthRepository } from "~/domain/interfaces/auth-repo.interface";
import type { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { Credentials } from "~/domain/value-objects/credentials.vo";

export class LoginUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(email: string, password: string) {
    const credentials = new Credentials(email, password);

    const { accessToken, refreshToken } = await this.authRepository.login(
      credentials
    );

    const cookieHeader = await this.sessionRepository.createSession({
      accessToken,
      refreshToken,
    });

    return { cookieHeader };
  }
}
