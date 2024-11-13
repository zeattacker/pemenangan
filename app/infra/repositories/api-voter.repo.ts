import { IVoterRepository } from "~/domain/interfaces/voter-repo.interface";
import { ManageVoterDto } from "../dtos/manage-voter.dto";
import { PaginationRequestDTO } from "../dtos/pagination-request.dto";

export class ApiVoterRepository implements IVoterRepository {
  constructor(private apiUrl: string) {}

  async createVoter(voter: ManageVoterDto, accessToken: string) {
    try {
      const response = await fetch(`${this.apiUrl}/voters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(voter),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getVoters(
    accessToken: string,
    paginationRequest?: PaginationRequestDTO
  ) {
    const response = await fetch(
      `${this.apiUrl}/voters?page=${paginationRequest?.page}&limit=${paginationRequest?.limit}&districtId=${paginationRequest?.districtId}&villageId=${paginationRequest?.villageId}&search=${paginationRequest?.search}&isActive=${paginationRequest?.status}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.json();
  }

  async getVoterById(voterId: string | number, accessToken: string) {
    const response = await fetch(`${this.apiUrl}/voters/${voterId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }
  async updateVoter(
    voterId: number | string,
    isActive: boolean,
    accessToken: string
  ) {
    const response = await fetch(`${this.apiUrl}/voters/${voterId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        isActive,
      }),
    });

    const data = await response.json();

    return data;
  }

  async deleteVoter(voterId: string | number, accessToken: string) {
    const response = await fetch(`${this.apiUrl}/voters/${voterId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.text();
  }
}
