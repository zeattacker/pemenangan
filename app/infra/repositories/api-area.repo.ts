import type { IAreaRepository } from "~/domain/interfaces/area-repo.interface";
import type {
  Province,
  City,
  District,
  Village,
} from "~/domain/entities";
import { PaginationResponseDto } from "../dtos/pagination-response.dto";

export class ApiAreaRepository implements IAreaRepository {
  constructor(private apiBaseUrl: string) {}

  async getProvinces(): Promise<Province[]> {
    const response = await fetch(`${this.apiBaseUrl}/provinces`);
    return response.json();
  }

  async getCities(provinceId: number): Promise<City[]> {
    const response = await fetch(
      `${this.apiBaseUrl}/cities-or-regencies?provinceId=${provinceId}`
    );
    return response.json();
  }

  async getDistricts(
    cityId: number
  ): Promise<PaginationResponseDto<District[]>> {
    const response = await fetch(
      `${this.apiBaseUrl}/districts?cityId=${cityId}`
    );
    return response.json();
  }

  async getVillages(
    districtId: number
  ): Promise<PaginationResponseDto<Village[]>> {
    const response = await fetch(
      `${this.apiBaseUrl}/villages?districtId=${districtId}`
    );
    return response.json();
  }

  async getNeighborhoods(villageId: number | string) {
    const response = await fetch(
      `${this.apiBaseUrl}/neighborhoods?villageId=${villageId}`
    );
    return response.json();
  }
}
