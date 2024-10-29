import { IDistrictRepository } from "~/domain/interfaces/district-repo.interface";
import { PaginationResponseDto } from "../dtos/pagination-response.dto";
import { District } from "~/domain";
import { ObjectResponse } from "../dtos/object-response.dto";
import { ManageDistrictDto } from "../dtos/manage-district.dto";

export class ApiDistrictRepository implements IDistrictRepository {
  constructor(private apiBaseUrl: string) {}

  async createDistrict(
    districtData: Omit<ManageDistrictDto, "id">,
    accessToken: string
  ) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/districts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(districtData),
      });

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async updateDistrict(district: ManageDistrictDto, accessToken: string) {
    const response = await fetch(
      `${this.apiBaseUrl}/districts/${district.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: district.name,
          cityOrRegencyId: district.cityOrRegencyId,
        }),
      }
    );

    return response.json();
  }

  async getDistrictById(
    districtId: number | string,
    accessToken?: string
  ): Promise<ObjectResponse<District>> {
    const response = await fetch(`${this.apiBaseUrl}/districts/${districtId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }

  async getDistricts(
    villageId: number | string,
    accessToken?: string
  ): Promise<PaginationResponseDto<District[]>> {
    let headers = {};
    if (accessToken !== "")
      headers = {
        Authorization: `Bearer ${accessToken}`,
      };

    const response = await fetch(
      `${this.apiBaseUrl}/districts${
        villageId !== "" ? `?villageId=${villageId}` : ""
      }`,
      {
        headers,
      }
    );
    return response.json();
  }
}
