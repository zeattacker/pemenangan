import { RegisterUserDto } from "~/infra/dtos/register-user.dto";
import type { User } from "../entities/user.entity";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { ManageUserDto } from "~/infra/dtos/manage-user.dto";

export interface IUserRepository {
  getUsers(accessToken: string): Promise<PaginationResponseDto<User[]>>;
  getUserById(userID: string | number, accessToken: string): Promise<User>;
  createUser(
    userData: Omit<ManageUserDto, "id">,
    accessToken: string
  ): Promise<ObjectResponse<User>>;
  updateUser(
    userData: ManageUserDto,
    userId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<User>>;
  registerUser(user: RegisterUserDto): Promise<User>;
}
