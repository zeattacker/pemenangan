import { IRecapRepository } from "~/domain/interfaces/recap-repo.interface";
import { ManageRecapDto } from "../dtos/manage-recap.dto";
import { PaginationRequestDTO } from "../dtos/pagination-request.dto";

export class ApiRecapRepository implements IRecapRepository {
  constructor(private apiUrl: string) {}

  async getRecaps(
    accessToken: string,
    paginationRequest?: PaginationRequestDTO
  ) {
    const response = await fetch(`${this.apiUrl}/recapitulations`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }

  async createRecap(recap: ManageRecapDto, accessToken: string) {
    try {
      const response = await fetch(`${this.apiUrl}/recapitulations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(recap),
      });

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async updateRecap(
    recapId: number | string,
    recap: ManageRecapDto,
    accessToken: string
  ) {
    try {
      const response = await fetch(
        `${this.apiUrl}/recapitulations/${recapId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(recap),
        }
      );

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteRecap(recapId: string | number, accessToken: string) {
    const response = await fetch(`${this.apiUrl}/recapitulations/${recapId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.text();
  }
}
