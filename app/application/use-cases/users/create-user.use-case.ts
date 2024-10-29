import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import type { IUserRepository } from "~/domain/interfaces/user-repo.interface";
import { ManageUserDto } from "~/infra/dtos/manage-user.dto";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    userData: Omit<ManageUserDto, "id">,
    cookieHeader?: string | null
  ) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.userRepository.createUser(userData, accessToken);
  }
}
