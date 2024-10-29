import type { IUserRepository } from "~/domain/interfaces/user-repo.interface";
import type { User } from "~/domain/entities/user.entity";
import { TokenExpiredError } from "~/domain/errors/token-expired.error";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { PaginationResponseDto } from "../dtos/pagination-response.dto";
import { ManageUserDto } from "../dtos/manage-user.dto";

export class ApiUserRepository implements IUserRepository {
  constructor(private apiUrl: string) {}

  async getUserById(
    userId: string | number,
    accessToken: string
  ): Promise<User> {
    const response = await fetch(`${this.apiUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new TokenExpiredError("Access token expired");
      }
      throw new Error("Failed to fetch user data");
    }

    const data = (await response.json()).data;

    return data;
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

  async getUsers(accessToken: string): Promise<PaginationResponseDto<User[]>> {
    const response = await fetch(`${this.apiUrl}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
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
}