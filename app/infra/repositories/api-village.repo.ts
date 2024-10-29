import { IVillageRepository } from "~/domain/interfaces/village-repo.interface";
import { ManageVillageDto } from "../dtos/manage-village.dto";

export class ApiVillageRepository implements IVillageRepository {
  constructor(private apiBaseUrl: string) {}

  async createVillage(villageData: ManageVillageDto, accessToken: string) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/villages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(villageData),
      });

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async updateVillage(
    villageData: ManageVillageDto,
    villageId: number | string,
    accessToken: string
  ) {
    const response = await fetch(`${this.apiBaseUrl}/villages/${villageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(villageData),
    });

    return response.json();
  }

  async getVillages(districtId: number | string, accessToken: string | null) {
    let headers = {};
    if (accessToken !== "")
      headers = {
        Authorization: `Bearer ${accessToken}`,
      };

    const response = await fetch(
      `${this.apiBaseUrl}/villages${
        districtId !== "" ? `?districtId=${districtId}` : ""
      }`,
      {
        headers,
      }
    );
    return response.json();
  }
}
