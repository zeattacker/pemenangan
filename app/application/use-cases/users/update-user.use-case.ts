import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { IUserRepository } from "~/domain/interfaces/user-repo.interface";
import { ManageUserDto } from "~/infra/dtos/manage-user.dto";

export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(
    userData: ManageUserDto,
    userId: number | string,
    cookieHeader?: string | null
  ) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.userRepository.updateUser(userData, userId, accessToken);
  }
}
