import { RegisterUserDto } from "~/infra/dtos/register-user.dto";
import type { User } from "../entities/user.entity";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { ManageUserDto } from "~/infra/dtos/manage-user.dto";
import { PaginationRequestDTO } from "~/infra/dtos/pagination-request.dto";

export interface IUserRepository {
  getUsers(
    accessToken: string,
    paginationRequest?: PaginationRequestDTO
  ): Promise<PaginationResponseDto<User[]>>;
  getUserById(
    userID: string | number,
    accessToken: string
  ): Promise<ObjectResponse<User>>;
  createUser(
    userData: Omit<ManageUserDto, "id">,
    accessToken: string
  ): Promise<ObjectResponse<User>>;
  updateUser(
    userData: ManageUserDto,
    userId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<User>>;
  deleteUser(userId: string | number, accessToken: string): Promise<string>;
  registerUser(user: RegisterUserDto): Promise<User>;
}
