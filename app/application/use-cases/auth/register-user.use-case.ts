import type { IUserRepository } from "~/domain/interfaces/user-repo.interface";
import type { User } from "~/domain/entities/user.entity";
import { RegisterUserDto } from "~/infra/dtos/register-user.dto";

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: Omit<RegisterUserDto, "id">): Promise<User> {
    // Tambahkan validasi jika diperlukan
    return this.userRepository.registerUser(userData);
  }
}
