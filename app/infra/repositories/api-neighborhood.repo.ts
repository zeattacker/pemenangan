import { INeighborhoodRepository } from "~/domain/interfaces/neighbourhood-repo.interface";
import { ManageNeighborhoodDto } from "../dtos/manage-neighborhood.dto";

export class ApiNeighborhoodRepository implements INeighborhoodRepository {
  constructor(private apiBaseUrl: string) {}

  async getNeighborhoods(villageId: number | string, accessToken: string) {
    let headers = {};
    if (accessToken !== "")
      headers = {
        Authorization: `Bearer ${accessToken}`,
      };

    const response = await fetch(
      `${this.apiBaseUrl}/neighborhoods${
        villageId !== "" ? `?villageId=${villageId}` : ""
      }`,
      {
        headers,
      }
    );
    return response.json();
  }

  async createNeighborhood(
    neighborhood: ManageNeighborhoodDto,
    accessToken: string
  ) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/neighborhoods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(neighborhood),
      });

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async updateNeighborhood(
    neighborhood: ManageNeighborhoodDto,
    neighborhoodId: number | string,
    accessToken: string
  ) {
    const response = await fetch(
      `${this.apiBaseUrl}/neighborhoods/${neighborhoodId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(neighborhood),
      }
    );

    return response.json();
  }

  async getNeighborhoodById(villageId: number | string, accessToken?: string) {
    const response = await fetch(
      `${this.apiBaseUrl}/neighborhoods/${villageId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.json();
  }
}
