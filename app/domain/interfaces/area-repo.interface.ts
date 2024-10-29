import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { City } from "../entities/city.entity";
import { District } from "../entities/district.entity";
import { Neighborhood } from "../entities/neighborhood.entity";
import { Province } from "../entities/province.entity";
import { Village } from "../entities/village.entity";

export interface IAreaRepository {
  getProvinces(): Promise<Province[]>;
  getCities(provinceId: number | string): Promise<City[]>;
  getDistricts(
    cityId: number | string
  ): Promise<PaginationResponseDto<District[]>>;
  getVillages(
    districtId: number | string
  ): Promise<PaginationResponseDto<Village[]>>;
  getNeighborhoods(
    villageId: number | string
  ): Promise<PaginationResponseDto<Neighborhood[]>>;
}
