import { TPS } from "~/domain";
import { ITPSRepository } from "~/domain/interfaces/tps-repo.interface";
import { ManageTpsDto } from "../dtos/manage-tps.dto";
import { PaginationResponseDto } from "../dtos/pagination-response.dto";

export class ApiTpsRepository implements ITPSRepository {
  constructor(private apiBaseUrl: string) {}
  async createTps(tpsData: Omit<ManageTpsDto, "id">, accessToken: string) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/voting-stations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tpsData),
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async updateTps(tps: ManageTpsDto, accessToken: string) {
    const response = await fetch(
      `${this.apiBaseUrl}/voting-stations/${tps.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: tps.name,
          villageId: tps.villageId,
        }),
      }
    );

    return response.json();
  }

  async getTpsById(tpsId: number | string, accessToken: string) {
    const response = await fetch(
      `${this.apiBaseUrl}/voting-stations/${tpsId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.json();
  }

  async getTps(
    villageId: number | string,
    accessToken?: string
  ): Promise<PaginationResponseDto<TPS[]>> {
    let headers = {};
    if (accessToken !== "")
      headers = {
        Authorization: `Bearer ${accessToken}`,
      };

    const response = await fetch(
      `${this.apiBaseUrl}/voting-stations${
        villageId !== "" ? `?villageId=${villageId}` : ""
      }`,
      {
        headers,
      }
    );
    return response.json();
  }
}
