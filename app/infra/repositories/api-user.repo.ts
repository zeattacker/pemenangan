import type { User } from "~/domain/entities/user.entity";
import type { IUserRepository } from "~/domain/interfaces/user-repo.interface";
import { ManageUserDto } from "../dtos/manage-user.dto";
import { PaginationRequestDTO } from "../dtos/pagination-request.dto";
import { PaginationResponseDto } from "../dtos/pagination-response.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";

export class ApiUserRepository implements IUserRepository {
  constructor(private apiUrl: string) {}

  async getUserById(userId: string | number, accessToken: string) {
    const response = await fetch(`${this.apiUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }

  async registerUser(userData: Omit<RegisterUserDto, "id">): Promise<User> {
    const response = await fetch(`${this.apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return response.json();
  }

  async getUsers(
    accessToken: string,
    paginationRequest?: PaginationRequestDTO
  ): Promise<PaginationResponseDto<User[]>> {
    const response = await fetch(
      `${this.apiUrl}/users?page=${paginationRequest?.page || ""}&limit=${
        paginationRequest?.limit || ""
      }&search=${paginationRequest?.search || ""}&isActive=${
        paginationRequest?.status || ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    console.log(`${this.apiUrl}/users?page=${paginationRequest?.page || ""}&limit=${
        paginationRequest?.limit || ""
      }&search=${paginationRequest?.search || ""}&isActive=${
        paginationRequest?.status || ""
      }`);

    return data;
  }

  async updateUser(
    userData: ManageUserDto,
    userId: number | string,
    accessToken: string
  ) {
    const response = await fetch(`${this.apiUrl}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userData),
    });

    return response.json();
  }

  async createUser(userData: Omit<ManageUserDto, "id">, accessToken: string) {
    try {
      const response = await fetch(`${this.apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      return data;
      // return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser(userId: string | number, accessToken: string) {
    const response = await fetch(`${this.apiUrl}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.text();
  }
}
